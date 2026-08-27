<script lang="ts">
  /* The channels' own marks, and GitHub's.

     These are Arcticons, the monochrome line icon set at
     github.com/Arcticons-Team/Arcticons, under GPL-3.0 - the same licence this
     project ships under, which is what makes including them clean. They are
     copied in rather than fetched, like the fonts, because this site loads no
     third-party resource at run time.

     They replaced a set drawn here by hand. Those said what kind of source each
     channel was rather than whose it was, on the reasoning that a redrawn
     approximation of somebody's logo tells a reader they are looking at
     official artwork when they are not. Alicja asked for the real marks
     (2026-08-28) and Arcticons is what keeps both things true: each app's
     actual mark, drawn by a project that licenses them for this, in one line
     weight that matches the rest of this page's line work.

     Google Play's is here at Alicja's explicit direction. Play's brand rules
     ask for its official badge rather than any other mark, and the landing
     copy file records that the badge is not allowed until the listing is live.
     That was put to her and she chose this; it is written down here rather than
     left for somebody to find.

     One geometry for all five: Arcticons' own 48-unit box, with stroke, fill,
     caps and joins set once on the wrapper so every mark is the same weight.
     The stroke is currentColor, so a mark on an ink field is knocked out of it
     the way the words are. */
  let { name, size = '1.15em' }: { name: string; size?: string } = $props();
</script>

<svg
  class="mark"
  viewBox="0 0 48 48"
  style:--mark-size={size}
  fill="none"
  stroke="currentColor"
  stroke-width="1.7"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  focusable="false"
>
  {#if name === 'fdroid'}
    <!-- F-Droid -->
    <circle cx="16.99" cy="15.18" r="3.5"/>
    <circle cx="31.01" cy="15.18" r="3.5"/>
    <rect x="8.35" y="8.68" width="31.32" height="12.99" rx="2.8"/>
    <line x1="5.5" y1="5.83" x2="9.16" y2="9.5"/>
    <rect x="8.35" y="24.67" width="31.32" height="17.31" rx="2.8"/>
    <line x1="42.5" y1="5.85" x2="38.84" y2="9.52"/>
  {:else if name === 'aurora'}
    <!-- Aurora Store -->
    <polygon points="21.84 33.87 26.17 33.87 24 30.04 21.84 33.87"/>
    <path d="M41.38,19.84H33.52l-7.77-13a2,2,0,0,0-3.5,0l-7.77,13H6.62a3.12,3.12,0,0,0-3,3.93L8,40.08a2.84,2.84,0,0,0,2.74,2.1H37.24A2.84,2.84,0,0,0,40,40.08l4.41-16.31A3.12,3.12,0,0,0,41.38,19.84ZM24,11.84l4.77,8H19.23Zm6.35,24.33a1.7,1.7,0,0,1-1.46.84H19.11a1.69,1.69,0,0,1-1.47-2.52l4.89-8.62a1.69,1.69,0,0,1,2.94,0l4.89,8.62A1.71,1.71,0,0,1,30.35,36.17Z"/>
  {:else if name === 'obtainium'}
    <!-- Obtainium -->
    <polygon points="32.862 41.676 43.5 11.618 31.232 6.324 22.551 9.772 26.111 18.737 31.615 16.551 27.837 29.022 16.531 22.542 22.035 20.356 18.475 11.391 9.793 14.839 4.5 27.107 32.862 41.676"/>
  {:else if name === 'play'}
    <!-- Google Play -->
    <path d="m25.0274,24.0519l-16.2624,15.8333h0c.5191,1.765,2.1803,3.1148,4.153,3.1148.8306,0,1.5574-.2077,2.1803-.6229h0l18.1694-10.2787-8.2403-8.0464Z"/>
    <path d="m40.9508,20.2623h0l-7.7869-4.4645-8.1365,8.2541,8.2403,8.0464,7.7869-4.3607c1.3497-.7268,2.2842-2.1803,2.2842-3.7377-.1038-1.5574-1.0383-3.0109-2.388-3.7377Z"/>
    <path d="m8.765,8.1148c-.1038.3115-.1038.7268-.1038,1.1421v29.5902c0,.4153,0,.7268.1038,1.1421l16.2624-15.9372L8.765,8.1148Z"/>
    <path d="m25.0274,24.0519l8.1365-8.2541L15.2022,5.623c-.623-.4153-1.4536-.623-2.2842-.623-1.9727,0-3.7377,1.3497-4.153,3.1148h0l16.2624,15.9372Z"/>
  {:else if name === 'github'}
    <!-- GitHub -->
    <path d="M24,2.5a21.5,21.5,0,0,0-6.8,41.9c1.08.2,1.47-.46,1.47-1s0-1.86,0-3.65c-6,1.3-7.24-2.88-7.24-2.88A5.7,5.7,0,0,0,9,33.68c-1.95-1.33.15-1.31.15-1.31a4.52,4.52,0,0,1,3.29,2.22c1.92,3.29,5,2.34,6.26,1.79a4.61,4.61,0,0,1,1.37-2.88c-4.78-.54-9.8-2.38-9.8-10.62a8.29,8.29,0,0,1,2.22-5.77,7.68,7.68,0,0,1,.21-5.69s1.8-.58,5.91,2.2a20.46,20.46,0,0,1,10.76,0c4.11-2.78,5.91-2.2,5.91-2.2a7.74,7.74,0,0,1,.21,5.69,8.28,8.28,0,0,1,2.21,5.77c0,8.26-5,10.07-9.81,10.61a5.12,5.12,0,0,1,1.46,4c0,2.87,0,5.19,0,5.9s.39,1.24,1.48,1A21.5,21.5,0,0,0,24,2.5"/>
  {/if}
</svg>

<style>
  .mark {
    width: var(--mark-size);
    height: var(--mark-size);
    flex: none;
    /* Optical, not geometric: a 48-box mark next to cap-height type sits high
       without this. */
    vertical-align: -0.14em;
  }
</style>
