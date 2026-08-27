# Landing copy, English

Source copy for the English site, rewritten for enGender by redesign ticket 02
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
names that person. The frame itself may be stated plainly, once: one trans person
wrote this for other trans people. It appears in the overview and nowhere else, and
the copy otherwise shows who wrote it by knowing things, not by claiming to.

enGender is the app; your journal, lowercase, is the thing it holds. The rename
settled the old two-senses problem, and every page uses the words in those senses.
The one fixed wording is the Start journal button, which reads as opening yours.

The app's screens say scale, so this site says scale, and never dimension or axis.

enGender keeps its casing everywhere, including at the start of a sentence.

---

## Product overview

### Hero

*Gate: shipped.*

**Headline**

> A transition journal that stays on your device.

Kept from the previous site. It carries the claim, and the claim is why anyone
stays on the page.

**The definition**

*Gate: shipped. The v10 decision: the landing page explains the word, as a
dictionary entry with phonetics, and says the pun out loud rather than winking.
Ticket 03 designs the shape; this is the text.*

> **engender**, verb, /ɪnˈdʒɛndə/: to cause or give rise to a feeling, situation
> or condition.

The entry is the standard dictionary sense, unedited, because the reader completing
the thought themselves is the whole trick. No line after it explains the joke.

**Subheadline**

> Write down how a day went, and track how your gender felt that day. No account,
> nothing to sync.

**Primary action**

Start journal. It is on the page, and the Acquisition section below says what it
links to and why nothing else on the page competes with it.

### What it is

*Gate: shipped.*

> enGender is a journal for tracking gender transition. An entry holds a mood, a
> note, your scales, tags, photos, a voice recording and how your body felt, and it
> only needs one of those to count. Write several in one day if one does not cover
> it. Backdate one to a day you missed.
>
> Mood trackers are the right shape for a daily habit, and they have nowhere to put
> gender. enGender keeps the shape and adds scales you name yourself. It records
> what you tell it and does not try to interpret any of it.
>
> One trans person wrote this for other trans people. It is free software, there is
> no price, no plan and nothing to upsell, and it stays that way.

### Where it stands on privacy

*Gate: shipped. The full page is `privacy.md` and this is only the handoff to it.*

> Your journal is stored on your device, encrypted where it sits. There is no
> enGender account, and your entries are not sent to an enGender server, because
> none exists.
>
> What that protects, and what it does not, is on its own page.

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

Rebuilt against `SCREENS.md` as of 2026-08-27: the app is 61 routes now, and the
2026-08-12 summary described perhaps half of it. The care surfaces get one group
with four leads rather than 23 rows, because this is a summary and the four groups
are the app's own (`/more`).

### Writing it down

*Gate: shipped.*

> **Entries.** A mood on five levels, a note, tags, photos, a voice recording, and
> your scales. Several a day, or backdated to a day you missed.
>
> **Scales.** Five come built in, among them Gender feeling, which runs from dysphoria
> at one end to euphoria at the other. Make your own, with whatever two end labels and
> range you want, and group the ones you use into a preset so the entry screen only
> asks about what you actually track.
>
> **How your body felt.** Dysphoria and euphoria, marked on the body regions they
> belong to. Tracked separately, because they are not opposites and one day can hold
> both.
>
> **Tags.** Grouped and editable. Turn a whole group off when it stops being relevant.
> Hiding a built-in tag takes it out of every picker and leaves every entry that
> already carries it alone.
>
> **Photos.** Kept in the app's own storage. They never go into your phone's gallery,
> so they do not turn up in a camera roll someone else is scrolling.

### Reading it back

*Gate: shipped.*

> **The month.** A heat map in one colour, driven by mood or by a scale you pick.
>
> **Search.** Your notes and tag labels, matched as you type, ignoring diacritics.
> Star what matters, and every starred entry and photo waits in one place.
>
> **Charts.** One per scale, over 7 to 365 days, with your streak. Open one for the
> dated list of values behind it, so you can check the line instead of taking it on
> trust.
>
> **Tag insights.** For a given scale, how days with a tag compare to days without it.
> An observation, not a verdict. Tags with fewer than three entries in that stretch
> are left out, because at that size the difference is noise.
>
> **Wrapped.** A week, a month or a year, looked back on: entries, streaks, how a
> scale moved, top tags, milestones, photos. Or any stretch you pick yourself.
>
> **On this day.** What you logged a month, six months and a year ago. Only days that
> were good come back.
>
> **Then and now.** Two stretches of time, side by side.
>
> **The tally.** One tap when you were misgendered, one when you were gendered right,
> and a chart of how the counts move.
>
> **Milestones and the timeline.** Countdowns ahead, anniversaries behind.

### Around the journal

*Gate: shipped. The four leads are the More hub's own groups, and each sentence
inside one is a hub row's own register kept: "logged plainly" is the app's phrase.
The clinician summary is worded as the person's own printout, per the marketing
context's word list: never clinical framing, never reporting.*

