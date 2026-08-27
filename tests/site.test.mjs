/* Black-box tests for ticket 02, driven against the built site served as
   plain files. They assert what a visitor gets - the URL they land on, the
   language of the document, the theme the page is painted in, what survives a
   reload - and never reach into component internals or class names.

   Run with `npm test`, which builds first. */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createReporter, launchChromium, serveBuild } from './browser-harness.mjs';
import { copyBlocks, sentences } from './copy-source.mjs';

/* The origin the built pages name in their canonical and alternate links. It
   is provisional (spec, further notes), and changing it should be a deliberate
   edit here as well as in src/lib/site.ts. */
const SITE_ORIGIN = 'https://gender-diary.barankiewicz.dev';

/* The production Journal, on the origin it has to itself. Provisional in the
   same way, and decided by the Journal repository's ticket 01. The exact
   string is the assertion, for the reason given on JOURNAL_URL in
  src/lib/site.ts, and changing it there means changing it here. */
const JOURNAL_URL = 'https://app.gender-diary.barankiewicz.dev/';

/** The product's name as each language's pages currently render it. The
    English pages say enGender since redesign ticket 02; the Polish pages
    still say Gender Diary until Alicja's own translation pass. */
const SITE_NAME = { en: 'enGender', pl: 'Gender Diary' };

/** The four Android channels, in the order the page lists them. The order is
    the opinion: the three that do not report an install to Google come first,
    alphabetically among themselves because nothing separates them, and Google
    Play comes last. The copy says so out loud rather than leaving the position
    to carry it. */
const CHANNELS = ['Aurora', 'F-Droid', 'Obtainium', 'Google Play'];

/** What a reader sees of the acquisition section, per language. */
const ACQUISITION = {
  en: {
    heading: 'How to get it',
    action: 'Start journal',
    status: 'Not available yet.',
    channelsPending: 'each becomes a link as it goes live',
  },
  pl: {
    heading: 'Skąd je wziąć',
    action: 'Otwórz dziennik',
    status: 'Jeszcze niedostępne.',
    channelsPending: 'Aplikacji na Androida jeszcze nie ma.',
  },
};

const buildDirectory = fileURLToPath(new URL('../build', import.meta.url));
const { server, base } = await serveBuild(buildDirectory);
const browser = await launchChromium();
const { ok, fail, finish } = createReporter();

const tests = [];
const test = (name, run) => tests.push({ name, run });

/** One visitor: their browser language, their system colour scheme, and
    whether scripting works for them at all. */
async function visitor({ locale = 'en-US', colorScheme = 'light', javaScriptEnabled = true }) {
  const context = await browser.newContext({ locale, colorScheme, javaScriptEnabled });

  /* Records the theme the document was painted in at its first frame. A theme
     applied after hydration would be recorded here as the wrong one, which is
     the flash a person would have seen. */
  await context.addInitScript(() => {
    requestAnimationFrame(() => {
      Object.assign(window, {
        firstFrameTheme: getComputedStyle(document.documentElement)
          .getPropertyValue('--theme')
          .trim(),
      });
    });
  });

  const page = await context.newPage();
  const requests = [];
  page.on('request', (request) => requests.push(request.url()));
  return { context, page, requests };
}

/** What the visitor is looking at: the theme the cascade settled on, whichever
    of the media query or a stored choice decided it. */
const themeNow = (page) =>
  page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--theme').trim(),
  );

/** The theme at the first frame. The wait matters: `load` can fire before the
    first frame has been produced. */
async function firstFrameTheme(page) {
  await page.waitForFunction(() => window.firstFrameTheme !== undefined);
  return page.evaluate(() => window.firstFrameTheme);
}

const documentLanguage = (page) => page.evaluate(() => document.documentElement.lang);

/** The acquisition section, found by the heading a reader sees rather than by
    its position among the sections or by a class name. */
const acquisitionSection = (page, locale) =>
  page.locator('section').filter({
    has: page.getByRole('heading', { name: ACQUISITION[locale].heading }),
  });

/** Presses Tab until the named control holds focus, and says whether it ever
    did. Reaching a control this way is the claim - that somebody arriving by
    keyboard alone gets there - which `.focus()` would assume rather than test.
    Focus is dropped first so that each call means "reachable from the top of
    the document" rather than "reachable from wherever the last one stopped".
    The cap is a runaway guard, not a budget: the header has few stops. */
async function tabTo(page, name, limit = 20) {
  await page.evaluate(() => document.activeElement?.blur());
  for (let i = 0; i < limit; i++) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return '';
      return (el.getAttribute('aria-label') || el.textContent || '').trim();
    });
    if (focused === name) return true;
  }
  return false;
}

/** How far a page spills past the viewport sideways. Zero is the only passing
    answer, and base.css deliberately declines to clip overflow at the body so
    that this measurement can still see a layout that broke. */
const sidewaysOverflow = (page) =>
  page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

/** The contrast ratios the palette produces, read from the page rather than
    from the stylesheet, so a token that moved is measured where it lands.
    Also reports whether the two gradient-painted headings are still large
    enough to be judged against the looser large-text bar. */
async function contrastTokens(page) {
  return page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);

    /* Painted rather than parsed, and that is the whole point of it. Reading
       the digits out of a serialised colour is only safe while every colour
       serialises as `rgb(0-255)`, and this palette's do not: a resolved
       `color-mix(in srgb, ...)` comes back as `color(srgb 0.87 0.92 0.95)` and
       a resolved `color-mix(in oklab, ...)` as `oklab(0.36 0.03 -0.02)`, both
       on scales a 0-255 reader turns into approximately black. Every token
       defined as a mix - --outline, --outline-strong, --accent-ink, the ink
       field's own secondary text - was measured as black on its own
       background, which failed absurdly in one theme and passed for entirely
       the wrong reason in the other.

       So the browser is asked to paint the colour and the pixel is read back.
       One code path for every colour space, now and for whatever the palette
       is written in later. */
    const paintToRgb = (value) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      /* A sentinel first, because an unparseable fillStyle is ignored rather
         than thrown: without this, a colour canvas cannot read would silently
         measure as the previous fill and the test would pass on a colour that
         is not on the page. */
      context.fillStyle = '#000000';
      context.fillStyle = value;
      if (context.fillStyle === '#000000' && !/^(#000000|rgb\(0, 0, 0\)|black)$/.test(value)) {
        throw new Error(`canvas could not read the colour ${value}`);
      }
      context.fillRect(0, 0, 1, 1);
      const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
      return [r, g, b];
    };

    /* Resolves any CSS colour to rgb by letting the browser do it, in two
       steps: an element resolves the var() references and the cascade, then
       the canvas above resolves the colour space. A token that got renamed
       resolves to the empty string, which would silently inherit some other
       colour and quietly pass, so it throws instead. */
    const colorToRgb = (value) => {
      if (!value) throw new Error('a colour token resolved to nothing; was one renamed?');
      const probe = document.createElement('span');
      probe.style.color = value;
      document.body.append(probe);
      const rgb = getComputedStyle(probe).color;
      probe.remove();
      return paintToRgb(rgb);
    };

    const luminance = ([r, g, b]) => {
      const channel = (n) => {
        const v = n / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };

    const ratio = (front, back) => {
      const [bright, dark] = [luminance(front), luminance(back)].sort((a, b) => b - a);
      return (bright + 0.05) / (dark + 0.05);
    };

    const token = (name) => root.getPropertyValue(name).trim();
    const bg = colorToRgb(token('--bg'));
    const surface = colorToRgb(token('--surface'));
    const surface2 = colorToRgb(token('--surface-2'));
    const text = colorToRgb(token('--text'));
    const text2 = colorToRgb(token('--text-2'));
    const accent = colorToRgb(token('--accent'));
    const accentInk = colorToRgb(token('--accent-ink'));
    const onAccent = colorToRgb(token('--on-accent'));
    /* The two ink fields, which are the same values in both themes by design
       (base.css: ink does not change with the paper). Measured in both runs
       anyway, because a test that trusts a comment is not a test. */
    const fieldRose = colorToRgb(token('--field-rose'));
    const fieldBlue = colorToRgb(token('--field-blue'));
    const onField = colorToRgb(token('--on-field'));

    /* Nothing on this page is painted through a gradient any more, so nothing
       claims the 3:1 large-text bar on the strength of being display-sized.
       Every pair below is body text against its own ground at 4.5:1. This
       list is the reason the redesign could drop the scrim: with the aura
       gone, what is behind a word is a token again. */
    return {
      textOnBg: ratio(text, bg),
      text2OnBg: ratio(text2, bg),
      textOnSurface: ratio(text, surface),
      text2OnSurface: ratio(text2, surface),
      textOnSurface2: ratio(text, surface2),
      text2OnSurface2: ratio(text2, surface2),
      onAccentOnAccent: ratio(onAccent, accent),
      onAccentOnAccentInk: ratio(onAccent, accentInk),
      accentInkOnBg: ratio(accentInk, bg),
      onFieldOnRose: ratio(onField, fieldRose),
      onFieldOnBlue: ratio(onField, fieldBlue),
    };
  });
}

// Language: where a first visit lands

for (const [locale, expected] of [
  ['en-US', 'en'],
  ['pl-PL', 'pl'],
  ['de-DE', 'en'],
]) {
  test(`a first visit from ${locale} lands on /${expected}/`, async () => {
    const { context, page } = await visitor({ locale });
    try {
      await page.goto(`${base}/`);
      await page.waitForURL(`${base}/${expected}/`);
      assert.equal(await documentLanguage(page), expected);
    } finally {
      await context.close();
    }
  });
}

test('each language is a stable location that serves itself', async () => {
  const { context, page } = await visitor({ locale: 'de-DE' });
  try {
    for (const locale of ['en', 'pl']) {
      const response = await page.goto(`${base}/${locale}/`);
      assert.equal(response.status(), 200);
      assert.equal(page.url(), `${base}/${locale}/`, 'a direct visit is not redirected away');
      assert.equal(await documentLanguage(page), locale);
      assert.equal(await page.locator('main h1').innerText(), SITE_NAME[locale]);
    }
  } finally {
    await context.close();
  }
});

