# Guide copy, English: Look back

Source copy for the Guide's chapter on the app's third tab, written by guide
ticket 03.

**What is copy and what is not.** Same rule as `landing.md` and `privacy.md`:
everything inside a blockquote is the copy, everything outside one is commentary,
and the italic marker above a blockquote says whether it may be published
(docs/adr/0001). The catalogue carries the rendered strings under
`guide.chapters.stats.sections`.

**Sources.** The Journal's `SCREENS.md` ("The four doors", Look back door:
`/stats`, `/stats/[reading]`, `/wrapped/[cadence]`, `/on-this-day`,
`/body-map`, `/tally`, `/compare`), `CONTEXT.md` ("Wrapped", "Wrapped card",
"Era"), ADR-0081 for the body map, and the tile list in the Journal's
`src/routes/stats/+page.svelte` for which readings the grid holds and in what
order. Reading names are the English catalogue's.

**Look back, not Stats.** The tab was renamed in the Journal's phase 10
(ADR-0072); the route stays `/guide/stats/`. The ticket's "correlation cards"
and "trend chart" are gone as such: the readings grid replaced them, with
"Tags, and how a scale moved" absorbing the old tag-insight cards and "Day by
day" standing where the trend chart was.

**Tally is not a tile.** It lights the Look back tab but is reached from a
tally mark on a day or a chart rather than from the grid, so the chapter does
not say where it opens from.

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

---

## The chapter

### Choosing a stretch

*Gate: shipped.*

> Look back is the third tab. Everything on it reads one stretch of time, which
> you choose on the timeline at the top: drag its two ends, or pick a stretch
> from the list. The timeline also shows your eras, milestones, regimen,
> tryouts and surgeries, and tapping one picks its dates.
>
> Just under the timeline are the plain facts for that stretch: how many
> entries, the average on a scale, which scale moved the furthest, and how
> many days fell at each mood.

### Readings

*Gate: shipped.*

> Below that is a grid of readings. Each tile shows one figure for the stretch,
> and tapping it opens the full reading. A tile with nothing to show for the
> stretch is left out.
>
> **Day by day.** One scale or your mood across the stretch, day after day. You
> can add a second scale to it.
>
> **Two scales at once.** Each day as a point on two scales, which you can play
> through in order.
>
> **What you write about.** The tags you used most in the stretch, on every day
> or only on good days.
>
> **Tags, and how a scale moved.** Which tags came with a scale going up or
> down.
>
> **Body map.** How each part of the body has felt over the stretch, towards
> dysphoria or towards euphoria.
>
> **Compare periods.** Two periods side by side. It starts with your stretch
> against the same length of time just before it.
>
> **Tally.** How often you were misgendered and how often people got it right,
> over time. Quick add adds to either count from any screen.
>
> **What it cost.** What you recorded spending in the stretch, by area and by
> whether it was refunded. Each currency keeps its own total.

### Wrapped and On this day

*Gate: shipped.*

> Two more tiles sit under the grid. You can turn either one off in Settings.
>
> **Wrapped.** A look back at a finished week, month or year: entries, mood,
> the scale that moved furthest, tags, milestones, photos and letters.
>
> **On this day.** A good day from a month, six months, a year or more years
> ago, or a day with a letter written or opened on it. A day that went badly
> and has no letter is not brought back.
