# Product

<!-- impeccable:product-schema 1 -->

Written by redesign ticket 03's `/impeccable init` step, compiled from this
repository's own finished records rather than from a fresh interview, which is
what that ticket's first acceptance box asks for: `.agents/product-marketing.md`
v10 (audience, positioning, objections, voice, the never-list),
`content/en/landing.md` and `content/pl/landing.md` (the approved copy), and the
Journal repository's `PRODUCT.md`, `SCREENS.md`, `docs/ui-copy.md` and
`CONTEXT.md` for product truth. Every fact below traces to one of those. Where a
fact is undecided it says so and names the ticket that owns it, rather than being
filled in with something plausible.

Two documents this one does not replace. `.agents/product-marketing.md` stays the
authority on audience, claims and voice, and it is longer and more specific than
this file will ever be; this is the durable product record an `/impeccable` pass
reads at boot. The Journal repository's own `PRODUCT.md` describes the app. This
one describes the app as this site must speak about it, plus the site itself.

## Platform

web

## Users

Two audiences, and they are not the same people at the same moment.

**The visitor.** A trans person, at any stage including questioning and
pre-anything, who wants a private record of how they feel over time. They arrive
having searched for a mood tracker, an HRT tracker or a private diary app,
because "transition tracker" is a thin shelf. They are deciding whether to
install anything at all, and the decision is not casual: some of what would go
in this journal is not safe to say out loud yet. No assumption is made about
their identity, medical pathway, whether they are out, or how far along they are.

Also on the page: somebody vetting the app before recommending it to a friend or
a support group, somebody who reads source before installing anything, and
somebody already keeping a Daylio habit who wants to know whether moving is
worth it. The second of those is why every privacy sentence on the site names a
mechanism instead of an adjective.

**The person using the app** is the Journal repository's user, not this site's.
This site never renders their data and never touches their journal.

## Product Purpose

engender is a journal for tracking gender transition day by day, local-first,
with no account and no backend. This repository is not that app. It is the
public site that explains the app and hands a visitor to it: it says what the
app does, what its privacy actually protects and what it does not, where to get
it, and it links to the Journal. Success is a person who needs this being able
to find it, understand exactly what it does and does not protect, and decide
before installing anything.

The site's conversion action is Start journal, a plain link to the production
Journal in the same tab with nothing appended: no campaign parameter, no
referral identifier, and none of this origin's language or theme state. It is
the only action on the page, and a browser test counts the links in `main`
rather than trusting anyone to keep it that way.

Non-goals, and they are policy rather than backlog: no signups, no email
capture, no download counts as a vanity metric, and no analytics ever. The site
will never report a conversion rate, so no design or copy decision here can be
settled by a measurement. They get settled by review against
`.agents/product-marketing.md`, which is why that document is specific enough to
argue with.

## Positioning

One trans person wrote this for other trans people. Free software under GPLv3,
no price, no plan, nothing to upsell, and the project earns nothing from a person
installing it. The frame may be stated plainly, once, and the site names nobody:
no byline, no about-me, no name.

What a neighbouring product could not truthfully copy: there is no account, so
there is no server-side copy to leak, sell or hand over; the source is public, so
the privacy claims are checkable rather than promised; and no company can
honestly write that one person made this and it earns nothing. An account-based
competitor cannot adopt the first without dismantling its business and a
closed-source one cannot adopt the second at all.

The product is positioned journal-first (decision 2026-08-27). The journal is
the spine; the care surfaces around it are the depth behind it, not a second
category. The searcher finds a journal that has a place for gender, and the
breadth is the second-visit argument.

## Operating Context

A static bilingual SvelteKit site, prerendered by `adapter-static`, deployed by
GitHub Actions over FTP to lh.pl managed hosting. English and Polish are each
their own document at `/en/` and `/pl/`, with `/` as a language gateway;
`<html lang>` is written at prerender time by `src/hooks.server.ts`, so a
client-side language swap is deliberately a full reload.

Two pages exist today, the landing page and a privacy explainer, both in both
languages. A page presenting the Journal's own privacy policy does not exist
yet and is filed as its own ticket rather than being built here (Alicja's
decision, 2026-08-27, ticket 03).

