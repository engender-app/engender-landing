# Guide copy, English: Steps

Source copy for the Guide's Steps chapter, one of the four groups on the app's
Transition tab, written by guide ticket 04. A reference for somebody using the
app, so it names what is on the screen and what it does, and stops.

**What is copy and what is not.** Same rule as `landing.md` and `privacy.md`:
everything inside a blockquote is the copy, everything outside one is commentary,
and the italic marker above a blockquote says whether it may be published
(docs/adr/0001). The catalogue carries the rendered strings under
`guide.chapters.steps.sections`.

**Sources.** The Journal's `SCREENS.md` ("The Transition door's four groups" and
the Steps table), `CONTEXT.md` ("Milestone", "Era", "Tryout", "Felt-sense entry",
"Voice benchmark", "Wear session", "Roadmap track", "Roadmap goal", "Country
pack", "Time-capsule letter"), `PRODUCT.md` and the English catalogue for on-
screen labels. `docs/ui-copy.md`'s never-list holds: nothing here interprets a
value, calls a number good or bad, or suggests a dose.

**Health, Steps, Support and Media, not Body, Health, Transition and Practice.**
The ticket was written against an older More hub. The Journal now calls the fourth
tab Transition and groups it into these four (`hubRows.ts`). Body closed when
measurements moved into Health; wear, hair removal and voice went to Steps; Safe
space and the resource directory went to Support; photos got Media. The effects
timeline is now changes you've noticed, on Care, and presentations are modes in
Settings, so neither has a place here. The routes follow the app's groups.

**Left out on purpose.** The voice pitch ranges (ADR-0059), the benchmark's
quality floor, the reasons tucking and compression get no duration cue (ADR-0064),
and the roadmap's individual Polish goals, which belong to the app.

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

---

## The chapter

### The roadmap

*Gate: shipped.*

> Steps is the third group on the Transition tab. It holds the transition
> roadmap, milestones and tryouts.
>
> The roadmap comes with two groups of steps, each behind its own switch.
> Social and presentation has eight steps, such as telling family, your name
> and pronouns, clothes and voice. Polish legal steps holds the Polish legal
> procedure for changing the sex marker, and is on by default when the app is
> in Polish.
>
> After the ruling, Name and document changes lists the institutions to update,
> such as PESEL, your ID card, passport, bank and employer, and you can add
> your own. Each one records when you submitted the change, how long you have
> been waiting and when it was done, with the documents filed under it.
>
> Steps can be done in any order. Tick a step once it is done, or mark it not
> my path. You can hide a step you do not need and bring it back later. With
> Offer a milestone switched on, ticking a step asks whether to add it to your
> milestones.
>
> You can add categories of your own with steps in them, whether the built-in
> groups are on or not, and file documents against a step.
>
> The roadmap describes the procedure and never says what to do in your own
> case. It shows the date its content was last checked against its sources.

### Milestones and eras

*Gate: shipped.*

> A milestone is a day that mattered, or will. One still ahead counts down, and
> one behind you comes back each year as an anniversary. You can choose whether
> it is celebrated when the day comes.
>
> Eras are stretches of time you name yourself, such as "before I knew". They
> show as bands behind your milestones, and Look back can use one as its
> stretch. You make and edit them in Settings.

### Tryouts

*Gate: shipped.*

> A tryout is something you are trying: a name, pronouns, a style or makeup. It
> has a start date and, once you stop, an end date. Note how it feels as often
> as you like, on the tryout itself or in an entry, and add photos. Several can
> run at once. If one sticks, you can adopt it: the tryout ends, and a name you
> adopt can become the name the app calls you.
