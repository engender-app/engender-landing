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

> Report a bug in the issues at github.com/engender-app/engender. Say which
> version you have (Settings, then About), whether you are on Android or in a
> browser, and the steps that lead to the problem. Issues are public, so
> describe the problem with invented data and never paste anything from your
> journal.

### Code

*Gate: shipped.*

> engender is free software under GPLv3. Clone the Journal repository from
> github.com/engender-app/engender. With Node.js 24, run npm ci, then npm run
> dev to work locally. The README lists the checks: npm run check, npm test
> and npm run test:browser cover different parts of the app, and the first two
> need one build on a fresh checkout.
>
> Keep a pull request to one change, on a branch that is up to date with main.
> CI runs on each pull request, including browser checks, and has to pass
> before a merge. Use invented journal data in tests and screenshots.

### Country packs

*Gate: shipped.*

> You don't need to write code to help with a country pack. A pack is bundled
> into the app and describes one country's transition procedure as roadmap
> steps. Only the Polish pack ships today. It covers the legal procedure and
> the institutions to update after it.
>
> Cite sources for each step you propose and record when you checked them. The
> roadmap shows the date its content was last checked, because procedures
> change. Describe what a step involves, never what someone should do in their
> own case. You can send sourced corrections or draft steps without editing
> the app.

### Translations

*Gate: shipped.*

> The Journal keeps screen text in messages/en.json and messages/pl.json, and
> npm run strings opens an editor for both. The app supports English and Polish
> today. Another language needs its own catalogue, some changes in the code
> that lists the languages, and a check of each screen with the real text,
> including long labels on small phones.
>
> Translate the meaning, then edit until it reads naturally in the new
> language.
