# Guide copy, English: Media

Source copy for the Guide's Media chapter, one of the four groups on the app's
Transition tab, written by guide ticket 04. A reference for somebody using the
app, so it names what is on the screen and what it does, and stops.

**What is copy and what is not.** Same rule as `landing.md` and `privacy.md`:
everything inside a blockquote is the copy, everything outside one is commentary,
and the italic marker above a blockquote says whether it may be published
(docs/adr/0001). The catalogue carries the rendered strings under
`guide.chapters.media.sections`.

**Sources.** The Journal's `SCREENS.md` ("The Transition door's four groups" and
the Media table), `CONTEXT.md` ("Photo", "Photo library", "Document"),
`PRODUCT.md` and the English catalogue for on-screen labels. `docs/ui-copy.md`'s
never-list holds: nothing here interprets a value, calls a number good or bad, or
suggests a dose.

**Health, Steps, Support and Media, not Body, Health, Transition and Practice.**
The ticket was written against an older More hub. The Journal now calls the fourth
tab Transition and groups it into these four (`hubRows.ts`). Body closed when
measurements moved into Health; wear, hair removal and voice went to Steps; Safe
space and the resource directory went to Support; photos got Media. The effects
timeline is now changes you've noticed, on Care, and presentations are modes in
Settings, so neither has a place here. The routes follow the app's groups.

**Left out on purpose.** The source chips' exact grouping.

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

---

## The chapter

### Photos

*Gate: shipped.*

> Media is the fifth group. Photos is every photo in your journal in one dated list, with chips to narrow it by where a photo came from, such as hair progress or surgery, and Starred. Select photos to delete them, or open the record one belongs to.
>
> Make a collage or timelapse builds one from a date range, with a preview. The file you save is not encrypted. Photos never go to your phone's gallery.

### Documents

*Gate: shipped.*

> Documents holds the papers you keep, such as opinions, referrals and court rulings: PDFs or images, each with a date and a title. You can link one to a roadmap step, a milestone, a surgery or a regimen, and the list is grouped by those links. The app never reads a document, so you find it by its title.
