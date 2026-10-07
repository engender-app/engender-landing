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
argument, and the listing leads with transition tracking rather than mood.
The set covers what the description names. Since 2026-10-07 there are seven:

1. Today: the greeting and Coming up (an appointment and a milestone).
2. Care: HRT doses, the lab draw and stock lanes. It comes second because it
   shows "transition tracker" most plainly.
3. A new entry: a short invented note about a new name, the dysphoria to
   euphoria scale and the mood bar.
4. Transition roadmap: planned steps (the Polish set shows the Polish pack).
5. Voice, on its Compare tab: pitch over time across practice takes.
6. Look back: the span timeline and readings.
7. Settings, Privacy & data: lock, disguise and export, for the "On your
   device" section.

The mood calendar was dropped because it pitched a mood journal. The routes
are recorded in the Journal's `fastlane/metadata/android/capture.json`, which
the script writes.

The first screenshot must not show the binder timer's safety caution: it is
the first thing a store visitor reads (Alicja, 2026-10-07). The demo persona's
own records stay English in the Polish set, which she accepted the same day.

There are no caption banners. Play does not index them, and the words are
already in the description.

## Feature graphic

1024 x 500 exactly, PNG without alpha. It sits at the top of the listing and
behind any featuring, often cropped, so nothing essential sits near the edges.

It carries the app's lockup: the trans mark (the tile from the Journal's
`brand/mark/svg/trans-tile.svg`, the same drawing the app's rail and this
site's header put beside the name) next to "engender" in Outfit 800, in the
app's `.lockup` proportions. Under it is one line in Nunito 600, the way this
site sets a lede: "Track your transition." in English and "Zapisuj
tranzycję." in Polish. Ink and ground are the trans light theme's text and
background colours, and the flag stripe runs along the bottom. The block sits
72px from the left edge, centred vertically above the stripe.

The line no longer follows this site's hero. It is a short claim of its own
that fits the title, and the descriptions do not have to repeat it. Alicja cut
a second sentence about the journal staying on the device on 2026-10-07.

Nothing else goes on it: no device mockup with readable entries, no badges,
stars, download figures or emoji. It must stay legible at thumbnail size.

## Icon

512 x 512 PNG, the trans-palette tile from the Journal's `brand/mark/`. It is
the app's own mark, not a redesign brief.

## What is deliberately not briefed

- **Preview video.** Play videos do not autoplay and few people tap them.
- **Tablet and Chromebook screenshots.** Needed only if those form factors are
  targeted.
- **Badge artwork.** Play's badge rules need a live listing.
