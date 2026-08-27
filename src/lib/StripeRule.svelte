<script lang="ts">
  /* A section's rule, drawn in a flag's stripes rather than in one line, and
     the place the page's ambient loop lives.

     Two things are happening in one 3px-tall element. The rule itself is the
     live flag's stripes laid flat end to end, so the eight-flag cycle reaches
     every section heading on the page and not only the motif in the corner.
     And a short band of the page's own accent travels across it, slowly, on a
     loop: the one thing that moves when a reader is doing nothing but reading.

     That travelling band is the discipline this direction took from the
     daylight-section challenger it declined - the live state is a band of
     light crossing a fixed structure, with the structure staying put. It is
     also the cheapest possible ambient animation: one composited transform on
     one small element per section, and it stops dead under reduced motion
     because base.css keeps the keyframe behind the media query. */
  import { FLAGS } from '$lib/flags';
  import { flagCycle } from '$lib/flagCycle.svelte';

  let {
    /** Pinning a rule to one flag is for the tour, where each of the eight
        frames owns a flag of its own and none of them should be cycling. */
    flagIndex = null,
    travel = true,
  }: { flagIndex?: number | null; travel?: boolean } = $props();

  const stripes = $derived(
    flagIndex === null ? flagCycle.flag.stripes : FLAGS[flagIndex % FLAGS.length].stripes,
  );
</script>

<div class="rule" aria-hidden="true">
  {#each stripes as stripe, index (index)}
    <i style:background={stripe}></i>
  {/each}
  {#if travel}
    <span class="band"></span>
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
    /* A stripe changing colour crossfades rather than cutting: this rule is
       next to running text, and a hard cut in peripheral vision reads as a
       flicker. --dur-crossfade is deliberately outside the reduced-motion
       clamp, because a change of colour moves nothing. */
    transition: background-color var(--dur-crossfade) linear;
  }

  .band {
    position: absolute;
    inset: 0 0 0 0;
    width: 22%;
    background: var(--accent);
    /* Nothing here by default. The keyframe and the animation that drives it
       are in base.css behind prefers-reduced-motion, so a reduced-motion
       visitor gets the stripes and no band at all rather than a band parked
       somewhere arbitrary. */
    opacity: 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    .band {
      opacity: 1;
      animation: travel 9s linear infinite;
      animation-delay: var(--band-delay, 0s);
    }
  }
</style>
