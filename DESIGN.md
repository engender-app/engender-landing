---
name: engender landing
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
  field-flag-trans: '#f5a9b8 on #101820'
  field-flag-nonbinary: '#9354c4 on #ffffff'
  field-flag-genderfluid: '#c011d7 on #ffffff'
  field-flag-bisexual: '#0038a8 on #ffffff'
  field-flag-lesbian: '#ff9a56 on #101820'
  field-flag-pansexual: '#ffd800 on #101820'
  field-flag-rainbow: '#004cff on #ffffff'
  field-flag-agender: '#b9f484 on #101820'
  hairline: 'color-mix(in srgb, text 14%, transparent)'
  outline: 'color-mix(in srgb, text 19%, transparent)'
typography:
  headword:
    fontFamily: 'Outfit, Nunito, system-ui, sans-serif'
    fontSize: 'clamp(2.75rem, 7.5vw, 5rem)'
    fontWeight: 800
    lineHeight: 1
    letterSpacing: '-0.045em'
  act:
    fontFamily: 'Outfit, Nunito, system-ui, sans-serif'
    fontSize: 'clamp(2rem, 4.6vw, 4rem)'
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: '-0.04em'
  claim:
    fontFamily: 'Outfit, Nunito, system-ui, sans-serif'
    fontSize: 'clamp(1.75rem, 4.4vw, 3.25rem)'
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: '-0.04em'
  group:
    fontFamily: 'Outfit, Nunito, system-ui, sans-serif'
    fontSize: 'clamp(1.5rem, 3vw, 2.4rem)'
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: '-0.04em'
  lede:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 'clamp(1.25rem, 2.2vw, 1.8rem)'
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 'normal'
  intro:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 'clamp(1.125rem, 1.7vw, 1.35rem)'
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 'normal'
  name:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 750
    lineHeight: 1.3
    letterSpacing: 'normal'
  body:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: '1.0625rem'
    fontWeight: 450
    lineHeight: 1.6
    letterSpacing: 'normal'
  caption:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 450
    lineHeight: 1.55
    letterSpacing: 'normal'
  aside:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: '0.9375rem'
    fontWeight: 450
    lineHeight: 1.5
    letterSpacing: 'normal'
  meta:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 450
    lineHeight: 1.5
    letterSpacing: 'normal'
  control:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: '0.8125rem'
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 'normal'
  control-tight:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: '0.78125rem'
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 'normal'
  privacy-title:
    fontFamily: 'Outfit, Nunito, system-ui, sans-serif'
    fontSize: 'clamp(1.9rem, 4.8vw, 3.25rem)'
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: '-0.045em'
  privacy-heading:
    fontFamily: 'Outfit, Nunito, system-ui, sans-serif'
    fontSize: 'clamp(1.35rem, 2.6vw, 1.85rem)'
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: '-0.04em'
  privacy-intro:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 'clamp(1.125rem, 2vw, 1.4rem)'
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 'normal'
  entry-grammar:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)'
    fontWeight: 450
    lineHeight: 1.45
    letterSpacing: '0.01em'
rounded:
  block: '6px'
  track: '8px'
  device: '26px'
  pill: '999px'
  disc: '50%'
spacing:
  gutter: 'clamp(1rem, 5vw, 4rem)'
  act: 'clamp(4rem, 12vh, 8rem)'
  group: 'clamp(3.5rem, 10vh, 7rem)'
  entry: 'clamp(1.25rem, 3vh, 2rem)'
  target: '44px'
  bar: '72px'
  bar-narrow: '128px'
motion:
  ease-out: 'cubic-bezier(0.22, 1, 0.36, 1)'
  ease-out-soft: 'cubic-bezier(0.38, 0.32, 0.2, 1)'
  ease-press: 'linear(...) - a sampled spring, the app value verbatim'
  dur-fast: '150ms'
  dur-med: '240ms'
  dur-slow: '380ms'
  dur-press: '260ms'
  dur-authored: '700ms'
  dur-motif: '900ms'
  dur-rule-sweep: '1500ms'
  dur-breathe: '7s'
  dur-crossfade: '120ms'
  stagger-step: '50ms'
