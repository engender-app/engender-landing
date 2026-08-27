<script lang="ts">
  /* The flag sun, the app's own motif brought to the site (ticket 03). On the
     app's home screen it is the active flag drawn as one concentric ring per
     stripe, centred on a corner. Here it does the thing the app deliberately
     will not: it cycles all eight, because the app has to stay a calm surface
     somebody opens on a bad day and this page does not.

     How the change is drawn is the whole design of it. Not a crossfade
     between two suns, and not a redraw: the ring count is fixed at the widest
     flag's, every ring is one full-size circle scaled down by `transform`, and
     a flag change animates `transform` and `background-color` on those same
     seven nodes. Each ring is delayed a little more than the one outside it,
     so what a reader sees is a wave crossing the sun from its rim to its
     centre. A three-stripe flag scales its spare rings to nothing and a
     seven-stripe flag grows them back, which is the same wave doing the work.

     The rings are painted in the raw flag stripes, vivid and unmeasured, which
     they are allowed to be because nothing on this site ever reads on top of
     them. base.css carries that rule.

     Stacking order is load-bearing and easy to get backwards: ring 0 is the
     outermost and therefore the largest, so it paints first and every smaller
     ring paints over it. Reversed, the outermost disc covers all seven and the
     motif is one flat circle in one colour.

     Static without scripting and static under reduced motion, in the trans
     flag, which is the app's default palette. Neither is a degraded state: it
     is the same motif holding still. */
  import { onMount } from 'svelte';
  import { rings, FLAGS } from '$lib/flags';
  import { flagCycle, holdCycle } from '$lib/flagCycle.svelte';

  let {
    /** 'corner' bleeds off the top-right of its container, the way the app's
        home screen does it. 'inline' is a whole sun sitting in the flow, used
        where the page is showing the motif rather than wearing it. */
    placement = 'corner',
    size = '32rem',
    /** Pins this motif to one flag instead of following the shared cycle.
        The tour's eight frames use it: eight frames, eight flags, none of them
        moving, so the strip reads as the whole set at once rather than as
        eight copies of whatever the corner sun happens to be showing. */
    flagIndex = null,
  }: {
    placement?: 'corner' | 'inline';
    size?: string;
    flagIndex?: number | null;
  } = $props();

  let moving = $state(false);

  /* Before mount, and for anybody without scripting, the trans flag. After
     mount it follows the shared cycle - but only once `moving` says this
     motif is allowed to move, so a reduced-motion visitor keeps the still
     sun rather than getting one frame of the cycle. */
  const flag = $derived(
    flagIndex !== null
      ? FLAGS[flagIndex % FLAGS.length]
      : moving
        ? flagCycle.flag
        : FLAGS[0],
  );
  const ringSet = $derived(rings(flag));

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* A pinned motif has nothing to subscribe to: it shows one flag forever.
       It still sets `moving`, because the breathing loop is tier 0 too and a
       pinned sun that never breathes would sit dead next to one that does. */
    if (flagIndex !== null) {
      moving = true;
      return;
    }

    /* The cycle runs for as long as the page is open, not only while this
       motif is on screen. It was gated on an IntersectionObserver, which is the
       usual advice for an ambient loop - but the loop does not drive this motif
       alone. Every section rule on the page is inked in the live flag and
       sweeps when it changes, so gating on one element's visibility stopped the
       colour changing for a reader who had scrolled past the splash, which is
       most of the page (Alicja's note, 2026-08-28).

       The guard that matters stays: $lib/flagCycle keeps no timer at all while
       the document is hidden, so a tab left open in the background repaints
       nothing. */
    moving = true;
    return holdCycle();
  });
</script>

<div
  class="sun"
  class:corner={placement === 'corner'}
  class:inline={placement === 'inline'}
  class:moving
  style:--sun-size={size}
  aria-hidden="true"
>
  {#each ringSet as ring, index (index)}
    <i
      style:--ring-scale={ring.scale}
      style:--ring-colour={ring.colour}
      style:--ring-delay="{index * 130}ms"
      style:z-index={index}
    ></i>
  {/each}
</div>

<style>
  .sun {
    position: absolute;
    width: var(--sun-size);
    height: var(--sun-size);
    pointer-events: none;
    /* Its own stacking context, so the rings' z-index ordering is a private
       matter and cannot reach the page's layers. */
    isolation: isolate;
  }

  /* Centred on the corner itself, so the outer rings leave the page on two
     edges and what is left reads as an arc rather than as a circle sitting in
     a box. The container clips it; this element does not, because a clip here
     would cut the rings before the corner did. */
  .corner {
    top: calc(var(--sun-size) / -2);
    right: calc(var(--sun-size) / -2);
  }

  .inline {
    position: relative;
    inset: auto;
  }

  .sun i {
    position: absolute;
    inset: 0;
    display: block;
    border-radius: 50%;
    background: var(--ring-colour);
    transform: scale(var(--ring-scale));
    /* Painted from the middle out, so a ring growing back from nothing opens
       from the centre of the sun rather than from its own top-left. */
    transform-origin: 50% 50%;
  }

  /* Only a mounted, moving sun transitions. Without this the very first
     render would animate every ring up from scale 0, which is a sun
     assembling itself in front of a reader who has not scrolled yet - and
     under reduced motion it would animate at all, which is the thing being
     avoided. */
  .moving i {
    /* Slow enough to be watched rather than noticed, and it overshoots.
       --ease-overshoot is a mild spring: a ring travelling to its new radius
       goes a little past it and settles, which is what makes the wave read as
       one movement crossing the sun instead of seven rings changing size. The
       colour rides the same curve but overshoot is meaningless for a colour,
       so it takes the plain one. */
    /* Colour on the motif's own duration, not on --dur-slow. They were
       different and the difference showed: a change between two flags with the
       same number of stripes moves no ring, so all a reader saw was a 320ms
       colour swap with no wave in it, while a change that resized rings took
       900ms. Half the transitions looked like the animation had stopped
       (Alicja's note, 2026-08-28). One duration, one stagger, one wave. */
    transition:
      transform var(--dur-motif) var(--ease-overshoot),
      background-color var(--dur-motif) var(--ease-standard);
    transition-delay: var(--ring-delay);
  }

  /* The breathing loop, tier 0. One slow scale on the whole sun rather than
     per ring, so it costs one composited transform however many rings there
     are. It sits inside the media query rather than being clamped by it: a
     1ms infinite loop is a strobe, so this stops outright instead of
     shortening. */
  @media (prefers-reduced-motion: no-preference) {
    .moving {
      animation: breathe var(--dur-breathe) ease-in-out infinite;
    }
  }

  @keyframes breathe {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
</style>
