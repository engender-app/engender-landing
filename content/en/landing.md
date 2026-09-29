# Landing copy, English

Source copy for the English site, rewritten for engender by redesign ticket 02
against `.agents/product-marketing.md` v10. Written before the visual redesign
(ticket 03), so the design serves this rather than this being cut to fit a layout.

**The doctrine changed with v10.** Copy is written from the Journal repository's
specification as true: `PRODUCT.md` for product truth, `SCREENS.md` for what each
surface does, `docs/ui-copy.md` for how the app talks. Nothing here audits the
implementation, checks a store listing or tracks release stages. The only sentences
still barred are on the never-list at the end of the marketing context.

**What is copy and what is not.** Everything inside a blockquote is the copy itself.
Everything outside one is commentary: rationale and handoffs. The rendering tickets
can take the blockquotes alone and lose nothing they need.

**Gate markers.** The mechanics stay, because the tests read them: everything inside
a blockquote is copy, and the italic marker above it says whether it renders. Under
the v10 doctrine nearly every marker reads `Gate: shipped`. The exceptions below
wait on a decision rather than on a release, and each says which.

**Register decisions this file owes the rest of the site.**

The project speaks as one person, in the first person singular. Nothing on the site
names that person. The frame itself may be stated plainly: one trans person wrote this
for other trans people. Ticket 10 puts it in three places, the hero's supporting
line, the promise strip and the Support section, and nowhere else. Elsewhere the
copy shows who wrote it by knowing things, not by claiming to.

engender is the app; your journal, lowercase, is the thing it holds. The rename
settled the old two-senses problem, and every page uses the words in those senses.
The one fixed wording is the Start journal button, which reads as opening yours.

The app's screens say scale, so this site says scale, and never dimension or axis.

engender is lowercase everywhere, including at the start of a sentence
(Alicja, 2026-09-22, reversing the camel case below).

---

## Product overview

### Hero

*Gate: shipped.*

**Headline**

> Your whole transition, in one place, on your own device.

Ticket 10 replaced "A transition tracker with a journal at its heart", which
told a first-time reader what kind of thing this is before telling them what it
would do for them. The headline states the scope and where it lives; the
supporting line carries the breadth, the three things it does not have and who
wrote it, so all four messages are on the first screen.

**The definition**

*Gate: shipped. The v10 decision: the landing page explains the word, as a
dictionary entry with phonetics, and says the pun out loud rather than winking.
Ticket 03 designs the shape; this is the text.*

> **engender** v. /ɪnˈdʒɛndə/
> to cause or give rise to a feeling, situation or condition.

The entry is the standard dictionary sense, unedited, because the reader completing
the thought themselves is the whole trick. No line after it explains the joke.

**The headword is set in the product's own casing** (Alicja's decision,
2026-08-28, and her reversal of it on 2026-09-22). For four weeks that casing
was `enGender`, which made the entry the pun rather than a clue to it: a
dictionary page for a word that is also the thing being described. The name is
lowercase now, site-wide, so the headword reads `engender` - the verb, with the
reader left to notice that the app's name is the same word. It is the same word
either way and the sense is untouched, so nothing about the claim changes; what
changes is whether the page says the joke or waits to be caught, and it waits.

**Set as an entry rather than as a sentence** (Alicja's decision, 2026-08-27,
during ticket 03). The headword takes its own line and everything the entry knows
about it sits under it, which is how a printed entry is set and which the first
draft's run-on line could not do: the sense wrapped back under the headword and
collided with it. The part of speech is abbreviated the way a dictionary
abbreviates it, `v.` here and `czas.` in Polish, so the line under the headword
reads as an entry's own furniture rather than as the start of a sentence. The
words of the sense itself are unchanged.

`messages/*.json` carries the four parts separately - headword, grammar,
phonetics, sense - because the design sets them on different lines and a renderer
splitting one string on its punctuation would be the renderer deciding the
copy's shape.

**Subheadline**

> Journal, stats, HRT, surgeries, tryouts, eras, voice practice and a summary to hand
> your clinician. No account, no server, no price. One trans person wrote it for other
> trans people.

"HRT" is not the app's word (it says medication, regimen, dose). It is the word
people search with, and the marketing context says to meet them there.

**Primary action**

Start journal. It is on the page, and the Acquisition section below says what it
links to and why nothing else on the page competes with it.

### The promise strip

*Gate: shipped.*

Four cells under Start journal and the channel badges, so the whole argument is
read before the first section heading. The cells are not headings, because they
are not sections.

> **Free, for good.** No price, no plan, no ads. The licence is GPLv3, which cannot be
> revoked, so nobody can charge for this later, and that includes me.

