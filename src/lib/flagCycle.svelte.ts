import { FLAGS, type Flag } from '$lib/flags';

/** Which of the eight flags the motif is currently inked in, shared by every
    motif on the page so two of them never drift out of step.

    One timer for the whole document, started by the first motif that asks for
    it and stopped by the last one that leaves. That is not premature
    housekeeping: this is an infinite loop on a marketing page, and
    reference/animate.md's rule is that a nonessential loop stops when it is
    offscreen or hidden. A page left open in a background tab for an afternoon
    should not be repainting a sun nobody is looking at.

    Five seconds, which is a full turn of all eight in forty. It was six, on
    the reasoning that the point was the colour *changing*, noticed out of the
    corner of an eye, rather than a reader being shown all eight. That stopped
    being true when the splash became a field of the live flag (redesign
    ticket 08): the flag is the whole of the first screen's colour now, not a
    motif in its corner, and at forty-eight seconds a visit that lasts twenty
    only ever saw three of the eight - which is what Alicja reported on the
    built page (2026-09-22, "the site should cycle between all 8 flags, not
    just 3"). It went to three and she settled it at five the same day.

    The floor is two, not five: the motif's own change takes 900ms and the
    rule's sweep 1500, so a shorter period would start the next flag before
    the last one had finished arriving. Five leaves 3.5 seconds of stillness
    between changes, which is the part that decides whether a page reads as
    alive or as restless. */
const PERIOD_MS = 5000;

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
