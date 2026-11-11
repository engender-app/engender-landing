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

> engender runs in a browser or as an Android app. In a browser there is
> nothing to download: open it and start writing. The Android app has to be
> installed first, and the home page lists where to get it.
>
> You can also install the browser version from your browser's menu, or add it
> to your home screen. It then opens in its own window and works without a
> network connection.
>
> Your journal lives where you start it. The Android app and your phone's
> browser hold two separate journals, and so do two browsers. To move a
> journal, export a backup, then choose "I already have a backup" the first
> time you open engender in the new place.

### No account

*Gate: shipped.*

> There is no sign-up and no engender account. Nothing you write goes to a
> server. It is stored encrypted on your device and leaves only when you export
> it.
>
> That also means nobody can hand your journal back if the device is lost or
> reset. Only a backup you exported survives, so export one every so often and
> keep it somewhere safe.

### Setup

*Gate: shipped.*

> The first time you open engender, it asks a few questions before you reach
> your journal. A new journal has nine steps, and you can change every answer
> later.
>
> **Welcome.** What the app is. If you have a backup, choose "I already have a
> backup" here instead of starting a new journal.
>
> **Name.** What the app should call you. It greets you with the name, and the
> name is saved in your backups.
>
> **Flag.** Pick a flag. Its colours run through the whole app.
>
> **Scales.** Which gender scales you want to rate when you write an entry.
>
> **Features.** Which parts of the app to show. The everyday ones are already
> on, and anything you leave off stays hidden until you turn it on in Settings.
>
> **Lock.** How your journal opens: with a passphrase, a PIN, your device's own
> unlock, or without asking. Each option says what you gain and what you risk
> before you choose it. Nobody can recover a forgotten passphrase or PIN.
>
> **Permissions.** What the app may ask your phone for, such as notifications,
> each with a reason. You do not need any of it to write an entry.
>
> **Disguise.** Whether the app goes by Notes, with a different icon, outside
> itself: on your home screen and lock screen, for example. Inside the unlocked
> app nothing changes. It is off unless you turn it on.
>
> **Done.** Setup is over, and Go to Today opens your journal.
>
> Most steps have Straight to the app, which ends setup early and keeps what
> you have chosen so far, and a Skip, which leaves that one setting as it was.
> Lock has neither, because the journal needs a way to open.
>
> Setup is shorter when you restore a backup. The backup already holds your
> name, flag, scales and features, so once it is restored you are only asked
> about the lock, permissions and disguise.