> **Nothing to sell.** There is no account and no server. Your journal is stored on
> your device, encrypted, and I never see it. I cannot sell what I do not have.

> **All of it, in one place.** Journal, stats, HRT, surgeries, tryouts, eras, voice
> practice and a printable summary for your clinician.

> **By a trans person, for trans people.** One person made this. There is no company
> behind it.

"I cannot sell what I do not have" states the mechanism instead of promising
anything, which is how the objections table in the marketing context answers the
same worry.

### What this is

*Gate: shipped.*

> engender is where you keep your transition: how you feel from day to day, what you
> take, what you are trying, what is coming up and what has already happened. It is a
> journal first. Around the journal sit the records that otherwise end up spread
> across a notes app, a spreadsheet, a photo folder and a letter from a clinic.
>
> Nothing in it decides anything about you. You name your own scales and pick what to
> track, and the app draws what you put in without grading it. It never suggests a
> dose, never colours a number red and never tells you which way you are meant to be
> going.
>
> It is free software: there is no price, no plan and nothing to upsell, and the
> licence keeps it that way.

The first paragraph answers "is this for me" rather than repeating the hero. The
third drops the one-trans-person sentence, which now sits in the strip directly
above.

### Where it stands on privacy

*Gate: shipped. The full page is `privacy.md` and this is only the handoff to it.*

> Your journal stays on your device. There is no engender account, no server, and no
> copy of your entries anywhere but where you put them. I cannot read your journal,
> sell it or hand it over, because I never have it.
>
> On your device it is encrypted, and you choose what opens it: a passphrase, a PIN,
> your fingerprint or face, or the device's own lock. On Android the app does not even
> ask for internet permission. In a browser, the web host sees the app being loaded
> and checking for updates, and nothing of what you write.
>
> What that protects, and what it does not (an unlocked phone in someone else's hands,
> for one), is on its own page.

Conclusion first, mechanism second, the limit in the same breath. The Android
line is checkable by anyone: the Journal's `AndroidManifest.xml` declares no
`INTERNET` permission, so the Play listing's permission list shows its absence.
The web line names the service worker's update checks, because the host does see
those.

---

## Visual tour

### The line that covers the whole tour

*Gate: shipped. Required by the spec: public screenshots use synthetic Journal data.*

> Every screenshot here was made with invented data. Nobody's journal appears on this
> site.

Place it where a person meets the first screenshot, not in a footnote. The captions on
the five screens that show written entries repeat it in short form, because those are
the ones a reader might otherwise take for someone's real diary.

### Captions

*Gate: shipped, all eight. Ticket 06 recaptures the screenshots; the captions hold.*

**Home**

> The greeting, what is coming up, and the last seven days in whatever colour you
> picked. The mood row logs an entry for right now in one action, so on a day when you
> cannot face writing, you can still log something. Invented entries.

**An entry**

> Mood, your scales, tags, a note, photos. An entry needs only one of them, so a day
> where all you managed was a mood is still a day you logged. Invented entry.

**The month**

> Coloured by mood, or by any scale you choose. Days you did not log stay neutral,
> because a gap is not a bad day and the colour never says it was.

**One day, twice**

> Gender can shift through a day, so a day holds as many entries as it needs and
> stamps each one with its time. The day's own colour is their average. Invented
> entries.

**Search**

> Searches your notes and your tags as you type. Diacritics do not matter in either
> direction: type lozko and it finds łóżko. Invented entries.

**Six months of one scale**

> Every scale gets its own chart and its own average over however many days you pick.
> Days with more than one entry are averaged, and the list behind the chart says which
> days those were.

**Milestones**

> Dated days that matter, in order. The ones ahead count down. The ones behind come
> back each year.

**Export**

> Export packs everything into one Archive, encrypted with a password you choose,
> before it goes anywhere. Invented journal.

---

## Feature summary

The grid follows the order Alicja gave on 2026-09-29 (ticket 10): what a reader
came looking for, rather than the app's own Health / Steps / Support / Media map.
The screenshot tour follows it, then one paragraph for the rest.

### What it holds

*Gate: shipped.*

> **Journal** How today felt. A mood, a note, your own scales, tags, photos, a voice
> memo, and where in your body dysphoria or euphoria sat. One of those is enough. A
> day where all you managed was a mood is still a day you logged.

> **Look back** Whether anything is changing is hard to see day to day and easy to see
> over months. A heat map of each month, a chart for each scale, how days with a tag
> compare to days without, a wrapped for any week, month or year, and the good days
> from a month, six months and a year ago.

> **HRT** Your medication schedule with the next dose and how much is left, doses
> logged as you take them, lab results drawn as a chart, and a modelled hormone curve.
> The app never suggests a dose or shows a reference range.