components:
  action:
    backgroundColor: '{colors.flag-accent}'
    textColor: '{colors.on-accent}'
    typography: '{typography.name}'
    rounded: '{rounded.block}'
    padding: '0.85rem min(2.1rem, 8vw)'
    height: '44px'
    elevation: 'none'
  action-hover:
    backgroundColor: '{colors.flag-accent}'
    textColor: '{colors.on-accent}'
    rounded: '{rounded.block}'
    transform: 'translateY(-2px)'
  badge:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    typography: '{typography.aside}'
    rounded: '{rounded.pill}'
    padding: '0.7rem 1.25rem'
    height: '52px'
  badge-hover:
    backgroundColor: '{colors.surface-2}'
    borderColor: '{colors.accent-2}'
    rounded: '{rounded.pill}'
  frame:
    backgroundColor: '{colors.surface-2}'
    rounded: '{rounded.device}'
    width: '15rem'
  notice:
    backgroundColor: 'none'
    textColor: '{colors.text}'
    rules: 'hairline above and below'
    padding: 'clamp(1rem, 2vw, 1.5rem) 0'
  lead:
    backgroundColor: 'none'
    textColor: '{colors.text-2}'
    rules: 'hairline above'
    padding: 'clamp(1rem, 2vw, 1.5rem) 0 0'
  warning:
    backgroundColor: '{colors.field-rose}'
    textColor: '{colors.on-field}'
    rounded: '{rounded.block}'
    padding: 'clamp(1.25rem, 3vw, 2rem)'
  switch:
    backgroundColor: '{colors.surface-2}'
    textColor: '{colors.text}'
    typography: '{typography.control}'
    rounded: '{rounded.track}'
    segmentRounded: '{rounded.block}'
    inset: '3px'
    height: '50px'
  bar-link:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.text-2}'
    typography: '{typography.meta}'
    height: '44px'
    padding: '0 0.35rem'
---

# Design System: engender landing

Recorded from the built site after redesign ticket 08, not from what the ticket
planned. Where the two differ the build wins, and three places are called out
below where it does.

**What superseded what.** Ticket 03 wrote the first version of this file on
2026-08-28, from the app as it then was. The app's phase 10 redesign landed in
its token layer on 2026-09-07 and kept moving to 2026-09-21, and six of the
premises ticket 03 argued from stopped being true: the gradient exception was
deleted from the app's palettes on 2026-09-09, the radius ramp collapsed to one
value, the elevation ramp retired, colour got a budget and a grammar
(ADR-0075 there), the motion default reversed (ADR-0078 there), and the reading
face turned out never to have been DM Sans at all - the app's `--font-body` has
been Nunito since its first commit, so that sentence was wrong the day it was
written rather than made wrong by a change. Ticket 08, on 2026-09-21, rebound
every one of those and rewrote this file. Ticket 03 stays `done` and stays the
record of how the site got its first coherent language; what it says about the
gradient, the radii, the shadows, the faces and the easing set is superseded
here.

## Overview

**Creative North Star: "the app's own sheet at poster scale"**

The site describes a local-first journal that one trans person wrote for other
trans people. The app is flat: colour arrives as flat ink, surfaces separate
with a line rather than with tonal elevation, and its one motif is the active
pride flag drawn as concentric rings off a corner of the home screen. This world
is the app's, taken to a size the app has no room for, and given the motion the
app cannot afford - the app has to stay a calm surface somebody opens on a bad
day, and a landing page does not.

The density is editorial rather than product-marketing: one column of type at a
real measure, acts separated by a great deal of air, and one picture-shaped
element per idea rather than a grid of cards. Nothing is boxed unless it is a
discrete thing a reader picks between. Confirmed rejections, all of them things
this build removed rather than tastes it happens to hold: no glass or backdrop
blur as decoration, no card-with-icon scaffolds, no kickers or eyebrows above
headings, no section numbering, and no phone mockup at an angle.

