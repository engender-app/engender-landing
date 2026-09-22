<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import ThemeControl from '$lib/ThemeControl.svelte';
  import FlagRail from '$lib/FlagRail.svelte';
  import Mark from '$lib/Mark.svelte';

  import { flagCycle } from '$lib/flagCycle.svelte';
  import { startReveals } from '$lib/reveal';
  import {
    LANGUAGE_KEY,
    LOCALES,
    PORTFOLIO_URL,
    SITE_ORIGIN,
    SOURCE_URL,
    defaultPathFor,
    messages,
    metaDescriptionFor,
    pathFor,
    socialTags,
    structuredDataScript,
    type Locale,
    type Page,
  } from '$lib/site';

  let {
    locale,
    page,
    title,
    children,
  }: { locale: Locale; page: Page; title: string; children: Snippet } = $props();

  const m = $derived(messages[locale]);
  const canonical = $derived(SITE_ORIGIN + pathFor(locale, page));
  const description = $derived(metaDescriptionFor(locale, page));

  /* The scroll reveals for browsers that cannot scrub them in CSS. It decides
     for itself whether there is anything to do, and returns the teardown.
     onMount rather than $effect because it reads the laid-out page once and
     has nothing to re-run for. One frame later so section offsets are taken
     from the settled layout and not from a pre-font first pass. */
  onMount(() => {
    let stop = () => {};
    const frame = requestAnimationFrame(() => {
      stop = startReveals();
    });
    return () => {
      cancelAnimationFrame(frame);
      stop();
    };
  });

  /* The action wears the live flag's own accent. Both themes' values are
     published and base.css picks between them, rather than this reading the
     theme: the theme can change without the flag changing, and an effect that
     had to watch both would be watching something that is only in the cascade.

     On the document rather than on the button, because both pages have chrome
     that reads them and the root is the one place they can be read from
     everywhere. */
  $effect(() => {
    const { light, dark } = flagCycle.flag.accent;
    const root = document.documentElement;
    root.style.setProperty('--flag-accent-light', light);
    root.style.setProperty('--flag-accent-dark', dark);
  });

  /* Only a person choosing a language is remembered, which is why this is on
     the click and not on the page. Opening somebody else's link to /en/ is not
     a decision to stop reading Polish, and it must not overwrite one. Without
     scripting the link still switches language; only the memory is lost. */
  function remember(chosen: Locale) {
    try {
      localStorage.setItem(LANGUAGE_KEY, chosen);
    } catch {
      /* storage unavailable, this choice simply is not remembered */
    }
  }
</script>