Hard technical constraints, all of them load-bearing rather than preferences:

- **No third-party resource, ever.** No analytics, no tracking, no remote font,
  no CDN. A reader can open the network tab and check the privacy page's claims
  before believing a word of it, and that check is part of the argument. A
  content policy in `src/app.html` and `static/.htaccess` enforces it and
  `tests/policy.test.mjs` holds the line at the two things parsed before the
  policy arrives.
- **This origin shares nothing with the Journal's.** No storage, no service
  worker, no state handed over (ADR-0019 in the Journal repository). The two
  choices this origin remembers, language and theme, live in its own
  `localStorage` under its own keys and never travel.
- **The page works without scripting**, in the visitor's system theme, and
  works without scroll-driven animation support. Motion is progressive: CSS
  scroll-driven where a browser has it, an `IntersectionObserver` fallback where
  it does not, and the finished static page where neither exists.
- **One runtime dependency** for motion (`motion`), and a test asserts there is
  no second animation runtime and no duplicate copy of that one.
- Content lives in `messages/en.json` and `messages/pl.json`, whose keys must
  match or it is a type error (ADR-0001: shipping strings live in the message
  catalogue). Approved copy is drafted in `content/<locale>/*.md`, where a
  blockquote is copy and everything outside one is commentary.

## Capabilities and Constraints

What the site may say about the app is settled by `.agents/product-marketing.md`
v10 and is not restated here. Two rules from it bind any design work:

