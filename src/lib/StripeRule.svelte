<script module lang="ts">
  /* How many rules have been built, so each can be told where it sits. Module
     scope, so the count is per document rather than per component. */
  let seats = 0;
</script>

<script lang="ts">
  /* A section's rule, drawn in a flag's stripes rather than in one line, and
     the page's ambient motion.

     The flag change is a sweep: the incoming flag is laid over the outgoing one
     and uncovered from the left on an ease-out, the way a stroke is drawn
     (Alicja's note, 2026-08-27). It replaces two things that were here before
     and were both worse. A crossfade between two stripe sets muddied every
     colour through the middle of it. And a separate band of accent ink
     travelling across the rule was a second moving thing with nothing to do
     with the flag underneath it: one motion that means something beats two that
     do not, so the band and the clock that handed it between rules are gone.

     Two layers, never more. A sweep still running when the next flag arrives is
     finished instantly rather than queued, because the cycle is six seconds and
     the sweep is under one - if that ever stops being true, the right fix is a
     slower cycle, not a queue. */
  import { FLAGS } from '$lib/flags';
  import { flagCycle } from '$lib/flagCycle.svelte';

  let {
    /** Pinning a rule to one flag is for the frames, where each of the eight
        owns a flag of its own and none of them sweeps. */
    flagIndex = null,
  }: { flagIndex?: number | null } = $props();

  const pinned = $derived(flagIndex !== null ? FLAGS[flagIndex % FLAGS.length].stripes : null);

  /* What is painted underneath, and what is sweeping in over it. Before the
     first change - and for a pinned rule, and with reduced motion - `incoming`
     is null and there is one layer. */
  let beneath = $state(FLAGS[0].stripes);
  let incoming = $state<string[] | null>(null);
  let sweeping = $state(false);

  /* A plain variable, deliberately not $state, and the whole reason the effect
     below is safe. An effect that reads the same state it writes is a loop
     Svelte refuses, and refusing it throws during hydration - which takes the
     whole page's scripting with it, not just this rule. So the effect's only
     reactive read is the flag itself, and what it compares against is kept
     here, outside the graph. */
  let seen = FLAGS[0].stripes;

  /* Where this rule sits in the document, claimed as it is built, which is
     document order. Every rule changes flag on the same tick, and sweeping them
     all on the same frame read as one big switch rather than as a page turning
     over (Alicja's note, 2026-08-28); a small offset each makes the change
     travel down the page instead. */
  const ordinal = seats++;

  $effect(() => {
    /* The one reactive dependency. */
    const next = flagCycle.flag.stripes;
    if (pinned || next === seen) return;
    seen = next;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      beneath = next;
      return;
    }

    /* A sweep still in flight lands where it was going before the next one
       starts, so the rule never shows three flags at once. */
    if (incoming) beneath = incoming;
    incoming = next;
    sweeping = true;
  });

  function landed() {
    if (!incoming) return;
    beneath = incoming;
    incoming = null;
    sweeping = false;
  }
</script>

<div class="rule" aria-hidden="true">
  <span class="layer">
    {#each pinned ?? beneath as stripe, index (index)}
      <i style:background={stripe}></i>
    {/each}
  </span>
  {#if incoming}
    <span
      class="layer sweep"
      class:sweeping
      style:--sweep-delay="{ordinal * 110}ms"
      onanimationend={landed}
    >
      {#each incoming as stripe, index (index)}
        <i style:background={stripe}></i>
      {/each}
    </span>
  {/if}
</div>

<style>
  .rule {
    position: relative;
    height: 3px;
    overflow: clip;
    border-radius: 2px;
  }

  .layer {
    position: absolute;
    inset: 0;
    display: flex;
  }

  .layer i {
    flex: 1;
  }

  /* The incoming flag, uncovered from the left. Its default state is fully
     uncovered, so a browser that runs no animation - or a script that fails
     between mounting this layer and animating it - shows the new flag rather
     than a bare rule. */
  .sweep {
    clip-path: inset(0 0 0 0);
  }

  @media (prefers-reduced-motion: no-preference) {
    .sweeping {
      animation: sweep var(--dur-sweep) var(--ease-sweep) var(--sweep-delay, 0ms) both;
    }
  }

  @keyframes sweep {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
</style>
