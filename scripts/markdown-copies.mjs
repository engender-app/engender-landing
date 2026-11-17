/* Writes a markdown copy of every built page beside it, as `index.md`, and
   `/llms.txt` at the root listing them (search and AI discovery ticket 01).

   An assistant asked about this app fetches a page to answer, and the HTML
   it gets is mostly the motif: a hundred-odd ring elements, inline SVG and
   class names. The markdown is the same words without them. It is made from
   the built page rather than from the message catalogue so the two can
   never say different things, and a section added to a page arrives here
   without anyone remembering this script.

   The HTML is SvelteKit's own output, well formed and from a small set of
   elements, so a tokenizer and a stack are enough; nothing a visitor writes
   ever reaches it. Runs in both build flavours: a preview's copies are
   harmless, since the pages they copy carry the noindex. */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import {
  GUIDE_CHAPTERS,
  LOCALES,
  SITE_ORIGIN,
  SOURCE_URL,
  messages,
  metaDescriptionFor,
  pathFor,
  guidePage,
} from '../src/lib/site.ts';

const buildDirectory = fileURLToPath(new URL('../build', import.meta.url));

/** Elements whose whole subtree is chrome rather than copy. */
const SKIP = new Set(['svg', 'script', 'style', 'button', 'nav', 'footer', 'noscript', 'template']);
const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'wbr']);
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

const decode = (text) =>
  text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (whole, name) => {
    if (name[0] !== '#') return ENTITIES[name] ?? whole;
    return String.fromCodePoint(name[1] === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10));
  });

/** An attribute's decoded value, quoted either way, or undefined. */
const attribute = (attributes, name) => {
  const found = attributes.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`));
  return found ? decode(found[1] ?? found[2] ?? found[3]) : undefined;
};

/** The page's `<main>` as a tree of `{ tag, attributes, children }` and strings. */
function parse(html, path) {
  const start = html.indexOf('<main');
  const end = html.indexOf('</main>', start);
  if (start < 0 || end < 0) throw new Error(`${path}: no <main> to copy`);
  const source = html.slice(start, end + '</main>'.length);
  const root = { tag: 'root', attributes: '', children: [] };
  const stack = [root];
  const token = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|([^<]+)/g;
  for (const [, closing, tag, attributes, text] of source.matchAll(token)) {
    const top = stack.at(-1);
    if (text !== undefined) top.children.push(decode(text));
    else if (!tag) continue;
    else if (closing) {
      const at = stack.findLastIndex((node) => node.tag === tag.toLowerCase());
      if (at > 0) stack.length = at;
    } else {
      const node = { tag: tag.toLowerCase(), attributes, children: [] };
      top.children.push(node);
      if (!VOID.has(node.tag) && !attributes.trimEnd().endsWith('/')) stack.push(node);
    }
  }
  return root;
}

/** Elements that start a block of their own. An element with none of these
    inside it is one paragraph, whatever inline marks it holds. */
const BLOCK_TAGS = new Set([
  'main', 'header', 'section', 'article', 'div', 'p', 'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'figure', 'figcaption', 'details', 'summary', 'blockquote', 'pre', 'table',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
]);
const hasBlocks = (node) =>
  node.children.some((child) => typeof child !== 'string' && (BLOCK_TAGS.has(child.tag) || hasBlocks(child)));

/* A disclosure holding a nav is the guide's chapter picker on a phone, which
   is navigation in a different box. */
const hidden = (node) =>
  SKIP.has(node.tag) ||
  attribute(node.attributes, 'aria-hidden') === 'true' ||
  (node.tag === 'details' && node.children.some((child) => child.tag === 'nav'));
const absolute = (href) => (href.startsWith('/') ? SITE_ORIGIN + href : href);

/** A node's text with inline marks, whitespace collapsed. `page` is the URL
    being converted, so a link back to it reads as plain text. */
function inline(node, page) {
  if (typeof node === 'string') return node.replace(/\s+/g, ' ');
  if (hidden(node)) return '';
  const inner = () => node.children.map((child) => inline(child, page)).join('');
  switch (node.tag) {
    case 'strong':
    case 'b':
      return wrap(inner(), '**');
    case 'em':
    case 'i':
      return wrap(inner(), '*');
    case 'code':
      return wrap(inner(), '`');
    case 'br':
      return '\n';
    case 'img': {
      const alt = attribute(node.attributes, 'alt');
      return alt ? `![${alt}](${absolute(attribute(node.attributes, 'src') ?? '')})` : '';
    }
    case 'a': {
      const text = inner().trim();
      const href = attribute(node.attributes, 'href');
      return text && href && absolute(href) !== page ? `[${text}](${absolute(href)})` : text;
    }
    default:
      return inner();
  }
}

