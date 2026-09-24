<script lang="ts">
  import { GUIDE_HUBS, guidePage, messages, pathFor, type GuideChapter, type Locale } from '$lib/site';

  let { locale, chapter }: { locale: Locale; chapter: GuideChapter } = $props();

  const guide = $derived(messages[locale].guide);
</script>

{#snippet chapterLinks()}
  {#each GUIDE_HUBS as group (group.chapters[0])}
    <div class="hub">
      {#if group.hub}
        <p class="hub-label">{guide.hubLabels[group.hub]}</p>
      {/if}
      <ul>
        {#each group.chapters as slug (slug)}
          <li>
            <a href={pathFor(locale, guidePage(slug))} aria-current={slug === chapter ? 'page' : undefined}>
              {guide.chapters[slug].title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
{/snippet}

<nav class="desktop-sidebar" aria-label={guide.sidebarLabel}>
  <p class="nav-heading">{guide.sidebarLabel}</p>
  {@render chapterLinks()}
</nav>

<details class="mobile-selector">
  <summary>
    <span>
      <span class="nav-heading">{guide.sidebarLabel}</span>
      <strong>{guide.chapters[chapter].title}</strong>
    </span>
    <span class="chevron" aria-hidden="true"></span>
  </summary>
  <nav aria-label={guide.sidebarLabel}>
    {@render chapterLinks()}
  </nav>
</details>

<style>
  .desktop-sidebar {
    align-self: start;
    position: sticky;
    top: 1rem;
    max-height: calc(100dvh - var(--footer-h) - 2rem);
    overflow-y: auto;
    padding-right: 0.5rem;
    scrollbar-width: thin;
  }

  .nav-heading,
  .hub-label {
    font-size: 0.8rem;
    font-weight: var(--weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-2);
  }

  .nav-heading {
    margin: 0 0 0.8rem 0.75rem;
  }

  .hub + .hub {
    margin-top: 1rem;
  }

  .hub-label {
    margin: 0 0 0.25rem 0.75rem;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    display: flex;
    align-items: center;
    min-height: var(--target);
    padding: 0.5rem 0.75rem;
    border-left: 3px solid transparent;
    color: var(--text-2);
    text-decoration: none;
    line-height: 1.25;
    transition: color var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out);
  }

  a:hover {
    color: var(--text);
    background: var(--surface-2);
  }

  a[aria-current='page'] {
    border-left-color: var(--accent);
    background: var(--surface-2);
    color: var(--text);
    font-weight: var(--weight-bold);
  }

  .mobile-selector {
    display: none;
  }

  @media (max-width: 45rem) {
    .desktop-sidebar {
      display: none;
    }

    .mobile-selector {
      display: block;
      border: 1px solid var(--outline);
      border-radius: var(--r-block);
      background: var(--surface);
    }

    summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      min-height: 4.25rem;
      padding: 0.75rem 1rem;
      cursor: pointer;
      list-style: none;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    summary .nav-heading {
      display: block;
      margin: 0 0 0.2rem;
    }

    summary strong {
      display: block;
      color: var(--text);
      line-height: 1.25;
    }

    .chevron {
      width: 0.6rem;
      height: 0.6rem;
      flex: none;
      border-right: 2px solid var(--text);
      border-bottom: 2px solid var(--text);
      transform: rotate(45deg) translateY(-2px);
      transition: transform var(--dur-fast) var(--ease-out);
    }

    details[open] .chevron {
      transform: rotate(225deg) translateY(-2px);
    }

    .mobile-selector nav {
      padding: 0.25rem 0.5rem 0.75rem;
      border-top: 1px solid var(--hairline);
    }

    .mobile-selector .hub + .hub {
      margin-top: 0.75rem;
    }
  }
</style>