**No gradient anywhere, and no exception.** The first record of this world said
none, on the reading that the app is flat. Ticket 03 corrected that to "one, on
one action", because the app then made exactly one exception - its primary
button and the marks beside its section titles. The app deleted `--grad-accent`
from its palettes on 2026-09-09 and its kit now says colour arrives as flat fill
and as coloured text, never as a gradient, a glow or a veil. The site's last
gradient went with it, and `tests/site.test.mjs` asserts that no built file
paints through one.

**Key Characteristics:**

- Flat ink, hairline separation, one 6px corner.
- Two kinds of colour that are never interchangeable: measured fields that take
  text, and raw flag stripes that never do.
- One flat accent on one action, and it wears the live flag.
- Outfit at 800 for structure over Nunito for reading, both self-hosted, both
  the app's.
- No elevation at all.
- One authored moment - the flag sun - and two ambient loops, counted.

## Colors

Two palettes doing two different jobs, and the whole system depends on not
confusing them. None of the seven neutral and accent values moved when the app
redesigned itself, which is why ticket 08 was a change of language and not a
repaint.

### Primary

`accent` is the app's own trans-palette accent, `#b85272` on light and `#f0a3b6`
on dark. Words never sit in it: at display sizes it measures 4.38:1 on the light
ground, so accent-coloured text uses `--accent-ink`, the accent carried 72% of
the way to the text colour.

The action does not use it directly. It wears `--flag-accent`, one flat colour,
which is the *live flag's* own `--accent` as the app defines it for that
palette - so the one thing to press changes colour with the motif instead of
staying one product colour while everything around it turns over. The app picked
those eight to be sat on, and each clears 4.5:1 against `--on-accent` in both
themes; the tightest is nonbinary's 4.54 on light. It is a registered custom
property (`@property --flag-accent`) so it can be transitioned: the button
changes colour and does not move, which is the whole of its motion.

Two things were considered and not taken. The app's own Ink treatment for its
primary button - `--text` as ground and `--bg` as label - is a truer copy and
costs the action its colour entirely; both were rendered for sign-off and the
coloured one was kept. And the two-stop ramp of the flag's accent pair, which is
what this was before the gradient went.

### Secondary

`accent-2` is the focus ring and the hover edge, not a second brand colour.

### Tertiary

Three kinds of field, and they do different jobs.

`field-blue` and `field-rose` are the flag family deepened until white holds
4.5:1 on them. Blue carries the privacy act; rose carries the one warning a
reader must not scroll past. Both are fixed: they are the same colour whatever
flag is up and whichever theme is on.

`field-flag` is the splash's own, and it cycles. The app opens every door on a
solid band of the live flag's colour with the screen's title on it (its
ADR-0075), and the splash is this site's door, so it wears one - with the whole
entry on it rather than a title alone, which is Alicja's instruction for this
site (2026-09-22: "we treat it as a header basically"). The eight bands are the
app's own: the first inner band that is a colour and differs from the outermost,
with the rainbow taking its blue and bisexual its dark blue, both on her word
against a render. The ink is `#101820` or white, whichever measures higher.

One of the eight is not the app's value. Nonbinary's `#9C59D1` carries white at
4.41:1, which is exactly why the app forbids small text on a field; this site
sets a pronunciation line and a sense there, so that band is deepened 6% toward
black to `#9354C4` and 4.88:1 - the same margin genderfluid's purple already
has. The rest are verbatim.

### Neutral

`paper`, `surface`, `surface-2`, `text`, `text-2`, copied value for value from
the Journal repository's trans palette, so a visitor following Start journal
lands on the same paper. The neutrals are cool and slightly blue, which is a
choice inherited rather than made here.

### Named Rules

**Ink does not change with the theme, only the paper does.** The theme tokens
flip between light and dark; the field inks and the flag stripes do not. A field
of `field-rose` is the same rose in both themes, the way the app's motif stripes
are the same stripes in both. It is why a full-bleed coloured section needs its
contrast checked once instead of twice, and it is what lets this site be much
more colourful than the app it describes.

