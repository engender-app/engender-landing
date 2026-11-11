# Guide copy, English: Today

Source copy for the Guide's chapter on the app's first tab, written by guide
ticket 03. A reference for somebody using the app, so it names what is on the
screen and what it does, and stops.

**What is copy and what is not.** Same rule as `landing.md` and `privacy.md`:
everything inside a blockquote is the copy, everything outside one is commentary,
and the italic marker above a blockquote says whether it may be published
(docs/adr/0001). The catalogue carries the rendered strings under
`guide.chapters.home.sections`.

**Sources.** The Journal's `SCREENS.md` ("The four doors", "Logging something
without leaving what you're doing", "Today's front page is pinned and arranged
in one place", `/` (Today), Chrome: quick add), `CONTEXT.md` ("Agenda", "Pinned
row", "Quick add", "Entry") and the English catalogue for on-screen labels
("How is today?", "Coming up", "Pinned", "Arrange these rows").

**Today, not Home.** The ticket was written against an older app with a Home
tab carrying a mood pick, a look-back teaser, milestones and recent entries.
The Journal's phase 10 renamed the tabs Today, Journal, Look back and
Transition (ADR-0072). The look-back teaser moved to Look back, recent entries
live on Journal, and milestones reach Today as pinned rows or agenda items. The
chapter follows `SCREENS.md` and the app's own tab name; the route stays
`/guide/home/`.

**Left out on purpose.** The HRT-onset effects nudge in quick add (only there
for a limited window, and explained better in the Health chapter), the
coming-back screen, Safe Space (the Practice chapter's), and what disguise
hides.

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

---

## The chapter

### What Today shows

*Gate: shipped.*

> Today is the first tab, and the app opens on it. The gear at the top opens Settings.
>
> **Live tiles.** Things running right now, such as a wear timer or a dose that is due.
>
> **Coming up.** Dated things in the next thirty days: appointments, surgery dates, milestones, letters due to open and doses that are not daily. It shows three and folds the rest.
>
> **How is today?** Five moods. Picking one opens a new entry with that mood chosen.
>
> **Notices.** Reminders you can dismiss, such as an old backup or a medication running low.
>
> **Pinned.** The parts of the app you keep on Today, each with what is next or when you last logged it.
>
> A new journal also has a Getting started section. You can ignore it and just write.

### Arranging Today

*Gate: shipped.*

> Arrange these rows chooses what is pinned, in what order, and which live tiles can appear. A new journal starts with a few rows pinned. After that the app never pins or moves anything by itself.

### Quick add

*Gate: shipped.*

> The button in the middle of the bottom bar is quick add. It works from any screen: the five moods, an entry for an earlier day, the two tally counters, a dose while a regimen is running, and starting or stopping a wear session.
