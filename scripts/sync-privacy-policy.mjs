// Run from the landing root after editing the Journal's canonical policies.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const journal = resolve(process.argv[2] ?? '../gender-diary');
for (const locale of ['en', 'pl']) {
  const source = readFileSync(`${journal}/docs/privacy-policy.${locale}.md`, 'utf8');
  if (source.includes('[OPEN:')) throw new Error('Resolve policy placeholders before publishing');
  const plain = text => text.replaceAll('**', '').replaceAll('`', '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)').replace(/\s+/g, ' ').trim();
  const blocks = source.trim().split(/\n\s*\n/);
  const title = plain(blocks.shift().replace(/^# /, ''));
  const intro = [];
  const sections = [];
  for (const block of blocks) {
    if (/^#{2,3} /.test(block)) {
      sections.push({ heading: plain(block.replace(/^#{2,3} /, '')), paragraphs: [] });
    } else {
      const paragraphs = sections.at(-1)?.paragraphs ?? intro;
      // Preserve list items as separate paragraphs in the site's prose renderer.
      paragraphs.push(...block.split(/\n(?=- )/).map(item => plain(item.replace(/^- /, ''))));
    }
  }
  const cataloguePath = `messages/${locale}.json`;
  const catalogue = JSON.parse(readFileSync(cataloguePath, 'utf8'));
  catalogue.privacyPage = { ...catalogue.privacyPage, title, intro: intro.join(' '), sections };
  writeFileSync(cataloguePath, JSON.stringify(catalogue, null, 2) + '\n');
  const quote = paragraphs => '*Gate: shipped.*\n\n' + paragraphs.map(p => '> ' + p).join('\n>\n') + '\n';
  const copy = '# Privacy policy\n\nCopied from the Journal canonical policy. Run `node scripts/sync-privacy-policy.mjs /path/to/gender-diary` to update.\n\n'
    + quote([title, ...intro]) + '\n'
    + sections.map(section => `## ${section.heading}\n\n${quote(section.paragraphs)}`).join('\n');
  writeFileSync(`content/${locale}/privacy.md`, copy);
}
