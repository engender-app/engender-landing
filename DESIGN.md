---
name: enGender landing
description: The app's own printed language at poster scale, with the motion the app cannot afford.
colors:
  paper: '#f4f8fb'
  paper-dark: '#0d141a'
  surface: '#ffffff'
  surface-dark: '#151f27'
  surface-2: '#e9f1f7'
  surface-2-dark: '#1d2a34'
  text: '#1b2b36'
  text-dark: '#e8f1f7'
  text-2: '#55707f'
  text-2-dark: '#9db4c3'
  accent: '#b85272'
  accent-dark: '#f0a3b6'
  accent-2: '#0f7dae'
  accent-2-dark: '#63c4ee'
  field-blue: '#0b6e9b'
  field-rose: '#a8375b'
  on-field: '#ffffff'
  shadow: 'rgb(0 0 0 / 0.28)'
  shadow-pressed: 'rgb(0 0 0 / 0.34)'
  shadow-lifted: 'rgb(0 0 0 / 0.3)'
typography:
  headword:
    fontFamily: 'Outfit, DM Sans, system-ui, sans-serif'
    fontSize: 'clamp(2.75rem, 7.5vw, 5rem)'
    fontWeight: 600
    lineHeight: 1
    letterSpacing: '-0.03em'
  act:
    fontFamily: 'Outfit, DM Sans, system-ui, sans-serif'
    fontSize: 'clamp(2rem, 4.6vw, 4rem)'
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: '-0.024em'
  claim:
    fontFamily: 'Outfit, DM Sans, system-ui, sans-serif'
    fontSize: 'clamp(1.75rem, 4.4vw, 3.25rem)'
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: '-0.028em'
  group:
    fontFamily: 'Outfit, DM Sans, system-ui, sans-serif'
    fontSize: 'clamp(1.5rem, 3vw, 2.4rem)'
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: '-0.024em'
  lede:
    fontFamily: 'Outfit, DM Sans, system-ui, sans-serif'
    fontSize: 'clamp(1.25rem, 2.2vw, 1.8rem)'
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: '-0.024em'
  intro:
    fontFamily: 'Outfit, DM Sans, system-ui, sans-serif'
    fontSize: 'clamp(1.125rem, 1.7vw, 1.35rem)'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: '-0.024em'
  name:
    fontFamily: 'Outfit, DM Sans, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: '-0.024em'
  body:
    fontFamily: 'DM Sans, system-ui, sans-serif'
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 'normal'
  caption:
    fontFamily: 'DM Sans, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 'normal'
  aside:
    fontFamily: 'DM Sans, system-ui, sans-serif'
    fontSize: '0.9375rem'
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 'normal'
  meta:
    fontFamily: 'DM Sans, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 'normal'
  control:
    fontFamily: 'DM Sans, system-ui, sans-serif'
    fontSize: '0.8125rem'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 'normal'
  control-tight:
    fontFamily: 'DM Sans, system-ui, sans-serif'
    fontSize: '0.78125rem'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 'normal'
  privacy-title:
    fontFamily: 'Outfit, DM Sans, system-ui, sans-serif'
    fontSize: 'clamp(1.9rem, 4.8vw, 3.25rem)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.024em'
  privacy-heading:
    fontFamily: 'Outfit, DM Sans, system-ui, sans-serif'
    fontSize: 'clamp(1.35rem, 2.6vw, 1.85rem)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.024em'
  privacy-intro:
    fontFamily: 'Outfit, DM Sans, system-ui, sans-serif'
    fontSize: 'clamp(1.125rem, 2vw, 1.4rem)'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: '-0.024em'
  entry-grammar:
    fontFamily: 'DM Sans, system-ui, sans-serif'
    fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)'
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: '0.01em'
rounded:
  hairline: '2px'
  swatch: '9px'
  action: '18px'
  card: '20px'
  device: '26px'
  pill: '999px'
