<script lang="ts">
  import PageShell from '$lib/PageShell.svelte';
  import Prose from '$lib/Prose.svelte';
  import FlagSun from '$lib/FlagSun.svelte';
  import StripeRule from '$lib/StripeRule.svelte';
  import Mark from '$lib/Mark.svelte';
  import { FLAGS } from '$lib/flags';
  import { flagCycle } from '$lib/flagCycle.svelte';
  import { JOURNAL_URL, SOURCE_URL, messages, pathFor, type Locale } from '$lib/site';

  let { locale }: { locale: Locale } = $props();

  const m = $derived(messages[locale]);

  /* The eight screens are not a section any more. They were a sideways strip
     of eight placeholder frames a reader had to scroll through before reaching
     anything the frames illustrated; now each frame sits in the feature group
     it belongs to, so a picture stands next to the sentences it proves
     (Alicja's decision, 2026-08-27).

     Everything below keys on a group's `id`, never on its position, and that
     is not fastidiousness: English has seven feature groups and Polish has
     five. Polish is still the pre-rewrite copy - ticket 02 wrote English only
     and the translation pass owns the rest - so it has no "around the journal"
     and no "on your phone", and its "keeping it" sits where English has
     "around". An index-based mapping is therefore wrong on one of the two
     pages by construction, which is exactly what the first build of this
     section did: it disabled every frame on the Polish page and dropped eight
     approved captions with them.

     The ids live in the message catalogue beside each group. They are not copy
     and never render; they exist so a renderer can ask which group this is
     without reading a translated name. */
  /* Which mark each channel gets. Keyed on the channel's own name, which is
     the one thing about a channel that is not translated - F-Droid is F-Droid
     in both catalogues - and defaulting to nothing rather than to a wrong mark
     if a channel is ever added. $lib/Mark carries why these are the site's own
     marks and not the channels' logos. */
  const CHANNEL_MARKS: Record<string, string> = {
    'F-Droid': 'fdroid',
    Aurora: 'aurora',
    Obtainium: 'obtainium',
    'Google Play': 'play',
  };

  const GROUP_FRAMES: Record<string, number[]> = {
    /* By index into `m.tour`, whose order is ticket 02's: Home, An entry, The
       month, One day twice, Search, Six months of one scale, Milestones,
       Export. A frame keeps its own tour index as its flag, so eight frames
       carry eight flags in either language. */
    writing: [0, 1, 3],
    reading: [2, 4, 5, 6],
    keeping: [7],
  };

  /* The groups whose presentation is not a plain list of sentences. */
  const LEADS_GROUP = 'around';
  const CAREFUL_GROUP = 'careful';
  const PALETTE_GROUP = 'looks';

  /* Where the privacy act interrupts the run: immediately before the careful
     group, in whichever position that group happens to occupy. Privacy used to
     be a single handoff paragraph two sections above eight placeholder frames,
     which gave the page's strongest claim its least room. It is a full act
     now, and putting it here is what lets "if you need to be careful" read
     straight after the threat model rather than from the middle of a feature
     list. Anchored to the group rather than to a number so it lands in the
     same place in both languages. */
  const split = $derived(
    (() => {
      const at = m.features.findIndex((group) => group.id === CAREFUL_GROUP);
      /* A catalogue with no careful group at all puts the whole run before the
         privacy act rather than losing half of it. */
      const cut = at === -1 ? m.features.length : at;
      return { before: m.features.slice(0, cut), after: m.features.slice(cut) };
    })(),
  );
</script>