> **Surgeries** A journal per procedure: consults, the date itself, recovery, dilation
> where it applies, and photos that stay inside the app rather than in your camera
> roll.

> **Tryouts** Try a name, a pronoun set, a style or a garment. Give it a start date,
> log how it feels as you go, and close it when you know.

> **Eras** Name the chapters of your own timeline, whatever they were for you. They
> draw as bands along your timeline and milestones, so a reading sits against the
> chapter you were in when you wrote it.

> **Voice** Practise, record the same passage each time, and compare with your own
> earlier takes. Pitch, resonance and speaking rate describe the recording without
> grading your voice.

> **Clinician summary** Bring your doses, labs, measurements and changes to an
> appointment as one printed summary, over a range you choose, with only the sections
> you choose.

Checked against the Journal spec on 2026-09-29. There is a month heat map and no
year one. On this day brings back only good days, from a month, six months and a
year ago. The spec says a dose is skipped in one tap and does not say the same of
logging one. Eras draw along the milestone and stats rails. The Voice card says
"Voice" and "practise" because the screen is practice plus benchmarks, and the
pitch figure may not be presented as a target.

### Also in there

*Gate: shipped.*

> Also in there: search across your notes and tags, a tally of the times you were
> misgendered and gendered right, milestones with countdowns ahead and anniversaries
> behind, letters that open on a date you choose, a roadmap of the legal and medical
> steps in Poland with room for your own, binder and tucking wear time, hair removal
> sessions, measurements and sizes, appointment prep, Safe Space with your good days
> and your own comfort list, a directory of trans organisations and helplines you can
> read offline, one photo library across all of it, and a place for referrals and
> court orders. If you already have a year in Daylio, it imports.

### Keeping it

*Gate: shipped.*

> **Archives.** Export packs your journal into one file, encrypted with a password you
> choose, before it leaves the app. Import puts it back, either merged into what is here
> or replacing it.
>
> **Scheduled backup.** On Android, an encrypted Archive written to a folder you pick,
> weekly or monthly.
>
> **Coming from Daylio.** Import a Daylio CSV. It shows you the counts and how the moods
> will map before it writes anything, and it only ever merges.
>
> **Plain export.** CSV or JSON, for a spreadsheet or for keeping your own copy. It is not
> encrypted, and the app says so and makes you confirm before it writes the file.
>
> **When it has been a while.** If your last Archive is more than 30 days old, the home
> screen says so once. You can dismiss it.

### On your phone

*Gate: shipped.*

> **On Android.** The same journal features as a phone app. Its data does not sync with
> the browser journal.
>
> **Reminders.** Medication, injections, appointments. One-off or repeating, as
> notifications on your phone.
>
> **The daily check-in.** One prompt a day, at a time you choose, skipped on days you have
> already written something.
>
> **Install it.** Add it to your home screen and open it without a browser in the way.
>
> **Works offline.** Once it is installed it does not need the network to open.

### If you need to be careful

*Gate: shipped.*

> Choose how to unlock the journal in Privacy and data. Disguise, lock on leave and quick
> exit stay off until you turn them on.
>
> **Access.** Use a passphrase, a PIN with a device key, supported biometrics or a
> device-bound key. The Privacy page explains what each protects and how recovery works.
>
> **Disguise.** The browser tab says Notes instead of engender. On Android, the app takes
> a neutral name and icon too.
>
> **Lock on leave.** The journal locks when you switch away. With a mode that asks for a
> secret, you need it to return.
>
> **Quick exit.** A two-finger swipe down covers the journal. Disguise shows a Notes
> screen; otherwise the tab goes blank. If your access mode asks for a secret, returning
> requires it.

### How it looks

*Gate: shipped.*

> **Sixteen palettes**, among them trans, nonbinary, genderfluid, bisexual, lesbian,
> pansexual, agender and rainbow. Each one recolours the whole app, charts and
> calendar included, and each one works in light and dark.
>
> **Colour never judges.** No red for a bad day and no green for a good one. The heat map
> is one colour at different strengths, and an empty day stays empty.
>
> **Two languages.** English and Polish, switchable in settings, with dates following
> whichever you pick.

---

## Acquisition

*Gate: shipped for Start journal, which opens the web Journal. The channel list's
mechanics - names with a status, links as each goes live - are redesign ticket 04's;
this ticket only rewrote the strings around them.*

**The copy for this section is not in this file.** It is in `messages/en.json`, under
`acquisitionIntro`, `startJournal`, `acquisitionAndroid`, `channelStatus` and
`channels`, and it is on the page today. Every other block in this file is copy waiting
for a renderer, so quoting these strings here would leave two copies of a live sentence
to drift apart quietly. What follows is the reasoning the strings cannot carry.