test('each language points at the other one and at the gateway', async () => {
  /* Scripting off, so the gateway can be read rather than redirecting out from
     under the assertions. These are static tags either way. */
  const { context, page } = await visitor({ javaScriptEnabled: false });
  try {
    for (const [path, canonical] of [
      ['/en/', `${SITE_ORIGIN}/en/`],
      ['/pl/', `${SITE_ORIGIN}/pl/`],
      ['/', `${SITE_ORIGIN}/`],
    ]) {
      await page.goto(base + path);
      const alternates = await page.evaluate(() =>
        Object.fromEntries(
          [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((link) => [
            link.getAttribute('hreflang'),
            link.getAttribute('href'),
          ]),
        ),
      );
      assert.deepEqual(alternates, {
        en: `${SITE_ORIGIN}/en/`,
        pl: `${SITE_ORIGIN}/pl/`,
        'x-default': `${SITE_ORIGIN}/`,
      });
      assert.equal(await page.getAttribute('link[rel=canonical]', 'href'), canonical);
    }
  } finally {
    await context.close();
  }
});

// Language: the visible control, and what it leaves behind

test('the language control switches language and is remembered', async () => {
  const { context, page } = await visitor({ locale: 'en-US' });
  try {
    await page.goto(`${base}/en/`);
    await page.getByRole('link', { name: 'Polski' }).click();
    await page.waitForURL(`${base}/pl/`);
    assert.equal(await documentLanguage(page), 'pl');

    // The browser still asks for English; the choice made here outranks it.
    await page.goto(`${base}/`);
    await page.waitForURL(`${base}/pl/`);
  } finally {
    await context.close();
  }
});

test('reading a link to the other language is not a choice to switch', async () => {
  const { context, page } = await visitor({ locale: 'en-US' });
  try {
    await page.goto(`${base}/en/`);
    await page.getByRole('link', { name: 'Polski' }).click();
    await page.waitForURL(`${base}/pl/`);

    // Somebody sends this person an English link. Reading it must not throw
    // away the Polish they chose.
    await page.goto(`${base}/en/`);
    await page.goto(`${base}/`);
    await page.waitForURL(`${base}/pl/`);
  } finally {
    await context.close();
  }
});

// Theme: where a first visit starts, and the control that overrides it

for (const scheme of ['dark', 'light']) {
  test(`a first visit with a ${scheme} system theme starts ${scheme}`, async () => {
    const { context, page } = await visitor({ colorScheme: scheme });
    try {
      await page.goto(`${base}/en/`);
      assert.equal(await firstFrameTheme(page), scheme);
      assert.equal(await themeNow(page), scheme);
    } finally {
      await context.close();
    }
  });
}

test('the theme control overrides the system theme and is remembered', async () => {
  const { context, page } = await visitor({ colorScheme: 'light' });
  try {
    await page.goto(`${base}/en/`);
    await page.getByRole('switch', { name: 'Light' }).click();
    assert.equal(await themeNow(page), 'dark');

    await page.reload();
    assert.equal(await themeNow(page), 'dark');
    await page.waitForLoadState('networkidle');
    assert.equal(
      await page.getByRole('switch', { name: 'Dark' }).getAttribute('aria-checked'),
      'true',
      'the control showed a different choice than the page was using',
    );

    // And it travels with the person to the other language, same origin.
    await page.goto(`${base}/pl/`);
    assert.equal(await themeNow(page), 'dark');
  } finally {
    await context.close();
  }
});

test('a reload with a stored dark choice never paints light', async () => {
  const { context, page } = await visitor({ colorScheme: 'light' });
  try {
    await page.goto(`${base}/en/`);
    await page.getByRole('switch', { name: 'Light' }).click();

    await page.reload();
    assert.equal(await firstFrameTheme(page), 'dark', 'the first frame after a reload was light');
    assert.equal(await themeNow(page), 'dark', 'the theme changed after the page painted');
  } finally {
    await context.close();
  }
});

test('the theme switch flips in both directions', async () => {
  const { context, page } = await visitor({ colorScheme: 'dark' });
  try {
    await page.goto(`${base}/en/`);
    await page.getByRole('switch', { name: 'Dark' }).click();
    assert.equal(await themeNow(page), 'light');

    await page.getByRole('switch', { name: 'Light' }).click();
    assert.equal(await themeNow(page), 'dark');
  } finally {
    await context.close();
  }
});

// Acquisition: one action, and honest status for everything else

for (const locale of ['en', 'pl']) {
  test(`${locale}: the actions on the page, and where each one goes`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);

      /* This list was [privacy, Journal] until ticket 09. The splash now
         shows the four channel badges as buttons pointing at this page, on
         Alicja's direction (2026-08-12): design the page as if the product
         were finished. Each badge gets its real destination when its channel
         has an artifact (Journal ticket 18). Start journal appears twice, at
         the top for someone arriving convinced and in the acquisition
         section for someone who has just read their way to a decision, and
         both carry the bare URL and nothing else. */
      const links = await page.locator('main a').evaluateAll((found) => found.map((a) => a.href));
      assert.deepEqual(
        links,
        [
          JOURNAL_URL,
          ...CHANNELS.map(() => `${base}/${locale}/`),
          `${base}/${locale}/privacy/`,
          JOURNAL_URL,
        ],
        'main offered something besides the splash actions, the privacy page and Start journal',
      );

      const actions = page.getByRole('link', { name: ACQUISITION[locale].action });
      assert.equal(await actions.count(), 2, 'Start journal is the splash action and the closing one');
      for (const action of await actions.all()) {
        assert.equal(
          await action.getAttribute('href'),
          JOURNAL_URL,
          'the Journal link carries something it should not, or points somewhere else',
        );
        assert.equal(await action.getAttribute('target'), null, 'the action opened a second tab');
      }
    } finally {
      await context.close();
    }
  });

  test(`${locale}: a channel that is not live is status text, never a link`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);
      const section = acquisitionSection(page, locale);

      /* The sentence the whole section stands on. Four channels listed
         while none is live would read as an offer with nothing behind it,
         so the copy says out loud that each becomes a link as it goes live
         (the Polish still says there is no Android app, pending Alicja's
         translation pass). Asserted here because every other assertion
         below still passes with it deleted. */
      assert.ok(
        (await section.innerText()).includes(ACQUISITION[locale].channelsPending),
        'the page listed Android channels without saying they are not live yet',
      );

      const entries = section.getByRole('listitem');
      assert.equal(await entries.count(), CHANNELS.length, 'the channel list changed length');

      /* No channel is live: Journal ticket 18 is what produces the artifacts.
         When one of them goes live, this loop grows its other branch, and that
         branch asserts the rendered href resolves to the application ID
         `dev.barankiewicz.genderdiary` rather than to some other package. */
      for (const [index, name] of CHANNELS.entries()) {
        const entry = entries.nth(index);
        const text = await entry.innerText();
        assert.ok(text.startsWith(name), `channel ${index + 1} was not ${name}`);
        assert.ok(
          text.includes(ACQUISITION[locale].status),
          `${name} did not say whether it works yet`,
        );
        assert.equal(
          await entry.getByRole('link').count(),
          0,
          `${name} rendered as a link while there is nothing behind it`,
        );
      }
    } finally {
      await context.close();
    }
  });

  test(`${locale}: Aurora names the Play build and Obtainium names its source`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);
      const entries = acquisitionSection(page, locale).getByRole('listitem');

      const aurora = await entries.nth(CHANNELS.indexOf('Aurora')).innerText();
      assert.ok(
        aurora.includes('Google Play'),
        'Aurora was described without saying which build it installs',
      );

      /* The source, and only the source. Obtainium's artifact-name matching is
         deliberately not on the page: how to point a package manager at a
         repository is that package manager's documentation, and this section
         is about the product. */
      const obtainium = await entries.nth(CHANNELS.indexOf('Obtainium')).innerText();
      assert.ok(obtainium.includes('GitHub'), 'Obtainium was described without naming its source');
    } finally {
      await context.close();
    }
  });

  test(`${locale}: Google Play is listed last, and the page says why`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);
      const section = acquisitionSection(page, locale);

      /* The opinion is the point of the ordering, so a silent reorder back to
         alphabetical has to fail here rather than pass quietly. */
      const entries = section.getByRole('listitem');
      const last = await entries.nth(CHANNELS.length - 1).innerText();
      assert.ok(last.startsWith('Google Play'), 'Google Play was not the last channel listed');

      const play = await entries.nth(CHANNELS.indexOf('Google Play')).innerText();
      assert.ok(
        play.includes('Google'),
        'the Play entry did not say what installing from Play tells Google',
      );
    } finally {
      await context.close();
    }
  });
}

// Isolation: what the site writes, and what it talks to

test('the site keeps to its own origin and its own storage', async () => {
  const { context, page, requests } = await visitor({ locale: 'pl-PL' });
  try {
    await page.goto(`${base}/`);
    await page.waitForURL(`${base}/pl/`);
    await page.getByRole('switch', { name: 'Jasny' }).click();
    await page.getByRole('link', { name: 'English' }).click();
    await page.waitForURL(`${base}/en/`);

    const foreign = requests.filter((url) => !url.startsWith(base));
    assert.deepEqual(foreign, [], 'the page requested something off this origin');

    /* Both instances of the one outbound link (the splash action and the
       acquisition section's, since ticket 09), and this is the list of them.
       A language or theme choice reaching the Journal would have to ride on
       an outbound link, so anyone adding another has to come here and say
       what it carries. This person chose dark and then English, and neither
       choice appears in what either link asks for. */
    const outbound = await page.evaluate(() =>
      [...document.querySelectorAll('a[href]')]
        .map((link) => link.href)
        .filter((href) => new URL(href).origin !== location.origin),
    );
    assert.deepEqual(outbound, [JOURNAL_URL, JOURNAL_URL]);

    assert.equal(await page.evaluate(() => document.cookie), '', 'the site set a cookie');
    assert.equal((await context.cookies()).length, 0);

    const keys = await page.evaluate(() => Object.keys(localStorage).sort());
    assert.deepEqual(keys, ['gd-landing-language', 'gd-landing-theme']);
  } finally {
    await context.close();
  }
});

// Layout: Polish runs longer than English, and no page may grow sideways

/* Ticket 09's acceptance: Polish text lengths do not break any layout. The
   measurable form of "broken" is a page wider than its viewport, which is
   why base.css deliberately does not clip overflow at the body - a clip
   there would hide from this loop the exact failure it exists to catch.
   Both languages run so a regression names the language it broke in. */
for (const locale of ['en', 'pl']) {
  test(`${locale}: no page grows wider than a phone`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.setViewportSize({ width: 390, height: 844 });
      for (const suffix of Object.values(PAGE_PATHS)) {
        await page.goto(`${base}/${locale}/${suffix}`);
        assert.equal(await sidewaysOverflow(page), 0, `/${locale}/${suffix} scrolls sideways at 390px`);
      }
    } finally {
      await context.close();
    }
  });
}

// Accessibility and keyboard use (ticket 10)

