<script lang="ts">
  import PageShell from '$lib/PageShell.svelte';
  import Prose from '$lib/Prose.svelte';
  import FlagSun from '$lib/FlagSun.svelte';
  import StripeRule from '$lib/StripeRule.svelte';
  import { FLAGS } from '$lib/flags';
  import { flagCycle } from '$lib/flagCycle.svelte';
  import { JOURNAL_URL, messages, pathFor, type Locale } from '$lib/site';

  let { locale }: { locale: Locale } = $props();

  const m = $derived(messages[locale]);

  /* The feature groups get three different settings rather than one repeated
     seven times, and which group gets which is decided by position because
     the group names are copy and differ by language. The order is ticket 02's
     and both catalogues carry it: the sixth group is the one whose first
     sentence says everything in it is off until you turn it on, and the
     seventh is the one about the eight palettes, which is the only group on
     the page that can be demonstrated instead of described. A test asserts
     there are seven, so a group added upstream fails loudly here rather than
     quietly landing in the wrong setting. */
  const CAREFUL_GROUP = 5;
  const PALETTE_GROUP = 6;
</script>

<PageShell {locale} page="landing" title={m.pageTitle}>
  <!-- The splash. The definition leads and the claim answers it: a reader
       meets the word, completes the pun themselves, and only then is told what
       the app does (Alicja's decision, 2026-08-27). Nothing here explains the
       joke, which is the whole trick.

       The channel badges point at this page until each channel has an
       artifact behind it; flipping them live is redesign ticket 04's, reading
       the Journal repository's release state. -->
  <div class="splash">
    <!-- Clipped by the section, centred on its top-right corner, so what
         reaches the page is an arc rather than a circle in a box. -->
    <div class="sun-well" aria-hidden="true">
      <FlagSun placement="corner" size="clamp(20rem, 46vw, 38rem)" />
    </div>

    <div class="sheet">
      <!-- The running head. It is the site's name and the tests read it off
           this element, so no text-transform: innerText reports the
           transformed casing. -->
      <h1 class="wordmark enter" style:--enter={0}>{m.pageTitle}</h1>

      <p class="entry enter" style:--enter={1}>
        <strong class="headword">{m.hero.definition.lead}</strong><span class="sense tnum"
          >{m.hero.definition.rest}</span
        >
      </p>


      <div class="claim">
        <p class="headline enter" style:--enter={2}>{m.hero.headline}</p>
        <p class="subheadline enter" style:--enter={3}>{m.hero.subheadline}</p>

        <div class="actions enter" style:--enter={4}>
          <a class="cta" href={JOURNAL_URL}>{m.startJournal}</a>
          <ul class="badges">
            {#each m.channels as channel (channel.name)}
              <li><a class="badge" href={pathFor(locale)}>{channel.name}</a></li>
            {/each}
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

  <!-- The first of the two ink fields. Privacy is the page's most serious
       claim and it gets the page's most committed colour: a full-bleed field
       of one flat ink with the words knocked out of it. The field colours are
       theme-independent by design (base.css), so this block is the same blue
       whichever theme a reader is in. -->
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

  <section class="tour">
    <div class="tour-head">
      <div class="section-head reveal">
        <h2>{m.sectionTour}</h2>
        <StripeRule />
      </div>
      <p class="tour-intro reveal">{m.tourIntro}</p>
    </div>

    <!-- Captions without their screenshots. Each frame declares the aspect
         ratio its screenshot will have, so ticket 06 drops the pictures in and
         moves no layout. Until then the frame is not empty and not a grey
         placeholder: it is inked in one of the eight flags, one flag per
         frame, eight frames, which is why the count matching is worth saying
         out loud. When the screenshots land, the flag ink stays as the frame
         the picture sits in. -->
    <div class="tour-pin" style:--tour-cards={m.tour.length}>
      <div class="tour-stage">
        <ol class="tour-strip">
          {#each m.tour as screen, index (screen.screen)}
            <!-- No reveal class on a tour frame. Its arrival is the pan, and a
                 view() timeline on an element inside a sticky, transformed
                 strip resolves against a scroll relationship that is not the
                 one a reader experiences: it left the frames sitting at
                 opacity 0 through the whole section. -->
            <li>
              <div class="frame" aria-hidden="true">
                <!-- Concentric arcs off the frame's own corner: the app's
                     motif at card scale, held on one flag rather than
                     cycling, so eight frames read as eight flags and not as
                     eight copies of whatever the corner sun is showing.

                     Sized to cover about the corner quarter, which is roughly
                     what it covers on the app's own home screen. It was half
                     again as large and looked better as a poster, and that was
                     the wrong thing to optimise: ticket 06 drops a screenshot
                     into this frame, and an arc in the corner survives that
                     arrival as the frame's own corner treatment where a frame
                     that was four-fifths flag ink would simply disappear. -->
                <div class="frame-sun">
                  <FlagSun placement="corner" size="95%" flagIndex={index} />
                </div>
              </div>
              <div class="frame-label">
                <StripeRule flagIndex={index} travel={false} />
                <h3>{screen.screen}</h3>
                <p>{screen.caption}</p>
              </div>
            </li>
          {/each}
        </ol>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="features-head">
      <div class="section-head reveal">
        <h2>{m.sectionFeatures}</h2>
        <StripeRule />
      </div>
    </div>
    <div class="feature-groups">
      {#each m.features as group, groupIndex (group.group)}
        <!-- The groups are headed rather than run together because one of
             them opens by saying that everything in it is off until you turn
             it on, and that sentence is only true of its own group. -->
        <article
          class="group"
          class:careful={groupIndex === CAREFUL_GROUP}
          class:palettes={groupIndex === PALETTE_GROUP}
        >
          <div class="group-head reveal">
            <h3>{group.group}</h3>
            <StripeRule travel={false} />
          </div>

          {#if groupIndex === PALETTE_GROUP}
            <!-- The one group the page can prove instead of assert: the sun
                 and the strip cycle the eight flags in step, and the swatch
                 that is currently inking the page lifts.

                 Deliberately not interactive. Hovering a swatch to hold its
                 flag was better, and it went: a pointer-only control is
                 unreachable by keyboard, and giving eight swatches real
                 accessible names would mean eight new strings in the message
                 catalogue, which is a copy change and not this ticket's to
                 make. The whole block is aria-hidden because every one of the
                 eight names is already in the paragraph beside it. -->
            <div class="palette-demo" aria-hidden="true">
              <div class="palette-sun">
                <FlagSun placement="inline" size="min(11rem, 40vw)" />
              </div>
              <ul class="swatches">
                {#each FLAGS as flag, index (flag.id)}
                  <li>
                    <span class="swatch" class:active={flagCycle.activeIndex === index}>
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
            <!-- Rendered here rather than through Prose because this layout
                 needs to know which paragraph is a group's plain intro, and
                 Prose deliberately does not distinguish. The rendering of
                 each paragraph is Prose's, character for character: `rest`
                 carries its own separator. -->
            {#each group.paragraphs as paragraph, index (index)}
              {#if typeof paragraph === 'string'}
                <p class="plain reveal" style:--reveal-index={index}>{paragraph}</p>
              {:else}
                <p class="reveal" style:--reveal-index={index}>
                  <strong>{paragraph.lead}</strong>{paragraph.rest}
                </p>
              {/if}
            {/each}
          </div>
        </article>
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
           deciding: a plain link, in this tab, to the URL and nothing
           appended to it. What may not ride along with it is on JOURNAL_URL
           in $lib/site. -->
      <p class="acquisition-action reveal"><a class="cta" href={JOURNAL_URL}>{m.startJournal}</a></p>

      <p class="android reveal">{m.acquisitionAndroid}</p>

      <!-- The three that do not report an install to Google first,
           alphabetical among themselves, and Google Play last. Unlike the
           splash's badges, these carry the notes and the honest status, and a
           channel here becomes a link only when it has an artifact behind it
           (Journal ticket 18). -->
      <ul class="channels">
        {#each m.channels as channel, index (channel.name)}
          <li class="wipe" style:--reveal-index={index}>
            <div class="channel-head">
              <strong>{channel.name}</strong>
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

<style>
  /* ---- Shared ---------------------------------------------------------- */

  /* One column width for the whole page, and one gutter. The sections differ
     in what they put inside it, never in how wide it is: the two ink fields
     bleed to the window and re-establish the same column inside themselves. */
  .overview,
  .tour-head,
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

  .section-head {
    display: grid;
    gap: 1rem;
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
    position: relative;
    /* Clips the corner motif. Only here: a clip at the body would hide a
       layout broken by long Polish strings from the test that looks for
       exactly that. */
    overflow: clip;
    padding-block: clamp(2.5rem, 8vh, 6rem) clamp(4rem, 12vh, 9rem);
  }

  .sun-well {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .sheet {
    position: relative;
  }

  .wordmark {
    margin: 0 0 clamp(2rem, 7vh, 4.5rem);
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--text-2);
    width: fit-content;
  }

  /* The dictionary entry, at the scale the page's argument actually needs. It
     leads the splash, so it is the largest thing in the viewport, and the
     headword is set against its own sense the way an entry in a printed
     dictionary is: one big word, then everything the entry knows about it in
     one run of smaller type.

     The lead and the rest stay one paragraph, and that is not laziness. The
     copy decided its own punctuation - `rest` opens with the comma - and the
     copy tests read this block back as a single line. Two elements with a
     line break between them would fail that and would put a break where the
     sentence needs none. */
  /* One run of text, not two blocks. `rest` opens with the copy's own comma,
     so the headword and the sense have to sit on one line the way they do in a
     printed entry: as flex items they could not, the sense wrapped, and every
     viewport narrower than the pair opened a line with a bare comma.

     Inline it is, then, with the headword simply set much larger. The line
     height is set on the paragraph rather than inherited because an inline
     element four times the body size opens a line box that tall, and the first
     line would otherwise push the whole entry down the page. */
  .entry {
    margin: 0 0 clamp(2rem, 6vh, 3.5rem);
    max-width: 44rem;
    font-size: clamp(1rem, 1.4vw, 1.1875rem);
    line-height: 1.45;
    color: var(--text-2);
  }

  .headword {
    font-family: var(--font-display);
    /* The largest type on the page, and the reason the splash reads as a
       definition before it reads as a pitch. Under the craft floor's 6rem
       display ceiling, and low enough that the line it sits in stays a line
       rather than becoming a paragraph of its own. */
    font-size: clamp(2.5rem, 6.5vw, 4.5rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--text);
    /* Keeps the oversized inline word from dragging its line box open. */
    vertical-align: -0.02em;
  }

  .sense {
    /* Nothing to set: the paragraph carries the size and the colour, and this
       span exists so the phonetics get tabular figures. */
    display: inline;
  }

  .claim {
    /* Indented off the entry above it, so the page reads as a definition with
       an answer set under it rather than as two stacked blocks. */
    margin-left: min(8vw, 6rem);
    max-width: 46rem;
  }

  .headline {
    margin: 0 0 1.25rem;
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4.4vw, 3.25rem);
    font-weight: 500;
    line-height: 1.05;
    letter-spacing: -0.028em;
    /* Flat --text, and specifically not the accent. The accent is spent on the
       one action and nowhere else, which is what makes the action findable
       without a word of urgency; this build had the claim in accent ink for a
       while and it put two pink things on one screen competing to be pressed.
       Flat ink either way: the old page set this in a gradient, which the app
       never does and which the craft floor bans outright. */
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
    display: inline-block;
    padding: 0.55rem 1.1rem;
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
    display: inline-block;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.0625rem;
    text-decoration: none;
    border-bottom: 2px solid currentcolor;
    padding-bottom: 0.15rem;
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
    max-width: 52ch;
  }

  .overview-copy .lede :global(p) {
    margin-bottom: 2rem;
  }

  /* ---- The ink fields -------------------------------------------------- */

  /* Full-bleed, flat, and the same colour in both themes. Everything inside
     one is knocked out of it in --on-field, including the rules and the
     links, which is why these blocks set `color` once and let the rest
     inherit rather than naming a colour per element. */
  .field {
    background: var(--field);
    color: var(--on-field);
    padding-block: clamp(4rem, 12vh, 8rem);
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
    /* Not --text-2 here: on a field, secondary text is the field's own
       foreground held back a little, never grey, which the craft floor is
       explicit about. */
    /* Held back from the field's own foreground rather than greyed, which the
       craft floor is explicit about: secondary text on a coloured surface is
       tinted from that surface or its foreground, never from grey. 92% and not
       less - at 86% this measured 4.59:1 on the blue, which clears the floor
       and leaves no room at all for the field to be darkened later. */
    color: color-mix(in srgb, var(--on-field) 92%, var(--field));
  }

  .more-line {
    margin-top: 1.75rem;
    margin-bottom: 0;
  }

  /* ---- Tour ------------------------------------------------------------ */

  .tour {
    padding-block: clamp(4rem, 12vh, 8rem) 0;
  }

  .tour-head {
    margin-bottom: clamp(2rem, 6vh, 3.5rem);
  }

  .tour-intro {
    margin: 0;
    margin-left: min(14vw, 10rem);
    color: var(--text-2);
    max-width: 52ch;
  }

  /* The strip a reader gets when nothing pins it: its own scroll container,
     wider than the window and scrolling inside itself so it never takes the
     document sideways. This is the finished section for a browser without
     scroll-driven animations and for anybody who asked for reduced motion,
     and the pinned pan below is written on top of it rather than instead. */
  .tour-stage {
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
  }

  .tour-strip {
    display: flex;
    gap: clamp(1rem, 2vw, 2rem);
    list-style: none;
    margin: 0;
    padding: 0.25rem clamp(1rem, 5vw, 4rem) 1.5rem;
    width: max-content;
  }

  .tour-strip li {
    flex: 0 0 min(21rem, 80vw);
    scroll-snap-align: start;
  }

  /* The picture's place, inked rather than empty. Its own clip, because the
     motif inside it is centred on the frame's corner and would otherwise
     spill across the caption below. */
  .frame {
    position: relative;
    aspect-ratio: 9 / 16;
    border-radius: var(--radius-card);
    border: 1px solid var(--outline);
    background: var(--surface);
    overflow: clip;
    margin-bottom: 1rem;
  }

  .frame-sun {
    position: absolute;
    inset: 0;
  }

  .frame-label {
    display: grid;
    gap: 0.7rem;
  }

  .tour-strip h3 {
    font-size: 1.1875rem;
    font-weight: 600;
    margin: 0;
  }

  .tour-strip p {
    color: var(--text-2);
    font-size: 0.9375rem;
    margin: 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      /* The scroll the pan is spent over, which is the strip's own overflow
         and not a fixed guess. Derived like this the pan runs at 1:1 with the
         scrollbar, and on a window wide enough to hold the whole strip the
         pin is one screen and effectively stands down.

         --tour-cards is stamped by the component, so the count comes from the
         message catalogue rather than from a number written down twice. */
      .tour-pin {
        --strip: calc(
          var(--tour-cards) * min(21rem, 80vw) + (var(--tour-cards) - 1) * clamp(1rem, 2vw, 2rem) +
            2 * clamp(1rem, 5vw, 4rem)
        );
        height: calc(100dvh - 56px + max(0px, var(--strip) - 100vw));
        view-timeline: --tour block;
      }

      .tour-stage {
        position: sticky;
        top: 56px;
        height: calc(100dvh - 56px);
        display: flex;
        /* `safe` matters here. Plain `center` on a card taller than the stage
           spills it off both ends equally, and the half above the start edge
           is unreachable however the overflow is handled. `safe` puts the
           whole overflow at the end, where scrolling can reach it. */
        align-items: safe center;
        /* Sideways is clipped, because the strip is driven rather than
           dragged now and the clip is also what stops a strip several windows
           wide from widening the document.

           Downwards is not, and that is not symmetry for its own sake. At
           200% text on a 390px screen a caption runs about fifteen lines and
           a card is then far taller than the stage: clipping both axes cut
           hundreds of pixels of caption off the bottom of every card,
           silently, at exactly the text size somebody chooses because they
           need it. */
        overflow-x: clip;
        overflow-y: auto;
        scroll-snap-type: none;
      }

      .tour-strip {
        animation: pan linear both;
        animation-timeline: --tour;
        animation-range: contain 0% contain 100%;
      }
    }
  }

  /* ---- Features -------------------------------------------------------- */

  .features {
    display: grid;
    grid-template-columns: minmax(11rem, 0.6fr) minmax(0, 1.4fr);
    gap: clamp(2rem, 8vw, 7rem);
    align-items: start;
    padding-block: clamp(5rem, 15vh, 10rem);
  }

  .features-head {
    position: sticky;
    top: calc(56px + 2rem);
  }

  .feature-groups {
    display: grid;
    gap: clamp(2.5rem, 8vh, 5rem);
  }

  /* Separated by a line, the way the app separates its surfaces. No cards:
     ticket 09 gave features and acquisition the same grid of tinted boxes and
     two near-identical grids four sections apart is most of why the page read
     as a template. A feature is a sentence, and sentences do not need boxes
     drawn round them. */
  .group {
    margin: 0;
    padding-top: clamp(1.25rem, 3vh, 2rem);
    border-top: 1px solid var(--outline);
  }

  /* Each group gets the live flag's stripes under its heading, which is the
     one place on this page colour arrives seven times over. Without it the
     section was one sticky heading above a long column of small grey type: the
     rules are what give it a beat. They do not travel - one band crossing the
     section head is an accent, seven of them crossing at once is a fairground. */
  .group-head {
    display: grid;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .group h3 {
    max-width: 20ch;
    margin: 0;
    font-size: clamp(1.3rem, 2.4vw, 1.9rem);
    font-weight: 600;
  }

  .entries {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr);
    gap: 1.4rem clamp(1.5rem, 4vw, 3.5rem);
  }

  .entries p {
    margin: 0;
    font-size: 0.96rem;
    color: var(--text-2);
    max-width: 44ch;
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
    max-width: 58ch;
    font-size: 1.0625rem;
    color: var(--text);
    margin-bottom: 0.4rem;
  }

  /* The one group whose intro is a condition rather than a summary. Its own
     setting, on the page's second surface with a hairline round it: a 1px
     line and a change of paper, never a fat coloured bar down one side. */
  .careful .entries p.plain {
    padding: 1.25rem 1.4rem;
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
    margin-bottom: 1.75rem;
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

  /* One swatch per flag, its stripes flat and vertical, at the app's own card
     radius. The active one lifts and takes an outline; everything else waits.
     Pointer-only by design: the swatch conveys nothing that is not already in
     the paragraph beside it, so there is nothing here a keyboard or a screen
     reader is being denied. */
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

  /* ---- Acquisition ----------------------------------------------------- */

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
    max-width: 42ch;
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
    color: var(--text-2);
    max-width: 60ch;
  }

  /* A channel is a discrete thing a person picks between, so unlike a feature
     it does get a container - but the container is a rule, not a box. Two
     columns divided by hairlines, which is how the app separates a list. */
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
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: var(--display-track);
  }

  .channels p {
    color: var(--text-2);
    font-size: 0.9375rem;
    margin: 0.6rem 0 0;
    max-width: 44ch;
  }

  /* ---- Support --------------------------------------------------------- */

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
     thinking it was decoration, so it is the page's second ink field: a flat
     block of rose with the words knocked out of it. It replaces a 3px pink
     border, which was the cheap version of the same intention. */
  .support :global(p:last-child) {
    margin-top: 2.5rem;
    padding: clamp(1.25rem, 3vw, 2rem);
    border-radius: var(--radius-card);
    background: var(--field-rose);
    color: var(--on-field);
  }

  /* ---- Narrow ---------------------------------------------------------- */

  @media (max-width: 60rem) {
    .overview,
    .privacy-copy,
    .features,
    .support-section {
      grid-template-columns: minmax(0, 1fr);
    }

    .features-head {
      position: static;
    }

    .entries {
      grid-template-columns: minmax(0, 1fr);
    }

    .acquisition-head {
      grid-column: 1 / 10;
    }

    .acquisition-action {
      grid-column: 10 / 13;
    }
  }

  @media (max-width: 48rem) {
    .claim,
    .tour-intro {
      margin-left: 0;
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
