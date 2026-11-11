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

> Journal is the second tab. The month sits at the top as a strip, and Show month opens it as a heat map: days with entries are coloured by mood or by one of your gender scales, deeper for a higher value. No colour means good or bad.
>
> Under it are your recent entries.

### One day

*Gate: shipped.*

> Tap a day to see everything logged on it, or to start an entry on an empty day in the past. A marked day ahead has something planned, and tapping it shows what.

### Search

*Gate: shipped.*

> The search icon filters entries by tag, mood, mode, body region, a range on a scale, dates, Starred, and whether an entry has a note or a photo. It also finds things outside entries, such as documents by title.

### Writing an entry

*Gate: shipped.*

> An entry needs a mood, and everything else is optional. A new entry opens on How is today?, with the moods and your gender scales. Save entry stops there. Add a note, tags, photos goes on to the full page.
>
> On the full page the note comes first, then mode and the scales. Chips open the rest: tags, the body map, photos, voice and video. The star is on the save bar.
>
> On the body map, pick a spot and slide towards dysphoria or euphoria. The middle records nothing.