/** Marks around the trimmed text, keeping the spaces outside them. */
function wrap(text, mark) {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const [lead] = text.match(/^\s*/);
  const [trail] = text.match(/\s*$/);
  return `${lead}${mark}${trimmed}${mark}${trail}`;
}

const BLOCK_PREFIX = { h1: '# ', h2: '## ', h3: '### ', h4: '#### ', h5: '##### ', h6: '###### ' };

/** The page as markdown blocks, in document order. */
function blocks(node, page, out = []) {
  if (typeof node === 'string') {
    if (node.trim()) out.push(node.trim().replace(/\s+/g, ' '));
    return out;
  }
  if (hidden(node)) return out;
  const text = inline(node, page).trim().replace(/[ \t]+\n/g, '\n');
  if (node.tag in BLOCK_PREFIX) out.push(BLOCK_PREFIX[node.tag] + text);
  else if (hasBlocks(node)) for (const child of node.children) blocks(child, page, out);
  else if (!text) return out;
  else if (node.tag === 'li') out.push(`- ${text}`);
  else if (node.tag === 'summary' || node.tag === 'dt') out.push(`**${text}**`);
  else out.push(text);
  return out;
}

/** Joins blocks, keeping consecutive list items in one list. */
const render = (list) =>
  list.reduce((md, block, at) => {
    if (at === 0) return block;
    const tight = block.startsWith('- ') && list[at - 1].startsWith('- ');
    return md + (tight ? '\n' : '\n\n') + block;
  }, '') + '\n';

const pages = (await readdir(buildDirectory, { recursive: true }))
  .filter((entry) => entry.split('/').pop() === 'index.html')
  .filter((entry) => !entry.split('/').includes('_app'))
  .map((entry) => '/' + entry.slice(0, -'index.html'.length))
  /* The gateway is a name and two language links, which is not a page. */
  .filter((path) => path !== '/')
  .sort();

for (const path of pages) {
  const html = await readFile(`${buildDirectory}${path}index.html`, 'utf8');
  const source = `Source: ${SITE_ORIGIN}${path}`;
  await writeFile(`${buildDirectory}${path}index.md`, `${render(blocks(parse(html, path), SITE_ORIGIN + path))}\n${source}\n`);
}

/* The index an assistant reads first (llmstxt.org): the name, one line on
   what it is, then every page with its own description, both languages. */
const pageList = (locale) => {
  const m = messages[locale];
  const entries = [
    ['landing', m.pageTitle],
    ...GUIDE_CHAPTERS.map((chapter) => [guidePage(chapter), m.guide.chapters[chapter].title]),
    ['privacy', m.privacyPage.title],
  ];
  return entries.map(
    ([page, title]) =>
      `- [${title}](${SITE_ORIGIN}${pathFor(locale, page)}index.md): ${metaDescriptionFor(locale, page)}`,
  );
};

const en = messages.en;
const llms = [
  `# ${en.pageTitle}`,
  '',
  `> ${en.meta.landing.description}`,
  '',
  ...en.overview.flatMap((paragraph) => [paragraph, '']),
  ...LOCALES.flatMap((locale) => [`## ${messages[locale].languageName}`, '', ...pageList(locale), '']),
  '## Source',
  '',
  `- [Source code](${SOURCE_URL}): the app, GPLv3`,
  '',
].join('\n');
await writeFile(`${buildDirectory}/llms.txt`, llms);

console.log(`markdown copies: ${pages.length} pages and llms.txt`);
