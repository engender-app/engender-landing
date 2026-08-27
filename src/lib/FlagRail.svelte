<script lang="ts">
  /* The flag standing on end down the left margin, filling as the page is
     read. A reading-progress rail that is also the trans flag, so it earns its
     place twice rather than being one more decorated edge.

     Flat stripes, not a gradient: this direction has no gradients anywhere and
     a rail is not the place to make an exception. The fill is a clip-path
     uncovering from the top, which is the same material the cards' arrival
     uses, driven by the document's own scroll rather than by a script.

     Where scroll-driven animation is missing the rail simply sits full, which
     is the flag down the margin and no progress information - the one thing it
     was carrying twice over, so losing half of it costs the page nothing it
     needs. Under reduced motion it is not rendered at all: a rail that tracks
     the scrollbar is movement tied to reading, and somebody who asked for less
     of that asked for less of this. */
  import { FLAGS } from '$lib/flags';

  /* Trans, always, rather than the cycling flag. The rail is a fixed piece of
     furniture at the edge of every page and a colour change there is a flicker
     in peripheral vision with nothing to explain it; the motif is where the
     eight flags belong. */
  const stripes = FLAGS[0].stripes;
</script>

<div class="rail" aria-hidden="true">
  {#each stripes as stripe, index (index)}
    <i style:background={stripe}></i>
  {/each}
</div>

<style>
  .rail {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    width: 3px;
    pointer-events: none;
    /* Full by default: see the note about the missing-timeline case. */
    clip-path: inset(0 0 0 0);
  }

  .rail i {
    flex: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .rail {
      display: none;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: scroll()) {
      .rail {
        animation: fill linear both;
        animation-timeline: scroll(root block);
      }
    }
  }

  @keyframes fill {
    from {
      clip-path: inset(0 0 100% 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }

  @media (max-width: 48rem) {
    .rail {
      width: 2px;
    }
  }
</style>
