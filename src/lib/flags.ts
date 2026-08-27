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
/** A palette's two accents, in the order the gradient uses them: the cooler one
    first, then the one the app calls --accent. */
export interface Accents {
  light: [string, string];
  dark: [string, string];
}

export interface Flag {
  /** Matches the Journal's `[data-palette]` value, so the two repositories
      can be compared by eye without a translation table. */
  id: string;
  /** Outermost stripe first. */
  stripes: string[];
  /** What the action is painted in while this flag is up.

      These are the app's own per-palette --accent-2 and --accent, copied value
      for value from its src/lib/theme/palettes.css, not derived here. The first
      attempt derived them: it took the flag's two most saturated stripes and
      pinned their lightness, which was contrast-safe and looked nothing like
      the app's button, because a raw stripe held at a readable lightness is a
      muted version of itself. The app already solved this - each palette has a
      pair chosen to be sat on - so the answer was to copy the answer. */
  accents: Accents;
}

export const FLAGS: Flag[] = [
  {
    id: "trans",
    stripes: ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"],
    accents: { light: ["#0F7DAE", "#B85272"], dark: ["#63C4EE", "#F0A3B6"] },
  },
  {
    id: "nonbinary",
    stripes: ["#FCF434", "#FFFFFF", "#9C59D1", "#2C2C2C"],
    accents: { light: ["#8A7500", "#7A3EB1"], dark: ["#F5EC6E", "#C69DEB"] },
  },
  {
    id: "genderfluid",
    stripes: ["#FF76A4", "#FFFFFF", "#C011D7", "#2F2F2F", "#2F3CBE"],
    accents: { light: ["#3946C4", "#A31DB6"], dark: ["#93A0F2", "#E289F2"] },
  },
  {
    id: "bisexual",
    stripes: ["#D60270", "#D60270", "#9B4F96", "#0038A8", "#0038A8"],
    accents: { light: ["#2447B0", "#B7025F"], dark: ["#8FA4F0", "#F272AE"] },
  },
  {
    id: "lesbian",
    stripes: ["#D52D00", "#FF9A56", "#FFFFFF", "#D362A4", "#A30262"],
    accents: { light: ["#A30262", "#BC3907"], dark: ["#E98BC0", "#FF9A56"] },
  },
  {
    id: "pansexual",
    stripes: ["#FF218C", "#FFD800", "#21B1FF"],
    accents: { light: ["#0A6FB4", "#D00A72"], dark: ["#67C6FF", "#FF74B8"] },
  },
  {
    id: "rainbow",
    stripes: ["#E40303", "#FF8C00", "#FFED00", "#008026", "#004CFF", "#732982"],
    accents: { light: ["#0A7A3C", "#63348F"], dark: ["#74D99B", "#C09EE8"] },
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
    accents: { light: ["#57616B", "#4A7A22"], dark: ["#A6B1BC", "#AEEB76"] },
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
