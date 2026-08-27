# Landing copy, English: the privacy page

Source copy for the privacy page, rewritten for enGender by redesign ticket 02
against `.agents/product-marketing.md` v10. The landing page carries a two-sentence
handoff; being exact about what is and is not protected takes more than a sentence,
and this page is where it happens.

**The doctrine changed with v10.** Copy is written from the Journal repository's
specification as true. The old staged blocks - encryption at rest, Android, the
Keystore, the Play sentence - publish, and the fallback section this file used to
carry is gone, because the state it covered is not the product the spec describes.

**What is copy and what is not.** Everything inside a blockquote is the copy itself.
Everything outside one is commentary: rationale and handoffs. Nothing outside a
blockquote is ever rendered, so a placeholder never sits inside one.

**Five things this page refuses to blur.** Where the journal is stored, what app lock
does, what encryption at rest covers, how the key is held on each surface, and what
an Archive password protects. They are different mechanisms with different failure
modes, and collapsing them into the word "encrypted" is the single most likely way
this page could mislead somebody who is relying on it.

---

## The page

### Title and opening

*Gate: shipped.*

> **What enGender protects, and what it does not**
>
> This is the long answer. The short one would have to leave out the parts that matter
> if you are deciding whether to trust this with your journal.

### Where your journal is

*Gate: shipped.*

> Your journal is stored on your device. There is no enGender account, no server
> with a copy of it on, and nothing syncing in the background. An entry you write goes
> into storage on the device you wrote it on and stays there until you export it or
> delete it.
>
> There is no server, so there is no server to be breached, subpoenaed or sold. What
> you are trusting instead is your own device and whoever else can reach it.

### App lock

*Gate: shipped. The counterweight sentence is required by ADR-0014 and by the spec
wherever app lock is mentioned. It is not optional wording and does not get softened.*

> App lock is off until you turn it on, like every control in enGender that hides
> something. Keeping a journal about your own life is an ordinary thing to do. Some
> people's circumstances make it dangerous anyway, and only you know whether that is
> yours.
>
> **What it does.** App lock puts a PIN in front of the app, so somebody who picks up
> your unlocked phone cannot read your journal by opening it.
>
> **What it is not.** It is not the encryption of what is stored; that is the
> passphrase's job, below. A PIN is a gate in the interface. Four digits will
> stop a glance over your shoulder. It will not stop somebody with your device, time
> and a reason.
>
> **If you forget the PIN**, there is one way back in: an action on the lock screen
> that wipes the local journal and starts you over. There is no recovery that keeps
> your entries, because a PIN that could be recovered would not be protecting anything.
> Wrong attempts wait longer and longer before the next one is accepted, and nothing
> wipes your journal automatically after a set number of tries. A counter like that is
> one bored kid or one argument away from destroying a diary nobody decided to destroy.

### Encryption at rest

*Gate: shipped. The exclusion list is required wherever the claim is made, by
ADR-0018, which names exactly that list. The claim itself is proven the only way the
spec accepts: a test seeds protected content, closes the app, and reads the raw bytes
of everything left behind (`tests/browser-tier/encryption-probe.ts`, with an Android
twin). The Evidence section of the marketing context says why the gate is worth
describing to this audience.*

> **What is covered.** Your journal where it is stored, the working files kept beside
> it, the copy taken before an upgrade changes anything, and your photos and their
> thumbnails.
>
> Photos are files rather than rows in a database, so encrypting the database never
> reaches them. Each one is encrypted on its own, under the same key. An import runs
> through memory and never lands in a temporary file, so there is no half-imported
> copy of your history left on the disk afterwards.
>
> **What is not covered.** A few things stay outside,
> because the app has to be able to start and to let you unlock it: the wrapped key
> and the settings used to derive it; your theme, palette and language; whether lock
> on leave and disguise are switched on; and the timestamps that make repeated wrong
> PIN attempts wait longer each time. None of it is anything you wrote. Somebody
> reading that part of your browser profile learns which colours you chose and whether
> disguise is on, and learns nothing about a single entry.
>
> **On the web**, you choose a passphrase. It does not encrypt the journal directly. It
> unlocks a random key that does, which is what lets you change the passphrase later
> without re-encrypting years of entries. After the browser session ends, the
> passphrase is needed again. No usable key is left sitting next to the data it would
> open.
>
> **Device-bound mode** is the other way to hold that key: nothing to type on a cold
> start, and the key stays in the one browser profile or device you set it up in. The
> trade cuts both ways, and the app says so before you choose. Losing that profile or
> device loses the journal, with no passphrase to fall back on. And the key is not
> protected by anything you know, so a copy of that browser profile opens the journal
> with nothing typed. Tied to this device is a fact about where the key lives, not a
> wall.

