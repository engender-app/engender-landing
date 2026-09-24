# Privacy copy, English

Source copy for the Privacy page. Blockquotes are shipping body copy; metadata
is separate. Claims follow the Journal PRODUCT.md, CONTEXT.md access and recovery
terms, and privacy policy. See ticket 09 for the audit and source map.

## Title and opening

*Gate: shipped.*

> What engender protects, and what it does not
>
> Your journal is encrypted on your device. How you unlock it, where you keep backups and
> who can use your device determine what that protects.

## Where your journal is

*Gate: shipped.*

> Your journal stays on the device where you write it. There is no engender account or
> server holding a copy, and no background sync. The browser and Android app hold separate
> journals. You can move a copy yourself with an encrypted Archive.
>
> The app does not send your entries to the web host. Loading and updating the web app
> still make network requests, described below.

## Unlocking your journal

*Gate: shipped.*

> A random data key encrypts the journal. Your access mode protects that key, so changing
> the passphrase does not require encrypting years of entries again.
>
> **Passphrase.** On the web or Android, a passphrase you type opens the data key through
> Argon2id. Save it in a password manager. I cannot recover a forgotten passphrase.
>
> **PIN.** Four digits combine with a key tied to your device to protect the data key. A
> copied journal file alone is not enough to guess the PIN. On the web, a copy of the
> whole browser profile can expose the device secret. On Android, someone who can run
> their own code on the phone can ask Keystore for it. With that secret, there are only
> 10,000 PINs to try. Choose a passphrase if this is your concern.
>
> **Biometrics and device keys.** Supported browsers can ask for your fingerprint or face
> before opening the journal. Web device-bound mode opens without a prompt and keeps its
> key in that browser profile. On Android, device-bound mode uses Keystore and the phone’s
> screen lock or biometrics. Android also offers a separate mode without an unlock prompt.
> Losing the device or browser profile can mean losing that copy of the journal.
>
> Wrong PIN attempts in the app wait longer before another try. The app does not
> automatically erase your journal after failed attempts. This delay does not protect
> against guesses made outside the app.

## Encryption at rest

*Gate: shipped.*

> **What is covered.** The journal database, its working files and the copy made before an
> upgrade are encrypted. Photos and thumbnails are encrypted separately under the same
> data key. Voice recordings use encrypted file storage too. Imports pass through memory
> rather than a temporary file.
>
> **What is not covered.** The wrapped key and settings needed to open it stay outside the
> encrypted journal. So do theme, palette and language, disguise and lock-on-leave
> preferences, and timestamps of failed PIN attempts. These contain no journal entries.

## If you lose access

*Gate: shipped.*

> You can create an optional recovery key and save it off the device. The app shows it
> once. Anyone with that key and your local journal can open the journal without your
> usual passphrase, PIN or biometric check.
>
> The recovery key opens only a copy whose data still exists on that device and, on the
> web, in that browser profile. It does not bring back a lost device, move the journal or
> open an Archive. I cannot recover this key or your Archive password.
>
> Without a working access method or a saved recovery key, resetting the app erases the
> local journal. A saved Archive can restore the data it contains if you still know its
> password.

## Archives and readable exports

*Gate: shipped.*

> An Archive is a copy of your journal encrypted with a password you choose before saving
> or sharing the file. That password protects the Archive separately from the journal on
> your device. Scheduled backups on Android create encrypted Archives too.
>
> **What an Archive reveals.** Its header is readable: the first six bytes spell GDIARY,
> followed by format and key-derivation settings. The header identifies the file as an
> engender Archive without revealing entries. A storage provider may also see the
> filename, size and access history.
>
> **If you lose an Archive password,** that file stays unreadable. Other Archives with
> different passwords are unaffected.
>
> CSV and JSON exports, printable journals and clinician summaries, shared photos and
> other readable exports are not encrypted. Anyone who gets a file can read it. The app
> asks for confirmation or an explicit action before creating it. You choose where it
> goes.

## What the web host can see

*Gate: shipped.*

> When the web app loads or checks for updates, the host sees your IP address, request
> time, requested files and their sizes, and User-Agent and Referer headers. It does not
> receive journal entries, photos, notes or lab results. After installation, you can use
> the journal offline.
>
> The Android app does not request the INTERNET permission. Store operators may record
> downloads and updates. Installing from Google Play ties the installation to your Google
> account; no engender setting changes that.

## What none of this protects against

*Gate: shipped.*

> Encryption at rest does not protect an open journal on your screen, data read from
> memory or a compromised operating system. Someone who controls your device may be able
> to read what you open. Readable exports also need protection wherever you save or share
> them.

## More detail

*Gate: shipped.*

> Read the Privacy chapter in the Guide.

## Search and share

How engender encrypts your journal, how access and recovery keys work, what exports reveal, and what the web host sees.
