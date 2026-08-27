/* Renders `static/social-card.png`, the picture every link preview of this
   site shows.

   Run by hand, `node scripts/social-card.mjs`, and commit the file it writes.
   The build does not run it: a committed PNG means a deploy needs no browser,
   and it means the picture cannot change without somebody looking at the
   change. Re-run it when the palette, the face or the motif move.

   What is on the card is the wordmark and the flag sun, and nothing else. The
   reasoning for saying no more than that is on SOCIAL_CARD in src/lib/site.ts:
   a preview is the one surface somebody did not choose to look at, so what the
   app is for goes in og:description, which is the part a person sharing the
   link is choosing to send.

   Redesign ticket 03 repainted this. It carried ticket 09's world - a
   near-black ground, three blurred aurora blobs, and the wordmark in a
   blue-to-pink gradient - none of which is on the site any more, so a shared
   link previewed as a different product from the one it opened.

   The colours are the dark theme's, read off src/lib/styles/base.css by hand
   because this is a picture rather than a page and nothing here goes through
   the cascade. A token that moves there has to be copied here, which is the
   cost of the file being static, and the same is true of the flag's stripes in
   src/lib/flags.ts.

   The type is Outfit now, embedded from the same woff2 the site serves. The
   old file said the system sans was deliberate because the bundled DM Sans
   subset was missing most of basic Latin and rendered the wordmark in per-glyph
   serif fallback; it also said ticket 03 would take the display face when it
   settled one. This is that. Outfit's Latin file covers U+0000-00FF, so the
   wordmark renders in the face the site actually uses.

   Chromium comes from the same launcher the browser tests use, so
   CHROMIUM_PATH works here too. */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { launchChromium } from '../tests/browser-harness.mjs';
import { FLAGS, rings } from '../src/lib/flags.ts';

const WIDTH = 1200;
const HEIGHT = 630;

/* The motif's diameter on the card, centred on the top-right corner the way it
   is on the page. Larger relative to the frame than on the site, because a
   preview is seen at thumbnail size and an arc that reads at 1200px wide has
   to still read at 300. */
const SUN = 760;

const root = new URL('../', import.meta.url);

const outfit = await readFile(fileURLToPath(new URL('static/fonts/outfit-latin.woff2', root)));

/* Trans, the app's default palette, and the same flag the site rests on
   without scripting. A card cannot cycle. */
const stripes = rings(FLAGS[0])
  .map(
    (ring, index) =>
      `<i style="width:${SUN}px;height:${SUN}px;background:${ring.colour};transform:scale(${ring.scale});z-index:${index}"></i>`,
  )
  .join('');

const card = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: 'Outfit';
        src: url(data:font/woff2;base64,${outfit.toString('base64')}) format('woff2');
        font-weight: 100 900;
      }

      html,
      body {
        margin: 0;
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
      }

      body {
        position: relative;
        overflow: hidden;
        /* --bg, dark. */
        background: #0d141a;
        display: grid;
        align-content: center;
        padding-left: 96px;
      }

      /* The flag sun, centred on the top-right corner: one flat ring per
         stripe, largest painting first. No blur and no gradient anywhere,
         which is the whole of what changed about this card. */
      .sun {
        position: absolute;
        top: ${-SUN / 2}px;
        right: ${-SUN / 2}px;
        width: ${SUN}px;
        height: ${SUN}px;
        isolation: isolate;
      }

      .sun i {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        transform-origin: 50% 50%;
      }

      /* Flat --text, in the site's display face at its own tracking. The
         gradient this used to be is not on the site any more. */
      .wordmark {
        position: relative;
        margin: 0;
        font-family: 'Outfit', system-ui, sans-serif;
        font-size: 112px;
        font-weight: 600;
        letter-spacing: -0.024em;
        color: #e8f1f7;
        width: fit-content;
      }
    </style>
  </head>
  <body>
    <div class="sun">${stripes}</div>
    <p class="wordmark">enGender</p>
  </body>
</html>`;

const browser = await launchChromium();
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
await page.setContent(card, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: 'png' });
await browser.close();

const file = fileURLToPath(new URL('static/social-card.png', root));
await writeFile(file, png);
console.log(`social card: ${WIDTH}x${HEIGHT}, ${(png.length / 1024).toFixed(1)} kB, ${file}`);