*Gate: shipped. The Android sentence carries its own gate history (Journal Phase 2
tickets 11 and 13); under the v10 doctrine it publishes with the rest.*

> **On Android**, the same random key is held by the Android Keystore rather than by a
> passphrase you type, and the Keystore releases it only after the phone has checked
> who is asking.

*Gate: shipped.*

> **The passphrase cannot be recovered.** Not by you and not by me. There is no reset
> that keeps your entries, no recovery email and no message to me that can help, because
> a way back in for me would be a way back in for anyone else. Put it in a password
> manager before you write anything you would be upset to lose. The app says this again
> at setup.

### Archives

*Gate: shipped, ADR-0007.*

> Export packs your journal into a single Archive file, encrypted with a password you
> choose, before the file goes anywhere. That password is not your PIN and not your
> Journal passphrase. It protects that one file.
>
> **What an Archive gives away.** The first six bytes of the file spell GDIARY in
> plain text, followed by the format version and the settings used to turn your
> password into a key. That part has to be readable without the password, so that a
> file from a newer version can say so instead of decrypting into nonsense. Everything
> from your journal is behind the password. Somebody who finds the file learns that it
> is an enGender Archive, because the header names the format, and nothing about what
> is in it.
>
> **If you lose an Archive password**, that file is not readable again. Other Archives
> made with other passwords are unaffected.

### What the web host can see

*Gate: shipped. Required by the spec: hosted web copy separates app-shell and update
traffic from journal-data traffic, and "the app makes no network requests" never
appears here unqualified.*

> Opening the app in a browser means asking a web host for it, and that host can see an
> IP address, roughly when the request happened, and that the app was fetched. Checking
> for a new version is the same kind of request. This is true of every website you
> open, and it is true of this one.
>
> What the host does not receive is your journal. Entries, photos, notes and lab values
> are not sent to it, because there is nowhere for them to be sent.
>
> You will not read "enGender makes no network requests" here, because it is not
> true. Fetching the app is a network request. Your journal going somewhere is not.

*Gate: shipped. The privacy consequence of one channel, stated where a reader weighs
what to trust; the channel list itself is the acquisition section's.*

> Installing from Google Play means Google records that your account installed this
> app. That is between you and Google, and no setting inside enGender changes it.

### What none of this protects against

*Gate: shipped. Spec, at-rest encryption: the guarantee excludes memory inspection, a
compromised operating system and an already unlocked app.*

> If somebody already controls your device, none of this is what stands between them
> and your journal. An unlocked phone in somebody else's hands, an operating system
> that has been compromised, or the app sitting open in front of them are all outside
> what encryption at rest can do. enGender does not claim otherwise. Be wary of
> anything that does.

### The policy itself

*The policy exists in the Journal repository (`docs/privacy-policy.en.md` and `.pl.md`).
Presenting it is a page this site does not have yet, which is structural work for
ticket 03, not a copy block for this file. This paragraph is the handoff, not the text.*

---

## Claim annotations

Every claim on this page, annotated with what it rests on, so a later edit can tell
what is still true. Evidence lives in the Journal repository unless stated otherwise.
Under the v10 doctrine the annotations are provenance rather than gates: the page is
written from the spec as true, and this table says where in the spec each sentence
comes from.

