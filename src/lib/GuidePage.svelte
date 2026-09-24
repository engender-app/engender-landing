<script lang="ts">
  import { onNavigate } from '$app/navigation';
  import PageShell from '$lib/PageShell.svelte';
  import GuideSidebar from '$lib/GuideSidebar.svelte';
  import Prose from '$lib/Prose.svelte';
  import FlagSun from '$lib/FlagSun.svelte';
  import StripeRule from '$lib/StripeRule.svelte';
  import { flagCycle } from '$lib/flagCycle.svelte';
  import { guidePage, messages, type GuideChapter, type Locale } from '$lib/site';

  let { locale, chapter }: { locale: Locale; chapter: GuideChapter } = $props();

  const guide = $derived(messages[locale].guide);
  const entry = $derived(guide.chapters[chapter]);
  /* A chapter carries `sections` once its content ticket has written it;
     until then it has none and shows the placeholder. */
  const sections = $derived('sections' in entry ? entry.sections : []);

  onNavigate((navigation) => {
    if (
      !document.startViewTransition ||
      !navigation.to ||
      !navigation.from ||
      !navigation.to.url.pathname.startsWith(`/${locale}/guide/`) ||
      navigation.to.url.pathname === navigation.from.url.pathname
    ) return;

    return new Promise<void>((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<!-- A chapter's content is its `sections` in the catalogue, written by
     tickets 02-07 (and 08 for Polish); a chapter without them shows the
     placeholder. What this component owns is the
     shell every chapter shares - the masthead, the sidebar, the reading
     column - reusing PrivacyPage's own widths and motif rather than
     inventing a second pattern for a page that is, like Privacy, a reference
     rather than the splash's persuasive scroll. -->
<PageShell {locale} page={guidePage(chapter)} title={entry.title}>
  <div class="masthead">
    <div class="sun-well" aria-hidden="true">
      <FlagSun placement="corner" size="clamp(150px, 26vw, 340px)" />
    </div>
    <div class="masthead-inner">
      <h1>{entry.title}</h1>
      <p class="intro">{entry.description}</p>
    </div>
  </div>

  <div class="body">
    <GuideSidebar {locale} {chapter} />
    <article>
      {#each sections as section, sectionAt (section.heading)}
        <section>
          <div class="section-head">
            <h2>{section.heading}</h2>
            <StripeRule />
          </div>
          <Prose paragraphs={section.paragraphs} />
          {#if 'images' in section}
            <div class="chapter-shots">
              {#each section.images as shot, at (shot.src)}
                <figure style:--frame-ink={flagCycle.flag.stripes[(sectionAt + at) % flagCycle.flag.stripes.length]}>
                  <img src={shot.src} alt={shot.alt} width="390" height="844" loading="lazy" decoding="async" />
                </figure>
              {/each}
            </div>
          {/if}
        </section>
      {:else}
        <Prose paragraphs={[guide.comingSoon]} />
      {/each}
    </article>
  </div>
</PageShell>

<style>
  /* Widths and rhythm taken from PrivacyPage: a reader inside the Guide
     should not feel like they left the site's reading column. */

  .masthead {
    position: relative;
    overflow: clip;
    border-bottom: 1px solid var(--hairline);
  }

  .sun-well {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .masthead-inner {
    position: relative;
    max-width: 64rem;
    margin: 0 auto;
    padding: clamp(2.5rem, 8vh, 5rem) clamp(1rem, 4vw, 2.5rem) clamp(2.5rem, 7vh, 4rem);
    display: grid;
    grid-template-columns: 14rem minmax(0, 1fr);
    column-gap: clamp(1.5rem, 4vw, 3rem);
  }

  .masthead-inner > * {
    grid-column: 2;
  }

  /* A page's title, which is the app's door title: the display face at 800,
     one step tighter than --display-track because it runs past 48px. */
  h1 {
    font-size: clamp(1.9rem, 4.8vw, 3.25rem);
    letter-spacing: var(--display-track-tight);
    margin: 0 0 1.5rem;
    max-width: 24ch;
  }

  /* The body face: an intro is content, and content is not set in the
     display face (the app's rule 2). */
  .intro {
    font-size: clamp(1.125rem, 2vw, 1.4rem);
    font-weight: var(--weight-medium);
    line-height: 1.4;
    color: var(--text-2);
    max-width: 42ch;
    margin: 0;
  }

  .body {
    max-width: 64rem;
    margin: 0 auto;
    padding: clamp(2.5rem, 7vh, 4.5rem) clamp(1rem, 4vw, 2.5rem) clamp(4rem, 12vh, 8rem);
    display: grid;
    grid-template-columns: 14rem 1fr;
    gap: clamp(1.5rem, 4vw, 3rem);
  }

  section {
    margin-bottom: clamp(2.5rem, 7vh, 4rem);
  }

  section:last-child {
    margin-bottom: 0;
  }

  .section-head {
    display: grid;
    gap: 0.85rem;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: clamp(1.35rem, 2.6vw, 1.85rem);
    margin: 0;
  }

  article :global(p) {
    max-width: 62ch;
    color: var(--text-2);
  }

  article :global(p strong) {
    color: var(--text);
    font-weight: var(--weight-bold);
  }

  .chapter-shots {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  figure {
    width: min(100%, 19rem);
    margin: 0;
    border: 4px solid var(--frame-ink);
    border-radius: 26px;
    overflow: clip;
    transition: border-color var(--dur-motif) var(--ease-out);
  }

  img {
    display: block;
    /* Crop 10px per edge from the 390px fixture: 390/370 wide, 10/370 inset. */
    width: 105.405%;
    max-width: none;
    height: auto;
    margin: -2.7027%;
  }

  @media (max-width: 45rem) {
    .masthead-inner {
      display: block;
    }

    .body {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding-top: 1.5rem;
    }
  }
</style>
