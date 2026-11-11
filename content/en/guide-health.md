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

> The fourth tab, Transition, has five groups: Health, Body, Steps, Support and
> Media. Search at the top finds a row by name and searches the text of your
> journal.
>
> This chapter covers the first two groups, Health and Body.

### Meds

*Gate: shipped.*

> Meds is where your medication lives. Each drug in a running regimen gets its
> own lane. The timeline marks your latest lab draw. For each regimen, Meds
> shows the dose and route, your last dose, when the next one is expected, how
> much you have left with the projected run-out day, and how much of the drug
> you took in the last 90 days.
>
> **Regimen.** What you take, how and how often, from the day you started. Tap
> a lane to change it. You can pause a regimen or end it, and it stays in your
> history. If you switch it on, a schedule records an expected dose as taken
> after that day ends. You can correct it or mark it skipped.
>
> **Dose log.** Every dose taken, skipped or changed, at the time it happened.
> You can read it as logged or against the schedule.
>
> **Lab results.** Your results, as you entered them. Import from photo reads a
> lab slip from your camera or gallery. The photo is read on your device, and
> the result keeps the slip's own value and unit. Results in different units
> stay on separate lines.
>
> **Medication stock.** A count you enter now and then. Logged doses feed the
> estimate of what is left and the projected run-out day, and the app tells you
> when stock is running low.

### Cycle

*Gate: shipped.*

> Cycle logs a period, spotting, or nothing this month. The row only shows
> while a testosterone regimen is running, or once you turn on Cycle tracking
> in Settings.

### Surgery journey

*Gate: shipped.*

> Each surgery gets its own journey, named however you like. It holds the
> consults before it, the date once you have one, and afterwards a day count,
> photos, notes and your own checklist.
>
> Dilation becomes a row of its own once a surgery calls for it. Type in the
> schedule your surgeon gave you and log your sessions against it.

### Appointments

*Gate: shipped.*

> Appointments opens on your next visit and how far away it is. Under it is What
> to raise, your list of things to bring up, which carries over from one visit
> to the next.
>
> At the visit, In the room goes through your questions one at a time, with
> space for what they said. Past visits are under Behind you, and the app asks
> how each one went. An appointment can also wait without a date: Waiting lists
> keeps referrals, the day you were referred, dated updates and how long you
> have waited, and never guesses when you will be seen. Who you see holds your
> own notes on the people you go to, and an appointment can name one of them.
>
> The clinician visit summary is a page to print for a doctor, for dates you
> choose. It can include your regimen, cumulative exposure, lab results, side
> effects, the changes you noticed and procedures, and you pick which sections
> go in. You see it exactly as it will print. Open it from Meds or from
> Appointments.

### Progress photos

*Gate: shipped.*

> Body is the second group, and Progress photos is its first row. It keeps
> photos taken in the same pose. Pick two and drag the divider across them to
> compare an earlier one with a later one.

### Changes you've noticed

*Gate: shipped.*

> Pick a change from the list or add your own, and mark the day you first
> noticed it. Side effects go here too, each with how strong it was, from 1 to
> 5, and whether it is ongoing or resolved. The more private categories, such
> as genital and sexual changes, start switched off.
>
> What the literature says shows when a change is usually reported, taken from
> SOC8 or the studies it cites.
>
> **Hair progress.** What your hair is doing, in your own words, with photos
> taken from the same angle.

### Hair removal

*Gate: shipped.*

> Hair removal logs electrolysis and laser sessions, with the area, method, how
> long it took, pain if you want to note it, cost, provider and photos. The
> screen shows how long it has been since the last one.

### Wear log

*Gate: shipped.*

> Wear log is for binder, tucking and compression wear. Start a timer, or fill
> in a session afterwards, with a note on comfort or pain. You can set a
> reminder for a number of hours you choose. With a binder, a quiet cue appears
> at eight hours, and you can turn it off. The screen also shows the hours worn
> each week.
>
> Binder safety guidance and its sources are on the same screen.

### Voice

*Gate: shipped.*

> Voice has four tabs: Benchmark, Practise, Compare and Recordings.
>
> A benchmark is a take made the same way every time: you read the same passage
> and hold the same three vowels. That keeps takes months apart comparable.
> It shows figures such as pitch and speaking rate, and Compare puts two
> benchmarks side by side. It gives no verdict on your voice.

### What Health and Body do not do

*Gate: shipped.*

> Nothing in these two groups says whether a number is good or bad, suggests a
> dose or tells you what to do. They keep what you enter and draw it.
