# Play listing, English (en-US)

Source copy for the Android store listing, used by Google Play and F-Droid.
Product claims follow the Journal repository's product specification and
privacy policy. Text inside a blockquote is store copy; everything else is
commentary. The Journal repository's `fastlane/metadata/android/en-US/` holds
the same text byte for byte, one paragraph per line.

## Title

28 of 30 characters. Alicja's choice, 2026-10-07. Play's strongest ranking field, and it now says what the app is rather than which aisle it sits in.

> engender: transition tracker

## Short description

79 of 80 characters. Doubles as F-Droid's Summary, where fdroidserver lint rejects sentence punctuation, so it ends without a full stop.

> Track your transition, HRT, mood, voice and milestones offline, with no account

## Full description

3055 of 4000 characters, counted over the assembled text with newlines.
Plain lines are headings; Play shows the text without markup. The health
paragraph is there for Play's health apps policy: it says the app is not a
medical device, what it does not do, and who to ask instead. Recheck it
against the policy text when filling in the health apps declaration. The
privacy sentences are scoped to the
Android app, which has no internet permission; they avoid "telemetry" and
"analytics" because the web app may count page loads, and that is not what
this listing describes. Every encryption sentence matches
`docs/privacy-policy.en.md` in the Journal repository.

> engender is a transition tracker, made by one trans person for other trans people. It keeps your journal next to your HRT doses, photos, voice practice and the steps you are planning. Use the parts that fit your life, whether you are questioning, planning a change or looking back on years of transition.
>
> Your day, in your words
>
> Write a note, pick a mood or add a photo. Any one of those is enough for an entry, and you can add several a day. Track dysphoria, euphoria and anything else on scales you name yourself. Add tags, a voice recording or how parts of your body feel.
>
> Care and changes
>
> Keep medication schedules and the doses you take in one place, with reminders at times you choose. Record lab results and body measurements, follow hair changes and cycle events, and plan surgeries with packing and recovery checklists. Note questions for your next appointment, and export a clinician visit summary when you want to share your records.
>
> engender records what you enter. It is not a medical device: it does not diagnose, treat or prevent any condition, recommend doses or replace medical advice. Talk to a qualified healthcare professional about treatment decisions.
>
> The rest of your transition
>
> Try out a name, pronouns or a new look and note how each one feels. Keep milestones and a roadmap of the steps you want to take. Practise your voice and compare benchmarks with your earlier takes. Time binding, tucking or compression, and log hair removal sessions. Write a letter that opens on a date you choose.
>
> Looking back
>
> Browse the calendar, search your notes and tags, and follow your scales on charts. Compare photos over time, or open a Wrapped recap of the last week, month or year. A day with no entry stays blank. Safe space keeps the things that help and the moments you want to come back to in one place.
>
> On your device
>
> The Android app works offline. It does not have the internet permission, so it cannot send your journal anywhere. There is no engender account and no advertising. Your journal stays on your device unless you export or share it.
>
> Your journal and photos are encrypted on the device. Startup settings such as theme and language, and what the app needs to unlock your key, stay outside that encryption. None of it is anything you wrote.
>
> Open your journal with a passphrase, a PIN, or your phone's fingerprint, face or screen lock. Disguise, if you turn it on, gives the app a plain name and icon.
>
> Backups and exports
>
> Save a backup encrypted with a password you choose, or schedule backups to a folder you pick. Import a backup to move your journal between Android and the web app. You can also import entries from a Daylio CSV file. CSV, JSON, printable journal books and the other exports meant for reading are not encrypted, so think about where you save or send them.
>
> Make it yours
>
> Pick one of 16 flag palettes in light or dark, set up your own scales and pin the areas you use to Today. engender is in English and Polish. It is free, with no subscription, and its source code is public under the GPLv3.
