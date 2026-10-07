# Store visual assets: briefs, not artwork

What the icon, feature graphic and screenshots must show and must not show. The
images are made in the Journal repository by `scripts/store-listing-assets.mjs`
from a demo build, and Play and F-Droid both take them from its fastlane
directory. Specs are Play's, rechecked 2026-10-07.

## The rule over all of it

Every image comes from the demo persona's invented journal. No real journal,
entry, photo or date that belongs to a person. The script refuses to run
against a build without demo controls, so it cannot capture a real journal.

Play's own constraints: no calls to action in imagery, no time-sensitive text,
no ranking or endorsement claims, and images must show the app as it works. The
project's constraints on top: no emoji, no invented social proof, and no
overlay that says "private" or "secure" as a bare adjective.

## Phone screenshots

1080 x 1920 portrait PNG, at least four and at most eight per locale, the
default trans palette in light theme, each locale shot in its own language.
Play shows roughly the first three before scrolling, so the order is the
argument, and the listing now leads with transition tracking rather than mood.
Together the set has to cover what the description names: the daily journal,
HRT and care records, the transition areas (tryouts, roadmap, voice practice)
and looking back. Since 2026-10-07 there are seven: Today, Care, a new entry,
the Transition roadmap, Voice on its Compare tab, Look back and Settings
privacy. The mood calendar was dropped because it pitched a mood journal. The
order and routes are recorded in the Journal's
`fastlane/metadata/android/capture.json`, which the script writes.

The first screenshot, Today, shows the demo persona's binder timer past eight
hours with its safety note. That is a real state of the app, but it is the
first thing a store visitor reads; whether it stays is Alicja's call on the
41 sign-off page.

Caption overlays are optional on Play and not indexed. If they are used, they
come from the listing's own sentences, shortened, never invented fresh.

## Feature graphic

1024 x 500 exactly, PNG without alpha or JPEG. It sits at the top of the
listing and behind any featuring, often cropped, so nothing essential near the
edges. Content: the app name and one line that follows the title, one version
per locale, on brand colours. English: "Track your transition." Polish:
"Zapisuj tranzycję." Both are the short description's opening words, so if
those change, this graphic changes with them. Alicja cut a second sentence
about the journal staying on the device on 2026-10-07. Nothing else: no device mockup
with readable entries, no badges, stars, download figures or emoji. Legible at
thumbnail size, which means the claim in one line and generous margins.

## Icon

512 x 512 PNG, the trans-palette tile from the Journal's `brand/mark/`. It is
the app's own mark, not a redesign brief.

## What is deliberately not briefed

- **Preview video.** Play videos do not autoplay and few people tap them.
- **Tablet and Chromebook screenshots.** Needed only if those form factors are
  targeted.
- **Badge artwork.** Play's badge rules need a live listing.