for (const locale of ['en', 'pl']) {
  test(`${locale}: keyboard can operate language and theme controls`, async () => {
    const { context, page } = await visitor({ locale: locale === 'pl' ? 'pl-PL' : 'en-US' });
    try {
      await page.goto(`${base}/${locale}/`);
      /* goto resolves on the load event, but the app hydrates through dynamic
         imports that finish after it, and until they do the theme buttons are
         on screen without their behaviour - app.html reveals them by setting
         data-js, which happens long before the component is listening. Waiting
         for the network to fall quiet waits for those imports. Without this the
         Space below lands on an inert button roughly one run in seven. */
      await page.waitForLoadState('networkidle');

      const oppositeLanguage = locale === 'en' ? 'Polski' : 'English';
      const expectedPath = locale === 'en' ? '/pl/' : '/en/';
      const lightLabel = locale === 'en' ? 'Light' : 'Jasny';

      /* The theme control goes first, on the page as it was loaded. Switching
         language is a full document load, and pressing a theme button on the
         far side of one races the script that gives it its behaviour: the
         button is on screen as soon as app.html sets data-js, but does not
         answer until the component has hydrated. That race belongs to the
         test, not to the person, so it is simply avoided here. */
      assert.ok(await tabTo(page, lightLabel), `Tab never reached the theme switch: ${lightLabel}`);

      const ring = await page.evaluate(() => {
        const style = getComputedStyle(document.activeElement);
        return { width: Number.parseFloat(style.outlineWidth), line: style.outlineStyle };
      });
      assert.ok(ring.width >= 1 && ring.line !== 'none', 'focused control had no visible focus ring');

      await page.keyboard.press('Space');
      assert.equal(await themeNow(page), 'dark', 'Space on the dark button did not apply dark');

      // Then the language link, whose whole point is that it navigates.
      assert.ok(await tabTo(page, oppositeLanguage), `Tab never reached: ${oppositeLanguage}`);
      await page.keyboard.press('Enter');
      await page.waitForURL(`${base}${expectedPath}`);
    } finally {
      await context.close();
    }
  });

  test(`${locale}: landmarks and control names are meaningful to assistive tech`, async () => {
    const { context, page } = await visitor({ locale: locale === 'pl' ? 'pl-PL' : 'en-US' });
    try {
      await page.goto(`${base}/${locale}/`);
      /* Asked for by role and by name throughout, because that is the page as
         a screen reader receives it. A <header> that drifted inside a section
         would stop being a banner while still being a <header>, and querying
         the tag would keep passing; asking for the banner role does not. */
      const languageLabel = locale === 'en' ? 'Language' : 'Język';
      const themeLabel = locale === 'en' ? 'Theme' : 'Motyw';

      await page.getByRole('banner').waitFor();
      await page.getByRole('main').waitFor();

      assert.equal(
        await page.getByRole('navigation', { name: languageLabel }).count(),
        1,
        `no navigation region announces itself as ${languageLabel}`,
      );
      assert.equal(
        await page.getByRole('heading', { level: 1, name: SITE_NAME[locale] }).count(),
        1,
        'the page opens without a level-one heading a reader can land on',
      );

      // Both languages are offered by name, in their own language, on every page.
      for (const name of ['English', 'Polski']) {
        assert.equal(
          await page.getByRole('link', { name, exact: true }).count(),
          1,
          `no link offers the ${name} version by name`,
        );
      }

      const themeSwitch = page.getByRole('switch');
      assert.equal(await themeSwitch.count(), 1, `the theme switch was not exposed as one control`);
      assert.equal(
        await themeSwitch.getAttribute('aria-labelledby'),
        'theme-label',
        `the theme switch is not labelled by ${themeLabel}`,
      );
    } finally {
      await context.close();
    }
  });
}

/* Contrast is a property of the palette, not of the viewport: enlarging text
   cannot change what --ink over --page resolves to. So the ratios are checked
   once per theme, and the thing that enlarging text really does endanger -
   the layout - is checked separately below. */
for (const scheme of ['light', 'dark']) {
  test(`${scheme}: text holds its contrast against the surfaces behind it`, async () => {
    const { context, page } = await visitor({ colorScheme: scheme });
    try {
      await page.goto(`${base}/en/`);
      /* Read back the theme the cascade actually settled on. Without this the
         dark run would still pass having measured the light palette. */
      assert.equal(await themeNow(page), scheme, `asked for ${scheme} and got the other palette`);

      const ratios = await contrastTokens(page);
      for (const [pair, found] of Object.entries(ratios)) {
        assert.ok(found >= 4.5, `${pair} contrast too low: ${found.toFixed(2)}, needs 4.5`);
      }

      /* No 3:1 exemptions here, deliberately. The old page had two headings
         painted through a gradient and claiming the large-text bar their
         display size earned them; this one paints every word in a token and
         clears 4.5:1 for all of them, including the two headings, so there is
         no size threshold left for a later edit to quietly fall below. */
    } finally {
      await context.close();
    }
  });
}

test('reduced motion disables the moving parts rather than shortening them', async () => {
  const { context, page } = await visitor({});
  try {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${base}/en/`);

    /* Motion is only observable as computed style, so this test reads style
       where the others read behaviour. What it asks for is still addressed by
       role and name wherever a role exists; the motif is decorative and
       aria-hidden, so it has no accessible name to ask for and stays a
       class. */
    const heading = page.getByRole('heading', { level: 1, name: SITE_NAME.en });
    const action = page.getByRole('link', { name: ACQUISITION.en.action }).first();
    const channel = page.getByRole('link', { name: CHANNELS[0], exact: true }).first();

    const animationOf = (locator) =>
      locator.evaluate((node) => getComputedStyle(node).animationName);
    const transitionOf = (locator) =>
      locator.evaluate((node) => getComputedStyle(node).transitionProperty);

    const reduced = {
      hero: await animationOf(heading),
      sun: await page.locator('.splash .sun').evaluate((node) => getComputedStyle(node).animationName),
      /* Counted, not read: with reduced motion the band is not in the document
         at all, so there is no element to compute a style on. */
      bands: await page.locator('.rule .band').count(),
      ctaTransition: await transitionOf(action),
      badgeTransition: await transitionOf(channel),
    };

    assert.equal(reduced.hero, 'none', 'the wordmark still runs its entrance with reduced motion');
    /* Both infinite loops, and both must be off rather than fast. A 1ms
       infinite loop is a strobe, which is the failure mode this pair exists
       to catch. */
    assert.equal(reduced.sun, 'none', 'the motif still breathes with reduced motion');
    assert.equal(reduced.bands, 0, 'the ambient band is still rendered with reduced motion');
    assert.ok(
      !reduced.ctaTransition.includes('transform'),
      'CTA still transitions transform with reduced motion',
    );
    assert.ok(
      !reduced.badgeTransition.includes('transform'),
      'badge still transitions transform with reduced motion',
    );

    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator('.rule .band').first().waitFor({ timeout: 5000 });
    const animated = await page.evaluate(() => ({
      hero: getComputedStyle(document.querySelector('main h1')).animationName,
      sun: getComputedStyle(document.querySelector('.splash .sun')).animationName,
      band: getComputedStyle(document.querySelector('.rule .band')).animationName,
    }));

    assert.ok(animated.hero.includes('rise'), 'the wordmark entrance did not return with motion allowed');
    assert.ok(
      animated.sun.includes('breathe'),
      `the motif did not start breathing with motion allowed: ${animated.sun}`,
    );
    assert.ok(animated.band.includes('cross'), 'the ambient band did not travel with motion allowed');
  } finally {
    await context.close();
  }
});

// Without scripting

test('without scripting the page reads, in the system theme', async () => {
  const { context, page } = await visitor({
    locale: 'pl-PL',
    colorScheme: 'dark',
    javaScriptEnabled: false,
  });
  try {
    await page.goto(`${base}/pl/`);
    assert.equal(await documentLanguage(page), 'pl');
    /* One more section than there are headings: the features act is split in
       two by the privacy act that interrupts it, and the continuation carries
       no heading of its own. */
    assert.equal(await page.locator('main section').count(), sectionHeadings('pl').length + 1);
    assert.equal(await themeNow(page), 'dark', 'a dark system theme got a light page');
    assert.equal(
      await page.locator('.theme-control').isVisible(),
      false,
      'a theme control that cannot work was left on screen',
    );
    assert.equal(
      await page
        .getByRole('link', { name: ACQUISITION.pl.action })
        .first()
        .getAttribute('href'),
      JOURNAL_URL,
      'the splash action needed scripting to work',
    );

    await page.getByRole('link', { name: 'English' }).click();
    await page.waitForURL(`${base}/en/`);
    assert.equal(await documentLanguage(page), 'en');

    // The gateway is a page with two links when nothing can redirect from it.
    await page.goto(`${base}/`);
    assert.equal(await page.getByRole('link', { name: 'Polski' }).count(), 1);
  } finally {
    await context.close();
  }
});

// Crawl policy: what sits beside the pages (ticket 14)

/* The page list, derived a second time from the built files. The derivation
   is the same shape the generator uses, so a bug in the shape itself would
   pass both sides; what this catches is a sitemap gone stale, or a generator
   that stopped running or skipped a page. */
async function builtPagePaths() {
  const entries = await readdir(buildDirectory, { recursive: true });
  return entries
    .filter((entry) => entry.split('/').pop() === 'index.html')
    .filter((entry) => !entry.split('/').includes('_app'))
    .map((entry) => '/' + entry.slice(0, -'index.html'.length))
    .sort();
}

/** Rewrites build/ into one flavour or the other, with the same script
    `npm run build` ends on. The script is deterministic, so flipping back
    restores exactly what the build produced. */
const crawlPolicy = (flavour) =>
  execFileSync(process.execPath, ['scripts/crawl-policy.mjs'], {
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    env: { ...process.env, SITE_ENV: flavour },
  });

const NOINDEX = '<meta name="robots" content="noindex">';

const fetchText = async (path) => {
  const response = await fetch(base + path);
  return { status: response.status, body: response.ok ? await response.text() : '' };
};

test('a build not marked production is excluded from indexing', async () => {
  crawlPolicy('preview');

  for (const path of await builtPagePaths()) {
    const { body } = await fetchText(path);
    assert.ok(body.includes(NOINDEX), `${path} was served without a noindex`);
  }

  const robots = await fetchText('/robots.txt');
  assert.equal(robots.status, 200, 'a preview build shipped without a robots policy');
  assert.ok(!robots.body.includes('Sitemap:'), 'a preview build advertised a sitemap');
  assert.ok(
    !/^Disallow: \/$/m.test(robots.body),
    'the preview blocked crawling, which would hide the noindex that does the excluding',
  );

  assert.equal((await fetchText('/sitemap.xml')).status, 404, 'a preview build kept a sitemap');
});

test('a production build is indexable, sitemap and robots in agreement', async () => {
  try {
    crawlPolicy('production');

    // The worse direction of the two: production carrying the exclusion.
    for (const path of await builtPagePaths()) {
      const { body } = await fetchText(path);
      assert.ok(!/noindex/.test(body), `${path} carried a noindex into production`);
    }

    const robots = await fetchText('/robots.txt');
    assert.equal(robots.status, 200, 'production shipped without a robots policy');
    assert.ok(!/^Disallow: \/$/m.test(robots.body), 'production robots.txt blocked crawling');
    assert.ok(
      robots.body.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`),
      'robots.txt does not point at the sitemap',
    );

    const sitemap = await fetchText('/sitemap.xml');
    assert.equal(sitemap.status, 200, 'production build has no sitemap');
    const listed = [...sitemap.body.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, url]) => url).sort();

    // Exactly the pages the built site has, on the production origin,
    // and never with a language missing.
    assert.deepEqual(
      listed,
      (await builtPagePaths()).map((path) => SITE_ORIGIN + path),
    );
    for (const locale of ['en', 'pl']) {
      assert.ok(listed.includes(`${SITE_ORIGIN}/${locale}/`), `the sitemap lost /${locale}/`);
    }

    // Agreement the way a crawler sees it: everything listed is served.
    for (const url of listed) {
      const { status } = await fetchText(url.slice(SITE_ORIGIN.length));
      assert.equal(status, 200, `${url} is in the sitemap but not in the build`);
    }
  } finally {
    // Leave build/ the way `npm run build` produced it.
    crawlPolicy('preview');
  }
});

// The copy: what publishes, what stays staged, and what it says

/** The landing page's section headings, by what the section is. Named rather
    than positional, the way CHANNELS.indexOf is used above, so that inserting
    a section does not silently retarget the locator that finds another one.
    Acquisition keeps its heading in ACQUISITION, where it already was. */
const HEADINGS = {
  en: {
    overview: 'What enGender is',
    privacy: "What it protects, and what it doesn't",
    tour: 'The screens',
    features: 'What it does',
    acquisition: ACQUISITION.en.heading,
    support: 'Support',
  },
  pl: {
    overview: 'Czym jest Gender Diary',
    privacy: 'Co chroni, a czego nie',
    tour: 'Ekrany',
    features: 'Co potrafi',
    acquisition: ACQUISITION.pl.heading,
    support: 'Pomoc',
  },
};