**Two kinds of colour, and text may only sit on one.** The `field-*` tokens are
deepened, measured, and text sits on them in `on-field`. The eight flags' raw
stripes (`src/lib/flags.ts`) are vivid and unmeasured, and they appear only
where nothing reads on top of them: the motif, the section rules, the frames,
the swatches. A browser test asserts the motif overlaps no text, because this is
the one rule that can be broken invisibly.

**At most one field per act, and a block only where a value sits on it.** The
app's ADR-0075 allows one field of flag colour per screen, at the top, with
blocks below it behind values, and nothing else coloured. A page eight acts long
cannot take a rule written for a screen, so the unit here is the act. What that
comes to on the built page: the privacy act is a field, the warning in the
support act is a block, and every other act is flush on the page. The site's own
rule, recorded here as such, and the divergence is in ADR-0003.

**Colour never judges.** Inherited from the Journal's ADR-0012 and binding on
anything this site ever draws: no red for bad, no green for good, no diverging
ramp.

**Secondary text on a coloured surface is tinted from that surface, never
greyed.** On the blue field it is `on-field` mixed 92% with the field. Not less
than 92: at 86% it measured 4.59:1, which clears the floor and leaves the field
no room to be darkened later.

**On the splash's field, every line is the full ink instead.** The same 92%
tint measures 4.38 on nonbinary and 4.29 on genderfluid, both under the floor,
because those two bands start at 4.88 rather than at the blue field's 9-odd. So
what separates the headword from the pronunciation line under it there is size
and weight, and nothing is held back.

## Typography

Outfit sets the page's structure: the headword, the claim, every act and group
heading, a page title, the wordmark in the footer. Nunito sets everything a
reader reads - body, ledes, group intros, captions, control labels and the
action's own label. That division is the app's rule 2 and not a taste: the
display face is for a screen's structure, content is set in the body face,
always. Before ticket 08 this site had Outfit under every lede and intro at
weight 500, which is the one place the two products looked unrelated at a
glance.

Both faces are self-hosted and split on unicode-range the way the app splits
them, so an English reader never downloads the Latin Extended files that only
the Polish page needs.

Outfit is on the impeccable craft floor's list of overused display faces. It
stays for the only reason that counts: it is what the product itself is set in,
and a different face would make the site a stranger to the app.

### Hierarchy

| Role | Face | Size | Weight |
| --- | --- | --- | --- |
| Headword | Outfit | `clamp(2.75rem, 7.5vw, 5rem)` | 800 |
| Claim | Outfit | `clamp(1.75rem, 4.4vw, 3.25rem)` | 800 |
| Act heading | Outfit | `clamp(2rem, 4.6vw, 4rem)` | 800 |
| Group heading | Outfit | `clamp(1.5rem, 3vw, 2.4rem)` | 800 |
| Lede, group intro | Nunito | `clamp(1.25rem, 2.2vw, 1.8rem)` | 600 |
| Content title, action | Nunito | `1.125rem` | 750 |
| Body, entries | Nunito | `1.0625rem` | 450 |
| Caption, channel note | Nunito | `1rem` | 450 |
| Status, control label | Nunito | `0.875rem` / `0.8125rem` | 450 / 600 |

The weights are the app's own: 450 regular, 600 where secondary text has to hold
its own, 750 for bold in the body face, 800 for the display face at every size,
which never sets less. Display tracking is `-0.04em`, the app's
`--display-track`, up from the `-0.024em` ticket 03 measured Outfit at; the two
strings that run past 48px - the headword and a page title - take the app's own
step tighter at `-0.045em`.

### Named Rules

**The headword is the largest type on the page**, and the claim is smaller than
it. The splash is a definition before it is a pitch.

**Measure over scale.** Entries are capped at 48ch, prose at 52-54ch, ledes at
26-34ch. The second column of an entry list appears only where two full measures
fit, never at a fixed breakpoint.

**A heading that names an act is Outfit; a heading that names a body of copy is
Nunito at 750.** The frame disclosure's `h3` and a channel's name are content
titles in the app's sense, and they are set as content.

## Layout

