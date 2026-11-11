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

> Look back is the third tab. Everything on it reads one stretch of time, chosen on the timeline at the top: drag its ends, pick from the list, or tap an era, milestone, regimen, tryout or surgery shown on it.
>
> Under the timeline are the basic figures: entries, the average on a scale, the scale that moved furthest, and days at each mood.

### Readings

*Gate: shipped.*

> Each tile shows one figure for the stretch and opens the full reading. A tile with nothing to show is left out.
>
> **Day by day.** One or two scales, or your mood, across the stretch.
>
> **Two scales at once.** Each day as a point on two scales.
>
> **What you write about.** Your most-used tags, on every day or only on good days.
>
> **Tags, and how a scale moved.** Which tags came with a scale going up or down.
>
> **Body map.** How each part of the body felt, towards dysphoria or euphoria.
>
> **Compare periods.** Your stretch against the same length of time just before it, or any two periods.
>
> **Tally.** How often you were misgendered and how often people got it right.
>
> **What it cost.** Spending by area and by whether it was refunded, each currency separately.

### Wrapped and On this day

*Gate: shipped.*

> **Wrapped.** A summary of a finished week, month or year.
>
> **On this day.** A good day, or a day with a letter, from a month, six months, a year or more ago.
