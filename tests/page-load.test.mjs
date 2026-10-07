import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { launchChromium, serveBuild } from './browser-harness.mjs';

const { server, base } = await serveBuild(fileURLToPath(new URL('../build', import.meta.url)));
const production = 'https://engender.barankiewicz.dev';
const endpoint = 'https://app.engender.barankiewicz.dev/_stats/website';
const browser = await launchChromium({ args: ['--disable-crash-reporter', '--disable-breakpad'] });
const context = await browser.newContext();
const counts = [];
await context.route(`${production}/**`, async route => {
  const url = new URL(route.request().url());
  await route.fulfill({ response: await route.fetch({ url: `${base}${url.pathname}${url.search}` }) });
});
await context.route('https://app.engender.barankiewicz.dev/**', async route => {
  const request = route.request();
  counts.push({ url: request.url(), method: request.method(), body: request.postData(), headers: request.headers() });
  await route.fulfill({ status: 204, headers: { 'Access-Control-Allow-Origin': production } });
});
try {
  const page = await context.newPage();
  await page.goto(`${production}/en/?private=synthetic`);
  for (let n = 0; counts.length < 1 && n < 100; n++) await delay(50);
  assert.equal(counts.length, 1);
  assert.equal(counts[0].url, endpoint);
  assert.equal(counts[0].method, 'POST');
  assert.equal(counts[0].body, null);
  assert.equal(counts[0].headers.referer, undefined);
  assert.equal(counts[0].headers.cookie, undefined);
  await page.evaluate(() => {
    const link = document.createElement('a');
    link.href = '/en/privacy/'; document.body.append(link); link.click();
  });
  await page.waitForURL(`${production}/en/privacy/`);
  await delay(300);
  assert.equal(counts.length, 1, 'client-side navigation does not count');
  await page.reload();
  for (let n = 0; counts.length < 2 && n < 100; n++) await delay(50);
  assert.equal(counts.length, 2);
  await context.setOffline(true);
  await page.reload();
  await delay(300);
  assert.equal(counts.length, 2);
  await context.setOffline(false);
  await delay(300);
  assert.equal(counts.length, 2);
  console.log('Website counts: fixed empty request; no cookies/referrer; document reload only; no offline replay.');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
