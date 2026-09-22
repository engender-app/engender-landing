/* The sign-off artifact for redesign ticket 08: crops of what this ticket
   changed, before and after, in the trans palette in both themes, plus a
   scrubbable flipbook of the one thing that moves.

   Run from the ticket worktree, with both builds present:
     node .impeccable/signoff-08.mjs
   It writes .impeccable/review/*.png and .impeccable/signoff-08.html.

   Not a test and not committed: it answers a person. What it is careful about
   is only shooting the elements this ticket touched - a review page that shows
   five whole screens is one Alicja has already asked not to be sent (2026-09-07)
   - and only in the default palette, light and dark (2026-09-14).

   The flipbook is captured at ten times slow motion, by overriding the
   duration tokens before the page loads. Every frame carries the real
   millisecond it would have landed on, which is its captured time divided by
   ten, so a pair of frames 16.7ms apart is a pair of consecutive frames at
   speed. The curves are unchanged by the stretch: what moves per unit of
   normalised time is the same drawing. */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { launchChromium, serveBuild } from '../tests/browser-harness.mjs';

const AFTER = '/home/alice/_projekty/priv/gender-diary-landing/.claude/worktrees/ticket-08';
const BEFORE = '/home/alice/_projekty/priv/gender-diary-landing/.claude/worktrees/before-08';
const OUT = `${AFTER}/.impeccable/review`;

/* What changed, as the element that shows it. Each is a crop, not a screen. */
const CROPS = [
  { name: 'action', path: '/en/', selector: '.splash .cta', pad: 24,
    title: 'The action',
    note: 'A two-stop ramp of the flag’s accent pair on a 999px pill with a 6px-offset shadow, in Outfit 600. Now one flat colour - the flag’s own --accent, the app’s per-palette button colour - on a 6px block in Nunito 750, with no shadow at all.' },
  { name: 'nameplate', path: '/en/', selector: '.nameplate', pad: 16,
    title: 'The dictionary entry',
    note: 'Outfit 600 at -0.03em over DM Sans 400. Now Outfit 800 at -0.045em, the step the app tightens a title past 48px by, over Nunito 450.' },
  { name: 'claim', path: '/en/', selector: '.claim .headline', pad: 16,
    title: 'The claim',
    note: 'Outfit 500 at -0.028em. Now Outfit 800 at -0.04em: the app’s display face never sets less than 800.' },
  { name: 'section-head', path: '/en/', selector: '.overview .section-head', pad: 16,
    title: 'An act heading and its rule',
    note: 'The heading at 600, the flag rule with 2px rounded ends. Now 800, and the rule is square - the app’s own section rule is a 3px border, and a line with rounded ends is a lozenge.' },
  { name: 'lede', path: '/en/', selector: '.overview .lede', pad: 16,
    title: 'A lede',
    note: 'Set in the display face at 500. Now Nunito at 600: content is set in the body face, always (the app’s rule 2), and a lede is content.' },
  { name: 'leads', path: '/en/', selector: '.leads .entries', pad: 8,
    title: 'The four care-surface leads',
    note: 'Four cards on --surface with a 1px outline and a 20px corner. Now four cells held by one hairline each: the app’s rule 4 has three treatments and a box of surface colour is none of them.' },
  { name: 'careful', path: '/en/', selector: '.careful .entries p:first-child', pad: 8,
    title: 'The careful notice',
    note: 'A filled 20px box on --surface-2. Now flush between two hairlines spanning the act, which is what the app’s own notice became when a filled one read as too loud.' },
  { name: 'swatches', path: '/en/', selector: '.palette-demo', pad: 8,
    title: 'The palette demonstration',
    note: 'Swatches at a 9px corner. Now 6px, and the active one takes a --text edge instead of the retired --outline-strong.' },
  { name: 'channels', path: '/en/', selector: '.channels', pad: 8,
    title: 'The channels',
    note: 'A grid held by --outline at 19%. Now by --hairline at 14%, which is the app’s weight for a separator; 19% is kept for the outer edge of a surface.' },
  { name: 'frames', path: '/en/', selector: '.frames', pad: 8,
    title: 'The phone frames',
    note: 'Unchanged on purpose: 26px is the one corner outside the budget, because a frame is a drawing of a device rather than a surface of this site’s.' },
  { name: 'bar', path: '/en/privacy/', selector: '.bar', pad: 0,
    title: 'The foot bar',
    note: 'Pill-shaped switch track and thumb, no mark. Now the app’s own concentric control - an 8px track around 6px segments at a 3px inset - and the app’s mark at 24px beside the site’s name. The shadow this ticket meant to add is measured in DESIGN.md and is not here.' },
  { name: 'privacy-masthead', path: '/en/privacy/', selector: '.masthead-inner', pad: 8,
    title: 'A page title',
    note: 'Outfit 600 over a display-face intro at 500. Now Outfit 800 at -0.045em over Nunito 600.' },
  { name: 'guide-sidebar', path: '/en/guide/home/', selector: '.body', pad: 8,
    title: 'The Guide’s shell',
    note: 'Only the shared tokens and chrome, which is all this ticket owns here; the sidebar’s own composition is guide ticket 09.' },
];

