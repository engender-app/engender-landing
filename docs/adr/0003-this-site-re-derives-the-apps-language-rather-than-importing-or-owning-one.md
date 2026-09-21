# This site re-derives the app's language rather than importing it or owning one

Every visual decision here is an argument about the Journal: the site is flat because
the app is flat, it is set in Outfit and Nunito because the app is, it has one radius
because the app collapsed to one, and it spends colour in fields and blocks because
the app does. None of that arrives as code. The tokens are copied by hand into
`src/lib/styles/base.css` with the app's file and value named in the comment beside
each one, and `$lib/flags.ts` carries the eight palettes' stripes and accents as
literals. The two repositories share no package, no stylesheet and no build step, and
they never will.

The site is also not free to hold an identity of its own. Where the app has a rule,
the rule binds here; what the site may decide is what a rule becomes at poster scale,
and those translations are written down in `DESIGN.md` as the site's own.

## Why

**Why not import.** A shared package would be the obvious answer and it is ruled out
by ADR-0019 in the Journal repository, which is why these two repositories exist
separately at all. The landing site is a static marketing page on managed hosting; the
app is an offline-first journal that must never share an origin, a service worker or
storage with it. A package the two both depend on is a build-time coupling between a
thing that ships weekly and a thing that ships when somebody writes copy, and it drags
the app's dependency graph onto a host that serves files.

**Why not an identity of its own.** The site's whole job is to hand a person to the
app. A visitor who follows `Start journal` arrives at a screen that has to look like
the page they left, and the cheapest way to guarantee that is for the page to be made
of the app's own values. Ticket 03 put it as "the app's own sheet at poster scale",
and the test of that claim is literal: `#F4F8FB`, `#1B2B36`, `#B85272` are the same
characters in both repositories.

**What copying costs, and why it is still the right trade.** It costs drift. Redesign
ticket 08 is the bill: the app's phase 10 redesign landed on 2026-09-07 and kept
moving to 2026-09-21, and six of `DESIGN.md`'s premises were false by the time anybody
looked - the gradient exception it argued from had been deleted, the reading face it
named had never shipped, the radius ramp had collapsed to one value, the elevation
ramp had retired, colour had grown a budget, and the motion default had reversed. One
of those, the face, was never true even when it was written.

The answer is not to stop copying but to make the copy legible and checkable. So:

- Every copied value names its source file in the comment beside it, so a reader can
  diff the two by eye without a translation table.
- The contract is asserted rather than described. `tests/site.test.mjs` holds the
  radius budget, the elevation policy, the absence of gradients and the two faces
  against what a browser computed, on every page the build produced.
- A ticket that follows the app names what moved and when, and `DESIGN.md` is
  rewritten from the built site rather than from the ticket that planned it.

**Where the site is allowed to differ, and the three places it does.** The app's rules
are written for a screen somebody opens on a bad day; this is a page somebody visits
once. Three of them do not survive the change of scale unaltered, and each is recorded
in `DESIGN.md` with the reasoning:

- **One field per act, not per screen.** The app allows one field of flag colour per
  screen, at the top. This page is eight acts long, so the unit is the act.
- **More motion than the app can afford.** The app's ambient budget is two loops. The
  brief for this site (`.agents/product-marketing.md` v10) asks for a page that leaves
  a visitor suspecting an animator built it, so the site cycles all eight flags where
  the app shows one, and the change drives the motif, every section rule and the
  action together.
- **No elevation at all, where the app keeps one shadow.** The app's one shadow
  belongs to its floating nav bar. This site's bar is welded to the foot of the window
  across its full width with the page running up behind it, so the same shadow had to
  be turned upward and landed on the running text: it tinted `--bg` from `#F4F8FB` to
  `rgb(232 237 241)` and took `--text-2` from 4.90:1 to 4.44:1, through the floor, on
  a paragraph that sits in that band at rest. Measured, then removed.

## Status

Accepted, 2026-09-21, redesign ticket 08. It records a practice that ticket 03
already followed and never wrote down, and the three divergences above are the whole
of the licence it grants.
