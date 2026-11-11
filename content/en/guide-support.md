# Guide copy, English: Support

Source copy for the Guide's Support chapter, one of the four groups on the app's
Transition tab, written by guide ticket 04. A reference for somebody using the
app, so it names what is on the screen and what it does, and stops.

**What is copy and what is not.** Same rule as `landing.md` and `privacy.md`:
everything inside a blockquote is the copy, everything outside one is commentary,
and the italic marker above a blockquote says whether it may be published
(docs/adr/0001). The catalogue carries the rendered strings under
`guide.chapters.support.sections`.

**Sources.** The Journal's `SCREENS.md` ("The Transition door's four groups", the
Support table and `/doubt` (Safe Space)), `CONTEXT.md` ("Safe space",
"Counterevidence pool", "Comfort list", "Resource directory"), `PRODUCT.md` and
the English catalogue for on-screen labels. `docs/ui-copy.md`'s never-list holds:
nothing here interprets a value, calls a number good or bad, or suggests a dose.

**Health, Steps, Support and Media, not Body, Health, Transition and Practice.**
The ticket was written against an older More hub. The Journal now calls the fourth
tab Transition and groups it into these four (`hubRows.ts`). Body closed when
measurements moved into Health; wear, hair removal and voice went to Steps; Safe
space and the resource directory went to Support; photos got Media. The effects
timeline is now changes you've noticed, on Care, and presentations are modes in
Settings, so neither has a place here. The routes follow the app's groups.

**Left out on purpose.** The Safe space nudge live tile, and how the
counterevidence pool qualifies an entry beyond "a good tag or a star".

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

---

## The chapter

### Time-capsule letters

*Gate: shipped.*

> Support is the fourth group on the Transition tab. It holds Time-capsule
> letters, Safe space, and Support and resources.
>
> Write a letter to yourself and pick the day it opens. It stays sealed until
> then, and after that you can read it whenever you like. Letters about to open
> show on Today, under Coming up.

### Safe space

*Gate: shipped.*

> Safe space is for the moments when dysphoria is too much. At the top is
> Things that help, your own list: who to text, which walk, which song. It
> starts empty. Under it is box breathing.
>
> Below the breathing are two rows. Support and resources opens the directory
> described below. Good moments shows past entries you tagged as good, or
> starred, and appears once you have one.
>
> Opening Safe space writes nothing to your journal.

### Support and resources

*Gate: shipped.*

> Support and resources lists helplines and support organisations in two
> groups: Poland, and UK and US. Each has a line on what it offers and a number
> or an address, and there is some reading as well. It comes with the app, so
> you can read it with no signal. Some of the helplines are general ones, open
> to anyone. Emergency numbers such as 112 are not on the list.
>
> The screen says when the entries were last checked. Tapping a number or an
> address hands it to your phone or browser, which leaves the app.