async function crops(root, tag, browser) {
  const { server, base } = await serveBuild(`${root}/build`);
  try {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        colorScheme: theme,
        deviceScaleFactor: 2,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      let at = null;
      for (const crop of CROPS) {
        if (at !== crop.path) {
          await page.goto(base + crop.path, { waitUntil: 'load' });
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(400);
          at = crop.path;
        }
        const target = page.locator(crop.selector).first();
        if ((await target.count()) === 0) continue;
        const file = `${OUT}/${crop.name}-${tag}-${theme}.png`;
        /* Scrolled into view first, and then clipped in viewport coordinates:
           a clip is taken against the viewport, so an element below the fold
           has a bounding box the screenshot cannot reach. Anything taller than
           the window gives up its padding and is shot as an element instead,
           which is Playwright's own scrolling capture. */
        await target.scrollIntoViewIfNeeded();
        await page.waitForTimeout(120);
        const box = await target.boundingBox();
        if (!box) continue;
        const pad = crop.pad;
        if (box.height + pad * 2 > 880 || box.y < 0) {
          await target.screenshot({ path: file });
          continue;
        }
        await page.screenshot({
          path: file,
          clip: {
            x: Math.max(0, box.x - pad),
            y: Math.max(0, box.y - pad),
            width: Math.min(1280 - Math.max(0, box.x - pad), box.width + pad * 2),
            height: Math.min(900 - Math.max(0, box.y - pad), box.height + pad * 2),
          },
        });
      }
      await context.close();
    }
  } finally {
    server.close();
  }
}

/* One flag change, ten times slow, as frames. The page is loaded with the
   motion tokens stretched, then watched until the action's colour starts to
   move, and screenshotted in a tight loop from there. */