<PageShell {locale} page="landing" title={m.pageTitle}>
  <!-- The splash. The definition leads and the claim answers it: a reader
       meets the word, completes the pun themselves, and only then is told what
       the app does (Alicja's decision, 2026-08-27). Nothing here explains the
       joke, which is the whole trick.

       The channel badges point at this page until each channel has an artifact
       behind it; flipping them live is redesign ticket 04's, reading the
       Journal repository's release state. -->
  <div class="splash">
    <div class="sun-well" aria-hidden="true">
      <!-- Sized in px and vw, never rem. A rem clamp scales with the root
           font size, so at 200% text this motif's *floor* doubled to 640px on
           a 390px screen and swallowed the whole nameplate - the contrast pass
           measured the definition at 1.20:1 against the flag's blue. A motif
           is a picture and its size is a fact about the viewport, not about
           the reader's text size. -->
      <FlagSun placement="corner" size="var(--splash-sun)" />
    </div>


    <div class="sheet">
      <!-- The name, then its definition directly under it as one block: the
           entry annotates the name rather than standing apart from it
           (Alicja's note, 2026-08-27). The tests read the site name off this
           element, so no text-transform: innerText reports the transformed
           casing. -->
      <!-- The site's name is the h1 and it is not drawn: the headword below
           says the word already, twice over would be a stutter, and Alicja
           asked for the small one at the top to go. It stays in the document
           because a landing page's h1 is its name, and the tests and the
           metadata read it here. -->
      <h1 class="vh">{m.pageTitle}</h1>

      <div class="nameplate enter" style:--enter={0}>
        <p class="headword">{m.hero.definition.headword}</p>
        <p class="grammar tnum">
          <em>{m.hero.definition.grammar}</em>&nbsp;{m.hero.definition.phonetics}
        </p>
        <p class="sense">{m.hero.definition.sense}</p>
      </div>

      <!-- Flush with the nameplate above it, not indented. The indent read as
           an accident rather than as a hierarchy (Alicja's note). -->
      <div class="claim">
        <p class="headline enter" style:--enter={1}>{m.hero.headline}</p>
        <p class="subheadline enter" style:--enter={2}>{m.hero.subheadline}</p>

        <div class="actions enter" style:--enter={3}>
          <a class="cta" href={JOURNAL_URL}>{m.startJournal}</a>
          <ul class="badges">
            {#each m.channels as channel (channel.name)}
              <li>
                <a class="badge" href={pathFor(locale)}>
                  {#if CHANNEL_MARKS[channel.name]}
                    <Mark name={CHANNEL_MARKS[channel.name]} />
                  {/if}
                  {channel.name}
                </a>
              </li>
            {/each}
            <!-- The source, beside the channels rather than at the foot of the
                 page: it is one of the places a reader can go from here, and
                 the support copy's "go and look" is easier to act on when the
                 way to look is where the other destinations are (Alicja's
                 note, 2026-08-28). Labelled with the host's name rather than
                 the URL, which is a brand name and identical in both
                 languages. -->
            <li>
              <a class="badge" href={SOURCE_URL} rel="noopener">
                <Mark name="github" />
                github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <section class="overview">
    <div class="section-head reveal">
      <h2>{m.sectionOverview}</h2>
      <StripeRule />
    </div>
    <div class="overview-copy">
      <div class="lede"><Prose paragraphs={m.overview.slice(0, 1)} reveal /></div>
      <Prose paragraphs={m.overview.slice(1)} reveal />
    </div>
  </section>

  <section class="features">
    <div class="features-head">
      <div class="section-head reveal">
        <h2>{m.sectionFeatures}</h2>
        <StripeRule />
      </div>
      <!-- The frame disclosure, and it sits here because this is where a
           reader meets the first one. `content/en/landing.md` is explicit that
           this line goes where a person meets the first screenshot and not in
           a footnote, and with the strip dissolved the first screenshot is in
           the group immediately below. -->
      <div class="screens-note reveal">
        <h3>{m.sectionTour}</h3>
        <p>{m.tourIntro}</p>
      </div>
    </div>

    <div class="feature-groups">
      {#each split.before as group (group.id)}
        {@render featureGroup(group)}
      {/each}
    </div>
  </section>

  <!-- The privacy act. The page's most serious claim gets the page's most
       committed colour: a full-bleed field of one flat ink with the words
       knocked out of it. The field colours are theme-independent by design
       (base.css), so this block is the same blue in either theme. -->
  <section class="privacy field field-blue">
    <div class="field-inner">
      <div class="section-head reveal">
        <h2>{m.sectionPrivacy}</h2>
        <StripeRule />
      </div>
      <div class="privacy-copy">
        <div class="lede"><Prose paragraphs={m.privacyHandoff.slice(0, 1)} reveal /></div>
        <div class="privacy-rest reveal">
          <Prose paragraphs={m.privacyHandoff.slice(1)} />
          <p class="more-line">
            <a class="more" href={pathFor(locale, 'privacy')}>{m.privacyPage.title}</a>
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="features features-tail">
    <div class="feature-groups">
      {#each split.after as group (group.id)}
        {@render featureGroup(group)}
      {/each}
    </div>
  </section>

  <section class="acquisition-wrap">
    <div class="acquisition">
      <div class="acquisition-head">
        <div class="section-head reveal">
          <h2>{m.sectionAcquisition}</h2>
          <StripeRule />
        </div>
        <p class="reveal">{m.acquisitionIntro}</p>
      </div>

      <!-- The primary action, again at the moment a reader has just finished
           deciding: a plain link, in this tab, to the URL and nothing appended
           to it. What may not ride along with it is on JOURNAL_URL in
           $lib/site. -->
      <p class="acquisition-action reveal"><a class="cta" href={JOURNAL_URL}>{m.startJournal}</a></p>

      <p class="android reveal">{m.acquisitionAndroid}</p>

      <!-- The three that do not report an install to Google first, alphabetical
           among themselves, and Google Play last. Unlike the splash's badges,
           these carry the notes and the honest status, and a channel here
           becomes a link only when it has an artifact behind it (Journal
           ticket 18). -->
      <ul class="channels">
        {#each m.channels as channel, index (channel.name)}
          <li class="wipe" style:--reveal-index={index}>
            <div class="channel-head">
              <strong>
                {#if CHANNEL_MARKS[channel.name]}
                  <Mark name={CHANNEL_MARKS[channel.name]} size="1.3em" />
                {/if}
                {channel.name}
              </strong>
              <span class="status">{m.channelStatus}</span>
            </div>
            <p>{channel.note}</p>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="support-section">
    <div class="section-head reveal">
      <h2>{m.sectionSupport}</h2>
      <StripeRule />
    </div>
    <div class="support reveal">
      <Prose paragraphs={m.support} reveal />
    </div>
  </section>
</PageShell>

{#snippet featureGroup(group: (typeof messages)['en']['features'][number])}
  <article
    class="group"
    class:leads={group.id === LEADS_GROUP}
    class:careful={group.id === CAREFUL_GROUP}
    class:palettes={group.id === PALETTE_GROUP}
  >
    <div class="group-head reveal">
      <h3>{group.group}</h3>
      <StripeRule />
    </div>

    {#if GROUP_FRAMES[group.id]}
      <!-- The frames this group's sentences are about. Each declares the
           aspect ratio its screenshot will have, so ticket 06 drops the
           pictures in and moves no layout. Until then the frame is not empty
           and not a grey placeholder: it is inked in its own flag. -->
      <ol class="frames" style:--across={GROUP_FRAMES[group.id].length}>
        {#each GROUP_FRAMES[group.id] as screen (screen)}
          <li class="wipe" style:--reveal-index={screen}>
            <!-- Shaped like the phone the screenshot will be of, and edged in
                 this frame's own flag. The motif used to fill it, which read as
                 abstract art rather than as a place a picture goes, and would
                 have had to come out again when ticket 06 lands the pictures
                 (Alicja's note, 2026-08-28). Eight frames still carry eight
                 flags; the flag is the edge now. -->
            <div
              class="frame"
              aria-hidden="true"
              style:--frame-ink={FLAGS[screen % FLAGS.length].stripes[0]}
            ></div>
            <h4>{m.tour[screen].screen}</h4>
            <p>{m.tour[screen].caption}</p>
          </li>
        {/each}
      </ol>
    {/if}

    {#if group.id === PALETTE_GROUP}
      <!-- The one group the page can prove instead of assert: the sun and the
           strip cycle the eight flags in step, and the swatch currently inking
           the page lifts. Deliberately not interactive - a pointer-only
           control is unreachable by keyboard, and giving eight swatches real
           accessible names would mean eight new strings in the message
           catalogue, which is a copy change this ticket does not own. The whole
           block is aria-hidden because every one of the eight names is already
           in the paragraph beside it. -->
      <div class="palette-demo" aria-hidden="true">
        <div class="palette-sun">
          <FlagSun placement="inline" size="min(11rem, 40vw)" />
        </div>
        <ul class="swatches">
          {#each FLAGS as flag, flagIndex (flag.id)}
            <li>
              <span class="swatch" class:active={flagCycle.activeIndex === flagIndex}>
                {#each flag.stripes as stripe, stripeIndex (stripeIndex)}
                  <i style:background={stripe}></i>
                {/each}
              </span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <div class="entries">
      <!-- Rendered here rather than through Prose because this layout needs to
           know which paragraph is a group's plain intro, and Prose
           deliberately does not distinguish. The rendering of each paragraph is
           Prose's, character for character: `rest` carries its own
           separator. -->
      {#each group.paragraphs as paragraph, entry (entry)}
        {#if typeof paragraph === 'string'}
          <p class="plain reveal" style:--reveal-index={entry}>{paragraph}</p>
        {:else}
          <p
            class="reveal"
            class:lead-block={group.id === LEADS_GROUP}
            style:--reveal-index={entry}
          >
            <strong>{paragraph.lead}</strong>{paragraph.rest}
          </p>
        {/if}
      {/each}
    </div>
  </article>
{/snippet}

<style>
  /* ---- Shared ---------------------------------------------------------- */

  .overview,
  .features,
  .acquisition-wrap,
  .support-section,
  .field-inner,
  .sheet {
    width: min(100%, 74rem);
    margin-inline: auto;
    padding-inline: clamp(1rem, 5vw, 4rem);
  }

  h2 {
    font-size: clamp(2rem, 4.6vw, 4rem);
    font-weight: 600;
    line-height: 0.98;
    margin: 0;
  }

  /* `align-content: start` is load-bearing. These heads sit in grids whose
     rows stretch, so without it the rule sank to the bottom of whatever the
     tallest column in the section was and ended up hundreds of pixels below the
     heading it belongs to (Alicja's note, 2026-08-28). */
  .section-head {
    display: grid;
    align-content: start;
    gap: 0.75rem;
    margin-bottom: clamp(1.75rem, 5vh, 3rem);
  }

  .lede :global(p) {
    color: var(--text);
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2.2vw, 1.8rem);
    font-weight: 500;
    line-height: 1.35;
    letter-spacing: var(--display-track);
    max-width: 34ch;
  }

  /* ---- Splash ---------------------------------------------------------- */

  .splash {
    /* In px and vw, never rem. A rem clamp scales with the root font size, so
       at 200% text this motif's floor doubled and swallowed the nameplate - the
       contrast pass measured the definition at 1.20:1 against the flag's blue.
       A motif is a picture and its size is a fact about the viewport, not about
       the reader's text size. */
    --splash-sun: clamp(280px, 46vw, 560px);
    position: relative;
    /* Clips the corner motif and the swirl. Only here: a clip at the body
       would hide a layout broken by long Polish strings from the test that
       looks for exactly that. */
    overflow: clip;
    padding-block: clamp(2.5rem, 8vh, 6rem) clamp(4rem, 12vh, 9rem);
  }

  .sun-well {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* On a phone the motif stays in the window's corner, where it belongs - a
     band of its own put it in the middle of nowhere and it stopped reading as a
     corner at all (Alicja's note, 2026-08-28).

     What keeps text off it is not arithmetic about how wide a line might get:
     the sheet simply starts below the motif's reach. The motif is a circle
     centred on the corner, so its reach down the page is half its diameter, and
     --sun-size is in px and vw so that half is a fixed number whatever the
     reader's text size. */
  @media (max-width: 60rem) {
    .splash {
      --splash-sun: min(46vw, 230px);
    }

    .sheet {
      padding-top: calc(var(--splash-sun) / 2);
    }
  }


  /* One column on a phone, two once there is room. The second column holds no
     content: it is the space the motif is allowed to occupy, and capping the
     text to the first column is what guarantees no word is ever painted on the
     raw flag stripes. In rem that guarantee does not hold - at 200% text a
     44rem cap is wider than the window, so the entry spanned the whole sheet
     and the pixel pass measured the definition at 2.91:1 against the flag's
     blue. A fraction of the sheet cannot widen with the text. */
  .sheet {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  @media (min-width: 60rem) {
    .sheet {
      grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
    }

    .nameplate,
    .claim {
      grid-column: 1;
    }
  }

  .nameplate {
    margin-bottom: clamp(2.5rem, 8vh, 5rem);
  }


  /* Set the way a printed entry is set: the headword alone on its line, then
     its grammar and pronunciation, then the sense. The first draft ran all of
     it as one line of text with the headword inline, and at that size the sense
     wrapped back under the headword and collided with its descenders. Three
     blocks with real space between them cannot do that at any text size.

     `line-height: 1` on the headword plus the gap below is why the collision is
     gone: the space is spacing rather than leading, so it does not scale into
     the gap between the sense's own lines. */
  .nameplate {
    display: grid;
    justify-items: start;
    gap: 0.85rem;
    max-width: 40ch;
  }

  .headword {
    margin: 0;
    font-family: var(--font-display);
    /* The largest type on the page, and the reason the splash reads as a
       definition before it reads as a pitch. Under the craft floor's 6rem
       display ceiling. */
    font-size: clamp(2.75rem, 7.5vw, 5rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--text);
  }

  /* An entry's own furniture: the part of speech abbreviated the way a
     dictionary abbreviates it, then the pronunciation. */
  .grammar {
    margin: 0;
    font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
    letter-spacing: 0.01em;
    color: var(--text-2);
  }

  .grammar em {
    font-style: italic;
  }

  .sense {
    margin: 0;
    font-size: clamp(1.0625rem, 1.5vw, 1.25rem);
    line-height: 1.5;
    color: var(--text-2);
    max-width: 34ch;
  }

  .claim {
    max-width: 46rem;
  }

  .headline {
    margin: 0 0 1.25rem;
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4.4vw, 3.25rem);
    font-weight: 500;
    line-height: 1.05;
    letter-spacing: -0.028em;
    /* Flat --text, and specifically not the accent: the accent is spent on the
       one action and nowhere else, which is what makes the action findable
       without a word of urgency. */
    color: var(--text);
    max-width: 20ch;
    text-wrap: balance;
  }

  .subheadline {
    margin: 0 0 clamp(1.75rem, 5vh, 2.75rem);
    font-size: clamp(1.0625rem, 1.6vw, 1.25rem);
    color: var(--text-2);
    max-width: 46ch;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.25rem 2rem;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: var(--target);
    padding: 0.6rem 1.1rem;
    border-radius: var(--radius-pill);
    border: 1px solid var(--outline);
    background: var(--surface);
    font-size: 0.9375rem;
    font-weight: 500;
    text-decoration: none;
    transition:
      border-color var(--dur-fast),
      background-color var(--dur-fast);
  }

  .badge:hover {
    border-color: var(--outline-strong);
    background: var(--surface-2);
  }

  @media (prefers-reduced-motion: no-preference) {
    .badge {
      transition:
        border-color var(--dur-fast),
        background-color var(--dur-fast),
        transform var(--dur-fast) var(--ease-out);
    }

    .badge:hover {
      transform: translateY(-2px);
    }

    .badge:active {
      transform: scale(0.97);
    }
  }

  .more {
    display: inline-flex;
    align-items: center;
    min-height: var(--target);
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.0625rem;
    text-decoration: none;
    border-bottom: 2px solid currentcolor;
    padding-bottom: 0.35rem;
    transition: opacity var(--dur-fast);
  }

  .more::after {
    content: ' \2192';
  }

  .more:hover {
    opacity: 0.75;
  }

  /* ---- Overview -------------------------------------------------------- */

  .overview {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.3fr);
    gap: clamp(2rem, 8vw, 7rem);
    align-items: start;
    padding-block: clamp(4rem, 12vh, 8rem);
  }

  .overview-copy :global(p) {
    max-width: 54ch;
    font-size: 1.0625rem;
  }

  .overview-copy .lede :global(p) {
    margin-bottom: 2rem;
  }

  /* ---- The ink field -------------------------------------------------- */

  .field {
    background: var(--field);
    color: var(--on-field);
    padding-block: clamp(4rem, 13vh, 9rem);
  }

  .field-blue {
    --field: var(--field-blue);
  }

  .field :global(p) {
    color: inherit;
  }

  .privacy-copy {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: clamp(2rem, 7vw, 6rem);
    align-items: start;
  }

  .privacy-copy .lede :global(p) {
    max-width: 26ch;
  }

  .privacy-rest :global(p) {
    max-width: 46ch;
    font-size: 1.0625rem;
    /* Held back from the field's own foreground rather than greyed, which the
       craft floor is explicit about. 92% and not less: at 86% this measured
       4.59:1 on the blue, which clears the floor and leaves the field no room
       to be darkened later. */
    color: color-mix(in srgb, var(--on-field) 92%, var(--field));
  }

  .more-line {
    margin-top: 1.75rem;
    margin-bottom: 0;
  }

  /* ---- Features ------------------------------------------------------- */

  .features {
    padding-block: clamp(4rem, 12vh, 8rem) clamp(3.5rem, 10vh, 6rem);
  }

  .features-tail {
    padding-block: clamp(4rem, 12vh, 8rem);
  }

  .features-head {
    margin-bottom: clamp(2.5rem, 7vh, 4.5rem);
  }

  /* The frame disclosure. Its own heading, one level under the act's, because
     it introduces the pictures rather than a body of copy. */
  .screens-note {
    display: grid;
    gap: 0.6rem;
    max-width: 46rem;
    margin-left: min(12vw, 9rem);
    padding-left: 1.25rem;
    border-left: 1px solid var(--outline);
  }

  .screens-note h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .screens-note p {
    margin: 0;
    color: var(--text-2);
    max-width: 50ch;
  }

  .feature-groups {
    display: grid;
    gap: clamp(3.5rem, 10vh, 7rem);
  }

  /* Separated by a line, the way the app separates its surfaces. No cards: a
     feature is a sentence, and sentences do not need boxes drawn round them. */
  .group {
    margin: 0;
    padding-top: clamp(1.5rem, 3vh, 2.25rem);
    border-top: 1px solid var(--outline);
  }

  /* No rule above the first group in a run: the act's own head is already the
     line between them, and two lines a heading apart read as an empty
     section. */
  .group:first-child {
    padding-top: 0;
    border-top: 0;
  }

  .group-head {
    display: grid;
    gap: 0.8rem;
    margin-bottom: clamp(1.5rem, 4vh, 2.5rem);
    max-width: 26rem;
  }

  .group h3 {
    margin: 0;
    font-size: clamp(1.5rem, 3vw, 2.4rem);
    font-weight: 600;
    line-height: 1.02;
  }

  /* Readability was the note that started this rebuild. The entries were
     0.96rem grey type in two fixed columns, which is a wall. They are body
     size now, in a measure that stays readable, with real space between them,
     and the second column only appears where there is room for two full
     measures rather than at a fixed breakpoint. */
  .entries {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 26rem), 1fr));
    gap: clamp(1.25rem, 3vh, 2rem) clamp(2rem, 5vw, 4rem);
  }

  .entries p {
    margin: 0;
    font-size: 1.0625rem;
    line-height: 1.6;
    color: var(--text-2);
    max-width: 48ch;
  }

  /* The lead stays inline: `rest` opens with its own separator, sometimes a
     comma, and a block lead would put a line break where the sentence needs
     none. With no boxes, weight and ink are the whole of the emphasis. */
  .entries p strong {
    color: var(--text);
    font-weight: 600;
  }

  /* A group's intro speaks for the group, not from beside it. */
  .entries p.plain {
    grid-column: 1 / -1;
    max-width: 56ch;
    font-family: var(--font-display);
    font-size: clamp(1.125rem, 1.7vw, 1.35rem);
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: var(--display-track);
    color: var(--text);
    margin-bottom: 0.5rem;
  }

  /* ---- The frames ----------------------------------------------------- */

  /* In the group they illustrate, in a plain grid. No sideways strip and no
     pinned pan: the strip made a reader scroll horizontally through eight
     placeholders before meeting anything they explained. */
  .frames {
    display: grid;
    grid-template-columns: repeat(var(--across), minmax(0, 1fr));
    gap: clamp(1rem, 2.5vw, 2rem);
    list-style: none;
    margin: 0 0 clamp(2rem, 5vh, 3rem);
    padding: 0;
    /* A frame is 9:16, so a column's width decides its height. One frame in a
       full-width grid was a placeholder two thirds of a window tall - the
       Keeping it group was a poster of an empty box. Capped at what four across
       would each get, so a group with one frame shows it at the same size as a
       group with four. */
    max-width: calc(var(--across) * 15rem + (var(--across) - 1) * 2rem);
  }

  /* A phone, waiting for its screenshot: a thick bezel in this frame's own
     flag colour and a screen-shaped surface inside it. The radius is a device's
     rather than a card's, which is the whole of what makes it read as a phone
     and not as an empty box. */
  .frame {
    position: relative;
    aspect-ratio: 9 / 16;
    border-radius: 26px;
    border: 4px solid var(--frame-ink);
    background: var(--surface-2);
    overflow: clip;
    margin-bottom: 1rem;
  }

  .frames h4 {
    margin: 0 0 0.4rem;
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: var(--display-track);
  }

  .frames p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.55;
    color: var(--text-2);
  }

  /* ---- Around the journal: four leads as four blocks ------------------ */

  .leads .entries {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  }

  .leads .entries p.lead-block {
    padding: clamp(1.25rem, 2.5vw, 1.75rem);
    border: 1px solid var(--outline);
    border-radius: var(--radius-card);
    background: var(--surface);
    max-width: none;
  }

  /* ---- The careful notice --------------------------------------------- */

  .careful .entries p.plain {
    padding: clamp(1.25rem, 2.5vw, 1.75rem);
    border: 1px solid var(--outline);
    border-radius: var(--radius-card);
    background: var(--surface-2);
    margin-bottom: 1rem;
  }

  /* ---- The palette demonstration -------------------------------------- */

  .palette-demo {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: clamp(1.25rem, 3vw, 2.5rem);
    margin-bottom: clamp(1.75rem, 4vh, 2.5rem);
  }

  .palette-sun {
    position: relative;
    flex: none;
  }

  .swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .swatch {
    display: flex;
    width: 2.5rem;
    height: 3.25rem;
    overflow: clip;
    border-radius: 9px;
    border: 1px solid var(--outline);
    transition:
      transform var(--dur-med) var(--ease-out),
      border-color var(--dur-fast);
  }

  .swatch i {
    flex: 1;
  }

  .swatch.active {
    border-color: var(--outline-strong);
  }

  @media (prefers-reduced-motion: no-preference) {
    .swatch.active {
      transform: translateY(-4px);
    }
  }

  /* ---- Acquisition ---------------------------------------------------- */

  .acquisition-wrap {
    padding-block: clamp(4rem, 12vh, 8rem);
  }

  .acquisition {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .acquisition-head {
    grid-column: 1 / 8;
  }

  .acquisition-head p {
    max-width: 46ch;
    font-size: 1.0625rem;
    color: var(--text-2);
    margin-top: 1.5rem;
  }

  .acquisition-action {
    grid-column: 9 / 13;
    align-self: start;
    justify-self: end;
    margin: 0;
  }

  .android,
  .channels {
    grid-column: 1 / -1;
  }

  .android {
    margin-top: clamp(2rem, 6vh, 3.5rem);
    font-size: 1.0625rem;
    color: var(--text-2);
    max-width: 60ch;
  }

  /* A channel is a discrete thing a person picks between, so unlike a feature
     it does get a container - but the container is a rule, not a box. */
  .channels {
    display: grid;
    grid-template-columns: repeat(2, minmax(min(19rem, 100%), 1fr));
    gap: 0;
    list-style: none;
    margin: clamp(1.5rem, 4vh, 2.5rem) 0 0;
    padding: 0;
    border-top: 1px solid var(--outline);
  }

  .channels li {
    min-height: 10rem;
    padding: 1.5rem;
    border-bottom: 1px solid var(--outline);
  }

  .channels li:nth-child(odd) {
    border-right: 1px solid var(--outline);
  }

  .channel-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.6rem;
  }

  .channels strong {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: var(--display-track);
  }

  .channels p {
    color: var(--text-2);
    font-size: 1rem;
    margin: 0.6rem 0 0;
    max-width: 44ch;
  }

  /* ---- Support -------------------------------------------------------- */

  .support-section {
    display: grid;
    grid-template-columns: minmax(0, 0.6fr) minmax(0, 1.4fr);
    gap: clamp(2rem, 8vw, 7rem);
    padding-block: clamp(5rem, 14vh, 9rem);
  }


  .support :global(p) {
    max-width: 52ch;
    font-size: clamp(1.0625rem, 1.6vw, 1.25rem);
  }

  /* The warning is the one thing on the page a reader must not scroll past
     thinking it was decoration, so it is the page's second ink field. */
  .support :global(p:last-child) {
    margin-top: 2.5rem;
    padding: clamp(1.25rem, 3vw, 2rem);
    border-radius: var(--radius-card);
    background: var(--field-rose);
    color: var(--on-field);
  }

  /* ---- Wide ----------------------------------------------------------- */


  /* ---- Narrow --------------------------------------------------------- */

  @media (max-width: 60rem) {
    .overview,
    .privacy-copy,
    .support-section {
      grid-template-columns: minmax(0, 1fr);
    }

    .screens-note {
      margin-left: 0;
    }

    /* Four frames in a row is unreadable on a phone; two is the most that
       leaves a caption a measure. A single frame stays single. */
    .frames {
      grid-template-columns: repeat(min(var(--across), 2), minmax(0, 1fr));
    }

    .acquisition-head {
      grid-column: 1 / 10;
    }

    .acquisition-action {
      grid-column: 10 / 13;
    }
  }

  @media (max-width: 48rem) {
    .frames {
      grid-template-columns: minmax(0, 1fr);
    }

    .acquisition {
      display: block;
    }

    .acquisition-action {
      margin-top: 1.5rem;
    }

    .channels {
      grid-template-columns: minmax(0, 1fr);
    }

    .channels li:nth-child(odd) {
      border-right: 0;
    }
  }
</style>
