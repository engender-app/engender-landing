# engender landing site

The public site that explains engender and points people at the Journal.

engender (renamed from Gender Diary on 2026-08-26) is a local-first journal for tracking gender transition. It lives in a
separate repository and on a separate origin, and this site never shares storage,
a service worker or runtime code with it.

## Status

Live, mid-rebrand. The English copy is rewritten for the engender rename; the
Polish still says Gender Diary and is Alicja's own translation pass. The
redesign spec and its tickets live in `.scratch/`, which is not committed.

## Stack

SvelteKit with `adapter-static`, so the whole site is prerendered files and the
host serves nothing else. English at `/en/` and Polish at `/pl/`, each its own
document, with `/` sending a visitor to whichever of the two they last read or
their browser asks for. Light and dark follow `prefers-color-scheme` until
someone says otherwise; the stored choice is applied before the page paints.
Both preferences live in this origin's `localStorage` under `gd-landing-` keys
and are invisible to the Journal.

Deployment target is lh.pl managed hosting. Private page-opening counts go to the maintainer’s app origin. The counter
uses no cookies, visitor identifiers or journal data. There are no remote
fonts or third-party scripts.

## Working on it

    npm run dev      # development server
    npm run check    # svelte-check
    npm test         # builds, then drives Chromium against the built files
    npm run links    # builds, then follows every link the built site offers

The tests need a Chromium binary. They look for `/usr/bin/chromium-browser`;
set `CHROMIUM_PATH` if yours is elsewhere.

`npm run links` is the one command here that talks to the network, which is why
it is not part of `npm test`. It fails while the Journal origin is not
answering, and saying so is its job.

Copy lives in `messages/en.json` and `messages/pl.json`. The Polish is written
as Polish, not translated line by line from the English.

## Deploying

`.github/workflows/deploy.yml` builds with `SITE_ENV=production` and uploads
`build/` to lh.pl over FTPS on every push to `main`. Nothing is built on the
server; the whole payload is prerendered files.

A pull request gets a preview build instead, attached to the run as an artifact.
Preview builds carry a robots noindex on every page and ship no sitemap, so an
unfinished page cannot reach a search result whatever is done with it. Download
it and open it with any static file server.

`scripts/lhpl-setup.sh` walks through the parts only a human can do: the domain
and its directory in the lh.pl panel, the certificate, the DNS record, and the
three FTP secrets plus the target directory in GitHub. Run it once, from the
repository root. The account password comes out of the wallet and is never
written to a file here.

The production content policy travels inside each page as a meta element rather
than only as a response header, because managed hosting can ignore an
`.htaccess` without telling anyone. `static/.htaccess` asks for the two things a
meta element cannot carry: the referrer policy as a real header, and a refusal
to be framed. What the live site actually sends has to be read off it:

    curl -sSI https://gender-diary.barankiewicz.dev/

## License

GPLv3, in [LICENSE](LICENSE). The application in the sibling repository is under
the same licence.

## Page-opening counts

The root layout counts one online document opening on
`https://engender.barankiewicz.dev`. The language gateway is skipped so its
redirect does not count twice. Internal navigation, development/preview
origins and offline openings do not count. There is no retry or offline queue.

The empty POST to `https://app.engender.barankiewicz.dev/_stats/website`
omits credentials and referrer. The app repository owns the nginx proxy
that strips visitor headers and supplies the fixed website label to a
separate private GoatCounter site. The dashboard is on
`stats.engender.barankiewicz.dev`, outside the journal's origin. Sessions
and individual hit storage are disabled; hourly totals remain indefinitely.

After a build, `node tests/page-load.test.mjs` verifies the real browser
request, document reloads, internal navigation and offline/reconnect behaviour
using intercepted test origins. It never sends counts to the live collector.

Publication waits for the counter endpoint and the canonical bilingual
privacy policy from the app repository. After editing that policy, run
`node scripts/sync-privacy-policy.mjs /path/to/gender-diary` to update both
catalogues and copy documents. The seven-day error-log limit applies to
the app server's live files.