spacing:
  gutter: 'clamp(1rem, 5vw, 4rem)'
  act: 'clamp(4rem, 12vh, 8rem)'
  group: 'clamp(3.5rem, 10vh, 7rem)'
  entry: 'clamp(1.25rem, 3vh, 2rem)'
  target: '44px'
  bar: '72px'
  bar-narrow: '128px'
components:
  action:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.surface}'
    typography: '{typography.name}'
    rounded: '{rounded.pill}'
    padding: '0.85rem min(2.1rem, 8vw)'
    height: '44px'
  action-hover:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.surface}'
    rounded: '{rounded.pill}'
  badge:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    typography: '{typography.aside}'
    rounded: '{rounded.pill}'
    padding: '0.6rem 1.1rem'
    height: '44px'
  badge-hover:
    backgroundColor: '{colors.surface-2}'
    textColor: '{colors.text}'
    rounded: '{rounded.pill}'
  frame:
    backgroundColor: '{colors.surface-2}'
    rounded: '{rounded.device}'
    width: '15rem'
  notice:
    backgroundColor: '{colors.surface-2}'
    textColor: '{colors.text}'
    rounded: '{rounded.card}'
    padding: 'clamp(1.25rem, 2.5vw, 1.75rem)'
  warning:
    backgroundColor: '{colors.field-rose}'
    textColor: '{colors.on-field}'
    rounded: '{rounded.card}'
    padding: 'clamp(1.25rem, 3vw, 2rem)'
  switch:
    backgroundColor: '{colors.surface-2}'
    textColor: '{colors.text}'
    typography: '{typography.control}'
    rounded: '{rounded.pill}'
    height: '50px'
  bar-link:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.text-2}'
    typography: '{typography.meta}'
    height: '44px'
    padding: '0 0.35rem'
---

# Design System: enGender landing

Recorded from the built site after redesign ticket 03, not from what the ticket
planned. Where the two differ the build wins, and two places are called out
below where it does.

## Overview

**Creative North Star: "the app's own sheet at poster scale"**

The site describes a local-first journal that one trans person wrote for other
trans people, and it used to look like a stranger to it. The app is flat:
colour arrives as flat ink, surfaces separate with a line rather than with
tonal elevation, and its one motif is the active pride flag drawn as concentric
rings off a corner of the home screen. The site was an aurora of drifting
blurred blobs with gradient headlines. This world is the app's, taken to a size
the app has no room for, and given the motion the app cannot afford - the app
has to stay a calm surface somebody opens on a bad day, and a landing page does
not.

The density is editorial rather than product-marketing: one column of type at a
real measure, acts separated by a great deal of air, and one picture-shaped
element per idea rather than a grid of cards. Nothing is boxed unless it is a
discrete thing a reader picks between. Confirmed rejections, all of them
things this build removed rather than tastes it happens to hold: no glass or
backdrop blur as decoration, no card-with-icon scaffolds, no kickers or eyebrows
above headings, no section numbering, and no phone mockup at an angle.

One gradient, and one only. The first record of this world said none, on the
reading that the app is flat - which is nearly true and not quite. The app makes
exactly one exception, for its primary button and the marks beside its section
titles, and the site's one action is the app's one action, so it takes the same
two-accent ramp. The build corrected the record here rather than the other way
round.

**Key Characteristics:**

- Flat ink, hairline separation, 20px card radius.
- Two kinds of colour that are never interchangeable: measured fields that take
  text, and raw flag stripes that never do.
- One gradient, on one action, and it wears the live flag.
- Outfit for display over DM Sans for reading, both self-hosted.
- One authored moment - the flag sun - and everything else quiet.

## Colors

Two palettes doing two different jobs, and the whole system depends on not
confusing them.

### Primary

`accent` is the app's own trans-palette accent, `#b85272` on light and `#f0a3b6`
on dark. Words never sit in it: at display sizes it measures 4.38:1 on the light
ground, so accent-coloured text uses `--accent-ink`, the accent carried 72% of
the way to the text colour.

