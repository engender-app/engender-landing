/** The eight flags the app recolours itself with, and the geometry the motif
    draws them in.

    The stripe sequences are copied values, not imported code: the Journal
    repository owns them as `--motif-stripes` in `src/lib/theme/palettes.css`
    and this site is not allowed to import from it (CLAUDE.md - brand tokens
    and approved wording may be copied across, a shared package may not). If a
    ninth palette lands there, it lands here by hand.

    Two of the sequences look like mistakes and are not. Bisexual doubles its
    outer stops, which is how its 2:1:2 stripe proportion is encoded: two
    adjacent rings of one colour read as a single thicker band, and the ring
    maths below needs no special case for it. Agender is symmetrical and seven
    stripes deep, which is why ring thickness is derived from the count rather
    than fixed - a fixed step would draw three-stripe pansexual a third the
    size of agender.

    Order is the Journal's own file order, which is neither alphabetical nor
    ranked. It is the order the motif cycles in, so it is a visible decision:
    trans leads because it is the app's default palette. */
/** The one colour a palette lends the action, per theme: the colour the app
    itself calls --accent and paints its own accent surfaces in. It was a pair
    until redesign ticket 08, because the action was a two-stop ramp; the ramp
    went when the app deleted its own. */
export interface Accent {
  light: string;
  dark: string;
}

/** The band of a flag the splash wears as its field, and what reads on it.

    The app opens every door on one of these (its ADR-0075): the first inner
    band that is a colour and differs from the outermost, so no band is stolen
    from the sun and the field is never white or black. Two flags name their
    own against that arithmetic, both on Alicja's word against a render - the
    rainbow takes its blue rather than its orange, bisexual its dark blue
    rather than its purple - so all eight are copied from the app's own table
    (its DIRECTION.md rule 11) rather than derived here.

    One value per flag and not one per theme: ink does not change with the
    theme, only the paper does, so the splash's header is the same colour in
    both.

    `ink` is #101820 or white, whichever measures higher, which is the app's
    rule. The app only sets a door's title on the field and answers to 3:1;
    this site sets the whole entry there (Alicja, 2026-09-22, "we treat it as
    a header basically"), so every one of the eight has to clear 4.5:1 for
    small text. Seven do outright. Nonbinary's #9C59D1 carries white at
    4.41:1, which is why the app forbids small text on it, so the site
    deepens that one band 6% toward black to #9354C4 and 4.88:1 - the same
    ratio genderfluid's purple already has, and still plainly the flag's
    colour. Tinting the secondary lines back toward the field the way the
    privacy field does is what could not be done: at 92% nonbinary measures
    4.38 and genderfluid 4.29, so on a field every line is the full ink and
    what separates them is size and weight. */
export interface Field {
  fill: string;
  ink: string;
}

export interface Flag {
  /** Matches the Journal's `[data-palette]` value, so the two repositories
      can be compared by eye without a translation table. */
  id: string;
  /** Outermost stripe first. */
  stripes: string[];
  /** What the action is painted in while this flag is up.

      This is the app's own per-palette --accent, copied value for value from
      its src/lib/theme/palettes.css, not derived here. An earlier attempt
      derived it: it took the flag's most saturated stripes and pinned their
      lightness, which was contrast-safe and looked nothing like the app's
      button, because a raw stripe held at a readable lightness is a muted
      version of itself. The app already solved this - each palette has an
      accent chosen to be sat on, and white or the dark paper holds 4.5:1 on
      every one of the eight - so the answer was to copy the answer. */
  accent: Accent;
  /** The band this flag lends the splash's header, and what reads on it. */
  field: Field;
}

