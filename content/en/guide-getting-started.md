# Guide copy, English: Getting started

Source copy for the Guide's first chapter, written by guide ticket 02. It is the
first thing somebody meets after following the footer's Guide link, and it is a
reference for a person about to use the app, not a pitch to somebody deciding
whether to. So it says what happens and stops.

**What is copy and what is not.** Same rule as `landing.md` and `privacy.md`:
everything inside a blockquote is the copy, everything outside one is commentary,
and the italic marker above a blockquote says whether it may be published
(docs/adr/0001). The catalogue carries the rendered strings under
`guide.chapters.getting-started.sections`.

**Sources.** The Journal's `README.md` (Status, Android), `PRODUCT.md`
(Product Purpose, Positioning, Operating Context), `SCREENS.md` ("First run" and
the `/onboarding` entry), `CONTEXT.md` ("Setup", "Access mode") and
`docs/ui-copy.md` (the access-mode and passphrase rules).

**Nine steps, not seven.** The ticket was written against an older setup
(welcome, name, flag, gender preset, access mode, daily check-in, finish).
`SCREENS.md` now lists nine: welcome, name, flag, scales, areas, lock,
permissions, disguise, done. The daily check-in left setup when permissions took
its place, and disguise became setup's last question (ADR-0079). This chapter
follows `SCREENS.md`.

**Skips.** `SCREENS.md` says every step but the last has a way straight into the
app that keeps what was chosen so far; `CONTEXT.md` says the per-step Skip is on
every step but the welcome, the finish and the access mode. The copy states the
first as universal and the second as "most steps", which is true under both.

**The Android app is not described as available.** The landing page lists the
four channels as not live yet, and this chapter points there rather than naming
a channel of its own.

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

---

## The chapter

### Installing

*Gate: shipped.*

> engender runs in a browser or as an Android app. In a browser there is nothing to download: open it and start writing. You can install it from the browser's menu, so it opens in its own window and works offline. The home page says where to get the Android app.
>
> Your journal lives where you start it. The Android app and each browser hold separate journals. To move one, export a backup and choose "I already have a backup" when you first open engender in the new place.

### No account

*Gate: shipped.*

> There is no sign-up and no server. What you write is stored encrypted on your device and leaves only when you export it. So nobody can hand your journal back if the device is lost. Export a backup every so often and keep it somewhere safe.

### Setup

*Gate: shipped.*

> A new journal asks nine things first. You can change every answer later.
>
> **Welcome.** Start a new journal, or choose "I already have a backup".
>
> **Name.** What the app calls you. It is also saved in your backups.
>
> **Flag.** Its colours run through the whole app.
>
> **Scales.** Which gender scales you rate in an entry.
>
> **Features.** Which parts of the app to show. The rest stay hidden until you turn them on in Settings.
>
> **Lock.** How your journal opens: a passphrase, a PIN, your device's own unlock, or without asking. Nobody can recover a forgotten passphrase or PIN.
>
> **Permissions.** What the app may ask your phone for, such as notifications. None is needed to write.
>
> **Disguise.** Whether the app shows as Notes, with a different icon, on your home screen and lock screen. It is off unless you turn it on.
>
> **Done.** Go to Today opens your journal.
>
> Every step except Lock can be skipped, and Straight to the app ends setup early and keeps what you chose. After restoring a backup you are only asked about the lock, permissions and disguise.
