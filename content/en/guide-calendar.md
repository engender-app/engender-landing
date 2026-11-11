# Guide copy, English: Journal

Source copy for the Guide's chapter on the app's second tab, written by guide
ticket 03. Same register as the other chapters: what is there and what it does.

**What is copy and what is not.** Same rule as `landing.md` and `privacy.md`:
everything inside a blockquote is the copy, everything outside one is commentary,
and the italic marker above a blockquote says whether it may be published
(docs/adr/0001). The catalogue carries the rendered strings under
`guide.chapters.calendar.sections`.

**Sources.** The Journal's `SCREENS.md` ("The four doors", Journal door:
`/calendar`, `/day/[day]`, `/search`, `/search/questions/[id]`,
`/entry/new/[day]`, "Colour never judges"), `CONTEXT.md` ("Entry",
"Starred", "Presentation", "Body-region feeling") and the English catalogue
("Recent entries", "Saved questions", "Starred").

**Journal, not Calendar.** The tab was renamed in the Journal's phase 10
(ADR-0072); the screen behind it still lives at `/calendar`, and so does this
chapter's route. Starred entries are no longer a screen of their own: since
phase 11 ticket 18 they are a filter on search, which is how the chapter
describes them.

**The body map is one slider.** The Journal's `body_map_hint` string still
says "set dysphoria, euphoria, or both", but ADR-0081 made a region one value
on one dysphoria-euphoria scale with the midpoint meaning nothing said. The
chapter follows the ADR.

**Mode.** `CONTEXT.md` calls it a presentation and says screens call it a
mode, so the chapter says mode.

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

---

## The chapter

### The month

*Gate: shipped.*

> Journal is the second tab, and it holds your own days. The month sits at the
> top, folded into a strip. Show month opens it as a heat map: days with
> entries are filled in, coloured by your mood or, if you switch it, by one of
> your gender scales, and a deeper colour means a higher value. No colour means
> good or bad.
>
> Under the month are your recent entries, and the button below them shows
> five more days at a time.

### One day

*Gate: shipped.*

> Tap a day to see everything logged on it. A day can hold as many entries as
> you like, and tapping an empty day in the past starts an entry for it. A day
> still ahead with a small mark has something planned, such as an appointment
> or a letter due to open, and tapping it shows what.

### Search

*Gate: shipped.*

> The search icon at the top of Journal opens search. Before you type, it offers
> your most-used tags and recent searches. Filters narrow the results by tag,
> mood, mode, body region, a range on one of your scales, dates, starred, or
> whether an entry has a note or a photo.
>
> Search also looks outside your entries, at document titles for example, and
> lists what it finds under Elsewhere in the journal.
>
> Star an entry you want to find again, then filter by Starred to see all of
> them.

### Writing an entry

*Gate: shipped.*

> An entry is one moment. It needs a mood, and everything else is optional.
>
> A new entry opens on How is today?, with the five moods and your gender
> scales. Save entry stops there, and that is a complete entry. Add a note,
> tags, photos goes on to the full page.
>
> On the full page the note comes first, under the date, then mode and the
> gender scales. The moods and the star sit on the save bar at the bottom. A
> row of chips opens the rest one at a time: tags, the body map, photos, voice
> and video. Editing a saved entry opens this page straight away.
>
> The body map is where you mark how a part of your body feels. Pick a spot,
> then slide towards dysphoria or towards euphoria. Leaving it in the middle
> records nothing.