/** The order a reader meets them in, at the level each one is set. Written out
    rather than counted, so that a section quietly disappearing fails here and
    names itself.

    Ticket 03 reordered this and changed one level. Privacy moved from third to
    fourth: it used to be one handoff paragraph two sections above eight
    placeholder frames, and it is a full act now that lands immediately before
    the careful controls, so the threat model is read before the controls that
    answer it. And "the screens" stopped being a section of its own - the eight
    frames moved into the feature groups they illustrate - so its heading is
    now the frame disclosure inside the features act, one level down. */
const SECTION_ORDER = ['overview', 'features', 'privacy', 'acquisition', 'support'];
const sectionHeadings = (locale) => SECTION_ORDER.map((section) => HEADINGS[locale][section]);

/** The privacy page's own title, which is also the text of the link the
    landing page offers to it. */
const PRIVACY_TITLE = {
  en: 'What enGender protects, and what it does not',
  pl: 'Co Gender Diary chroni, a czego nie chroni',
};

/** The hero headline, which is the one piece of the overview copy that is not
    inside a section and so is not covered by the heading assertions. */
const HEADLINE = {
  en: 'A transition journal that stays on your device.',
  pl: 'Dziennik tranzycji, który zostaje na twoim urządzeniu.',
};

/** The opening of the at-rest encryption block, and the fallback wording the
    old claim gating used to publish in its place. The English page publishes
    the real block since redesign ticket 02 (the claim's gate test passed in
    the Journal repository and the v10 doctrine writes from the spec); the
    Polish page still carries the fallback until Alicja's translation pass.
    Naming both sentences here means an edit that swaps them has to come
    through this file. */
const AT_REST_OPENING = { en: 'What is covered.', pl: 'Co obejmuje.' };
const ENCRYPTION_FALLBACK = {
  en: 'The journal is not encrypted where it is stored, yet.',
  pl: 'Dziennik nie jest jeszcze szyfrowany tam, gdzie jest zapisany.',
};

/** The eight screens of the visual tour, by the name each caption is filed
    under in the copy files. Ticket 09 makes the screenshots. */
const TOUR = {
  en: [
    'Home',
    'An entry',
    'The month',
    'One day, twice',
    'Search',
    'Six months of one scale',
    'Milestones',
    'Export',
  ],
  pl: [
    'Ekran główny',
    'Wpis',
    'Miesiąc',
    'Jeden dzień, dwa wpisy',
    'Wyszukiwanie',
    'Pół roku jednej skali',
    'Kamienie milowe',
    'Eksport',
  ],
};

/* The paths `pathFor` builds in src/lib/site.ts, written out a second time
   here for the same reason SITE_ORIGIN and JOURNAL_URL are: a test that
   imported the thing it is checking would agree with a wrong answer. Adding a
   page means adding it in both places. */
const PAGE_PATHS = { landing: '', privacy: 'privacy/' };

/** Both pages of one language, as the words a visitor can read on them. */
async function readSite(page, locale) {
  const text = {};
  for (const [name, suffix] of Object.entries(PAGE_PATHS)) {
    await page.goto(`${base}/${locale}/${suffix}`);
    text[name] = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
  }
  return text;
}

for (const locale of ['en', 'pl']) {
  test(`${locale}: a staged block never reaches a page`, async () => {
    const { context, page } = await visitor({});
    try {
      const text = await readSite(page, locale);
      const site = `${text.landing} ${text.privacy}`;

      const staged = Object.keys(PAGE_PATHS).flatMap((name) =>
        copyBlocks(locale, name)
          .filter((block) => !block.publishes)
          .map((block) => ({ ...block, name })),
      );
      assert.ok(staged.length > 0, 'no staged blocks were found, so this proved nothing');

      /* Sentence by sentence as well as whole paragraph, because a block that
         published half of itself published half of itself. The floor keeps a
         fragment too short to be distinctive from failing this on a collision
         with unrelated copy, and the count afterwards is what stops the floor
         swallowing a whole paragraph and reporting a pass. */
      for (const block of staged) {
        for (const paragraph of block.paragraphs) {
          let checked = 0;
          for (const sentence of [paragraph, ...sentences(paragraph)]) {
            if (sentence.length < 20) continue;
            checked++;
            assert.ok(
              !site.includes(sentence),
              `${block.name}: a sentence gated on "${block.marker.split('.')[0]}" is on the site: ${sentence}`,
            );
          }
          assert.ok(checked > 0, `${block.name}: nothing was long enough to check in: ${paragraph}`);
        }
      }
    } finally {
      await context.close();
    }
  });

  test(`${locale}: every shipped block is on its page, word for word`, async () => {
    /* Scripting off, so this is also the check that the copy is in the file a
       visitor is served rather than something hydration puts there. */
    const { context, page } = await visitor({ javaScriptEnabled: false });
    try {
      const text = await readSite(page, locale);

      for (const name of Object.keys(PAGE_PATHS)) {
        const shipped = copyBlocks(locale, name).filter((block) => block.publishes);
        assert.ok(shipped.length > 0, `no shipped blocks in content/${locale}/${name}.md`);

        for (const block of shipped) {
          for (const paragraph of block.paragraphs) {
            assert.ok(
              text[name].includes(paragraph),
              `${name}: shipped copy is missing or reworded: ${paragraph.slice(0, 70)}`,
            );
          }
        }
      }
    } finally {
      await context.close();
    }
  });

  test(`${locale}: the landing page renders every section`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);
      /* `section h2` rather than `section > h2` since ticket 17: the heading
         moved into the sticky rail, so it is no longer a direct child of its
         section. It is still the only h2 a section has, and still the words a
         reader sees at the top of one. */
      const headings = await page
        .locator('main section h2')
        .evaluateAll((found) => found.map((h) => h.textContent.trim()));
      assert.deepEqual(headings, sectionHeadings(locale));

      /* The screens' heading is still on the page and still says what it says;
         it introduces the frames from inside the features act rather than
         heading a section of its own. */
      assert.equal(
        await page.locator('.screens-note h3').innerText(),
        HEADINGS[locale].tour,
        'the frame disclosure lost its heading',
      );

      assert.equal(await page.locator('main h1').innerText(), SITE_NAME[locale]);
      assert.ok(
        (await page.locator('main').innerText()).includes(HEADLINE[locale]),
        'the hero headline is not on the page',
      );
    } finally {
      await context.close();
    }
  });

  test(`${locale}: the tour is eight captions and no picture`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);

      /* The captions are distributed across the feature groups they
         illustrate, so they are collected from the page rather than from one
         section, and compared as a set: their document order is that
         distribution and not the catalogue's own order. */
      const screens = await page
        .locator('.frames h4')
        .evaluateAll((found) => found.map((h) => h.textContent.trim()));
      assert.deepEqual([...screens].sort(), [...TOUR[locale]].sort());

      /* The screenshots do not exist yet: each card reserves the frame its
         screenshot will occupy, and ticket 06 captures them from invented
         data. Until it does, no card shows a picture or an alt text claiming
         one - the frame is inked in its own flag instead, which is decoration
         and carries no alt text to mistake for a caption. */
      assert.equal(await page.locator('.frames img').count(), 0, 'a frame claimed a picture');
    } finally {
      await context.close();
    }
  });

  test(`${locale}: the privacy page is its own indexable location`, async () => {
    /* Scripting off: the second page has to be reachable and readable without
       it, like the first. */
    const { context, page } = await visitor({ javaScriptEnabled: false });
    try {
      await page.goto(`${base}/${locale}/`);
      await page.getByRole('link', { name: PRIVACY_TITLE[locale] }).click();
      await page.waitForURL(`${base}/${locale}/privacy/`);

      assert.equal(await documentLanguage(page), locale);
      assert.equal(await page.locator('main h1').innerText(), PRIVACY_TITLE[locale]);

      const alternates = await page.evaluate(() =>
        Object.fromEntries(
          [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((link) => [
            link.getAttribute('hreflang'),
            link.getAttribute('href'),
          ]),
        ),
      );
      assert.deepEqual(alternates, {
        en: `${SITE_ORIGIN}/en/privacy/`,
        pl: `${SITE_ORIGIN}/pl/privacy/`,
        'x-default': `${SITE_ORIGIN}/en/privacy/`,
      });
      assert.equal(
        await page.getAttribute('link[rel=canonical]', 'href'),
        `${SITE_ORIGIN}/${locale}/privacy/`,
      );
    } finally {
      await context.close();
    }
  });

  test(`${locale}: the privacy page tells the truth about at-rest encryption`, async () => {
    /* The one place the two languages deliberately disagree mid-rebrand: the
       English page publishes the real at-rest block, the Polish still carries
       the not-encrypted-yet fallback until Alicja's translation pass. Each
       language asserts its own state AND the other's absence, because a page
       carrying both would contradict itself in front of somebody deciding
       what to trust. */
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/privacy/`);
      const text = await page.locator('main').innerText();

      if (locale === 'en') {
        assert.ok(
          text.includes(AT_REST_OPENING.en),
          'the English privacy page does not carry the at-rest encryption block',
        );
        assert.ok(
          !text.includes(ENCRYPTION_FALLBACK.en),
          'the English privacy page still says the journal is not encrypted',
        );
      } else {
        assert.ok(
          text.includes(ENCRYPTION_FALLBACK.pl),
          'the Polish privacy page did not carry the fallback encryption wording',
        );
        assert.ok(
          !text.includes(AT_REST_OPENING.pl),
          'the Polish at-rest block reached the page ahead of its translation',
        );
      }
    } finally {
      await context.close();
    }
  });
}

test('switching language on the privacy page stays on the privacy page', async () => {
  const { context, page } = await visitor({ javaScriptEnabled: false });
  try {
    await page.goto(`${base}/en/privacy/`);
    await page.getByRole('link', { name: 'Polski' }).click();
    await page.waitForURL(`${base}/pl/privacy/`);
    assert.equal(await documentLanguage(page), 'pl');
    assert.equal(await page.locator('main h1').innerText(), PRIVACY_TITLE.pl);

    // And back out to the landing page in the language the reader is now in.
    await page.getByRole('link', { name: 'Gender Diary' }).click();
    await page.waitForURL(`${base}/pl/`);
  } finally {
    await context.close();
  }
});

/* Until redesign ticket 02 the two languages were asserted to gate the same
   blocks in the same order. That parity is broken on purpose mid-rebrand: the
   English copy is rewritten for enGender and the Polish waits for Alicja's own
   translation pass. When the Polish lands, restore the assertion:

     for (const name of Object.keys(PAGE_PATHS)) {
       const gates = (locale) => copyBlocks(locale, name).map((block) => block.publishes);
       assert.deepEqual(gates('pl'), gates('en'));
     }
*/

// The head: a search result, a history entry, a link preview (ticket 07)

/* Every URL the site serves as a page, including the language gateway, which
   is a page for exactly this purpose: it is what a preview is built from when
   somebody pastes the origin. Written out rather than derived, like the paths
   above, so that a page arriving without metadata fails here by name. */
const HEAD_PAGES = ['/', '/en/', '/pl/', '/en/privacy/', '/pl/privacy/'];

/** The title of each page, character for character. These are short on
    purpose and ticket 07 settled that they stay short: a title is the one
    piece of metadata a reader did not ask for, since it lands in their
    history, their tabs, their bookmarks and the first line of any preview.
    So it carries the product's name, and on the privacy page that page's own
    heading, and nothing about what kind of app this is. */
const TITLES = {
  '/': SITE_NAME.en,
  '/en/': SITE_NAME.en,
  '/pl/': SITE_NAME.pl,
  '/en/privacy/': PRIVACY_TITLE.en,
  '/pl/privacy/': PRIVACY_TITLE.pl,
};

/** The description of each page, character for character. This is where the
    words a person searches with live, because a description is shown in a
    search result and in a preview a sender chose to send, and never in a
    history entry. The gateway carries the English landing page's, which is
    the page a visitor asking for neither language is about to be sent to. */
const DESCRIPTIONS = {
  '/en/':
    'A journal for tracking gender transition. An entry holds a mood, a note, tags, photos and your own scales. It stays on your device, and there is no account.',
  '/pl/':
    'Dziennik tranzycji. We wpisie mieści się nastrój, notatka, tagi, zdjęcia i skale, które nazywasz po swojemu. Zostaje na twoim urządzeniu, konta nie zakładasz.',
  '/en/privacy/':
    'Where your journal is, what app lock does and does not do, what encryption at rest covers and leaves out, and what a web host can see.',
  '/pl/privacy/':
    'Gdzie jest twój dziennik, co daje blokada aplikacji i czego nie daje, czego aplikacja jeszcze nie szyfruje i co widzi serwer WWW.',
};
DESCRIPTIONS['/'] = DESCRIPTIONS['/en/'];

/** What a title may not say, in either language. Spec story 37: reading about
    this product should not announce itself in a browser history. The name is
    the name and the URL says it too, so the claim is not that a title hides
    anything; it is that a title adds nothing the name already gives away. The
    words below are what an SEO pass would put in a title and what this site
    puts in a description instead. */
const NOT_IN_A_TITLE = [
  /* "trans" covers "transition" as well, and "tranzycj" is here because the
     Polish word does not start with it. */
  'trans',
  'tranzycj',
  'journal',
  'dziennik',
  'mood',
  'nastrój',
  'hrt',
  'hormon',
  'queer',
  'lgbt',
];

/** The social card, as src/lib/site.ts declares it. Written out a second time
    for the reason SITE_ORIGIN is: a test that imported the declaration would
    agree with a wrong one. The picture is local, and the size is asserted
    against the file rather than taken from the tags. */
const SOCIAL_CARD = { url: `${SITE_ORIGIN}/social-card.png`, width: 1200, height: 630 };

/** Keys and values structured data on this site may never contain, whatever
    the schema vocabulary offers. There is no rating, no offer, no price, no
    review and no count of anything, so a machine-readable listing that
    carried one would be an invention in the format most likely to be
    believed. `author` and `publisher` are here too: the site names nobody,
    which is its own decision about its author and not an oversight. */
const NOT_IN_STRUCTURED_DATA = [
  'rating',
  'review',
  'offer',
  'price',
  'aggregate',
  'author',
  'publisher',
  'testimonial',
  'interactioncount',
  'downloadcount',
  'installcount',
];

/** Every meta tag on a page, keyed by whichever of `property` and `name` it
    used, so that og: tags and the plain description read the same way. */
const metaTags = (page) =>
  page.evaluate(() =>
    Object.fromEntries(
      [...document.querySelectorAll('meta[name], meta[property]')].map((tag) => [
        tag.getAttribute('property') ?? tag.getAttribute('name'),
        tag.getAttribute('content'),
      ]),
    ),
  );

test('every page has its own title and description, in the file as served', async () => {
  /* Scripting off throughout this section: a search engine reading the file
     and a chat client building a preview do not run scripts, and the gateway
     would otherwise redirect out from under the assertions. */
  const { context, page } = await visitor({ javaScriptEnabled: false });
  try {
    for (const path of HEAD_PAGES) {
      await page.goto(base + path);
      assert.equal(await page.title(), TITLES[path], `${path}: wrong title`);

      const description = (await metaTags(page)).description;
      assert.equal(description, DESCRIPTIONS[path], `${path}: wrong description`);
      /* A search result shows about 160 characters and cuts the rest. The
         ceiling is here so that an edit which overflows it is a failure with
         the sentence in the message rather than a truncation somebody
         notices in a live result. */
      assert.ok(
        description.length <= 160,
        `${path}: the description is ${description.length} characters and a search result shows about 160`,
      );
    }
  } finally {
    await context.close();
  }
});

test('no title says what kind of app this is', async () => {
  const { context, page } = await visitor({ javaScriptEnabled: false });
  try {
    for (const path of HEAD_PAGES) {
      await page.goto(base + path);
      /* The product's name is allowed to be the product's name. What the
         test looks at is everything else in the title. */
      const beyondTheName = (await page.title())
        .replaceAll('Gender Diary', '')
        .replaceAll('enGender', '')
        .toLowerCase();
      for (const word of NOT_IN_A_TITLE) {
        assert.ok(
          !beyondTheName.includes(word),
          `${path}: the title says "${word}", which a browser history then says for the reader`,
        );
      }
    }
  } finally {
    await context.close();
  }
});

test('a shared link previews as this app, from a picture on this origin', async () => {
  const { context, page } = await visitor({ javaScriptEnabled: false });
  try {
    for (const path of HEAD_PAGES) {
      await page.goto(base + path);
      const tags = await metaTags(page);
      const locale = path.startsWith('/pl/') ? 'pl' : 'en';

      assert.deepEqual(
        {
          type: tags['og:type'],
          siteName: tags['og:site_name'],
          title: tags['og:title'],
          description: tags['og:description'],
          url: tags['og:url'],
          locale: tags['og:locale'],
          alternate: tags['og:locale:alternate'],
          image: tags['og:image'],
          width: tags['og:image:width'],
          height: tags['og:image:height'],
          card: tags['twitter:card'],
        },
        {
          type: 'website',
          siteName: SITE_NAME[locale],
          title: TITLES[path],
          description: DESCRIPTIONS[path],
          url: SITE_ORIGIN + path,
          locale: locale === 'pl' ? 'pl_PL' : 'en_GB',
          alternate: locale === 'pl' ? 'en_GB' : 'pl_PL',
          image: SOCIAL_CARD.url,
          width: String(SOCIAL_CARD.width),
          height: String(SOCIAL_CARD.height),
          card: 'summary_large_image',
        },
        `${path}: the preview a link builds is wrong`,
      );

      /* The alt text is the picture's, in the reader's language, and the
         picture is on this origin. A card image from anywhere else would be
         the site's first third-party resource. */
      assert.ok(
        tags['og:image:alt']?.includes(SITE_NAME[locale]),
        `${path}: the card's alt text does not name the app as this language knows it`,
      );
      assert.ok(
        tags['og:image'].startsWith(SITE_ORIGIN + '/'),
        `${path}: the card image is not served from this origin`,
      );
    }
  } finally {
    await context.close();
  }
});

