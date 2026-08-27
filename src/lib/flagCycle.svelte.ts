import { FLAGS, type Flag } from '$lib/flags';

/** Which of the eight flags the motif is currently inked in, shared by every
    motif on the page so two of them never drift out of step.

    One timer for the whole document, started by the first motif that asks for
    it and stopped by the last one that leaves. That is not premature
    housekeeping: this is an infinite loop on a marketing page, and
    reference/animate.md's rule is that a nonessential loop stops when it is
    offscreen or hidden. A page left open in a background tab for an afternoon
    should not be repainting a sun nobody is looking at.

    The cycle is deliberately slow. Eight flags at six seconds is
    forty-eight seconds for a full turn, which is longer than most visits: the
    point is that the colour is *changing*, noticed out of the corner of an
    eye, not that a reader gets shown all eight. A faster cycle turns the one
    ambient thing on the page into a distraction sitting next to the copy. */
const PERIOD_MS = 6000;

let index = $state(0);
let timer: ReturnType<typeof setInterval> | null = null;
let holders = 0;

function tick() {
  index = (index + 1) % FLAGS.length;
}

function run() {
  if (timer !== null || holders === 0) return;
  /* A hidden document gets no timer at all rather than a paused one: nothing
     is owed to a tab in the background, and visibilitychange starts it again
     when the reader comes back. */
  if (typeof document !== 'undefined' && document.hidden) return;
  timer = setInterval(tick, PERIOD_MS);
}

function halt() {
  if (timer === null) return;
  clearInterval(timer);
  timer = null;
}

function onVisibility() {
  if (document.hidden) halt();
  else run();
}

/** Called by a motif when it comes into view, and again with the returned
    teardown when it leaves. Ref-counted, so two motifs on one page share the
    single timer and the last one out switches it off. */
export function holdCycle(): () => void {
  holders += 1;
  if (holders === 1 && typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', onVisibility);
  }
  run();

  let released = false;
  return () => {
    if (released) return;
    released = true;
    holders -= 1;
    if (holders === 0) {
      halt();
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onVisibility);
      }
    }
  };
}

export const flagCycle = {
  get flag(): Flag {
    return FLAGS[index];
  },
  get activeIndex(): number {
    return index;
  },
};
