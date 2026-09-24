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
> entries, the average on a scale, and which scale moved the furthest.

### Readings

*Gate: shipped.*

> Below that is a grid of readings. Each tile shows one figure for the stretch,
> and tapping it opens the full reading. A tile with nothing to show for the
> stretch is left out.
>
> **Day by day.** One scale or your mood across the stretch, day after day.
>
> **Two scales at once.** Each day as a point on two scales, which you can play
> through in order.
>
> **How the days fell.** How many days landed at each mood, and what you
> wrote about.
>
> **Words that stand out.** Words that turn up more often in this stretch than
> in the rest of your journal.
>
> **Tags, and how a scale moved.** Which tags came with a scale going up or
> down.
>
> **Highest days.** Your highest days on a scale you choose, each one a tap
> from its entries.
>
> **Body map.** How each part of the body has felt over the stretch, towards
> dysphoria or towards euphoria.
>
> **Compare.** Two periods side by side. It starts with your stretch against the
> same length of time just before it.
>
> **Affirming themes.** The tags your good and starred entries carry most.

### Wrapped and On this day

*Gate: shipped.*

> Two more tiles sit under the grid. You can turn either one off in Settings.
>
> **Wrapped.** A look back at a finished week, month or year, or at the stretch
> you picked: entries, mood, the scale that moved furthest, tags, milestones
> and photos. You can share it as a card, and the card never carries your
> writing or your photos.
>
> **On this day.** A good day from a month, six months or a year ago, with any
> letter written or opened on it. Days that went badly are not brought back.

### Tally

*Gate: shipped.*

> Tally counts how often you were misgendered and how often people got it right,
> and shows both over time. Quick add adds to either count from anywhere.
