/** Which section's rule the travelling band is currently crossing.

    Every section head carries a stripe rule, and the first build gave each of
    them its own band on its own nine-second loop. Six unrelated things
    twitching at six different phases is not an ambient layer, it is noise, so
    there is one band on the page instead: it crosses one rule, leaves, and
    appears in the next. What a reader sees is a single thing travelling down
    the page as they read it.

    Ordinals are handed out at mount in document order, which is the order the
    rules are written in, so the band moves down the page rather than jumping
    about. A rule that unmounts gives its ordinal back.

    Same timer discipline as [[flagCycle]]: one interval for the document,
    started by the first rule that asks and stopped by the last one that
    leaves, and no timer at all while the tab is hidden. */
const CROSSING_MS = 4200;

let ordinal = $state(0);
let count = 0;
let timer: ReturnType<typeof setInterval> | null = null;
let holders = 0;

function tick() {
  ordinal = count === 0 ? 0 : (ordinal + 1) % count;
}

function run() {
  if (timer !== null || holders === 0) return;
  if (typeof document !== 'undefined' && document.hidden) return;
  timer = setInterval(tick, CROSSING_MS);
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

/** Claims the next ordinal and starts the shared clock. Returns the ordinal
    this rule owns and the teardown that releases it. */
export function joinBand(): { index: number; release: () => void } {
  const index = count;
  count += 1;
  holders += 1;
  if (holders === 1 && typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', onVisibility);
  }
  run();

  let released = false;
  return {
    index,
    release() {
      if (released) return;
      released = true;
      holders -= 1;
      count -= 1;
      if (holders === 0) {
        halt();
        if (typeof document !== 'undefined') {
          document.removeEventListener('visibilitychange', onVisibility);
        }
      }
    },
  };
}

export const bandCycle = {
  get at(): number {
    return ordinal;
  },
  /** How long one crossing takes, so the CSS animation and the handoff clock
      cannot disagree about it. */
  get crossingMs(): number {
    return CROSSING_MS;
  },
};
