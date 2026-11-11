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

> Settings holds preferences: how the journal looks, what it tracks and when it reminds you. What you record stays on its own screen. The gear at the top of Today opens Settings.

### Appearance

*Gate: shipped.*

> Language, theme, one of sixteen palettes and mood colours. You can also make text larger, make text and borders clearer, and reduce motion.

### Tracking

*Gate: shipped.*

> Gender scales, Tag groups and Features to show, which decides which parts of the app appear and holds the switch for cycle tracking.

### Reminders & prompts

*Gate: shipped.*

> Reminders sets when the app nudges you. Notices and notifications switches the other prompts and sets quiet hours. Phone notifications need the Android app.

### Your lists

*Gate: shipped.*

> Modes, entry templates, body regions and eras.

### Privacy & data

*Gate: shipped.*

> Lock & recovery sets how your journal opens, when it locks and the recovery key. Permissions and Disguise app are here too.
>
> Export / import makes or restores a backup, imports from Daylio and, on Android, sets a backup folder. Journal book prints a range. Trash keeps deleted entries for 30 days. Delete everything erases the journal from this device.