> The journal is the spine, and the rest of transition life has a place around it.
> None of it interprets, and none of it grades.
>
> **Body.** Progress photos, then versus now. Measurements over time. What you
> bought, the size, and how it fit. Hair progress staged against a published scale,
> and electrolysis or laser sessions, logged plainly.
>
> **Health.** Lab results with no reference ranges. What you are taking and since
> when, every dose against its schedule, and a modelled hormone curve. Cycle events,
> side effects and surgery recovery, logged plainly. Questions to bring to your next
> appointment, and a printable summary of doses, labs and side effects for a range
> you choose, made only when you decide a clinician should see it.
>
> **Transition.** A step-by-step roadmap. Letters you write now and read once their
> date arrives. Tryouts, for tracking how something you are trying feels over time.
>
> **Practice.** For the days doubt is loud: the entries you starred and the ones you
> tagged euphoria, read back as counterevidence. Two voice recordings, side by side.
> Binder and tucking wear time. When you first noticed each change. Trans
> organisations and helplines, kept in the app.

### Keeping it

*Gate: shipped.*

> **Archives.** Export packs your journal into one file, encrypted with a password you
> choose, before it leaves the app. Import puts it back, either merged into what is
> here or replacing it.
>
> **Scheduled backup.** An encrypted Archive written to a folder you pick, weekly or
> monthly, without you remembering to.
>
> **Coming from Daylio.** Import a Daylio CSV. It shows you the counts and how the
> moods will map before it writes anything, and it only ever merges.
>
> **Plain export.** CSV or JSON, for a spreadsheet or for keeping your own copy. It is
> not encrypted, and the app says so and makes you confirm before it writes the file.
>
> **When it has been a while.** If your last Archive is more than 30 days old, the
> home screen says so once. You can dismiss it.

### On your phone

*Gate: shipped. These five blocks were staged in the 2026-08-12 file; the v10
doctrine publishes them.*

> **On Android.** The same journal, the same data, as an app.
>
> **Reminders.** Medication, injections, appointments. One-off or repeating, as
> notifications on your phone.
>
> **The daily check-in.** One prompt a day, at a time you choose, skipped on days you
> have already written something.
>
> **Install it.** Add it to your home screen and open it without a browser in the way.
>
> **Works offline.** Once it is installed it does not need the network to open.

### If you need to be careful

*Gate: shipped. App lock, disguise, lock on leave and quick exit all default to off
in the Journal's preference catalogue, so "off until you turn it on" is a checkable
statement and not a reassurance. Every sentence here keeps the app-lock counterweight
attached, per the marketing context. Disguise now covers the installed app identity
too, per Journal Phase 2 ticket 25. The privacy page owns the longer treatment.*

> Everything in this section is off until you turn it on. Keeping a journal about your
> own life is not something to be ashamed of, and the app does not behave as though it
> is. These exist because some people's circumstances are genuinely unsafe, and only
> you know whether that is yours.
>
> **App lock.** A PIN in front of the app. It stops someone picking up your unlocked
> phone and reading it. It is not encryption of what is stored.
>
> **Disguise.** The browser tab says Notes instead of enGender. On Android, the app's
> name and icon on your phone go plain too.
>
> **Lock on leave.** Switch away from the app and it locks itself behind you.
>
> **Quick exit.** A two-finger swipe down blanks the tab, and locks it if you have app
> lock switched on.

### How it looks

*Gate: shipped.*

> **Eight palettes**, including trans, nonbinary, genderfluid, bisexual, lesbian,
> pansexual, agender and rainbow. Each one recolours the whole app, charts and
> calendar included, and each one works in light and dark.
>
> **Colour never judges.** No red for a bad day and no green for a good one. The heat
> map is one colour at different strengths, and an empty day stays empty.
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

### Source

*Gate: shipped. The Journal repository is public, so "go and look" is checkable in
the most literal way this page has. The block renders inside the Support section
for now - the old site held it entirely, so no section of its own exists - and
ticket 03 decides whether it earns one.*

> **You can read it.** enGender is free software under the GPLv3. Do not take my
> word for anything on this page: the source is public. Go and look, or get someone you
> trust to look.
>
> The licence also means you can run it, change it and pass it on. This is one person's
> project, so it might stop. If it does, someone else is free to pick the code up, and
> your Archives are a documented format rather than something only this app can open.

### Support

*Gate: shipped. The prohibition on asking for sensitive material is required by the
spec and is not optional wording.*

> **If something is broken**, tell me what happened and what you expected instead. That
> is usually enough to find it.
>
> **Do not send me your journal.** Not an Archive, not a screenshot with your entries in
> it, not a log from a session where you were writing. I will never ask for any of it.
> If something asks, it is not me.

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
