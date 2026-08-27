/* Screenshots of the built site, for looking at the redesign rather than for
   asserting anything about it. Not part of `npm test`: it writes files and
   answers a human, which is a different job from passing or failing.

   Run it after a build:  node tests/shots.mjs [outputDirectory]

   Two capture modes, and mixing them up is how a redesign gets "fixed" into a
   regression.

   Full-page shots run with reduced motion forced on. Not to be kind to the
   capture: the scroll reveals are CSS scroll-driven, so a full-page screenshot
   evaluates every one of them at scroll offset zero and everything below the
   fold comes back at opacity 0. The page looks empty and the emptiness is the
   screenshot, not the page. Reduced motion puts every element in its finished
   state, which is exactly the composition a reviewer needs to judge - and it
   doubles as the check that the reduced-motion page is the whole page standing
   still rather than a page with holes in it.

   Viewport shots run with motion on, after the authored entrance has settled,
   which is the only way to see what the splash actually does.

   The ambient loops never finish, so the flag series moves the clock instead:
   two shots of the same page can show two different flags, and that is the
   motif working. */
import { mkdir, writeFile } from 'node:fs/promises';
import { launchChromium, serveBuild } from './browser-harness.mjs';

const BUILD = new URL('../build', import.meta.url).pathname;
const OUT = process.argv[2] ?? new URL('../.impeccable/review', import.meta.url).pathname;

/* Desktop and mobile are the pair reference/new-work.md asks for. 1280 is the
   width most of the composition's breakpoints resolve at; 390 is the width the
   accessibility floor names. The 200% text pass runs at 390 too, because that
   is where a long Polish caption and a 6rem headword actually collide. */
const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const PAGES = [
  { name: 'landing-en', path: '/en/' },
  { name: 'landing-pl', path: '/pl/' },
  { name: 'privacy-en', path: '/en/privacy/' },
];

async function settle(page) {
  /* Fonts first: a shot taken before Outfit lands measures DM Sans metrics and
     every headline in it is the wrong width. */
  await page.evaluate(() => document.fonts.ready);
  /* Then the authored entrance. The longest chain is the splash's fifth
     element, at 4 * 110ms delay plus a 700ms rise, so a second is past the
     end of it with room to spare. */
  await page.waitForTimeout(1100);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const { server, base } = await serveBuild(BUILD);
  const browser = await launchChromium();
  const written = [];

  try {
    for (const viewport of VIEWPORTS) {
      for (const theme of ['light', 'dark']) {
        for (const target of PAGES) {
          /* Only the English landing page is worth all four combinations; the
             other two pages get the pair that shows the most. */
          if (target.name !== 'landing-en' && theme === 'light' && viewport.name === 'mobile') {
            continue;
          }
          const context = await browser.newContext({
            viewport: { width: viewport.width, height: viewport.height },
            colorScheme: theme,
            deviceScaleFactor: 2,
            /* See the note at the top: a full-page shot of a scroll-driven
               page has to be taken with the reveals settled. */
            reducedMotion: 'reduce',
          });
          const page = await context.newPage();
          await page.goto(base + target.path, { waitUntil: 'load' });
          await settle(page);
          const file = `${OUT}/${target.name}-${viewport.name}-${theme}.png`;
          await page.screenshot({ path: file, fullPage: true });
          written.push(file);
          await context.close();
        }
      }
    }

    /* The splash as a reader meets it: one viewport, motion on, entrance
       settled. This is the pair to the full-page shots above and the only
       place the authored entrance and the live motif can be seen at all. */
    for (const [name, theme] of [
      ['splash-dark', 'dark'],
      ['splash-light', 'light'],
    ]) {
      for (const viewport of VIEWPORTS) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          colorScheme: theme,
          deviceScaleFactor: 2,
        });
        const page = await context.newPage();
        await page.goto(`${base}/en/`, { waitUntil: 'load' });
        await settle(page);
        const file = `${OUT}/${name}-${viewport.name}.png`;
        await page.screenshot({ path: file });
        written.push(file);
        await context.close();
      }
    }

    /* The state a redesign gets wrong quietly: the page with scripting off.
       Under reduced motion too, for the reason above. */
    for (const [name, options] of [
      ['no-js', { javaScriptEnabled: false, reducedMotion: 'reduce' }],
    ]) {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        colorScheme: 'dark',
        deviceScaleFactor: 2,
        ...options,
      });
      const page = await context.newPage();
      await page.goto(`${base}/en/`, { waitUntil: 'load' });
      await settle(page);
      const file = `${OUT}/state-${name}.png`;
      await page.screenshot({ path: file, fullPage: true });
      written.push(file);
      await context.close();
    }

    for (const locale of ['en', 'pl']) {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        colorScheme: 'light',
        deviceScaleFactor: 2,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      await page.addInitScript(() => {
        document.documentElement.style.fontSize = '200%';
      });
      await page.goto(`${base}/${locale}/`, { waitUntil: 'load' });
      await settle(page);
      const file = `${OUT}/text200-${locale}-mobile.png`;
      await page.screenshot({ path: file, fullPage: true });
      written.push(file);
      await context.close();
    }

    /* The tour, cropped, because it is the one section a full-page shot
       cannot show: the strip is a horizontal scroller and the page shot only
       ever catches its first three frames and the top of their captions. */
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        colorScheme: theme,
        deviceScaleFactor: 2,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      await page.goto(`${base}/en/`, { waitUntil: 'load' });
      await settle(page);
      const strip = page.locator('.tour-stage');
      await strip.evaluate((node) => node.scrollTo({ left: 0 }));
      const file = `${OUT}/tour-${theme}.png`;
      await strip.screenshot({ path: file });
      written.push(file);
      await context.close();
    }

    /* One capture per flag, so the eight-flag cycle can be checked as eight
       stills instead of by staring at a page waiting for it to turn over. The
       cycle is driven off a timer, so the clock is what gets moved. */
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: 'dark',
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto(`${base}/en/`, { waitUntil: 'load' });
    await settle(page);
    for (let flag = 0; flag < 8; flag += 1) {
      if (flag > 0) await page.waitForTimeout(6100);
      const file = `${OUT}/flag-${flag}.png`;
      await page.screenshot({ path: file, clip: { x: 600, y: 0, width: 680, height: 620 } });
      written.push(file);
    }
    await context.close();

    await writeFile(`${OUT}/index.txt`, written.join('\n') + '\n');
    console.log(written.map((file) => file.replace(`${OUT}/`, '')).join('\n'));
    console.log(`\n${written.length} shots in ${OUT}`);
  } finally {
    await browser.close();
    server.close();
  }
}

await main();