test('the social card is a real picture of the size its tags claim', async () => {
  const { context, page } = await visitor({});
  try {
    const response = await page.goto(`${base}/social-card.png`);
    assert.equal(response.status(), 200, 'the social card is not in the build');
    assert.equal(response.headers()['content-type'], 'image/png');

    /* Decoded rather than measured from the file: og:image:width and
       og:image:height are what a preview lays the card out with, and a
       picture that is not that size is laid out wrong. */
    await page.goto(`${base}/en/`);
    const decoded = await page.evaluate(
      (url) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
          image.onerror = () => reject(new Error('the social card did not decode as an image'));
          image.src = url;
        }),
      `${base}/social-card.png`,
    );
    assert.deepEqual(decoded, { width: SOCIAL_CARD.width, height: SOCIAL_CARD.height });
  } finally {
    await context.close();
  }
});

test('structured data describes the app, and claims nothing the page does not', async () => {
  const { context, page } = await visitor({ javaScriptEnabled: false });
  try {
    for (const locale of ['en', 'pl']) {
      await page.goto(`${base}/${locale}/`);
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((found) => found.map((script) => script.textContent));
      assert.equal(blocks.length, 1, `/${locale}/: expected exactly one JSON-LD block`);

      const data = JSON.parse(blocks[0]);
      /* Exhaustive on purpose: the assertion is as much about what is absent
         as about what is here, and a property added without a sentence on the
         page behind it fails this rather than passing a subset check. */
      assert.deepEqual(data, {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: SITE_NAME[locale],
        url: JOURNAL_URL,
        description: DESCRIPTIONS[`/${locale}/`],
        inLanguage: ['en', 'pl'],
      });

      /* Belt as well as braces, and the braces are the comparison above: a
         property added anywhere in the block, at any depth, is read against
         the list of what this site may not say about itself. */
      const seen = JSON.stringify(data).toLowerCase();
      for (const word of NOT_IN_STRUCTURED_DATA) {
        assert.ok(!seen.includes(word), `/${locale}/: the structured data mentions "${word}"`);
      }
    }

    /* The pages that describe no application carry no listing for one. The
       privacy page says what the app does not do, and the gateway shows a
       name and two links. */
    for (const path of ['/', '/en/privacy/', '/pl/privacy/']) {
      await page.goto(base + path);
      assert.equal(
        await page.locator('script[type="application/ld+json"]').count(),
        0,
        `${path}: this page describes no application, so it should carry no listing for one`,
      );
    }
  } finally {
    await context.close();
  }
});

// What a word is actually painted on (ticket 17, kept and re-aimed by ticket 03)

/* This was written for the aurora: a page-wide drifting layer meant a
   paragraph sat on --page plus whatever had wandered behind it, and a test
   that read the palette could not see that. Ticket 03 deleted the aurora and
   with it the scrim that held text legible over it, so the token ratios above
   are the whole story again for most of the page.

   The pass stays, and it is doing more work than before rather than less. The
   redesign puts running text on two full-bleed ink fields and on the app's
   card surfaces, which means the answer to "what is behind this word" is now a
   question about composition rather than about one page colour: a paragraph
   that drifts out of its field, a heading that lands on a raw flag stripe, or
   a knocked-out warning that loses its block would all read perfectly in the
   tokens and fail on the page.

   Every string is painted transparent, the viewport is photographed, and the
   pixels where the text was are measured against the colour that text is
   really painted in. What comes back is the actual background behind every
   word: page, card surface, ink field and all.

   The decode happens on about:blank rather than on the site, because the
   screenshot arrives as a data: URL and this site's own policy is
   img-src 'self'. That is the policy working, not a problem with it. */

/** The elements a reader reads. Asked for by tag rather than by role, because
    the question is the same for a heading and for a list item - what colour is
    behind this ink - and it has to be asked of every string on the page rather
    than of the named ones. */
const TEXT_PROBE = 'main h2, main h3, main p, main li, main a, main strong, main span';

/** WCAG's bar for the size the text actually is: 3:1 once it is large, 4.5:1
    otherwise. Large is 24px at any weight, or 18.66px once bold. */
const contrastFloor = ({ px, bold }) => (px >= 24 || (px >= 18.66 && bold) ? 3 : 4.5);

/** Waits for the page to be laid out and painted again. Two frames rather
    than one: the first lets a style change take effect, the second lets the
    compositor hand back something stable to measure or photograph. */
const nextFrame = (page) =>
  page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );

/** A page on about:blank whose only job is to decode screenshots and read
    pixels out of them. */
async function pixelDecoder() {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('about:blank');
  return { page, close: () => context.close() };
}

/** Walks a page from top to bottom a screen at a time and reports every text
    element whose contrast against its own background falls under the bar. */