export const FLAGS: Flag[] = [
  {
    id: "trans",
    stripes: ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"],
    accent: { light: "#B85272", dark: "#F0A3B6" },
    field: { fill: "#F5A9B8", ink: "#101820" },
  },
  {
    id: "nonbinary",
    stripes: ["#FCF434", "#FFFFFF", "#9C59D1", "#2C2C2C"],
    accent: { light: "#7A3EB1", dark: "#C69DEB" },
    field: { fill: "#9354C4", ink: "#FFFFFF" },
  },
  {
    id: "genderfluid",
    stripes: ["#FF76A4", "#FFFFFF", "#C011D7", "#2F2F2F", "#2F3CBE"],
    accent: { light: "#A31DB6", dark: "#E289F2" },
    field: { fill: "#C011D7", ink: "#FFFFFF" },
  },
  {
    id: "bisexual",
    stripes: ["#D60270", "#D60270", "#9B4F96", "#0038A8", "#0038A8"],
    accent: { light: "#B7025F", dark: "#F272AE" },
    field: { fill: "#0038A8", ink: "#FFFFFF" },
  },
  {
    id: "lesbian",
    stripes: ["#D52D00", "#FF9A56", "#FFFFFF", "#D362A4", "#A30262"],
    accent: { light: "#BC3907", dark: "#FF9A56" },
    field: { fill: "#FF9A56", ink: "#101820" },
  },
  {
    id: "pansexual",
    stripes: ["#FF218C", "#FFD800", "#21B1FF"],
    accent: { light: "#D00A72", dark: "#FF74B8" },
    field: { fill: "#FFD800", ink: "#101820" },
  },
  {
    id: "rainbow",
    stripes: ["#E40303", "#FF8C00", "#FFED00", "#008026", "#004CFF", "#732982"],
    accent: { light: "#63348F", dark: "#C09EE8" },
    field: { fill: "#004CFF", ink: "#FFFFFF" },
  },
  {
    id: "agender",
    stripes: [
      "#1A1A1A",
      "#B9B9B9",
      "#FFFFFF",
      "#B9F484",
      "#FFFFFF",
      "#B9B9B9",
      "#1A1A1A",
    ],
    accent: { light: "#4A7A22", dark: "#AEEB76" },
    field: { fill: "#B9F484", ink: "#101820" },
  },
];

/** The most stripes any flag here has, which is how many ring elements the
    motif renders. A flag with fewer leaves the innermost rings empty rather
    than unmounting them, so a palette change never adds or removes a node and
    the cycle animates colour alone. */
export const MAX_RINGS = Math.max(...FLAGS.map((flag) => flag.stripes.length));

/** One ring per stripe, outermost stripe outermost, every ring the same
    radial thickness - the innermost is a disc whose radius is exactly one
    band, carrying the same weight as every ring around it, the way a flag's
    stripes are all the same width. This is the Journal's `sunRings` reasoning
    re-derived rather than shared, for the same reason the stripes above are
    copied.

    Always `MAX_RINGS` entries, and always the same count whichever flag is
    passed. That is what makes the cycle cheap and what makes it beautiful:
    every ring is one full-size circle scaled down by `transform`, so changing
    flag animates `transform` and `background-color` on a fixed set of eight
    nodes and never adds, removes or resizes one. A three-stripe flag scales
    its unused rings to nothing, and they grow back when a seven-stripe flag
    comes round. */
export interface Ring {
  /** Fraction of the motif's full diameter, as a `transform: scale()`. */
  scale: number;
  colour: string;
}

export function rings(flag: Flag): Ring[] {
  const count = flag.stripes.length;
  /* A slot this flag has no stripe for parks at the innermost real ring's
     radius, in the innermost real ring's colour, rather than at zero.

     That is the fix for a visible glitch, and it is worth writing down because
     zero is the obvious value. A ring scaling to zero disappears into the
     centre and then pops back out of nothing when a wider flag comes round,
     and because colour and transform run on different durations you catch a
     disc of the wrong hue on the way. Parked on top of the innermost ring, at
     the same size and the same colour, a spare ring is simply invisible: it
     has somewhere real to wait, and it grows outward from there when the next
     flag needs it, which is the same wave every other ring is making. */
  const innermost = (count - (count - 1)) / count;
  return Array.from({ length: MAX_RINGS }, (_, index) => ({
    scale: index < count ? (count - index) / count : innermost,
    colour: flag.stripes[Math.min(index, count - 1)],
  }));
}
