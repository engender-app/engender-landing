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

  /* A ring only moves when the next flag has a different number of stripes, so
     a change between two five-stripe flags - trans to bisexual to lesbian, half
     the cycle - moved nothing at all and read as a plain fade (Alicja's note,
     2026-08-28). The wave is the authored moment and it should happen every
     time, so every change also runs a pulse: each ring dips and returns,
     staggered outward to inward, on top of whatever its radius is doing.

     Keyed off the flag itself rather than a timer, and toggled so the animation
     restarts even when the class is already there. */
  let pulsing = $state(false);
  let seen = FLAGS[0];

  $effect(() => {
    const next = flagCycle.flag;
    if (flagIndex !== null || next === seen) return;
    seen = next;
    if (!moving) return;
    pulsing = false;
    requestAnimationFrame(() => {
      pulsing = true;
    });
  });

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
      class:pulsing
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

  /* The bands touch and each ring carries a 3px black seam: #000, never a
     theme-mixed line, which on a dark page around a dark band reads as
     nothing, and that is the second half of the rule (the app's DIRECTION.md
     rule 8, as Alicja settled it on ticket 23's renders, 2026-09-07 - "a
     fatter stroke and no emptiness between bands"). Its src/lib/styles/
     components.css draws it as `border: 3px solid #000` with border-box
     sizing, so the seam sits inside the ring's own box and the diameters do
     not move.

     Which is why a ring is sized here rather than scaled. This component drew
     one full-size circle per ring and shrank it with `transform: scale()`,
     which is cheap - seven composited transforms, no layout - and a scaled
     border is a scaled seam. Counter-scaling the width (3px / scale) does not
     save it either: a browser floors a border to whole pixels, so at the
     five real radii the seams measured 3, 2.4, 3, 2.8 and 3 on the glass, and
     an uneven seam on a drawing made of seams is the defect. Each ring is now
     its own diameter in px with a true 3px edge, and what animates on a flag
     change is that diameter. Seven absolutely positioned circles resizing
     costs no layout anywhere else on the page. */
  .sun i {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    box-sizing: border-box;
    width: calc(var(--sun-size) * var(--ring-scale));
    height: calc(var(--sun-size) * var(--ring-scale));
    border-radius: 50%;
    border: 3px solid #000;
    background: var(--ring-colour);
    /* Centred on the sun's own centre, so a ring growing back from nothing
       opens from there rather than from its own top-left corner. */
    transform: translate(-50%, -50%);
  }

  /* Only a mounted, moving sun transitions. Without this the very first
     render would animate every ring up from scale 0, which is a sun
     assembling itself in front of a reader who has not scrolled yet - and
     under reduced motion it would animate at all, which is the thing being
     avoided. */
  .moving i {
    /* Slow enough to be watched rather than noticed, and it decelerates.
       --ease-overshoot used to be here - a mild spring, a ring passing its
       new radius and settling back - and it went with redesign ticket 08:
       DESIGN.md had it recorded as not canonized, the app has no overshoot
       curve of its own to justify it, and one curve for the whole site is the
       app's own discipline. What carries the wave now is the per-ring delay
       and the app's --ease-out, which still leaves at four times its average
       speed and lands soft. */
    /* Colour on the motif's own duration, not on --dur-slow. They were
       different and the difference showed: a change between two flags with the
       same number of stripes moves no ring, so all a reader saw was a 320ms
       colour swap with no wave in it, while a change that resized rings took
       900ms. Half the transitions looked like the animation had stopped
       (Alicja's note, 2026-08-28). One duration, one stagger, one wave. */
    transition:
      width var(--dur-motif) var(--ease-out),
      height var(--dur-motif) var(--ease-out),
      background-color var(--dur-motif) var(--ease-out);
    transition-delay: var(--ring-delay);
  }

  /* The pulse: a dip and a return on the `scale` property, which is its own
     property and composes with the `transform` that centres the ring rather
     than replacing it. Staggered by the same per-ring delay as the radius, so
     both halves of the wave travel together. */
  .pulsing {
    animation: pulse var(--dur-motif) var(--ease-out) both;
    animation-delay: var(--ring-delay);
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    45% {
      scale: 0.9;
    }
    100% {
      scale: 1;
    }
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