async function backgroundFailures(page, decoder) {
  /* The splash entrance runs for 0.7s behind a delay of up to 0.44s, and it
     animates opacity. Measuring through it reads a half-faded control against
     the page and calls that a contrast failure, which photographs the page
     arriving rather than the page.

     Only the clock-driven animations are waited on. A scroll-driven one is
     finished when the reader has scrolled past it and not before, so awaiting
     those hangs until the timeout: they are excluded by their timeline rather
     than by their duration. They need no wait anyway, because at a fixed
     scroll position they resolve to the same frame every time. */
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        const onClock = document
          .getAnimations()
          .filter((animation) => animation.timeline === document.timeline)
          .filter((animation) => animation.effect?.getTiming().iterations !== Infinity);
        Promise.allSettled(onClock.map((animation) => animation.finished)).then(resolve);
      }),
  );

  const viewport = page.viewportSize();
  const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round(viewport.height * 0.85);
  const failures = [];

  for (let pass = 0, top = 0; top < documentHeight; pass++, top += step) {
    await page.evaluate((y) => window.scrollTo(0, y), top);
    /* Style attributes rather than an injected stylesheet, throughout this
       function. The site's policy is style-src 'self', so a stylesheet added
       from here is blocked - correctly, and tests/policy.test.mjs is what
       keeps it that way. Attributes are the one loosening the policy makes,
       for ticket 09's staggered entrance, and they are enough here. */
    await page.evaluate(() => {
      /* The reveals come off entirely rather than being paused, because what
         is being measured is the page a person reads and a reveal is a thing
         that happens on the way to it. Frozen half way through, a reveal is
         a section at 40% opacity washed out toward the page colour, and the
         measurement then reports a contrast failure about a frame nobody
         reads. Removing the animation leaves each element in its own settled
         state, which is what `.reveal` styles as: the motion only ever takes
         it away and gives it back.

         It also fixes the rectangles. A scrubbed reveal moves its element by
         up to 1.5rem, so measuring on one frame and photographing on the next
         samples a point that has since slid onto the next paragraph. */
      for (const node of document.querySelectorAll('main, main *')) {
        node.style.animationName = 'none';
      }
    });
    await nextFrame(page);

    /* The measurements are taken before the ink is hidden, so each probe
       carries the colour the text is really painted in. */
    const probes = await page.evaluate((selector) => {
      const found = [];
      /* The header is sticky, so the top band of the viewport belongs to it
         and not to whatever has scrolled underneath. Clamping a probe to the
         viewport without clamping it to this instead samples the header's own
         text, which is ink on ink and reports 1.00 for a paragraph that is
         perfectly readable where a reader actually reads it. */
      const header = document.querySelector('header').getBoundingClientRect().bottom;
      for (const node of document.querySelectorAll(selector)) {
        /* Only elements holding text of their own. A <section> wrapping three
           paragraphs would otherwise be measured across its whole area,
           including the gaps between them. */
        const ownText = [...node.childNodes].some(
          (child) => child.nodeType === 3 && child.textContent.trim(),
        );
        if (!ownText) continue;

        const rect = node.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8) continue;
        if (rect.bottom <= header || rect.top >= window.innerHeight) continue;

        const style = getComputedStyle(node);
        /* Text painted in no colour of its own has nothing to measure. The
           redesign has none - the two gradient-clipped headings this guard was
           written for are gone - and it stays as the guard rather than as a
           special case, because the failure it prevents is a divide by a
           colour that is not there. */
        if (/,\s*0\)$/.test(style.color)) continue;

        /* An element's own borders are not the background behind its text.
           `.more` still hangs from a 2px rule in its own colour, and the
           channel rows and feature groups are separated by hairlines.
           Sampling those measures ink against a line and reports about 2 for
           a link that reads perfectly. */
        const edge = (side) => Number.parseFloat(style[`border${side}Width`]) + 1;
        const x = Math.max(0, rect.x) + edge('Left');
        const y = Math.max(header, rect.y) + edge('Top');
        const box = {
          x,
          y,
          w: Math.min(rect.right, window.innerWidth) - x - edge('Right'),
          h: Math.min(rect.bottom, window.innerHeight) - y - edge('Bottom'),
        };
        /* What is left after the header band and the borders have been taken
           off has to still be a box. An element sliding under the sticky
           header leaves a sliver, and a sliver of negative height samples
           points above its own top edge, which is how a link came to be
           measured against its own underline. */
        if (box.w < 8 || box.h < 8) continue;

        found.push({
          color: style.color,
          px: Number.parseFloat(style.fontSize),
          bold: Number.parseInt(style.fontWeight, 10) >= 700,
          what: `${node.tagName.toLowerCase()}: ${node.textContent.trim().slice(0, 40)}`,
          rect: box,
        });
      }
      return found;
    }, TEXT_PROBE);

    if (probes.length === 0) continue;

    /* The ink comes off so the camera sees only what is behind it, and goes
       back on straight afterwards so the next pass can read the colours
       again. Nothing on this site carries an inline colour of its own, so
       clearing the property restores the stylesheet's. */
    const paintText = (visible) =>
      page.evaluate((show) => {
        for (const node of document.querySelectorAll('main *')) {
          node.style.color = show ? '' : 'transparent';
          node.style.webkitTextFillColor = show ? '' : 'transparent';
        }
      }, visible);

    await paintText(false);
    /* The screenshot does not wait for a frame of its own, so without this the
       camera catches the page as it was, every sample lands on a letter, and
       the measurement quietly reports the ink's contrast against itself. The
       check below is what stops that failing silently if it comes back. */
    await nextFrame(page);
    const stillPainted = await page.evaluate(() =>
      [...document.querySelectorAll('main *')].filter(
        (node) => !/,\s*0\)$/.test(getComputedStyle(node).color),
      ).length,
    );
    assert.equal(stillPainted, 0, 'the ink did not come off before the screenshot');

    const shot = (await page.screenshot()).toString('base64');
    await paintText(true);

    const measured = await decoder.evaluate(async ({ shot, probes }) => {
      const image = new Image();
      image.src = `data:image/png;base64,${shot}`;
      await image.decode();

      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(image, 0, 0);

      const channel = (n) => {
        const v = n / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
      const ratio = (front, back) => {
        const [bright, dark] = [luminance(front), luminance(back)].sort((a, b) => b - a);
        return (bright + 0.05) / (dark + 0.05);
      };

      /* The ink colour arrives as whatever the site serialised it to, which
         for anything defined as a mix is `color(srgb ...)` or `oklab(...)` on
         a 0-1 scale. Painted rather than parsed, for the reason written out in
         full at the token helper above. */
      const paintToRgb = (value) => {
        const swatch = document.createElement('canvas');
        swatch.width = 1;
        swatch.height = 1;
        const paint = swatch.getContext('2d', { willReadFrequently: true });
        paint.fillStyle = '#000000';
        paint.fillStyle = value;
        paint.fillRect(0, 0, 1, 1);
        const [r, g, b] = paint.getImageData(0, 0, 1, 1).data;
        return [r, g, b];
      };

      return probes.map((probe) => {
        const ink = paintToRgb(probe.color);
        /* It keeps well inside the box, which is not slack but accuracy. The
           question is what colour is behind the words, and an element's
           extreme edge is not behind its words: the corner of a 999px pill is
           outside the pill, the last row of `.more` is its pink underline and
           the first column of the support warning is its pink rule. Sampling
           those measures ink against ink and reports 1.02 for a control that
           the token ratios above already cover properly. */
        let worst = { ratio: Infinity, background: null };
        /* A grid rather than one central point, still. The aurora gradient was
           the original reason and it is gone, but a word can now sit near the
           edge of an ink field or a card, and the worst pixel under a wide
           paragraph is at one of its ends either way. */
        for (let i = 0; i <= 4; i++) {
          for (let j = 0; j <= 2; j++) {
            const x = Math.round(probe.rect.x + probe.rect.w * (0.1 + 0.2 * i));
            const y = Math.round(probe.rect.y + probe.rect.h * (0.3 + 0.2 * j));
            if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) continue;
            const [r, g, b] = context.getImageData(x, y, 1, 1).data;
            const found = ratio(ink, [r, g, b]);
            if (found < worst.ratio) worst = { ratio: found, background: `rgb(${r}, ${g}, ${b})` };
          }
        }
        return { ...probe, ...worst };
      });
    }, { shot, probes });

    for (const probe of measured) {
      const floor = contrastFloor(probe);
      if (probe.ratio < floor) {
        failures.push(
          `${probe.what} is ${probe.color} on ${probe.background}: ${probe.ratio.toFixed(2)}, needs ${floor}`,
        );
      }
    }
  }

  return failures;
}

/* Both themes, both text sizes, both pages. The privacy page carries the motif
   too, so the page a person opens while deciding whether to trust the app is
   measured the same way as the one that sent them there. */
for (const scheme of ['light', 'dark']) {
  for (const textSize of ['100%', '200%']) {
    test(`${scheme} at ${textSize}: every word holds contrast against what is behind it`, async () => {
      const { context, page } = await visitor({ colorScheme: scheme });
      const decoder = await pixelDecoder();
      try {
        await page.setViewportSize({ width: 1280, height: 900 });
        for (const suffix of Object.values(PAGE_PATHS)) {
          await page.goto(`${base}/en/${suffix}`);
          assert.equal(await themeNow(page), scheme, `asked for ${scheme} and got the other palette`);
          await page.evaluate((size) => {
            document.documentElement.style.fontSize = size;
          }, textSize);

          const failures = await backgroundFailures(page, decoder.page);
          assert.deepEqual(failures, [], `/en/${suffix} at ${textSize} in ${scheme}`);
        }
      } finally {
        await decoder.close();
        await context.close();
      }
    });
  }
}

// The motion system (ticket 17)

/* Motion is only observable as computed style, so these read style where the
   rest of the file reads behaviour. What they are protecting is a claim the
   ticket makes twice: a Chromium visitor gets the whole thing with scripting
   switched off, and somebody who asked for reduced motion gets a finished
   page with nothing moving on it rather than a page missing its parts. */

/** The computed value of one property on the first match. */
const styleOf = (page, selector, property) =>
  page.evaluate(
    ([selector, property]) => getComputedStyle(document.querySelector(selector))[property],
    [selector, property],
  );

test('scroll-driven motion runs with scripting switched off', async () => {
  /* No JavaScript at all: no hydration, no reveal.ts, nothing but the file the
     host served and the stylesheet it links. Everything asserted below is
     therefore CSS doing it. */
  const { context, page } = await visitor({ javaScriptEnabled: false });
  try {
    await page.goto(`${base}/en/`);

    /* The pinned sideways pan is gone with the strip that needed it. What is
       scroll-driven now is the flag rail down the margin, which fills as the
       page is read - and like the pan it is CSS, so it works here with no
       script to start it. */
    assert.ok(
      /fill/.test(await styleOf(page, '.rail', 'animationName')),
      'the flag rail did not fill without scripting',
    );

    const reveals = await page
      .locator('.reveal')
      .evaluateAll((found) => found.map((node) => getComputedStyle(node).animationName));
    assert.ok(reveals.length >= 8, `only ${reveals.length} items were set up to reveal`);
    assert.ok(
      reveals.every((name) => name === 'rise'),
      'some items were not revealing without scripting',
    );

    /* The motif without scripting is the motif holding still: the app's
       default flag, correctly stacked, no cycle and no breathing. It is not a
       degraded state and it is not an empty box, which is what the old
       stroke's <canvas>-based alternative would have been. */
    const rings = await page
      .locator('.splash .sun i')
      .evaluateAll((found) => found.map((node) => getComputedStyle(node).backgroundColor));
    assert.equal(rings.length, 7, `the motif did not render without scripting: ${rings.length} rings`);
    assert.equal(
      rings[0],
      'rgb(91, 206, 250)',
      `the motif is not the trans flag without scripting: ${rings[0]}`,
    );
    assert.equal(
      await styleOf(page, '.splash .sun', 'animationName'),
      'none',
      'the motif is breathing without scripting, which nothing can have started',
    );

  } finally {
    await context.close();
  }
});

