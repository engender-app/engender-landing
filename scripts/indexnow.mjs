/* Tells IndexNow that every page in the sitemap may have changed, as the
   deploy's last step (search and AI discovery ticket 01). Bing, Yandex and
   the engines that share their index then recrawl without waiting.

   It sends every URL, not only the changed ones: there are 27, and the
   upload step does not report which pages it touched.

   Exits non-zero on a refusal so the run shows it; the workflow step may
   fail, because the site is already live by then. */
import { readFile } from 'node:fs/promises';
import { INDEXNOW_KEY, SITE_ORIGIN } from '../src/lib/site.ts';

const sitemap = await readFile(new URL('../build/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, url]) => url);

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(SITE_ORIGIN).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
    urlList,
  }),
});
console.log(`IndexNow: ${response.status} for ${urlList.length} URLs`);
if (!response.ok) process.exit(1);
