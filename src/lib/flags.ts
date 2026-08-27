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
export interface Flag {
  /** Matches the Journal's `[data-palette]` value, so the two repositories
      can be compared by eye without a translation table. */
  id: string;
  /** Outermost stripe first. */
  stripes: string[];
}

export const FLAGS: Flag[] = [
  { id: 'trans', stripes: ['#5BCEFA', '#F5A9B8', '#FFFFFF', '#F5A9B8', '#5BCEFA'] },
  { id: 'nonbinary', stripes: ['#FCF434', '#FFFFFF', '#9C59D1', '#2C2C2C'] },
  { id: 'genderfluid', stripes: ['#FF76A4', '#FFFFFF', '#C011D7', '#2F2F2F', '#2F3CBE'] },
  { id: 'bisexual', stripes: ['#D60270', '#D60270', '#9B4F96', '#0038A8', '#0038A8'] },
  { id: 'lesbian', stripes: ['#D52D00', '#FF9A56', '#FFFFFF', '#D362A4', '#A30262'] },
  { id: 'pansexual', stripes: ['#FF218C', '#FFD800', '#21B1FF'] },
  { id: 'rainbow', stripes: ['#E40303', '#FF8C00', '#FFED00', '#008026', '#004CFF', '#732982'] },
  { id: 'agender', stripes: ['#1A1A1A', '#B9B9B9', '#FFFFFF', '#B9F484', '#FFFFFF', '#B9B9B9', '#1A1A1A'] },
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
  /** Fraction of the motif's full diameter, as a `transform: scale()`. Zero
      for a slot this flag has no stripe for. */
  scale: number;
  /** The stripe's colour, or the last real stripe's colour for an unused slot
      - a ring scaled to nothing still needs a colour to travel from, and
      inheriting its neighbour's keeps the wave continuous instead of flashing
      a stale hue as it grows back. */
  colour: string;
}

export function rings(flag: Flag): Ring[] {
  const count = flag.stripes.length;
  return Array.from({ length: MAX_RINGS }, (_, index) => ({
    scale: index < count ? (count - index) / count : 0,
    colour: flag.stripes[Math.min(index, count - 1)],
  }));
}