The action does not use it directly any more. It wears `--grad-accent`, the
app's 120-degree two-accent ramp, with both colours taken from the *live flag* -
its two most saturated stripes - so the one thing to press changes colour with
the motif instead of staying one product colour while everything around it turns
over. The stripes are carried 40% toward `--text` first, which is what makes a
label safe on them: raw stripes include white, a bright yellow and a near-black,
and no single label colour holds on all of those. 40% is measured. Across all
eight flags in both themes the worst pair is 4.86:1 at 40% and 4.22:1 at 45%, so
45 fails; nonbinary's yellow and agender's grey are the two that go first.

The two colours are registered custom properties (`@property --flag-a`,
`--flag-b`) so they can be transitioned: the button changes colour and does not
move, which is the whole of its motion.

### Secondary

`accent-2` is the focus ring and the hover edge, not a second brand colour.

### Tertiary

The two ink fields, `field-blue` and `field-rose`, are the flag family deepened
until white holds 4.5:1 on them. Blue carries the privacy act; rose carries the
one warning a reader must not scroll past. A third and a fourth were drafted
from nonbinary's violet and agender's green and cut, because nothing needed
them and a field colour with no job is a palette with no opinion.

### Neutral

`paper`, `surface`, `surface-2`, `text`, `text-2`, copied value for value from
the Journal repository's trans palette, so a visitor following Start journal
lands on the same paper. The neutrals are cool and slightly blue, which is a
choice inherited rather than made here.

### Named Rules

**Ink does not change with the theme, only the paper does.** The theme tokens
flip between light and dark; the field inks and the flag stripes do not. A
field of `field-rose` is the same rose in both themes, the way the app's motif
stripes are the same stripes in both. It is why a full-bleed coloured section
needs its contrast checked once instead of twice, and it is what lets this site
be much more colourful than the app it describes.

**Two kinds of colour, and text may only sit on one.** The `field-*` tokens are
deepened, measured, and text sits on them in `on-field`. The eight flags' raw
stripes (`src/lib/flags.ts`) are vivid and unmeasured, and they appear only
where nothing reads on top of them: the motif, the section rules, the frames,
the swatches. A browser test asserts the motif overlaps no text, because this is
the one rule that can be broken invisibly.

**Colour never judges.** Inherited from the Journal's ADR-0012 and binding on
anything this site ever draws: no red for bad, no green for good, no diverging
ramp.

**Secondary text on a coloured surface is tinted from that surface, never
greyed.** On the blue field it is `on-field` mixed 92% with the field. Not less
than 92: at 86% it measured 4.59:1, which clears the floor and leaves the field
no room to be darkened later.

## Typography

Outfit sets everything a reader meets first - the headword, every heading, the
ledes, the action, channel names. DM Sans sets everything they read. Both are
self-hosted and split on unicode-range, so an English reader never downloads the
14kb of Latin Extended that only the Polish page needs.

Outfit is on the impeccable craft floor's list of overused display faces. It
stays for the only reason that counts: it is what the product itself is set in,
and a different face would make the site a stranger to the app again.

### Hierarchy

| Role | Face | Size | Weight |
| --- | --- | --- | --- |
| Headword | Outfit | `clamp(2.75rem, 7.5vw, 5rem)` | 600 |
| Act heading | Outfit | `clamp(2rem, 4.6vw, 4rem)` | 600 |
| Group heading | Outfit | `clamp(1.5rem, 3vw, 2.4rem)` | 600 |
| Claim | Outfit | `clamp(1.75rem, 4.4vw, 3.25rem)` | 500 |
| Lede, group intro | Outfit | `clamp(1.25rem, 2.2vw, 1.8rem)` | 500 |
| Body, entries | DM Sans | `1.0625rem` | 400 |
| Caption, channel note | DM Sans | `1rem` | 400 |
| Status, control label | DM Sans | `0.875rem` / `0.8125rem` | 400 |

