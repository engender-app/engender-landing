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

---

## The chapter

### The month

*Gate: shipped.*

> Journal is the second tab, and it holds your own days. It opens on the month
> as a heat map. Days with entries are filled in, coloured by your mood or, if
> you switch it, by one of your gender scales, and a deeper colour means a
> higher value. No colour means good or bad.
>
> Under the month are your recent entries, and the button below them shows
> five more days at a time.

### One day

*Gate: shipped.*

> Tap a day to see everything logged on it. A day can hold as many entries as
> you like. A day still ahead with a small mark has something planned, such as
> a dose or an appointment, and tapping it shows what.

### Search

*Gate: shipped.*

> The search icon at the top of Journal opens search. Before you type, it offers
> your most-used tags and recent searches. Filters narrow the results by tag,
> mood, dates, or starred.
>
> Star an entry you want to find again, then filter by Starred to see all of
> them.
>
> You can save a search as a question. Opening it later searches your journal
> as it is then, not as it was when you saved it.

### Writing an entry

*Gate: shipped.*

> An entry is one moment. It needs just one thing, such as a mood, a note or a
> photo.
>
> The note comes first, under the date. The moods and the star sit on the save
> bar at the bottom. Under the note, a row of chips opens the rest one at a
> time: mode, gender scales, tags, the body map, and attachments such as photos
> and voice recordings.
>
> The body map is where you mark how a part of your body feels. Pick a spot,
> then slide towards dysphoria or towards euphoria. Leaving it in the middle
> records nothing.
