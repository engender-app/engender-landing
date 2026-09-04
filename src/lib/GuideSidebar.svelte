<script lang="ts">
  import { GUIDE_HUBS, guidePage, messages, pathFor, type GuideChapter, type Locale } from '$lib/site';

  let { locale, chapter }: { locale: Locale; chapter: GuideChapter } = $props();

  const guide = $derived(messages[locale].guide);
</script>

<!-- Every chapter is its own server-rendered route, so this needs no
     scripting to work or to mark the current one: `aria-current` is read
     straight off which page rendered (spec, "Navigation: footer link and
     sidebar"). -->
<nav class="guide-sidebar" aria-label={guide.sidebarLabel}>
  {#each GUIDE_HUBS as group (group.chapters[0])}
    <div class="hub">
      {#if group.hub}
        <p class="hub-label">{guide.hubLabels[group.hub as keyof typeof guide.hubLabels]}</p>
      {/if}
      <ul>
        {#each group.chapters as slug (slug)}
          <li>
            <a
              href={pathFor(locale, guidePage(slug))}
              aria-current={slug === chapter ? 'page' : undefined}
            >
              {guide.chapters[slug].title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</nav>

<style>
  /* Legible and testable, and nothing further: the composition, spacing and
     responsive behaviour are ticket 09's `/impeccable` pass to design. */
  .guide-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .hub-label {
    margin: 0 0 0.4rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-2);
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    display: block;
    padding: 0.3rem 0;
    color: var(--text-2);
    text-decoration: none;
  }

  a:hover {
    color: var(--text);
  }

  a[aria-current='page'] {
    color: var(--text);
    font-weight: 600;
  }
</style>
