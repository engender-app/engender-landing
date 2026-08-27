/* Measured checks behind the /impeccable audit report (ticket 03). Reads the
   built site rather than the source, so what it reports is what ships.

   Not part of `npm test`: the suite asserts the decisions this site has made,
   and this prints numbers for a human to judge. Anything here that turns out
   to be a rule worth keeping belongs in tests/site.test.mjs instead.

   Run it after a build:  node tests/audit.mjs */
import { launchChromium, serveBuild } from './browser-harness.mjs';

const BUILD = new URL('../build', import.meta.url).pathname;
const PATHS = ['/en/', '/pl/', '/en/privacy/'];

/** This site's floor is 44px: it is the web target size, and the app's stricter
    48px comes from Android and applies to the app. */
const TARGET_FLOOR = 44;

async function main() {
  const { server, base } = await serveBuild(BUILD);
  const browser = await launchChromium();
  const report = [];

  try {
    for (const path of PATHS) {
      for (const width of [390, 1280]) {
        const context = await browser.newContext({
          viewport: { width, height: 844 },
          colorScheme: 'dark',
          deviceScaleFactor: 1,
          reducedMotion: 'reduce',
        });
        const page = await context.newPage();
        await page.goto(base + path, { waitUntil: 'load' });
        await page.evaluate(() => document.fonts.ready);

        const found = await page.evaluate((floor) => {
          const out = { targets: [], headings: [], images: [], willChange: [], overflow: null };

          /* Every element a pointer or a key can reach, measured as it is laid
             out. Padding counts, which is why this reads the rectangle rather
             than the font size. */
          for (const node of document.querySelectorAll('a, button, [role="button"], input, select, summary')) {
            const rect = node.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) continue;
            if (rect.width < floor || rect.height < floor) {
              out.targets.push({
                what: `${node.tagName.toLowerCase()}${node.className ? '.' + String(node.className).split(' ')[0] : ''}`,
                text: (node.textContent ?? '').trim().slice(0, 30),
                w: Math.round(rect.width),
                h: Math.round(rect.height),
              });
            }
          }

          /* Level order, so a skipped level shows up as the jump it is. */
          for (const node of document.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
            out.headings.push({
              level: Number(node.tagName[1]),
              text: (node.textContent ?? '').trim().slice(0, 40),
            });
          }

          for (const node of document.querySelectorAll('img')) {
            out.images.push({
              src: node.getAttribute('src')?.slice(0, 40),
              alt: node.getAttribute('alt'),
              loading: node.getAttribute('loading'),
            });
          }

          /* will-change is a targeted hint, not a baseline: anything carrying
             it at rest is holding a layer for no reason. */
          for (const node of document.querySelectorAll('*')) {
            const value = getComputedStyle(node).willChange;
            if (value && value !== 'auto') {
              out.willChange.push(`${node.tagName.toLowerCase()}.${String(node.className).split(' ')[0]}: ${value}`);
            }
          }

          out.overflow = {
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: window.innerWidth,
          };

          out.landmarks = [...document.querySelectorAll('header, nav, main, footer, [role]')].map(
            (node) => node.tagName.toLowerCase() + (node.getAttribute('role') ? `[${node.getAttribute('role')}]` : ''),
          );

          /* Anything animating a property that forces layout. The site's own
             rule is transform, opacity, clip-path and colour; a width or a top
             in here is a regression waiting to be measured on a phone. */
          out.animatedProps = [...new Set(
            document.getAnimations().flatMap((animation) => {
              const effect = animation.effect;
              if (!effect || typeof effect.getKeyframes !== 'function') return [];
              return effect.getKeyframes().flatMap((frame) =>
                Object.keys(frame).filter(
                  (key) => !['offset', 'computedOffset', 'easing', 'composite'].includes(key),
                ),
              );
            }),
          )];

          return out;
        }, TARGET_FLOOR);

        report.push({ path, width, ...found });
        await context.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  for (const entry of report) {
    console.log(`\n=== ${entry.path} at ${entry.width}px ===`);
    console.log(
      `overflow: document ${entry.overflow.documentWidth} vs viewport ${entry.overflow.viewportWidth}` +
        (entry.overflow.documentWidth > entry.overflow.viewportWidth ? '  <-- WIDER THAN THE VIEWPORT' : '  ok'),
    );
    const levels = entry.headings.map((h) => h.level);
    const skips = levels.filter((level, i) => i > 0 && level > levels[i - 1] + 1);
    console.log(`headings: ${levels.join(' ')}${skips.length ? '  <-- SKIPPED A LEVEL' : '  ok'}`);
    console.log(`landmarks: ${entry.landmarks.join(', ')}`);
    console.log(`images: ${entry.images.length ? JSON.stringify(entry.images) : 'none'}`);
    console.log(`will-change at rest: ${entry.willChange.length ? entry.willChange.join('; ') : 'none'}`);
    console.log(`animated properties: ${entry.animatedProps.join(', ') || 'none (reduced motion)'}`);
    if (entry.targets.length === 0) {
      console.log(`targets under ${TARGET_FLOOR}px: none`);
    } else {
      console.log(`targets under ${TARGET_FLOOR}px:`);
      for (const target of entry.targets) {
        console.log(`  ${target.w}x${target.h}  ${target.what}  "${target.text}"`);
      }
    }
  }
}

await main();
