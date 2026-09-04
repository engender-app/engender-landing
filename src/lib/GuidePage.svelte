<script lang="ts">
  import PageShell from '$lib/PageShell.svelte';
  import GuideSidebar from '$lib/GuideSidebar.svelte';
  import Prose from '$lib/Prose.svelte';
  import FlagSun from '$lib/FlagSun.svelte';
  import { guidePage, messages, type GuideChapter, type Locale } from '$lib/site';

  let { locale, chapter }: { locale: Locale; chapter: GuideChapter } = $props();

  const guide = $derived(messages[locale].guide);
  const entry = $derived(guide.chapters[chapter]);
</script>

<!-- Chapter content is placeholder here (ticket 01): tickets 02-07 write the
     real English, ticket 08 the real Polish. What this component owns is the
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
      <Prose paragraphs={[guide.comingSoon]} />
    </article>
  </div>
</PageShell>

<style>
  /* Widths and rhythm taken from PrivacyPage: a reader inside the Guide
     should not feel like they left the site's reading column. */

  .masthead {
    position: relative;
    overflow: clip;
    border-bottom: 1px solid var(--outline);
  }

  .sun-well {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .masthead-inner {
    position: relative;
    max-width: 48rem;
    margin: 0 auto;
    padding: clamp(2.5rem, 8vh, 5rem) clamp(1rem, 4vw, 2.5rem) clamp(2.5rem, 7vh, 4rem);
  }

  h1 {
    font-size: clamp(1.9rem, 4.8vw, 3.25rem);
    font-weight: 600;
    margin: 0 0 1.5rem;
    max-width: 24ch;
  }

  .intro {
    font-family: var(--font-display);
    font-size: clamp(1.125rem, 2vw, 1.4rem);
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: var(--display-track);
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

  article :global(p) {
    max-width: 62ch;
    color: var(--text-2);
  }

  @media (max-width: 45rem) {
    .body {
      grid-template-columns: 1fr;
    }
  }
</style>
