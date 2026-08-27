<script lang="ts">
  /* The site's icon set: authored line art, one stroke weight, drawn in this
     page's own grammar rather than borrowed from anybody's brand.

     That last part is a decision, not a shortcut. `content/en/landing.md` is
     explicit that Play's brand rules do not allow its badge without a live
     listing, and the other three channels' marks are somebody else's
     trademark too. A page whose whole argument is that it can be checked
     should not be the page that plays fast and loose with a logo it has no
     licence for, and a redrawn approximation of one is worse than either: it
     tells a reader they are looking at an official mark when they are not.

     So each channel gets a mark for what kind of source it is rather than
     whose it is. When the listings go live, Play and F-Droid take their own
     artwork under their own rules, which is what that copy file says will
     happen, and these come out.

     One geometry for all of them: a 24-unit box, 1.6 stroke, round caps and
     joins, no fills. Inheriting currentColor, so a mark on an ink field is
     knocked out of it like the words are. */
  let { name, size = '1.15em' }: { name: string; size?: string } = $props();
</script>

<svg
  class="mark"
  viewBox="0 0 24 24"
  style:--mark-size={size}
  fill="none"
  stroke="currentColor"
  stroke-width="1.6"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  focusable="false"
>
  {#if name === 'repository'}
    <!-- A book of code: the source, which the page invites a reader to go and
         read. Not an octocat. -->
    <path d="M5 4.5h9a2 2 0 0 1 2 2V20H7a2 2 0 0 1-2-2z" />
    <path d="M16 6.5h3V20h-3" />
    <path d="M8.5 9.5 10 11l-1.5 1.5" />
    <path d="M13 9.5 11.5 11l1.5 1.5" />
  {:else if name === 'community'}
    <!-- A package built and signed by the people who use it: F-Droid's kind of
         source. A box with its own key. -->
    <path d="M12 3.5 4.5 7.5v9L12 20.5l7.5-4v-9z" />
    <path d="M4.5 7.5 12 11.5l7.5-4" />
    <path d="M12 11.5v9" />
  {:else if name === 'mirror'}
    <!-- The same build reached another way, which is what Aurora is: the Play
         package with no account attached. Two arcs, one reflected. -->
    <path d="M4 12a8 8 0 0 1 8-8 8 8 0 0 1 6 2.7" />
    <path d="M20 12a8 8 0 0 1-8 8 8 8 0 0 1-6-2.7" />
    <path d="M18 4v3h-3" />
    <path d="M6 20v-3h3" />
  {:else if name === 'direct'}
    <!-- Pulled straight from where it is built, which is what Obtainium does:
         an arrow into a box, no shelf in between. -->
    <path d="M12 3.5v9" />
    <path d="m8.5 9 3.5 3.5L15.5 9" />
    <path d="M4.5 15v3.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V15" />
  {:else if name === 'storefront'}
    <!-- A shelf somebody else keeps, and the one channel that records who took
         a copy. A storefront, deliberately not a triangle in a rounded square,
         which is Play's own mark. -->
    <path d="M4 9.5h16V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
    <path d="M4 9.5 6 4h12l2 5.5" />
    <path d="M9.5 20.5v-5h5v5" />
  {/if}
</svg>

<style>
  .mark {
    width: var(--mark-size);
    height: var(--mark-size);
    flex: none;
    /* Optical, not geometric: a 24-box mark next to cap-height type sits high
       without this. */
    vertical-align: -0.14em;
  }
</style>
