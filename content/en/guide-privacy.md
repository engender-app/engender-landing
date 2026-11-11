# Guide copy, English: Privacy

Source copy for the Guide's Privacy chapter. This is the precise account; the
marketing privacy page stays short and links here.

**What is copy and what is not.** Everything inside a blockquote is copy;
everything outside one is commentary. The italic marker above a blockquote
says whether it may be published (docs/adr/0001). The catalogue carries the
rendered strings under `guide.chapters.privacy.sections`.

**Sources.** The Journal's `docs/privacy-policy.en.md`, `SECURITY.md`, and the
encryption decisions in ADR-0018, ADR-0020 and ADR-0007. The policy describes
the hosted web app, Android delivery, and files you choose to share. The
chapter keeps those boundaries separate.

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

---

## The chapter

### Where the journal lives

*Gate: shipped.*

> Your journal stays on the device where you use it. There is no account, and nothing you write is uploaded. The Android app and each browser profile hold separate journals. The privacy policy says what the web app's server and the website can see.

### Encryption and access

*Gate: shipped.*

> The journal's database and media are encrypted. A few settings the app needs before it unlocks are not, and none of them is journal content.
>
> Lock & recovery in Settings sets how the journal opens: a passphrase, a four-digit PIN, your device's unlock, or without asking. The same screen sets when it locks. The journal and its keys live only on this device or in this browser profile, so clearing the app's or the site's data removes that journal for good.
>
> A recovery key is optional. It has 25 characters and is shown once. It opens the journal where it already is if your passphrase, PIN or biometrics fail. It cannot move the journal or open a backup. Without one, nobody can recover lost credentials.

### What other people can see

*Gate: shipped.*

> Disguise app renames the app to Notes on the launcher, lock screen, widgets, notifications and the browser tab, and on Android it blocks screenshots. It is not encryption, and Android still shows the real name in App info. Notifications hide sensitive titles unless you turn that off.

### Android and network access

*Gate: shipped.*

> The Android app does not request the INTERNET permission. It opens no network connections, and it opts out of Android's cloud backup. The privacy policy lists its permissions.

### Backups and exports

*Gate: shipped.*

> An encrypted backup (.ttbackup) can only be opened with the password you chose for it, and nobody can recover that password. On Android, Auto-export writes one to a folder you pick every week or month, and Merge backups from other devices merges in newer ones your other devices saved there.
>
> Other exports are meant to be read and are not encrypted: CSV and JSON, journal books, clinician summaries, collages and timelapses, PDFs and calendar files. The app asks before it makes one.

### Deleting everything

*Gate: shipped.*

> Delete everything, under Privacy & data, erases the journal and its keys from this device and cannot be undone. Uninstalling the app or clearing the site's data does the same. Files you exported stay where you saved them.

### Security reports

*Gate: shipped.*

> Report a security problem through GitHub's private vulnerability reporting, with the app version, your device or browser, and steps to reproduce it using invented data. One person maintains the project, so there is no fixed response window.