One column width for the whole page, `min(100%, 74rem)` with a
`clamp(1rem, 5vw, 4rem)` gutter. The ink fields bleed to the window and
re-establish the same column inside themselves, which is the only exception.

The splash is a two-column grid above 60rem: text in the first column, the
second holding no content at all. The second column exists so the motif has
somewhere to be, and capping the text to a *fraction of the sheet* rather than
to a rem width is what guarantees no word is ever painted on the raw stripes - a
rem cap stops capping at 200% text, which is how the definition once came to
measure 2.91:1 against the flag's blue.

Below 60rem the motif takes a band of its own above the sheet instead of sitting
behind it. Behind the text it can only ever be safe by arithmetic, and the
arithmetic breaks exactly when somebody turns their text up.

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

None. Not "almost none": no element on any page casts a shadow, and a test walks
every element on four pages to hold it there. Surfaces separate with a line -
`--hairline` at 14% of the text colour for a separator or the edge where a list
begins and ends, `--outline` at 19% for the outer edge of a surface that still
is one. That is the app's whole line vocabulary after its rule 4, and
`--outline-strong` at 30% retired with the app's own.

### The shadow that was built and taken out

Ticket 08 set out to give the foot bar the app's `--shadow-float`, on the
reasoning that the app keeps exactly one shadow and gives it to the chrome that
genuinely floats over content. It was built and then measured. The app's bar
floats over an inset content area on a phone; this one is welded to the foot of
the window across its full width with the page running up behind it, so the
shadow had to be turned upward to land on anything at all - and what it landed
on was the running text. It tinted `--bg` from `#F4F8FB` to `rgb(232 237 241)`
about ten pixels above the bar, which took `--text-2` from 4.90:1 to 4.44:1 and
through the floor, on a paragraph that sits in that band at rest on
`/en/privacy/` at 1280px. Content passes through that band at every scroll
position, so this was not an edge case a reader has to find. The bar keeps its
hairline and the site has no elevation, which is also the plainer reading of the
app's own rule: surfaces separate with a line, not a plane.

### Named Rules

**A line, never a plane.** Depth is not a tool this site has. What says a thing
is in front is its edge and, on the one control that presses, its movement.

## Shapes

6px on every surface this site builds: the action, the warning block, a swatch,
a control. 8px on the switch's track, which is the app's own concentric
exception - 8 around 6 at a 3px inset, so the corners stay concentric. 999px
where a shape is genuinely a capsule, which is the channel badges and nothing
else. 50% for the motif's rings. 26px on a phone frame, which survives the
budget because it is a drawing of a device rather than a surface of this site's,
and a phone has a corner radius out in the world.

That is five values where the build before ticket 08 had six of its own - 2, 9,
18, 20, 26, 999 - and each of the retired four was a different idea about how
soft this world is. No hard offset shadows, no cut corners, no asymmetric radii.
`tests/site.test.mjs` walks every corner on every page and fails on anything the
budget does not name.

## Components

### The action

One action, `Start journal`, appearing twice: in the splash and again where a
reader has just finished deciding. A solid block of the live flag's `--accent`
with `--on-accent` type in Nunito at 750, 6px, minimum 44px tall, no shadow.
Hover lifts it 2px; press scales to 0.97 on `--ease-press`, the app's sampled
spring, so it springs past and settles. Nothing else on the page is this, which
is what makes it unmistakably the thing to press without a word of urgency.

### Chips

Channel badges in the splash: `surface` with a 1px `outline`, pill radius, a
line-art mark and the channel name. Hover moves to `surface-2` and takes an
`accent-2` edge.

### The frames

Where the eight screenshots will go, one in each feature group whose sentences
it illustrates. A phone: a 26px device radius and a 4px bezel in that frame's own
flag colour, around a screen-shaped `surface-2`. Each frame's bezel follows the
live flag on the motif's own duration, a different stripe each and a little
later than the one before it.

### Flush copy: the leads and the notice

Neither is a card any more. The four care-surface leads are four cells held by
one hairline each, and the careful notice is a sentence between two hairlines
spanning its act. The app's rule 4 has three treatments - flush, a block of the
flag's colour with a value on it, or ink - and a box of surface colour is none
of them; its own notice went the same way when Alicja read a filled one as too
loud.