| Claim on the page | Rests on |
|---|---|
| The journal is stored on your device, with no account and no server copy | No backend exists. `adapter-static`, no networked feature, no registration path in onboarding |
| App lock puts a PIN in front of the app | Phase 1 ticket 17 |
| App lock is not encryption of what is stored | ADR-0014, which requires the lock screen never to imply at-rest encryption. Required counterweight, per the marketing context |
| A forgotten PIN has one way back, and it wipes the local journal | ADR-0014 |
| Wrong PIN attempts get a growing delay, with no automatic wipe on a counter | ADR-0014, including the reasoning about an accidental second way to lose everything |
| Every control that hides something is off until you turn it on | The Journal's preference catalogue, where app lock, disguise, lock on leave and quick exit all default to false. Scoped to the hiding controls on purpose: encryption at rest and Archive passwords are not opt-in, so the sentence must not be read as covering them |
| The journal is encrypted at rest under a random key | ADR-0018, ADR-0020, Phase 2 ticket 09 and its claim-gate probe |
| Coverage includes the working files beside the journal, pre-migration copies, photos and thumbnails | Phase 2 spec, at-rest encryption. The claim-gate probe scans exactly these byte for byte: `tests/browser-tier/encryption-probe.ts`, and `tests/android-tier/encryption/` on a device |
| Photos are encrypted one file at a time under the same key | `src/lib/data/photos/encrypted-file-store.ts`, AES-256-GCM with the file name as additional authenticated data. ADR-0020: photos and thumbnails live outside SQLite, so no whole-database mechanism reaches them |
| An import never lands in a temporary file | ADR-0018: "Imports stream through memory and touch no temporary file" |
| The named exclusions: wrapped key and its derivation settings, theme, palette, language, lock on leave, disguise, and the PIN throttle timestamps | ADR-0018, which requires exactly this list to be named in any claim copy, and states that none of it is journal content |
| A passphrase wraps the key rather than encrypting the journal, so it can be changed without re-encrypting | ADR-0018. Rewrap rather than re-encrypt is in the spec and in ticket 09's acceptance |
| The passphrase is required again after the browser session ends | Phase 2 spec, at-rest encryption |
| Device-bound mode holds the key with nothing to type, tied to one browser profile or device, and a copied profile opens the journal | ADR-0018 and `docs/ui-copy.md`, whose device-bound section requires the trade named in both directions |
| Android holds the key in the Keystore, released after the platform checks who is present | Phase 2 spec, tickets 11 and 13; the authentication gate in `SCREENS.md` |
| The Journal passphrase cannot be recovered | Phase 2 spec: no data-preserving recovery. Ticket 09 requires setup to say so; this page says it earlier |
| An Archive is encrypted under a password you choose before it leaves the app | ADR-0007. AES-256-GCM in chunks, Argon2id |
| An Archive password is a separate secret from the passphrase and the PIN | ADR-0007, where an Archive derives its key from its own password and salt, and ADR-0018, where the passphrase only wraps the data key. ADR-0013 is the related but narrower point that the three consumers get separately tuned Argon2id parameters |
| An Archive's header is readable without the password, and identifies the format | ADR-0007: plaintext header carrying magic bytes, version, parameters and salt. The magic bytes are `47 44 49 41 52 59`, ASCII GDIARY, the format keeping the name it was born with |
| A lost Archive password makes that file unreadable, and affects no other Archive | ADR-0007. Each Archive derives its key from its own password and salt |
| The web host sees an IP address and that the app was fetched | How hosted web applications work. Required by the spec to be stated |
| Entries are not sent to an enGender server | No server exists |
| "Makes no network requests" is never used unqualified | Marketing context, never-list. The Journal's own About screen currently uses it, which is that repository's problem to fix and not a licence to repeat it here |
| Installing from Play means Google knows | Marketing context, objections |
| Memory inspection, a compromised operating system and an already unlocked app are out of scope | Phase 2 spec, at-rest encryption, final bullet |

## Notes for later tickets

Ticket 03 designs this page. The four-mechanisms separation above is content, not
layout: whatever shape the page takes, app lock, encryption at rest, the key on each
surface and Archive passwords stay visibly distinct sections.

The Polish pass is Alicja's own. The security wording is the part where a translation
that is merely grammatical is not good enough: "nie można odzyskać" has to be as final
in Polish as "cannot be recovered" is in English, and the difference between a gate in
the interface and encryption of a file has to survive. The device-bound block is new
since the Polish was written and has no Polish yet.
