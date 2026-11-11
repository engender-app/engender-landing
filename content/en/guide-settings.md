# Guide copy, English: Settings

Source copy for the Guide's Settings chapter.

**What is copy and what is not.** Everything inside a blockquote is copy;
everything outside one is commentary. The italic marker above a blockquote
says whether it may be published (docs/adr/0001). The catalogue carries the
rendered strings under `guide.chapters.settings.sections`.

**Sources.** The Journal's `SCREENS.md` ("Settings" and "Notifications and
quiet hours"), ADR-0036 as amended by ADR-0084, and the unprompted registry.
The current screen has three sections: Appearance, Tracking, Privacy and data.

**Rechecked 2026-11-11.** The chapter below was checked against the Journal's
`functional-audit` branch, the 1.0.0 candidate: its catalogues, routes and
`CHANGELOG.md`. Where the notes above describe an older app, the chapter is
what is current.

---

## The chapter

### What belongs here

*Gate: shipped.*

> Settings holds preferences and the lists those preferences draw from: how the
> journal looks, what it asks you to track and when it reminds you. What you
> record stays on its own screen. Doses, lab results and surgery notes are on
> the Transition tab, not here.
>
> The gear at the top of Today opens Settings. It has five sections.

### Appearance

*Gate: shipped.*

> Appearance holds the app's language, theme, gender palette and mood colours.
> There are sixteen palettes, and mood colours have their own presets. You can
> also make text larger, make text and borders clearer, and reduce motion. On
> Android you can change the app icon here too.

### Tracking

*Gate: shipped.*

> Tracking holds Gender scales, Tag groups and Features to show. Features to
> show is where you choose which parts of the app appear, and it has the switch
> for cycle tracking.

### Reminders & prompts

*Gate: shipped.*

> Reminders is where you set when the app should nudge you. Notices and
> notifications switches the app's other prompts on or off and sets quiet
> hours, a stretch when no notification arrives. A reminder due in quiet hours
> waits until they end. Phone notifications need the Android app.
>
> Live tiles are not here. You switch them in Today's editor, beside its pins.

### Your lists

*Gate: shipped.*

> Your lists holds the lists used across the journal: modes, entry templates,
> body regions and eras.

### Privacy & data

*Gate: shipped.*

> Lock & recovery holds how your journal opens, when it locks and the recovery
> key. Permissions and Disguise app are in this section too.
>
> Export / import is where you make or restore a backup, export plain CSV or
> JSON and import from Daylio. On Android it is also where you choose a backup
> folder, and newer backups that your other devices save there can be merged
> in.
>
> Journal book prints a range you choose. Trash keeps deleted entries for 30
> days, and you can delete one for good sooner. Delete everything erases the
> journal from this device.
>
> Below the sections, About shows the app's version and links to this guide,
> the privacy policy and the source code.