- **Copy is written from the Journal repository's specification as true.** The
  copywriter does not audit the implementation, check store listings or gate on
  release state (Alicja's decision, 2026-08-27). Claim gating is retired.
- **The never-list still binds.** Sentences that are false whatever ships: the
  unqualified "makes no network requests", "everything is end-to-end
  encrypted", any protection claim against a compromised or already-unlocked
  operating system, any medical claim or reference range or dosage, and any
  invented rating, testimonial or count. Structured data included: the page's
  JSON-LD carries five properties and deliberately no offer and no rating,
  which costs the software-application rich result on purpose.

Terminology is the Journal repository's `CONTEXT.md`, and only that. The site
carries no second copy of a definition, because a second copy drifts and the
drift is invisible until a page is already wrong. The traps are tabulated in
`.agents/product-marketing.md`: journal not store, entry not log, scale never
dimension, Archive not backup, app lock never the passphrase.

Undecided, each with its owner:

- **The domain.** The site is served from `gender-diary.barankiewicz.dev` and
  the Journal from `app.gender-diary.barankiewicz.dev`, both still carrying the
  pre-rename name. Ticket 05 owns the move and it needs a human decision about
  what a domain says about its reader in a browser history.
- **The acquisition channels.** Google Play, F-Droid, Aurora and Obtainium
  render as a name plus a status rather than a dead link. What flips each one
  live is ticket 04, reading the Journal repository's release state.
- **The F-Droid signing warning**, staged in `content/en/landing.md` and
  published only if the F-Droid and Play signatures turn out not to be
  update-compatible. The Journal repository's Phase 2 ticket 18 owns the answer.
- **The tour screenshots.** Eight captions are approved and on the page; the
  pictures are ticket 06's, recaptured from invented data against this
  redesign. Every frame declares its aspect ratio now so that ticket moves no
  layout.

## Brand Commitments

**The name is engender**, always that casing, including at the start of a
sentence. Never Engender or EnGender when naming the app. Renamed from
the "Gender Diary" working title (Alicja's decision, 2026-08-26). The landing
page carries a dictionary-style entry for the verb with its phonetics and says
the pun out loud rather than winking.

**Voice**, from `.agents/product-marketing.md` and the Journal's
`docs/ui-copy.md`: second person for the reader, first person singular for the
project. British spelling. Plain, exact, unhurried; warm without being chirpy.
Nothing is being sold, and the page must not read as if something were, so no
urgency, no scarcity, no funnel thinking, no dark patterns. Every "we", "us" and
"our" on this site is an error. No emoji, no em dashes, no promotional
adjectives, no invented social proof, no clinical framing, no selling through
fear, and no talking about the copy on the copy.

**The privacy controls are presented as available, not expected.** App lock,
disguise, lock on leave and quick exit all default to off in the app, and a page
that leads with concealment tells this audience that keeping a journal about
their own life is something to be ashamed of. Name the controls, say they stay
off until somebody turns them on, and leave the judgement to the person whose
situation it is.

**Colour never judges** (Journal ADR-0012). No red for a bad day, no green for a
good one, no diverging ramp anywhere, and this holds for any chart, heat map or
data figure this site ever draws.

**The eight flag palettes carry identity** in the app: agender, bisexual,
genderfluid, lesbian, nonbinary, pansexual, rainbow, trans, each in light and
dark. Their faithful stripe sequences live in the Journal's
`src/lib/theme/palettes.css` as `--motif-stripes`, including bisexual's doubled
stops encoding its 2:1:2 proportions. Copying those values across is allowed and
importing code from that repository is not.

**The landing is a motion piece** (2026-08-27, and ticket 03 reads it as a
brief). The page should be more animated than the app, which has to stay
functional day to day where the landing does not. Motion is this site's craft
signature and a visitor should come away suspecting an animator built it. The
nazwozbior.pl reference that the previous visual pass worked from is dropped.

## Evidence on Hand

- **The source code**, public and GPLv3, at `github.com/barankiewicz/gender-diary`.
  "Go and look" is a sentence this site can say literally.
- **A documented, versioned Archive format**, so the export is not a black box.
- **A site that loads no third-party resource**, checkable in a network tab.
- **The encryption claim gate**: a test in the Journal repository seeds sensitive
  content, closes the app and searches the raw bytes of everything left behind
  (`tests/browser-tier/encryption-probe.ts`, with an Android twin). The at-rest
  claim is made only because that search comes up empty. Describing the gate is
  probably more persuasive to this audience than describing the encryption.
- **The app's own visual record**, for kinship rather than for import: home
  screenshots across all eight palettes in the Journal repository's
  `.claude/home-shots/`, its flag-sun geometry in `src/lib/motion/flagSun.ts`,
  and the queued direction handoff in `.claude/ticket-28-direction-handoff.md`
  which carries its motion tiers and duration tokens.

**What does not exist, and must not be invented.** There are no interviews and
no verbatim customer quotes, and `.agents/product-marketing.md` keeps that
section deliberately empty rather than filling it with plausible phrasing. There
are no testimonials, no download counts, no star ratings, no "trusted by" and no
logos, and there will be none later when the numbers are larger either. There is
no store badge artwork, because Play's brand rules do not allow its badge
without a live listing.

## Product Principles

- **State the mechanism, not the adjective.** "Safe", "secure" and "private" on
  their own tell this reader nothing and cost the page its credibility with the
  one audience that will check. Name what is stored where, and by what.
- **Put the limit in the same breath as the claim.** A conceded limit is what
  makes the rest believable. App lock stops a glance over a shoulder and is not
  the encryption; the web app is fetched over the network and works offline once
  installed; a Play install tells Google there is a trans app on that phone.
- **Nothing is being sold.** When persuasion and honesty pull in different
  directions, honesty wins, and this is the rule most of the voice rules are
  instances of.
- **Non-presumption, not coyness.** The page never tells a reader what their
  experience is, and it also never withholds the word gender to create interest.
- **The page is checkable.** Every privacy claim points at something a reader
  can inspect: the source, the network tab, the Archive format, the probe test.

## Accessibility & Inclusion

The floor, and ticket 07 re-verifies all of it after this redesign:

- WCAG 4.5:1 for body text, 3:1 for large text, against whatever is actually
  painted behind it. The existing suite samples rendered pixels at several
  points of the background's drift rather than trusting a token, and that
  approach stays.
- Touch and pointer targets at least 44px. This is the web floor; the Journal's
  own 48px comes from Android and applies to the app, not here.
- Usable at 390px width and at 200% text, with no page growing wider than the
  phone holding it. Long Polish strings are part of that test, not an
  afterthought.
- `prefers-reduced-motion` is honoured by giving the finished page with nothing
  moving, never by shortening durations to a flicker, and never by leaving a
  scroll-driven state half-played.
- The page reads with scripting switched off, in the visitor's system theme.
