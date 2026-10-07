# Android store listing, ready to lift

The listing is marketing copy, so it is written here, where the voice lives. It
is published from the Journal repository, which owns the artifact, the
application ID and the store accounts. Google Play and F-Droid both read the
Journal's `fastlane/metadata/android/{en-US,pl-PL}/` files, and those files
hold exactly the blockquotes in this directory.

## What is here

- `en.md`, `pl.md`: title, short description and full description per locale,
  as blockquotes, with character counts.
- `keywords.md`: which search terms the listing targets, where each sits, and
  what was rejected.
- `assets.md`: what the icon, feature graphic and screenshots must show. The
  images themselves are made in the Journal repository from a demo build.

## How to assemble a field

Blockquotes are the copy; everything else is commentary and never ships. Each
blockquote line is one paragraph and a bare `>` line is the blank line between
paragraphs, so the fastlane file is the blockquote with the `> ` prefixes
removed. No other editing: if a sentence needs rewording, change it here first,
then copy it into fastlane in the same change.

There are no gate markers any more. Every feature the copy names ships in 1.0.0,
so the whole listing ships at once.

## Limits

Play counts characters, newlines included, not bytes, so a Polish diacritic
costs one. Title 30, short description 80, full description 4,000, release notes
500. F-Droid allows a 50-character name, an 80-character summary, a
4,000-character description and 500-character release notes. Current counts:
title 28 and 28, short description 79 and 74, full description 3,007 and
3,182, for English and Polish. The Journal's
`tests/store-listing-assets.test.ts` checks the limits on every test run.

The short description is also F-Droid's Summary, and F-Droid's lint rejects
sentence punctuation, "free software" and "for Android" there. The Journal test
checks those too.

The full description ships as plain text. Headings are plain lines.

## Console values (pre-release-human 02)

| Field | Value |
| --- | --- |
| App name | `engender: transition tracker` in both locales, unless Alicja picks a Polish subtitle |
| Short and full description | the blockquotes in `en.md` and `pl.md` |
| Default language | English (United States), `en-US`, the fastlane locale; Polish, `pl-PL`, as a translation |
| Category | Lifestyle. Health & Fitness pulls in a clinical and fitness register the app refuses, and Medical implies clinical use |
| Tags | chosen from the Console's own list when filling it in: journal or diary, mood tracking, medication or health tracking |
| Contact email | `engender-app@pm.me` |
| Website | `https://engender.barankiewicz.dev/` |
| Privacy policy | `https://engender.barankiewicz.dev/en/privacy/` (Polish page: `/pl/privacy/`) |

Data safety, the health apps declaration, content rating and target audience
are tracked in pre-release-human 02 and follow the privacy policy, not this
directory.

## F-Droid

F-Droid takes Name, Summary, Description, release notes, icon, feature graphic
and screenshots from the same fastlane directory. Its metadata file in
fdroiddata sets only the recipe and links: source code, issue tracker,
changelog, website and `AuthorEmail`. Category there is Writing. No
Anti-Features apply: the app has no network permission, no ads, no tracking and
no non-free dependencies in the APK.