**Start journal** links to `https://app.gender-diary.barankiewicz.dev/`, in this tab,
with nothing appended: no campaign parameter, no referral identifier, and neither of
the two choices this origin remembers. It is the only action on the page, and a test
counts the links in `main` rather than trusting anyone to keep it that way. The URL
still carries the old name; redesign ticket 05 owns the domain question, and nothing
in this file decides it.

**The order is an opinion, and the page owns it.** Google Play goes last, and the copy
says it is last for a reason instead of leaving the position to hint. The other three
are alphabetical among themselves, because nothing separates them: the opinion held here
is that all three beat Play, not that any one of them beats the other two.

The reason is the one already on the Play entry. Installing from Play tells Google there
is a trans app on that phone, tied to that account, and no setting in the app touches
it. That is the only difference between the channels a reader has any stake in, which is
why it is the only one the section argues about.

**A channel that is not live renders as its name and a status, never a dead link.**
What flips each one live is redesign ticket 04, reading the Journal repository's
release state. Writing the app as real and a listing as pending are different claims,
and the strings keep them apart: the app exists, the shelf link comes when the shelf
does.

**No badge artwork yet.** Play's brand rules do not allow its badge without a live
listing. When the channels go live, Play and F-Droid use their own artwork under their
own rules, and Aurora and Obtainium get this site's own controls.

**One line each, and none of them is a tutorial.** Every note says the one thing that
changes a reader's decision and stops. How to point Obtainium at a repository is
Obtainium's documentation, not this site's.

**Aurora is the Play build without the Google account.** That is what earns it a line:
same package, no install recorded against anybody. Calling it a separate source would
tell somebody they were getting a different build. There is no mirror link on this page
and there will not be one, since a reader who uses Aurora already has Aurora.

### Staged: the F-Droid signing warning

*Gate: the answer to one question the Journal repository has not written down yet:
whether the F-Droid signature can be update-compatible with the Play one. Its Phase 2
ticket 18 owns the answer. If the signatures are compatible, this block is never
published. If they are not, it goes next to F-Droid. This is a staged block because
the fact is undecided, not because anything is unshipped.*

> F-Droid signs its own build, and Android will not install it over a build signed by
> anyone else. Switching in either direction means exporting an Archive first, then
> uninstalling, then installing the other build and importing the Archive back.

---

## Source, licence and support

### Who made this

*Gate: shipped. Ticket 10 retitled the section and put the person first.*

> One trans person made this, and that person is me, Alicja Barankiewicz. I work as a
> data engineer in Warsaw and I come from animation, which is why this page moves the
> way it does. I also run nazwozbior.pl, which searches every name in the Polish PESEL
> registry for anyone looking for the one that fits. There is no company, so there is
> no support desk and nobody to sell it to.

### Source

*Gate: shipped. The Journal repository is public, so "go and look" is checkable in
the most literal way this page has.*

> **You can read it.** engender is free software under the GPLv3. The source is public.
>
> The licence means you can run it, change it and pass it on, and it cannot be taken
> back. If I stop, someone else is free to pick the code up, and your Archives are a
> documented format rather than something only this app can open.

No Ko-fi line. Settings has a Ko-fi row, but its link is not live yet, so a
sentence pointing at it would be false. It can come back once the link works.

### Support

*Gate: shipped. The paragraph telling the reader not to send their journal was cut
by Alicja on 2026-09-29 (ticket 10), along with the same warning in the Guide and
the Play listing.*

> **If something is broken**, tell me what happened and what you expected instead. That
> is usually enough to find it.

### Privacy policy and security contact

*The policy exists in the Journal repository (`docs/privacy-policy.en.md`). Presenting
it is a page this site does not have yet, which is structural work for ticket 03, not
a copy block for this file. Deliberately outside a blockquote, so no placeholder can
ship.*

---

## Notes for later tickets

Ticket 03 designs against this file and decides the shape of the definition entry and
the care-surfaces group. It invents no product claims.

Ticket 04 owns the acquisition mechanics: which channels render as links, read from
the Journal repository's release state, and what a live channel's entry looks like.

Ticket 06 recaptures the eight tour screenshots from invented data, against the new
design.

The Polish pass is Alicja's own, after this English lands. The grammatical-gender
section of the marketing context applies throughout, and several sentences here
address the reader in a way Polish cannot copy without picking a gender for them.

## Search and share

The description is shared by search, Open Graph and Twitter metadata.

Your whole transition in one place: journal, stats, HRT, surgeries, tryouts, eras, voice practice and a clinician summary. On your device, with no account.