### Cards / Containers

One block on the whole site: the warning at the foot of the support act, on
`field-rose` at 6px. A feature is a sentence and sentences do not get boxes
drawn round them.

### Inputs / Fields

None. The site collects nothing.

### The splash's field

The site's door, and its one field. A full-bleed band of the live flag's own
colour carrying the entry, the claim and the subheadline, with the sun drawn on
its top-right corner and clipped by it. Its colour is a registered property, so
it travels with the flag over `--dur-motif` rather than switching, and the
header changes colour on the same clock as the sun drawn on it. Square, not
rounded: the site's fields bleed to the window, so there is no corner to round.

The action and the channel badges sit under it on the page, which is where the
app puts what a person operates as well. The arithmetic says the same thing: the
action is painted in the live flag's accent and the field is that flag's own
band, and across the eight those two measure as little as 1.26:1 apart, so a
button on the field would be a shape nobody could find.

### The bar

The site's chrome, fixed at the foot of the window rather than sticky at the
top. The controls are things a reader reaches for after they have read
something, and a header spent the top of every viewport on them - the most
valuable band on a page whose first screen is a dictionary entry.

It carries, left to right: the way back on any page that is not the landing
page - the app's mark and the site's name - the Guide, the portfolio and source
links, the rights line, then the language and theme switches pushed right.
Opaque, hairline top edge, no shadow, and the document reserves `--footer-h`
plus a line of air at its foot so nothing is ever under it. Below 40rem the
labels and the rights line leave the layout - not the accessibility tree - and
the switches take a row of their own, because squeezed onto one line the switch
halves measured 23.5px against a 44px floor.

### The mark

The app's own, copied from `../gender-diary/brand/mark/` as files rather than
redrawn: `static/mark.svg` and two PNG renders. It is the tab's icon, the
install icon, and the one drawn element on the social card; in the page it
appears once, at 24px beside the site's name in the foot bar. It is generated
in the app repository from the geometry Alicja signed off on 2026-09-21
(ADR-0088 there), so a change is made there and re-copied here.

**The mark does not move, anywhere, ever**, and nothing recolours it: it is the
trans tile in both themes and under every flag the rest of the page is wearing.

### The flag sun

The signature component, and the app's own motif. One flat ring per stripe,
outermost first, centred on a corner so what reaches the page is an arc. The
ring count is fixed at the widest flag's seven, so a flag change animates
`transform` and `background-color` on a fixed set of nodes and never adds,
removes or resizes one. A flag with fewer stripes parks its spare rings on top
of the innermost, at its radius and in its colour, so they are invisible rather
than gone - parked at zero instead, they popped out of nothing when a wider flag
came round.

Both properties run on `--dur-motif` and on `--ease-out`. They did not at first,
and the difference showed: a change between two flags with the same stripe count
moves no ring, so half the transitions were a fast colour swap with no wave in
them and looked like the animation had stopped. Every change also runs a pulse,
each ring dipping and returning on the same per-ring delay, so the wave happens
whether or not any radius changed.

The cycle is not gated on the motif being on screen. It drives every section
rule on the page as well, so gating it on one element's visibility stopped the
colour changing for a reader who had scrolled past the splash. It stops when the
tab is hidden, which is the guard that matters.

### The stripe rule

Every act and group heading hangs from one: the live flag's stripes laid flat,
3px, square-ended, which is the app's own section rule drawn in eight colours
instead of one ink. A flag change sweeps the incoming flag over the outgoing one
from the left on `--ease-out-soft`, the app's curve for a long edge setting off.
Frames pin theirs to one flag and never sweep.

### The flag rail

The flag standing on end down the left margin, filling with scroll: a
reading-progress rail that is also the trans flag. Not rendered under reduced
motion, because it is movement tied to reading.

## Motion

The durations, the curves and the tier names are the app's own, copied from its
`src/lib/theme/base.css`, and the default is the app's ADR-0078: **a change of
state moves, and a surface that sits still through a change has to say why.**
Ticket 03 ran on the reverse of that.