test('the reveals are per item rather than per section', async () => {
  /* The failure this exists for is the one ticket 17 was written about: the
     class sitting on whole <section> elements, where a 600px block sliding
     24px is invisible by construction and the page reads as still. */
  const { context, page } = await visitor({});
  try {
    await page.goto(`${base}/en/`);

    const sections = await page
      .locator('main section')
      .evaluateAll((found) => found.map((node) => getComputedStyle(node).animationName));
    assert.ok(
      sections.every((name) => name === 'none'),
      'a whole section is still being revealed as one lump',
    );

    /* And they are staggered against each other, which for a scrubbed
       animation means their ranges are offset rather than their delays. */
    const ranges = await page
      .locator('.entries .reveal')
      .evaluateAll((found) => found.map((node) => getComputedStyle(node).animationRangeStart));
    assert.ok(ranges.length >= 4, `only ${ranges.length} feature entries reveal`);
    assert.ok(
      new Set(ranges).size > 1,
      `every item reveals at the same point, so nothing is staggered: ${ranges[0]}`,
    );
  } finally {
    await context.close();
  }
});

test('reduced motion removes the pinning and the loops, and finishes the page', async () => {
  const { context, page } = await visitor({});
  try {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${base}/en/`);

    /* The rail is not rendered at all rather than parked full: it tracks the
       scrollbar, so it is movement tied to reading, and somebody who asked for
       less of that asked for less of this. */
    assert.equal(
      await styleOf(page, '.rail', 'display'),
      'none',
      'the flag rail is still shown with reduced motion',
    );
    /* And the band is not in the document either, so there is nothing frozen
       part way across a rule. */
    assert.equal(
      await page.locator('.rule .band').count(),
      0,
      'the travelling band is still rendered with reduced motion',
    );

    /* The motif is finished rather than absent: every ring painted, correctly
       stacked, simply not moving. The two infinite loops stop outright rather
       than being clamped short, because a 1ms infinite loop is a strobe. */
    assert.equal(
      await styleOf(page, '.splash .sun', 'animationName'),
      'none',
      'the motif still breathes with reduced motion',
    );

    const stillRings = await page
      .locator('.splash .sun i')
      .evaluateAll((found) =>
        found.map((node) => ({
          colour: getComputedStyle(node).backgroundColor,
          transition: getComputedStyle(node).transitionProperty,
        })),
      );
    assert.equal(stillRings.length, 7, 'the motif lost rings with reduced motion');
    assert.equal(
      stillRings[0].colour,
      'rgb(91, 206, 250)',
      `the motif is not resting on the trans flag: ${stillRings[0].colour}`,
    );
    assert.ok(
      stillRings.every((ring) => !ring.transition.includes('transform')),
      'a ring still transitions transform with reduced motion',
    );

    const reveals = await page
      .locator('.reveal')
      .evaluateAll((found) =>
        found.map((node) => ({
          animation: getComputedStyle(node).animationName,
          opacity: getComputedStyle(node).opacity,
        })),
      );
    assert.ok(
      reveals.every((item) => item.animation === 'none' && item.opacity === '1'),
      'an item is still revealing, or was left invisible, with reduced motion',
    );
  } finally {
    await context.close();
  }
});

test('the hand-rolled fallback stands down where the CSS works', async () => {
  /* reveal.ts exists for browsers without scroll-driven animations. Where
     they are supported it must do nothing at all, or an element gets moved
     twice: once by the scrubbed animation and once by a transition. */
  const { context, page } = await visitor({});
  try {
    await page.goto(`${base}/en/`);
    await page.waitForLoadState('networkidle');

    assert.ok(
      await page.evaluate(() => CSS.supports('animation-timeline', 'view()')),
      'this browser cannot scrub, so the assertion below proves nothing',
    );
    assert.equal(
      await page.locator('[data-reveal]').count(),
      0,
      'the fallback marked elements in a browser whose CSS already reveals them',
    );
  } finally {
    await context.close();
  }
});

test('the hand-rolled fallback reveals items in a browser that cannot scrub', async () => {
  /* The other half of the test above, and the only way to reach it here:
     Chromium can scrub, so reveal.ts stands down and its actual behaviour
     would never run in this suite. Telling the page that one feature query
     answers no is enough to take the branch a Safari or Firefox visitor
     takes, without pretending to be either. */
  const { context, page } = await visitor({});
  try {
    await context.addInitScript(() => {
      const real = CSS.supports.bind(CSS);
      CSS.supports = (...query) =>
        query.some((part) => String(part).includes('animation-timeline')) ? false : real(...query);
    });
    await page.goto(`${base}/en/`);
    await page.waitForLoadState('networkidle');

    const waiting = page.locator('[data-reveal="pending"]');
    assert.ok(
      (await waiting.count()) > 0,
      'the fallback marked nothing, so nothing below the fold would ever arrive',
    );

    /* Nothing already on screen is touched, because hiding what somebody is
       reading so it can fade back in is a flash in their face. */
    const aboveTheFold = await page.evaluate(() =>
      [...document.querySelectorAll('[data-reveal="pending"]')].filter(
        (node) => node.getBoundingClientRect().top < window.innerHeight,
      ).length,
    );
    assert.equal(aboveTheFold, 0, 'the fallback hid something the reader could already see');

    /* A handle rather than the locator. `[data-reveal="pending"]` stops
       matching the moment the thing arrives, so a locator re-resolves to the
       next element still waiting and the assertion below would be about a
       different paragraph than the one that was scrolled to. */
    const first = await waiting.first().elementHandle();
    await first.scrollIntoViewIfNeeded();
    await first.evaluate(
      (node) =>
        new Promise((resolve) => {
          if (node.dataset.reveal === 'in') return resolve(true);
          new MutationObserver((_, observer) => {
            if (node.dataset.reveal !== 'in') return;
            observer.disconnect();
            resolve(true);
          }).observe(node, { attributes: true, attributeFilter: ['data-reveal'] });
        }),
    );
    assert.equal(
      await first.getAttribute('data-reveal'),
      'in',
      'an item scrolled into view never arrived',
    );
  } finally {
    await context.close();
  }
});

for (const locale of ['en', 'pl']) {
  test(`${locale}: no caption is cut off at 200% text on a phone`, async () => {
    /* The pinned sideways strip is gone (ticket 03): eight placeholder frames a
       reader had to scroll horizontally through before meeting anything they
       illustrated, held at one window's height and clipped. The clip was the
       hazard - clipping the vertical axis as well cut 463px of English and
       415px of Polish off the bottom of every card at 200% text on a 390px
       screen, at exactly the text size somebody picks because they need it.

       The frames sit in the feature groups they belong to now, in an ordinary
       grid with nothing clipping them, so this measures the thing that
       actually mattered: is every caption's text inside its own element, and
       is every frame inside the document. */
    const { context, page } = await visitor({});
    try {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${base}/${locale}/`);
      await page.evaluate(() => {
        document.documentElement.style.fontSize = '200%';
      });
      await nextFrame(page);

      const cut = await page.evaluate(() =>
        [...document.querySelectorAll('.frames li')]
          .map((item) => {
            const caption = item.querySelector('p');
            return {
              screen: item.querySelector('h4').textContent,
              /* Overflowing its own box is the failure a clip would cause. */
              hidden: Math.round(caption.scrollHeight - caption.clientHeight),
            };
          })
          .filter((item) => item.hidden > 1),
      );
      assert.deepEqual(cut, [], `/${locale}/ cuts a caption off at 200% text`);

      const frames = await page.locator('.frames li').count();
      assert.equal(frames, 8, `/${locale}/ renders ${frames} frames, expected all eight`);
    } finally {
      await context.close();
    }
  });
}

/* The motif (ticket 03). The flag sun replaces the hero stroke: the app's own
   home-screen motif, one concentric ring per stripe, cycling all eight flags.

   Three things about it can fail silently, and each has a test below. The ring
   stacking can invert, which paints one flat disc instead of a flag and looks
   deliberate. The stripe values can drift from the app's, which is the one
   thing making the two products look related. And the cycle can stop, which
   nothing else on the page would reveal. */

/** The eight stripe sequences the motif must be painted in, copied from the
    Journal repository's `--motif-stripes` (its src/lib/theme/palettes.css) the
    same way $lib/flags.ts copies them. Written out a second time here on
    purpose: this is the test asserting the two repositories agree, so reading
    the values from the code under test would assert nothing at all. */
const FLAG_STRIPES = [
  ['#5BCEFA', '#F5A9B8', '#FFFFFF', '#F5A9B8', '#5BCEFA'],
  ['#FCF434', '#FFFFFF', '#9C59D1', '#2C2C2C'],
  ['#FF76A4', '#FFFFFF', '#C011D7', '#2F2F2F', '#2F3CBE'],
  ['#D60270', '#D60270', '#9B4F96', '#0038A8', '#0038A8'],
  ['#D52D00', '#FF9A56', '#FFFFFF', '#D362A4', '#A30262'],
  ['#FF218C', '#FFD800', '#21B1FF'],
  ['#E40303', '#FF8C00', '#FFED00', '#008026', '#004CFF', '#732982'],
  ['#1A1A1A', '#B9B9B9', '#FFFFFF', '#B9F484', '#FFFFFF', '#B9B9B9', '#1A1A1A'],
];

const hexToRgb = (hex) => [1, 3, 5].map((at) => Number.parseInt(hex.slice(at, at + 2), 16));
const asRgb = (hex) => `rgb(${hexToRgb(hex).join(', ')})`;

