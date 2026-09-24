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

---

## The chapter

### What Today shows

*Gate: shipped.*

> Today is the first tab, and the app opens on it. It is about what is going on
> now and what is next.
>
> **Live tiles.** Things running right now, such as a wear timer or a dose that
> is due. A tile shows up when there is something to say and goes once it is
> dealt with.
>
> **Coming up.** Dated things in the next thirty days: appointments, surgery
> dates, milestones, letters due to open and doses on a schedule that is not
> daily. It shows three and folds the rest, and it is not there at all when
> nothing is coming.
>
> **Notices.** Short reminders you can dismiss, such as an old backup or a
> medication running low.
>
> **How is today?** Five moods, from awful to great. Picking one starts
> today's entry.
>
> **Pinned.** The parts of the app you keep on Today. Each row says what is
> next when there is something, and when you last logged it otherwise.
>
> A new journal also has a Getting started section, with a few things worth
> setting up early. You can ignore them and just write.

### Arranging Today

*Gate: shipped.*

> Tap Arrange these rows to choose what is pinned and in what order, which kinds
> of date Coming up shows, and which live tiles can appear. The first set of
> pins comes from the areas you picked during setup. After that, the app never
> pins or moves anything by itself.

### Quick add

*Gate: shipped.*

> The button in the middle of the bottom bar is quick add. It works from any
> screen and opens a fan of options: the five moods, an entry for an earlier
> day, the two tally counters, a dose, and starting or stopping a wear session.
> Screens that log something keep their own add button as well.

### Where an entry goes

*Gate: shipped.*

> An entry started from Today, from quick add or from Journal is the same kind
> of entry. Journal shows it on its day, and Look back counts it with the rest.
