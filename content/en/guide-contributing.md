# Guide copy, English: Contributing

Source copy for the Guide's Contributing chapter. Blockquotes are the published
copy; other text records sources. The catalogue carries these strings under
`guide.chapters.contributing.sections`.

**Sources.** The Journal's `README.md` (development and CI), `CONTEXT.md`
("Country pack", "Roadmap track", "Roadmap goal"),
`src/lib/data/roadmap.ts`, and `docs/ui-copy.md`.

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

## The chapter

### Reporting a problem

*Gate: shipped.*

> Report a bug at github.com/engender-app/engender with your version (Settings, then About), whether it is Android or a browser, and the steps. Issues are public, so never paste anything from your journal.

### Code

*Gate: shipped.*

> engender is free software under GPLv3. Clone the repository and, with Node.js 24, run npm ci, then npm run dev. The README lists the checks. Keep a pull request to one change. CI has to pass before a merge.

### Country packs

*Gate: shipped.*

> A pack describes one country's transition procedure as roadmap steps. Only the Polish pack ships today. You can help without code: send sourced corrections or draft steps, with the date you checked each source. Describe what a step involves, never what someone should do in their own case.

### Translations

*Gate: shipped.*

> Screen text is in messages/en.json and messages/pl.json, and npm run strings opens an editor for both. The app supports English and Polish. Another language needs its own catalogue and a check of every screen with the real text.