Display tracking is `-0.024em` throughout, which is the app's own
`--display-track`: Outfit sets wide where the face it replaced did not. The
headword goes tighter at `-0.03em` because it is the one word set above 4rem.

### Named Rules

**The headword is the largest type on the page**, and the claim is smaller than
it. The splash is a definition before it is a pitch.

**Measure over scale.** Entries are capped at 48ch, prose at 52-54ch, ledes at
26-34ch. The second column of an entry list appears only where two full
measures fit, never at a fixed breakpoint.

## Layout

One column width for the whole page, `min(100%, 74rem)` with a
`clamp(1rem, 5vw, 4rem)` gutter. The ink fields bleed to the window and
re-establish the same column inside themselves, which is the only exception.

The splash is a two-column grid above 60rem: text in the first column, the
second holding no content at all. The second column exists so the motif has
somewhere to be, and capping the text to a *fraction of the sheet* rather than
to a rem width is what guarantees no word is ever painted on the raw stripes -
a rem cap stops capping at 200% text, which is how the definition once came to
measure 2.91:1 against the flag's blue.

Below 60rem the motif takes a band of its own above the sheet instead of
sitting behind it. Behind the text it can only ever be safe by arithmetic, and
the arithmetic breaks exactly when somebody turns their text up.

Acts are separated by `clamp(4rem, 12vh, 8rem)`, feature groups by
`clamp(3.5rem, 10vh, 7rem)`, entries by `clamp(1.25rem, 3vh, 2rem)`. There is
more space above a heading than below it throughout.

### Named Rules

**A picture sits next to the sentences it proves.** The eight screen frames are
distributed into the feature groups they illustrate rather than collected into a
strip of their own. Nothing on this page scrolls sideways.

**Presentation binds to a group's `id`, never to its position.** English has
seven feature groups and Polish five, so any index-based mapping is wrong on one
of the two pages by construction.

## Elevation & Depth

Almost none, deliberately. Surfaces separate with a 1px line at 19% of the text
colour, and 30% where a control has to hold its edge against a fill. There is no
elevation ramp and no tonal layering: that is the app's identity decision and
this site inherits it.

### Shadow Vocabulary

One shadow, on the one thing that presses. `0 6px 18px rgb(0 0 0 / 0.28)` at
rest, collapsing to `0 2px 6px rgb(0 0 0 / 0.34)` under a press.

### Named Rules

**A shadow is an absence of light in both themes.** Black at low alpha, not the
text colour at low alpha - derived from the text colour it inverts with the
theme, and a pale shadow under a pink button on a dark page is a glow.

**Elevation never changes without movement to explain it.** The shadow collapses
with the scale, together, on the same duration.

## Shapes

20px on every surface a section is built from, 18px on the action, 999px on
pills and badges, 9px on a palette swatch. Circles only for the motif's rings.
No hard offset shadows, no cut corners, no asymmetric radii: the first build
had asymmetric card corners inherited from the old world and they went with it.

## Components

### Buttons

One action, `Start journal`, appearing twice: in the splash and again where a
reader has just finished deciding. A solid block of `accent` with `on-accent`
type in Outfit, 18px radius, minimum 44px tall. Hover deepens to `accent-ink`
and lifts 2px; press scales to 0.97 and collapses the shadow.

### Chips

Channel badges in the splash: `surface` with a 1px `outline`, pill radius, a
line-art mark and the channel name. Hover moves to `surface-2` and lifts.

### The frames

Where the eight screenshots will go, one in each feature group whose sentences
it illustrates. A phone: a 26px device radius and a 4px bezel in that frame's
own flag colour, around a screen-shaped `surface-2`. The motif used to fill them
instead, which read as abstract art rather than as a place a picture goes, and
would have had to come out again when the screenshots land. An edge survives
that arrival.