| Tier | Duration | Curve | What it is |
| --- | --- | --- | --- |
| 1 | `--dur-press` 260ms | `--ease-press` | the action answering a press |
| 2 | `--dur-fast` 150ms / `--dur-med` 240ms | `--ease-out` | something leaving / arriving |
| 3 | `--dur-slow` 380ms | `--ease-out` | a change inside one region |
| 0 | `--dur-authored` 700ms | `--ease-out` | the splash's entrance |
| 0 | `--dur-motif` 900ms | `--ease-out` | a flag change, ring by ring |
| 0 | `--dur-rule-sweep` 1500ms | `--ease-out-soft` | a flag sweeping over a rule |

**The ambient budget is two loops**, which is one more than the app's two only
in what it drives: the sun's 7s breath, and the 6s flag cycle, which moves the
motif, every section rule and the action's colour together as one event. The app
holds itself to its sun's breath and its mood faces' gaze; this page is allowed
more because the brief asks for a page that leaves a visitor suspecting an
animator built it, and the number is two rather than left uncounted.

### Named Rules

**No yanks.** Nothing is painted at its destination before it travelled there,
and there is no frame in which something is in neither place. Asserted rather
than judged: `tests/site.test.mjs` samples the action's fill and every ring's
transform on every animation frame across a flag change and fails a property
that reaches its new value in one frame.

**Blocks clip, text rises.** A block arrives by uncovering from its own edge and
never fades up from nothing, which is the app's rule for a solid object on a
flat page; running text arrives on a 20px rise. The wipe used to start at 0.4
opacity, which was exactly the fade that rule forbids.

**Every infinite loop has an off switch under reduced motion, not a shorter
duration.** A 1ms infinite loop is a strobe.

**Elevation never changes, so nothing has to explain it.** The press is the
whole of the action's answer.

## Do's and Don'ts

### Do:

- Spend colour at page scale, in fields that own whole regions, one to an act.
- Put a picture next to the sentences it proves.
- Cap a text column as a fraction of its container when a decorative element
  shares the space with it.
- Size a motif in px and vw. Its size is a fact about the viewport, not about
  the reader's text size.
- Set structure in Outfit at 800 and everything a person reads in Nunito.
- Bind presentation to an id the copy carries, not to a position.
- Name the app's file and value in a comment beside anything copied from it.

### Don't:

- Put text on a raw flag stripe. Ever.
- Reach for a gradient. The world is flat and the app has none.
- Reach for a shadow. There is no elevation here and the one that was tried is
  measured above.
- Add a corner the budget does not name.
- Set a lede, a caption or a button label in the display face.
- Add a second colour where inversion would do: emphasis is paper knocked out
  of ink.
- Let a rem-based cap be the only thing standing between text and a decorative
  layer.

---

**Reference.** Composition and rhythm were checked at poster scale against
[Wise](https://mobbin.com/sites/sections/60a7108e-7961-402b-b337-c97179c21f4c)
for a flat ground carrying oversized display type at one weight,
[SSENSE](https://mobbin.com/sites/sections/4de98a06-dbff-4e54-83c6-a301c519bba0)
for an editorial headline over a hairline control,
[Shop](https://mobbin.com/sites/sections/a7b1096b-331c-4a63-9a4d-f33edd5d13d6)
for flush columns divided by a single rule, and
[Bird](https://mobbin.com/sites/sections/eceea3fd-3cb1-4ff5-9758-a8f977ae1f20)
for a feature grid held by hairlines alone, which is what the four care-surface
leads became.

**Not canonized.** Nothing. `--ease-overshoot` used to be recorded here as the
one curve outside the system, scoped to the motif's rings; ticket 08 removed it,
because the app has no overshoot easing to justify it and the rings decelerate
on `--ease-out` like everything else.

**Also not canonized.** The Polish page's stale product name and its five
feature groups are a copy state, not a design decision. Nothing in this file
describes them, and the translation pass is free to change both without touching
anything here.
