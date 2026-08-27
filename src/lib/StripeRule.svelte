<script lang="ts">
  /* A section's rule, drawn in a flag's stripes rather than in one line, and
     one of the two places the page's ambient motion lives.

     The rule is the live flag's stripes laid flat end to end, so the
     eight-flag cycle reaches every heading on the page and not only the motif
     in the splash.

     The band that crosses it belongs to the whole page rather than to this
     rule: $lib/bandCycle hands out ordinals in document order and moves one
     band down them, so at any moment exactly one rule on the page has
     something travelling across it. The first build gave every rule its own
     loop, which was six unrelated things twitching at six phases. */
  import { onMount } from 'svelte';
  import { FLAGS } from '$lib/flags';
  import { flagCycle } from '$lib/flagCycle.svelte';
  import { bandCycle, joinBand } from '$lib/bandCycle.svelte';

  let {
    /** Pinning a rule to one flag is for the frames, where each of the eight
        owns a flag of its own and none of them should be cycling. */
    flagIndex = null,
    /** A rule that is furniture rather than a section head takes no part in
        the handoff. */
    band = true,
  }: { flagIndex?: number | null; band?: boolean } = $props();

  let ordinal = $state(-1);

  const stripes = $derived(
    flagIndex === null ? flagCycle.flag.stripes : FLAGS[flagIndex % FLAGS.length].stripes,
  );
  const carrying = $derived(band && ordinal >= 0 && bandCycle.at === ordinal);

  onMount(() => {
    if (!band) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const seat = joinBand();
    ordinal = seat.index;
    return () => {
      ordinal = -1;
      seat.release();
    };
  });
</script>

<div class="rule" aria-hidden="true">
  {#each stripes as stripe, index (index)}
    <i style:background={stripe}></i>
  {/each}
  {#if carrying}
    <span class="band" style:--crossing="{bandCycle.crossingMs}ms"></span>
  {/if}
</div>

<style>
  .rule {
    position: relative;
    display: flex;
    height: 3px;
    overflow: clip;
    border-radius: 2px;
  }

  .rule i {
    flex: 1;
    /* A stripe changing colour crossfades rather than cutting: this rule sits
       next to running text, and a hard cut in peripheral vision reads as a
       flicker. --dur-crossfade is deliberately outside the reduced-motion
       clamp, because a change of colour moves nothing. */
    transition: background-color var(--dur-crossfade) linear;
  }

  /* Only ever in the DOM while this rule is the one carrying the band, so
     there is nothing to park anywhere and nothing to hide under reduced
     motion: the element simply is not rendered. */
  .band {
    position: absolute;
    inset: 0 auto 0 0;
    width: 20%;
    background: var(--accent);
    animation: cross var(--crossing) linear both;
  }

  @keyframes cross {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(500%);
    }
  }
</style>