### Cards / Containers

There are almost none. A feature is a sentence and sentences do not get boxes
drawn round them. The three that exist: the four care-surface leads, the careful
notice on `surface-2`, and the warning on `field-rose`. All 20px, all 1px
outlined except the warning, which is a filled field.

### Inputs / Fields

None. The site collects nothing.

### The bar

The site's chrome, fixed at the foot of the window rather than sticky at the
top. The controls are things a reader reaches for after they have read
something, and a header spent the top of every viewport on them - the most
valuable band on a page whose first screen is a dictionary entry.

It carries, left to right: the way back on any page that is not the landing
page, the portfolio and source links, the rights line, then the language and
theme switches pushed right. Opaque, hairline top edge, and the document
reserves `--footer-h` plus a line of air at its foot so nothing is ever under
it. Below 40rem the labels and the rights line leave the layout - not the
accessibility tree - and the switches take a row of their own, because squeezed
onto one line the switch halves measured 23.5px against a 44px floor.

### The flag sun

The signature component, and the app's own motif. One flat ring per stripe,
outermost first, centred on a corner so what reaches the page is an arc. The
ring count is fixed at the widest flag's seven, so a flag change animates
`transform` and `background-color` on a fixed set of nodes and never adds,
removes or resizes one. A flag with fewer stripes parks its spare rings on top
of the innermost, at its radius and in its colour, so they are invisible rather
than gone - parked at zero instead, they popped out of nothing when a wider flag
came round.

Both properties run on the same duration. They did not at first, and the
difference showed: a change between two flags with the same stripe count moves
no ring, so half the transitions were a fast colour swap with no wave in them
and looked like the animation had stopped.

The cycle is not gated on the motif being on screen. It drives every section
rule on the page as well, so gating it on one element's visibility stopped the
colour changing for a reader who had scrolled past the splash. It stops when the
tab is hidden, which is the guard that matters.

### The stripe rule

Every act heading hangs from one: the live flag's stripes laid flat. A flag
change sweeps the incoming flag over the outgoing one from the left on an
ease-out. Frames pin theirs to one flag and never sweep.

### The flag rail

The flag standing on end down the left margin, filling with scroll: a
reading-progress rail that is also the trans flag. Not rendered under reduced
motion, because it is movement tied to reading.

## Do's and Don'ts

### Do:

- Spend colour at page scale, in fields that own whole regions.
- Put a picture next to the sentences it proves.
- Cap a text column as a fraction of its container when a decorative element
  shares the space with it.
- Size a motif in px and vw. Its size is a fact about the viewport, not about
  the reader's text size.
- Give every infinite loop an off switch under reduced motion, not a shorter
  duration.
- Bind presentation to an id the copy carries, not to a position.

### Don't:

- Put text on a raw flag stripe. Ever.
- Reach for a gradient. The world is flat and the app has none.
- Use `--ease-overshoot` for anything but the motif's rings.
- Put a raw flag stripe behind a label. They go through the 40% mix first, and
  the mix ratio is measured, not chosen.
- Add a second colour where inversion would do: emphasis is paper knocked out
  of ink.
- Let a rem-based cap be the only thing standing between text and a decorative
  layer.

---

**Not canonized.** `--ease-overshoot`, `cubic-bezier(0.34, 1.45, 0.64, 1)`, is
flagged by the mechanical detector as bounce easing, which it is. It is in the
system because the brief pinned it by name and because it is scoped to exactly
one element, the motif's rings. It is recorded here as that element's curve and
not as an easing future surfaces may inherit; anything else on this site
decelerates on `--ease-out`. The Journal's own `--ease-spring` draws the
identical finding and was kept on the same reasoning.

**Also not canonized.** The Polish page's stale product name and its five
feature groups are a copy state, not a design decision. Nothing in this file
describes them, and the translation pass is free to change both without
touching anything here.
