/* Capture the Journal's built-in synthetic fixture for the Guide.
   Build ../gender-diary with VITE_DEMO=1, serve it locally, then run:
   node scripts/capture-guide-screens.mjs http://127.0.0.1:5199

   Each new browser context starts empty. "Fill every feature" writes only
   the Journal's demo fixture. The demo's Phone control supplies a 390x844
   frame; no visitor data or screenshot from a personal profile is read. */
import { execFile } from 'node:child_process';
import { mkdir, unlink } from 'node:fs/promises';
import { promisify } from 'node:util';
import { chromium } from 'playwright-core';

const run = promisify(execFile);
const origin = process.argv[2] ?? 'http://127.0.0.1:5199';
const out = new URL('../static/guide/', import.meta.url).pathname;

const screens = [
  ['home', '/'],
  ['calendar-month', '/calendar'],
  ['calendar-day', '/day/today'],
  ['stats', '/stats'],
  ['health', '/care'],
  ['health-changes', '/care/changes'],
  ['steps', '/transition/roadmap'],
  ['support-evidence', '/doubt/evidence'],
  ['support', '/support/resources'],
  ['media', '/media/photos'],
  ['settings', '/settings'],
  ['privacy-controls', '/settings'],
  ['privacy-export', '/settings/export']
];

await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/usr/bin/chromium-browser',
  headless: true,
  args: ['--disable-crash-reporter']
});

async function save(page, locale, name) {
  await page.evaluate(() => document.fonts.ready);
  /* Headless Chromium denies persistent storage in a fresh profile. The app
     reports that honestly for four seconds. Let its own toast expire before
     capturing a screen about the app rather than this capture environment. */
  await page.waitForTimeout(4300);
  await page.locator('[data-toast]').waitFor({ state: 'hidden', timeout: 10_000 });
  await page.evaluate(() => { document.querySelector('.demo-bar').style.display = 'none'; });
  const frame = page.locator('[data-app-viewport]');
  const box = await frame.boundingBox();
  if (!box || Math.round(box.width) !== 390 || Math.round(box.height) !== 844) {
    throw new Error(`${locale}/${name}: phone frame is ${box?.width}x${box?.height}, expected 390x844`);
  }
  const png = `${out}${locale}-${name}.png`;
  const webp = `${out}${locale}-${name}.webp`;
  await frame.screenshot({ path: png });
  await run('cwebp', ['-quiet', '-q', '82', '-m', '6', png, '-o', webp]);
  await unlink(png);
  console.log(webp);
}

async function open(page, route, locale) {
  const response = await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
  if (response?.status() !== 200) throw new Error(`${route}: HTTP ${response?.status()}`);
  await page.waitForSelector('[data-app-root][data-boot="ready"]', { timeout: 30_000 });
  const renderedLocale = await page.locator('html').getAttribute('lang');
  if (renderedLocale !== locale) throw new Error(`${route}: rendered ${renderedLocale}, expected ${locale}`);
  await page.getByRole('button', { name: 'Phone', exact: true }).click();
  await page.waitForFunction(() => !document.querySelector('.skeleton-stack'), null, { timeout: 30_000 });
}

try {
  for (const locale of ['en', 'pl']) {
    const context = await browser.newContext({
      viewport: { width: 430, height: 900 },
      locale: locale === 'en' ? 'en-US' : 'pl-PL',
      colorScheme: 'light',
      deviceScaleFactor: 1,
      reducedMotion: 'reduce'
    });
    await context.addInitScript((language) => {
      localStorage.setItem('PARAGLIDE_LOCALE', language);
    }, locale);
    const page = await context.newPage();
    page.on('pageerror', (error) => console.error(`${locale}: ${error.message}`));

    await open(page, '/onboarding', locale);
    await save(page, locale, 'getting-started-welcome');
    await page.locator('[data-next]').click();
    await save(page, locale, 'getting-started-name');

    await page.evaluate(() => { document.querySelector('.demo-bar').style.display = ''; });
    await page.locator('[data-fill-every-feature]').click();
    await page.waitForSelector('.demo-bar[data-demo-busy]', { timeout: 30_000 });
    await page.waitForSelector('.demo-bar:not([data-demo-busy])', { timeout: 180_000 });
    await page.waitForURL('**/more', { timeout: 30_000 });
    console.log(`${locale}: synthetic fixture ready`);

    for (const [name, route] of screens) {
      await open(page, route, locale);
      if (name === 'privacy-controls') {
        const heading = page.getByText(locale === 'en' ? 'Privacy & data' : 'Prywatność i dane', { exact: true });
        await heading.evaluate((node) => node.scrollIntoView({ block: 'start' }));
      }
      await save(page, locale, name);
    }
    await context.close();
  }
} finally {
  await browser.close();
}