<svelte:head>
  <!-- The title is the page's own name and stays that short deliberately.
       It is the one piece of metadata a reader cannot avoid: it goes into a
       browser history entry, a tab, a bookmark and the top line of a
       preview, none of which they chose. So it says the product's name, or
       on the privacy page that page's own heading, and it does not say what
       kind of app this is. An SEO pass would want "a transition journal that
       stays on your device" up here, where the words a person searches with
       carry the most weight; that is the cost, and it is paid on purpose
       (spec story 37). The description below carries those words instead,
       because no browser ever puts a description in a history entry. -->
  <title>{title}</title>
  <meta name="description" content={description} />

  <link rel="canonical" href={canonical} />
  {#each LOCALES as alternate (alternate)}
    <link rel="alternate" hreflang={alternate} href={SITE_ORIGIN + pathFor(alternate, page)} />
  {/each}
  <!-- `defaultPathFor` explains why this is the English page rather than a
       language gateway for every page: `/` asks a browser what it reads and
       sends it on, and what it detects is a language, not a page. Ticket 07
       revisited that and kept it. A per-page gateway would be a second
       redirect for every page the site grows, and pointing a reader who
       asked for the privacy page at `/` would answer them with the landing
       page in a language they never picked. -->
  <link rel="alternate" hreflang="x-default" href={SITE_ORIGIN + defaultPathFor(page)} />

  {#each Object.entries(socialTags({ locale, url: canonical, title, description })) as [property, content] (property)}
    <meta {property} {content} />
  {/each}
  <!-- The one tag outside the Open Graph vocabulary, and it asks for a
       layout rather than naming anybody: Twitter reads the og: tags above
       for the words and the picture, and this says which of its two card
       shapes to build. There is no site or creator handle here, because the
       project has no account anywhere to name. -->
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Structured data goes where the page describes the app, and only there.
       The privacy page describes what the app does not do, which is not a
       software listing; a breadcrumb would be markup for a trail this site
       does not show a visitor. `structuredDataScript` carries the rest of the
       reasoning, including what the vocabulary offers that this page will
       not claim. -->
  {#if page === 'landing'}
    {@html structuredDataScript(locale)}
  {/if}
</svelte:head>

<!-- No page-wide ground layer any more. Ticket 09's aurora was a fixed wash
     of drifting blobs behind everything, which is why every block of text on
     the site needed a blurred veil of --bg between it and the glow. The flag
     sun replaces it: a motif with edges, placed by the page that wants it
     (the splash's corner, the privacy page's masthead), clipped by its own
     container, and never behind running text. So the veil is gone too, and
     the contrast numbers are the palette's own again rather than something
     measured through a scrim. -->

<!-- The flag standing on end down the left margin, filling as the page is
     read: a reading-progress rail that is also the trans flag. On both pages,
     because a rail that appeared on one of them would read as a fault on the
     other. -->
<FlagRail />

<main id="content">
  {@render children()}
</main>

<!-- The site's chrome, at the foot of the window and fixed there (Alicja's
     decision, 2026-08-28). It replaces a sticky header, and the reasoning is in
     base.css: the controls are things a reader reaches for after they have read
     something, and a header spent the top of every viewport on them - the most
     valuable band on a page whose first screen is a dictionary entry.

     In the document after `main`, which is also the order somebody tabbing
     through the page should meet it. -->
<footer class="bar">
  <!-- The mark and the site's name, on every page. On any page that is not
       the landing page it is also the way back, which is why it says the
       site's name rather than a word like "back": it says where it goes and
       needs no translation of its own. On the landing page it is not a link,
       because a link to the page you are on is furniture, but it is still
       drawn - a site with no mark anywhere on its first screen is what this
       looked like for one round.

       An <img> rather than inline SVG, so the file this site serves and the
       file the app generates are the same bytes and cannot drift. The mark is
       its own drawing in fixed colours, it is aria-hidden because the name
       beside it already says what it says, and nothing animates it. -->
  {#if page === 'landing'}
    <span class="brand">
      <img class="brand-mark" src="/mark.svg" alt="" aria-hidden="true" width="28" height="28" />
      {m.pageTitle}
    </span>
  {:else}
    <a class="brand" href={pathFor(locale)}>
      <img class="brand-mark" src="/mark.svg" alt="" aria-hidden="true" width="28" height="28" />
      {m.pageTitle}
    </a>
  {/if}

  <a class="bar-link" href={pathFor(locale, 'guide-getting-started')}>{m.footer.guide}</a>
  <a class="bar-link" href={PORTFOLIO_URL} rel="noopener">{m.footer.portfolio}</a>
  <a class="bar-link" href={SOURCE_URL} rel="noopener">
    <Mark name="github" size="1.05em" />
    github
  </a>

  <span class="bar-rights">{m.footer.rights}</span>

  <span class="bar-spacer" aria-hidden="true"></span>

  <nav class="control language-control" aria-label={m.languageLabel} data-locale={locale}>
    <span class="control-label">{m.languageLabel}</span>
    <div class="switch" role="group" aria-label={m.languageLabel}>
      {#each LOCALES as option (option)}
        <!-- The other language of this page, not of the site: somebody halfway
             down the privacy page who switches language wants the privacy page.

             data-sveltekit-reload because each language is its own document:
             the language of a page is in its `<html lang>`, written when the
             file was generated, and a client-side navigation would swap the
             text while leaving that attribute - and so a screen reader's
             pronunciation - on the language the person just left. -->
        <a
          class="switch-option"
          href={pathFor(option, page)}
          hreflang={option}
          lang={option}
          data-sveltekit-reload
          aria-current={option === locale ? 'page' : undefined}
          onclick={() => remember(option)}
        >
          {messages[option].languageName}
        </a>
      {/each}
      <span class="switch-thumb" aria-hidden="true"></span>
    </div>
  </nav>

  <ThemeControl {locale} />
</footer>