/** The rings of one motif, outermost first, as the browser resolved them. */
const ringsOf = (locator) =>
  locator.locator('i').evaluateAll((found) =>
    found.map((node) => {
      const style = getComputedStyle(node);
      return {
        colour: style.backgroundColor,
        scale: Number.parseFloat(style.transform.match(/matrix\(([\d.]+)/)?.[1] ?? '1'),
        z: Number.parseInt(style.zIndex, 10),
      };
    }),
  );

for (const scheme of ['light', 'dark']) {
  test(`${scheme}: the motif is the flag's own stripes, stacked largest first`, async () => {
    /* Stacking is the silent one. Ring 0 is the outermost and therefore the
       widest, so it has to paint underneath every ring inside it; reversed, it
       covers all seven and the motif is a single flat circle in one colour,
       which is exactly what this build shipped for one round. */
    const { context, page } = await visitor({ colorScheme: scheme });
    try {
      await page.goto(`${base}/en/`);
      assert.equal(await themeNow(page), scheme, `asked for ${scheme} and got the other palette`);
      await page.emulateMedia({ reducedMotion: 'reduce' });

      const sun = page.locator('.splash .sun');
      const rings = await ringsOf(sun);

      /* Seven, always, whichever flag is up: agender is the widest at seven
         stripes and the node count is fixed at that so a flag change animates
         colour and scale instead of adding and removing elements. */
      assert.equal(rings.length, 7, `the motif has ${rings.length} rings, expected 7`);

      for (const [index, ring] of rings.entries()) {
        if (index === 0) continue;
        assert.ok(
          ring.z > rings[index - 1].z,
          `ring ${index} paints under ring ${index - 1}, so the motif is one flat disc`,
        );
        assert.ok(
          ring.scale <= rings[index - 1].scale,
          `ring ${index} is wider than ring ${index - 1}`,
        );
      }

      /* Reduced motion holds it on the trans flag, which is the app's default
         palette, so the colours are known exactly. */
      const trans = FLAG_STRIPES[0];
      for (const [index, hex] of trans.entries()) {
        assert.equal(
          rings[index].colour,
          asRgb(hex),
          `ring ${index} is ${rings[index].colour}, expected the trans flag's ${hex}`,
        );
      }
      /* The two rings trans has no stripe for are scaled away, not left
         painting over the middle of the sun. */
      for (const ring of rings.slice(trans.length)) {
        assert.equal(ring.scale, 0, 'a ring with no stripe is still being painted');
      }

      /* The stripes are vivid and unmeasured on purpose, which is only safe
         because nothing reads on top of them. This is that rule as a test:
         the motif must not sit under any text. */
      const overlaps = await page.evaluate(() => {
        const box = document.querySelector('.splash .sun').getBoundingClientRect();
        const hits = [];
        for (const node of document.querySelectorAll('.splash h1, .splash p, .splash a')) {
          const rect = node.getBoundingClientRect();
          if (rect.right > box.left && rect.left < box.right && rect.bottom > box.top && rect.top < box.bottom) {
            hits.push(node.textContent.trim().slice(0, 40));
          }
        }
        return hits;
      });
      assert.deepEqual(overlaps, [], 'text is sitting on the raw flag stripes');
    } finally {
      await context.close();
    }
  });
}

test("the tour's eight frames carry the eight flags, one each", async () => {
  /* Eight captions, eight flags, and the pairing is the whole reason the
     frames are inked rather than grey. A frame following the shared cycle
     instead of its own flag would make the strip eight copies of one flag,
     which reads as a bug in the motif rather than as a decision. */
  const { context, page } = await visitor({});
  try {
    await page.goto(`${base}/en/`);
    await page.emulateMedia({ reducedMotion: 'reduce' });

    const frames = page.locator('.frames .frame .sun');
    assert.equal(await frames.count(), FLAG_STRIPES.length, 'there are not eight inked frames');

    /* The frames are distributed across the groups they illustrate rather than
       collected in one strip, and the order they appear in the document is the
       order of `m.tour`, so index i still carries flag i. */

    const seen = [];
    for (let index = 0; index < FLAG_STRIPES.length; index++) {
      const rings = await ringsOf(frames.nth(index));
      seen.push({
        lead: rings[0].colour,
        stripes: rings.filter((ring) => ring.scale > 0).length,
      });
    }

    /* As a set. The frames sit in the feature groups they illustrate, so their
       document order is that distribution and not the tour's own order; what
       matters is that all eight flags are used and none twice. */
    const want = FLAG_STRIPES.map((stripes) => `${asRgb(stripes[0])} x${stripes.length}`).sort();
    const got = seen.map((frame) => `${frame.lead} x${frame.stripes}`).sort();
    assert.deepEqual(got, want, 'the eight frames do not carry the eight flags one each');
  } finally {
    await context.close();
  }
});

test('the motif cycles the flags, and stops when it cannot be seen', async () => {
  /* The ambient loop. It is the one thing on this page that moves while a
     reader does nothing, so if it silently stopped, nothing else would say so.

     The second half is the rule from reference/animate.md that a nonessential
     loop stops when it is offscreen or hidden: a page left open in a
     background tab must not sit there repainting a sun nobody is looking at. */
  const { context, page } = await visitor({});
  try {
    await page.goto(`${base}/en/`);
    await page.waitForLoadState('networkidle');

    const sun = page.locator('.splash .sun');
    /* The loop starts when the motif's own IntersectionObserver reports it on
       screen, which is a frame or two after hydration rather than at load. */
    await sun.evaluate((node) =>
      new Promise((resolve, reject) => {
        if (node.classList.contains('moving')) return resolve();
        const observer = new MutationObserver(() => {
          if (node.classList.contains('moving')) {
            observer.disconnect();
            resolve();
          }
        });
        observer.observe(node, { attributes: true, attributeFilter: ['class'] });
        setTimeout(() => {
          observer.disconnect();
          reject(new Error('the motif never started moving'));
        }, 4000);
      }),
    );
    assert.ok(
      /breathe/.test(await sun.evaluate((node) => getComputedStyle(node).animationName)),
      'the motif is not breathing',
    );

    const first = (await ringsOf(sun))[0].colour;
    /* One period plus the outermost ring's own transition, which is the first
       to move because the wave crosses from the rim inward. */
    await new Promise((resolve) => setTimeout(resolve, 6800));
    const second = (await ringsOf(sun))[0].colour;
    assert.notEqual(second, first, `the motif did not change flag in one period, still ${first}`);

    /* Scrolled well past it, the cycle releases its timer. Read through the
       page's own count of live intervals rather than through the module, which
       a browser test cannot import. */
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await new Promise((resolve) => setTimeout(resolve, 300));
    const held = await ringsOf(sun);
    await new Promise((resolve) => setTimeout(resolve, 6800));
    assert.equal(
      (await ringsOf(sun))[0].colour,
      held[0].colour,
      'the motif kept cycling after scrolling out of view',
    );
  } finally {
    await context.close();
  }
});

test('one band travels the page, handed from one rule to the next', async () => {
  /* The first build gave every section rule its own band on its own loop,
     which is six unrelated things twitching at six phases rather than an
     ambient layer. There is one band on the page now: it crosses a rule,
     leaves, and appears in the next one down.

     So the assertion is about the count, not about one element's style. Exactly
     one band exists at a time, and over a couple of crossings it must have
     moved to a different rule. */
  const { context, page } = await visitor({});
  try {
    await page.goto(`${base}/en/`);
    await page.waitForLoadState('networkidle');

    const bands = page.locator('.rule .band');
    await bands.first().waitFor({ timeout: 5000 });
    assert.equal(await bands.count(), 1, 'more than one band is travelling at once');

    const ruleNow = () =>
      page.evaluate(() => {
        const rules = [...document.querySelectorAll('.rule')];
        return rules.findIndex((rule) => rule.querySelector('.band'));
      });
    const first = await ruleNow();
    assert.ok(first >= 0, 'no rule is carrying the band');

    /* One crossing is 4.2s; two of them is past the handoff whichever phase
       this started in. */
    await new Promise((resolve) => setTimeout(resolve, 9000));
    assert.notEqual(await ruleNow(), first, 'the band never moved to another rule');
    assert.equal(await bands.count(), 1, 'the handoff left more than one band behind');
  } finally {
    await context.close();
  }
});


for (const width of [390, 1280]) {
  test(`every pointer target clears 44px at ${width}px`, async () => {
    /* WCAG 2.5.5, and this repository's own floor: 44px, the web one. The app's
       48px is Android's and applies to the app.

       Written after the audit found five controls under it, all of them
       inherited from the previous design rather than introduced by the
       redesign: both halves of each switch at 30px, the theme switch itself at
       38, the privacy link at 32, the back link at 27. The badges were the
       instructive ones - they measured 44 exactly in the stylesheet and 43.98
       once laid out, which is not clearing a floor.

       Measured as laid out, at both widths, because padding counts and a
       control that fits on a desktop row can be squeezed on a phone. */
    const { context, page } = await visitor({});
    try {
      await page.setViewportSize({ width, height: 844 });
      for (const suffix of Object.values(PAGE_PATHS)) {
        await page.goto(`${base}/en/${suffix}`);
        await page.evaluate(() => document.fonts.ready);
        const small = await page.evaluate(() =>
          [...document.querySelectorAll('a, button, [role="button"], input, select, summary')]
            .map((node) => {
              const rect = node.getBoundingClientRect();
              return {
                what: `${node.tagName.toLowerCase()}.${String(node.className).split(' ')[0]}`,
                text: (node.textContent ?? '').trim().slice(0, 24),
                w: rect.width,
                h: rect.height,
              };
            })
            .filter((box) => (box.w > 0 || box.h > 0) && (box.w < 44 || box.h < 44))
            .map((box) => `${box.what} "${box.text}" is ${box.w.toFixed(1)}x${box.h.toFixed(1)}`),
        );
        assert.deepEqual(small, [], `/en/${suffix} at ${width}px has targets under 44px`);
      }
    } finally {
      await context.close();
    }
  });
}

test('pointer movement does not move the motif', async () => {
  /* The motif answers the clock and nothing else. A sun that tilted toward the
     pointer would be the one piece of motion on this page a reader could not
     escape by holding still, and it would be the first thing anybody reached
     for to make the splash livelier. */
  const { context, page } = await visitor({});
  try {
    await page.goto(`${base}/en/`);
    await page.waitForLoadState('networkidle');
    const ring = page.locator('.splash .sun i').first();
    const before = await ring.evaluate((node) => getComputedStyle(node).transform);

    await page.mouse.move(20, 100);
    await page.mouse.move(1200, 600);
    await new Promise((resolve) => setTimeout(resolve, 250));

    assert.equal(
      await ring.evaluate((node) => getComputedStyle(node).transform),
      before,
      'the motif follows the pointer',
    );
  } finally {
    await context.close();
  }
});

test('the motion system ships no animation runtime at all', async () => {
  /* Ticket 18 added motion.dev for one job, choreographing the hero stroke.
     Ticket 03's redesign has no stroke, and everything that replaced it - the
     flag cycle, the breathing sun, the travelling band, the reveals, the
     pinned pan - is CSS driven by tokens, plus one small hand-rolled
     IntersectionObserver for browsers that cannot scrub. So the dependency
     went with the stroke rather than being kept in case.

     This is a landing page whose whole argument is that the app holds nothing
     back. Shipping an animation library to slide some paragraphs upward would
     be the page contradicting itself in the network tab. */
  const manifest = JSON.parse(
    await readFile(fileURLToPath(new URL('../package.json', import.meta.url)), 'utf8'),
  );
  const runtime = Object.keys(manifest.dependencies ?? {}).sort();
  assert.deepEqual(runtime, [], 'expected no runtime dependencies at all');

  /* Matched whole, not as substrings. "motion" inside a package name catches
     half the ecosystem and "aos" catches any word containing it, and a test
     that fails on an innocent dependency gets deleted rather than fixed. */
  const banned = new Set([
    'gsap',
    'framer-motion',
    'animejs',
    'lenis',
    'aos',
    'lottie-web',
    '@rive-app/canvas',
    '@rive-app/webgl',
    '@lottiefiles/dotlottie-web',
  ]);
  for (const name of Object.keys(manifest.devDependencies ?? {})) {
    assert.ok(
      !banned.has(name),
      `${name} is an animation library, and this site animates itself in CSS`,
    );
  }
});

for (const { name, run } of tests) {
  try {
    await run();
    ok(name);
  } catch (error) {
    fail(name, error);
    if (process.env.VERBOSE) console.error(error);
  }
}

await browser.close();
server.close();
process.exit(finish('All landing-site browser tests passed'));
