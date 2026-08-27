<script lang="ts">
  import PageShell from '$lib/PageShell.svelte';
  import Prose from '$lib/Prose.svelte';
  import FlagSun from '$lib/FlagSun.svelte';
  import StripeRule from '$lib/StripeRule.svelte';
  import { messages, type Locale } from '$lib/site';

  let { locale }: { locale: Locale } = $props();

  const privacy = $derived(messages[locale].privacyPage);
</script>

<!-- The copy here is `content/*/privacy.md`'s, through the message catalogue,
     and this component decides none of it. tests/site.test.mjs checks that what
     this page says about encryption at rest matches what the copy files
     actually claim, so a change of claim is a copy ticket's job and it fails
     here rather than shipping quietly. -->
<PageShell {locale} page="privacy" title={privacy.title}>
  <div class="masthead">
    <div class="sun-well" aria-hidden="true">
      <!-- Quieter than the landing page's, and smaller. It is the same motif
           doing the same cycle: this is still the same site, and a reader who
           followed the link from the landing page should not arrive somewhere
           that looks unrelated. -->
      <FlagSun placement="corner" size="clamp(13rem, 26vw, 22rem)" />
    </div>
    <div class="masthead-inner">
      <h1>{privacy.title}</h1>
      <p class="intro">{privacy.intro}</p>
    </div>
  </div>

  <article>
    <!-- Per paragraph rather than per section. A section here can be 600px
         tall, and 600px of page sliding 20px as it goes by is motion nobody
         can see; the paragraphs arriving one after another is the same idea at
         a size that reads. -->
    {#each privacy.sections as section (section.heading)}
      <section>
        <div class="section-head reveal">
          <h2>{section.heading}</h2>
          <StripeRule />
        </div>
        <Prose paragraphs={section.paragraphs} reveal />
      </section>
    {/each}
  </article>
</PageShell>

<style>
  /* The page a reader opens while deciding whether to trust the app with
     their journal. It stays a reading column: the direction's colour arrives
     as the motif at the top and the stripe rule each heading hangs from, and
     nowhere near the running text. */

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

  article {
    max-width: 48rem;
    margin: 0 auto;
    padding: clamp(2.5rem, 7vh, 4.5rem) clamp(1rem, 4vw, 2.5rem) clamp(4rem, 12vh, 8rem);
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
    font-weight: 600;
    margin: 0;
  }

  article :global(p) {
    max-width: 62ch;
    color: var(--text-2);
  }

  article :global(p strong) {
    color: var(--text);
    font-weight: 600;
  }
</style>
