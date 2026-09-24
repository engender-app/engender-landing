# Guide copy, English: Contributing

Source copy for the Guide's Contributing chapter. Blockquotes are the published
copy; other text records sources. The catalogue carries these strings under
`guide.chapters.contributing.sections`.

**Sources.** The Journal's `README.md` (development and CI), `CONTEXT.md`
("Country pack", "Roadmap track", "Roadmap goal"),
`src/lib/data/roadmap.ts`, and `docs/ui-copy.md`.

## The chapter

### Code

*Gate: shipped.*

> Clone the Journal repository from github.com/barankiewicz/gender-diary. Run
> npm install, then npm run dev to work locally. The README lists the checks;
> npm run check, npm test and npm run test:browser cover different parts of the
> app.
>
> Keep a pull request focused. Say what changed, why it changed and which
> checks you ran. CI runs on each pull request, including browser checks. Use
> invented journal data in tests and screenshots; do not put anyone's real
> journal in an issue or a pull request.

### Country packs

*Gate: shipped.*

> You don't need to write code to help with a country pack. A pack is bundled
> into the app and describes one country's transition procedure as roadmap
> goals. Each goal sits in one of four roadmap tracks: social, legal,
> presentational or medical. Only the Polish pack ships today.
>
> Cite sources for each goal you propose and record when you checked them;
> the pack's reviewedOn date is shown in the app because procedures change.
> Describe what a step involves, never what someone should do in their own
> case. You can send sourced corrections or draft goals without editing the
> app.

### Translations

*Gate: shipped.*

> The Journal keeps screen text in messages/en.json and messages/pl.json.
> Adding a language means adding its message catalogue and checking each
> screen with the real text, including long labels and small phones.
>
> Read docs/ui-copy.md in the Journal repository before writing. It sets
> the voice for labels, explanations and risk screens. Translate the meaning,
> then edit for natural wording in the new language. The app supports English
> and Polish today; another language needs its own complete pass.
