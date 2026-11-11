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

> Your journal stays in storage on the device where you use it. There is no
> account and no profile on a server, and nothing you write is uploaded. The
> Android app and a browser keep separate journals, and so do two browser
> profiles.
>
> The web app still has to come from a server. When it loads or updates, its
> host can see your IP address, the time of the request, which files the
> browser asks for and their sizes, plus the User-Agent and referrer headers.
> Entries, photos, notes and lab results are never part of that. The website
> and the web app also count how often they are opened, as totals with no
> record of individual visits. The privacy policy has the details.

### Encryption and access

*Gate: shipped.*

> The database is encrypted whole, including its side files and the copy made
> before an upgrade changes it. Photos and thumbnails sit outside the database,
> so each file is encrypted separately with the same random data key.
>
> A few things are not encrypted, and none of them is journal content: the
> wrapped key and the settings needed to open it, your theme, palette and
> language, lock timing, the disguise choice, and the times of wrong PIN
> attempts. On Android, a photo you take also passes through an unencrypted
> temporary file before the app imports and encrypts it.
>
> How your journal opens is your choice, under Lock & recovery in Settings. On
> the web it can be a passphrase, a four-digit PIN together with a key kept in
> the browser profile, your device unlock through WebAuthn PRF on a browser
> that supports it, or unlocked, with a key in the browser profile and no
> prompt. On Android it can be your screen lock or biometrics through Android
> Keystore, a four-digit PIN with a Keystore key, a passphrase, or unlocked,
> with a Keystore key and no prompt.
>
> A passphrase goes through Argon2id and wraps the data key with AES-GCM, so
> you can change it without encrypting the journal again. The other modes
> depend on a key held in the browser profile or in Android Keystore. Clearing
> the site's data, resetting the profile, clearing the app's data or losing the
> device makes that copy of the journal unreadable.
>
> The same screen sets when your journal locks: immediately, after 1 minute,
> after 5 minutes, or only when the app restarts.
>
> A recovery key is optional. It has 25 characters and is shown once, when you
> make it. If your passphrase, PIN or biometrics stop working, it opens the
> journal on the device, and on the web the browser profile, that still holds
> it. It cannot move the journal or open an Archive. Without a recovery key,
> nobody can recover lost credentials, and nobody can recover a forgotten
> Archive password either. After you copy the key, the app clears it from the
> clipboard a minute later where the system lets it.

### What other people can see

*Gate: shipped.*

> Disguise app changes what someone near your phone sees. The launcher icon and
> name become Notes, and the lock screen, widgets, notifications and, on the
> web, the tab's icon and title stop naming engender. On Android it also blocks
> screenshots and the preview in Recents. Inside the unlocked app nothing
> changes. Disguise is not encryption, and Android still shows the real name in
> App info and in permission prompts.
>
> Notifications hide sensitive titles unless you switch Hide sensitive titles
> off. Reminder times and the daily check-in question still show on a locked
> screen.

### Android and network access

*Gate: shipped.*

> The Android app does not request the INTERNET permission. It opens no network
> sockets and sends no journal data to a server. It also opts out of Android's
> cloud backup and device-to-device transfer. A store you install it from can
> still record installs and updates under its own policies.
>
> Android asks for POST_NOTIFICATIONS, SCHEDULE_EXACT_ALARM and
> RECEIVE_BOOT_COMPLETED so reminders and the daily check-in arrive at the time
> you chose and come back after a restart. WAKE_LOCK lets a scheduled backup
> finish with the screen off. RECORD_AUDIO and MODIFY_AUDIO_SETTINGS are for
> voice notes, and CAMERA is for video notes and for photos, which open the
> phone's camera app. USE_BIOMETRIC and USE_FINGERPRINT let it show the phone's
> own fingerprint, face or screen lock prompt.

### Archives and other exports

*Gate: shipped.*

> You choose where an exported or shared file goes. A cloud drive or document
> provider can see its filename, timestamp and size, along with account access
> records.
>
> An encrypted .ttbackup Archive uses chunked AES-256-GCM and a password you
> choose. The password protects that Archive, not the journal on your device.
> Its header stays readable: the first six bytes say GDIARY, followed by the
> format version, Argon2id settings and salt. The app needs those to recognise
> the file and derive its key. The header reveals the format, not your entries,
> and nobody without the password can read the rest.
>
> On Android, Auto-export writes an Archive to a folder you pick, every week or
> every month. With Merge backups from other devices switched on, the app looks
> in that folder when you open it and merges in a newer Archive that another
> device saved there with the same password. Nothing is sent anywhere. Both
> devices only read and write the folder.
>
> Some exports are deliberately readable: CSV and JSON data, journal books for
> printing or PDF, clinician summaries, photo collages and timelapses, saved
> PDFs, and single-event .ics calendar files. Anyone who receives one can read
> what it contains. The app asks you to confirm or take an explicit action
> before it makes an unencrypted file.

### Deleting everything

*Gate: shipped.*

> Delete everything, under Privacy & data in Settings, erases the journal, its
> photos and recordings, your settings and the keys from this device. It cannot
> be undone, and the app offers to back up first. Uninstalling the Android app,
> or clearing the site's data in a browser, removes the same things. Files you
> already exported stay wherever you saved them.

### Security reports

*Gate: shipped.*

> You can report a security problem through GitHub's private vulnerability
> reporting. Include the app version, device or browser, clear steps to
> reproduce the problem, and what you expected and saw. Use invented data for
> a minimal proof.
>
> One person maintains the project, so a report is read when they next sit
> down to work. There is no fixed response window.