async function flipbook(root, tag, browser, seconds = 1.8) {
  const { server, base } = await serveBuild(`${root}/build`);
  const frames = [];
  try {
    const context = await browser.newContext({
      viewport: { width: 900, height: 560 },
      colorScheme: 'light',
      deviceScaleFactor: 1,
    });
    await context.addInitScript(() => {
      const stretch = document.createElement('style');
      stretch.textContent = `:root {
        --dur-motif: 9000ms;
        --dur-rule-sweep: 15000ms;
        --dur-med: 2400ms;
        --dur-slow: 3800ms;
      }`;
      addEventListener('DOMContentLoaded', () => document.head.append(stretch));
    });
    const page = await context.newPage();
    await page.goto(`${base}/en/`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);

    /* Wait for the change to start rather than assuming a phase: the cycle is
       six seconds and the page was loaded at an arbitrary point in it. */
    await page.evaluate(
      () =>
        new Promise((resolve) => {
          const action = document.querySelector('.cta');
          const first = getComputedStyle(action).backgroundColor;
          const watch = () => {
            if (getComputedStyle(action).backgroundColor !== first) resolve();
            else requestAnimationFrame(watch);
          };
          requestAnimationFrame(watch);
        }),
    );

    /* One captured frame per real frame, which at ten times slow is one every
       167ms of wall clock. Sampling faster than that is not more resolution,
       it is the same frame photographed twice, and it was what made this run
       take a quarter of an hour. */
    const STEP = 167;
    const started = Date.now();
    let next = 0;
    while (next < seconds * 1000 * 10) {
      const wait = next - (Date.now() - started);
      if (wait > 0) await page.waitForTimeout(wait);
      next += STEP;
      const at = Date.now() - started;
      const state = await page.evaluate(() => {
        const action = document.querySelector('.cta');
        const rings = [...document.querySelectorAll('.splash .sun i')];
        return {
          fill: getComputedStyle(action).backgroundColor,
          rings: rings.map((ring) =>
            Number.parseFloat(
              getComputedStyle(ring).transform.match(/matrix\(([\d.]+)/)?.[1] ?? '1',
            ).toFixed(4),
          ),
        };
      });
      const file = `${OUT}/flip-${tag}-${String(frames.length).padStart(3, '0')}.png`;
      await page.screenshot({ path: file, clip: { x: 300, y: 0, width: 600, height: 460 } });
      frames.push({ file: file.split('/').pop(), real: at / 10, ...state });
    }
    await context.close();
  } finally {
    server.close();
  }
  return frames;
}

await mkdir(OUT, { recursive: true });
const browser = await launchChromium();
await crops(BEFORE, 'before', browser);
await crops(AFTER, 'after', browser);
const after = await flipbook(AFTER, 'after', browser);
const before = await flipbook(BEFORE, 'before', browser);
await browser.close();

const card = {
  before: (await readFile(`${BEFORE}/static/social-card.png`)).toString('base64'),
  after: (await readFile(`${AFTER}/static/social-card.png`)).toString('base64'),
};

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>enGender landing - redesign ticket 08 sign-off</title>
<style>
  body { margin: 0; background: #14181c; color: #e8f1f7; font: 15px/1.6 system-ui, sans-serif; }
  main { max-width: 1180px; margin: 0 auto; padding: 3rem 1.5rem 6rem; }
  h1 { font-size: 2rem; margin: 0 0 0.5rem; }
  h2 { font-size: 1.25rem; margin: 3rem 0 0.25rem; }
  p { max-width: 68ch; color: #b9c8d4; }
  .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin: 1rem 0 0; }
  .pair figure { margin: 0; }
  .pair figcaption { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #8fa5b5; margin-bottom: 0.35rem; }
  img { max-width: 100%; display: block; background: #fff; }
  .theme { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #8fa5b5; margin: 1.5rem 0 0; }
  .flip { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: start; }
  .flip img { background: #f4f8fb; }
  .meter { font-variant-numeric: tabular-nums; font-size: 13px; color: #b9c8d4; }
  input[type=range] { width: 100%; }
  table { border-collapse: collapse; font-size: 12px; font-variant-numeric: tabular-nums; }
  td, th { padding: 2px 8px; border-bottom: 1px solid #263039; text-align: left; }
</style>
</head>
<body>
<main>
<h1>Redesign ticket 08 - follow the app's new design language</h1>
<p>Crops of what this ticket changed, in the <code>trans</code> palette, light and dark.
Before is <code>main</code> at 82d1948; after is the ticket branch. Nothing here is a whole
screen and nothing here is a second palette.</p>

${CROPS.map(
  (crop) => `
<h2>${crop.title}</h2>
<p>${crop.note}</p>
${['light', 'dark']
  .map(
    (theme) => `<p class="theme">${theme}</p>
<div class="pair">
  <figure><figcaption>before</figcaption><img src="review/${crop.name}-before-${theme}.png" alt="" /></figure>
  <figure><figcaption>after</figcaption><img src="review/${crop.name}-after-${theme}.png" alt="" /></figure>
</div>`,
  )
  .join('\n')}`,
).join('\n')}

<h2>The social card</h2>
<p>The wordmark at Outfit 800 / -0.045em instead of 600 / -0.024em, and the app's mark on it.</p>
<div class="pair">
  <figure><figcaption>before</figcaption><img src="data:image/png;base64,${card.before}" alt="" /></figure>
  <figure><figcaption>after</figcaption><img src="data:image/png;base64,${card.after}" alt="" /></figure>
</div>

<h2>A flag change, frame by frame</h2>
<p>Captured at ten times slow motion, so each step is a real frame and the millisecond
shown is the real one. Before, the rings travelled on <code>--ease-overshoot</code>, a
spring that passed the new radius and settled back; after, they decelerate on the app's
<code>--ease-out</code>. The numbers under each frame are the scale of each ring and the
action's own colour on that frame - what the no-yanks test samples.</p>
<div class="flip">
  <figure><figcaption class="theme">before</figcaption><img id="flip-before" src="review/${before[0]?.file ?? ''}" alt="" /><div class="meter" id="meter-before"></div></figure>
  <figure><figcaption class="theme">after</figcaption><img id="flip-after" src="review/${after[0]?.file ?? ''}" alt="" /><div class="meter" id="meter-after"></div></figure>
</div>
<input type="range" id="scrub" min="0" max="${Math.max(before.length, after.length) - 1}" value="0" />
<p class="meter" id="counter"></p>

<script>
  const BEFORE = ${JSON.stringify(before)};
  const AFTER = ${JSON.stringify(after)};
  const scrub = document.getElementById('scrub');
  const show = () => {
    const at = Number(scrub.value);
    for (const [tag, frames] of [['before', BEFORE], ['after', AFTER]]) {
      const frame = frames[Math.min(at, frames.length - 1)];
      if (!frame) continue;
      document.getElementById('flip-' + tag).src = 'review/' + frame.file;
      document.getElementById('meter-' + tag).textContent =
        frame.real.toFixed(1) + 'ms - rings ' + frame.rings.join(' ') + ' - fill ' + frame.fill;
    }
    document.getElementById('counter').textContent =
      'frame ' + (at + 1) + ' of ' + scrub.max * 1 + 1;
  };
  scrub.addEventListener('input', show);
  addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') scrub.value = Number(scrub.value) + 1;
    if (event.key === 'ArrowLeft') scrub.value = Number(scrub.value) - 1;
    show();
  });
  show();
</script>
</main>
</body>
</html>`;

await writeFile(`${AFTER}/.impeccable/signoff-08.html`, page);
console.log(`sign-off page: ${AFTER}/.impeccable/signoff-08.html`);
console.log(`${CROPS.length} crops x 2 themes x 2 builds, ${before.length} + ${after.length} flipbook frames`);
