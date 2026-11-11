# Guide copy, English: Health

Source copy for the Guide's Health chapter, one of the four groups on the app's
Transition tab, written by guide ticket 04. A reference for somebody using the
app, so it names what is on the screen and what it does, and stops.

**What is copy and what is not.** Same rule as `landing.md` and `privacy.md`:
everything inside a blockquote is the copy, everything outside one is commentary,
and the italic marker above a blockquote says whether it may be published
(docs/adr/0001). The catalogue carries the rendered strings under
`guide.chapters.health.sections`.

**Sources.** The Journal's `SCREENS.md` ("The Transition door's four groups", the
Health table, "Hosted, not drawn on the hub itself" and "Reached from `/care`"),
`CONTEXT.md` ("Regimen episode", "Dose event", "Dose schedule", "Medication
stock", "Run-out projection", "Hormone curve", "Analyte", "Lab series", "Side
effect", "Cycle event", "Personal effect", "Hair staging", "Measurement type",
"Size record", "Procedure", "Recovery log", "Taper", "Appointment"), `PRODUCT.md`
and the English catalogue for on-screen labels. `docs/ui-copy.md`'s never-list
holds: nothing here interprets a value, calls a number good or bad, or suggests a
dose.

**Health, Steps, Support and Media, not Body, Health, Transition and Practice.**
The ticket was written against an older More hub. The Journal now calls the fourth
tab Transition and groups it into these four (`hubRows.ts`). Body closed when
measurements moved into Health; wear, hair removal and voice went to Steps; Safe
space and the resource directory went to Support; photos got Media. The effects
timeline is now changes you've noticed, on Care, and presentations are modes in
Settings, so neither has a place here. The routes follow the app's groups.

**Left out on purpose.** The dose-log attribution rules for concurrent regimens,
the fitted band versus the illustrative shape on the hormone curve, dosing context
on a lab result, unit conversion, and the published windows drawn behind changes
you've noticed. Those details go beyond finding your way around.

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

---

## The chapter

### The Transition tab

*Gate: shipped.*

> The fourth tab has five groups: Health, Body, Steps, Support and Media. Search at the top finds a row by name. This chapter covers Health and Body. Nothing in them says whether a number is good or bad, or suggests a dose.

### Meds

*Gate: shipped.*

> Each drug in a running regimen gets a lane with its dose, your last and next dose, what you have left with the projected run-out day, and the total for the last 90 days. The timeline marks your latest lab draw.
>
> **Regimen.** What you take, how and how often. You can pause or end it, and it stays in your history. A schedule can record expected doses as taken, and you can correct one or mark it skipped.
>
> **Dose log.** Every dose taken, skipped or changed.
>
> **Lab results.** Typed in, or read on your device from a photo of the slip, keeping the slip's own units.
>
> **Medication stock.** A count you enter now and then. Logged doses keep the estimate going.

### Cycle

*Gate: shipped.*

> A period, spotting, or nothing this month. The row shows while a testosterone regimen is running, or once you turn on Cycle tracking in Settings.

### Surgery journey

*Gate: shipped.*

> Each surgery holds its consults, the date, and afterwards a day count, photos, notes and a checklist. Dilation becomes a row of its own once a surgery calls for it, with your surgeon's schedule and your sessions.

### Appointments

*Gate: shipped.*

> Appointments opens on your next visit. What to raise is your list of things to bring up, and In the room goes through it at the visit, with space for the answers. Past visits are under Behind you. Waiting lists keeps referrals that have no date yet and how long you have waited. Who you see holds your notes on the people you go to.
>
> The clinician visit summary is a page to print for a doctor. You pick the dates and the sections.

### Body

*Gate: shipped.*

> **Progress photos.** Photos in the same pose. Pick two and drag the divider to compare them.
>
> **Changes you've noticed.** Pick a change or add your own, with the day you first noticed it. Side effects go here too, with a strength from 1 to 5. The more private categories start switched off. Hair progress is here as well.
>
> **Hair removal.** Electrolysis and laser sessions: area, method, length, pain, cost, provider and photos.
>
> **Wear log.** Binder, tucking and compression wear, by timer or filled in afterwards. With a binder, a cue appears at eight hours. Binder safety guidance is on the same screen.
>
> **Voice.** A benchmark is the same passage and the same three vowels every time, so takes months apart can be compared. It shows figures such as pitch and gives no verdict on your voice.
