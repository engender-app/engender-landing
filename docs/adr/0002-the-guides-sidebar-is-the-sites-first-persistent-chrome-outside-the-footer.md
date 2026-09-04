# The Guide's sidebar is the site's first persistent chrome outside the footer

Every guide chapter (`/{locale}/guide/{chapter}/`) renders a sidebar listing all
eleven chapters, grouped by hub, with the current one marked `aria-current="page"`.
Nothing else on the site carries chrome beyond the fixed footer bar - the splash and
the privacy page are each one scroll, read top to bottom, with no navigation of their
own beyond that footer.

## Why

The Guide is not one scroll. It is eleven separate routes, mirroring the app's own
information architecture (`SCREENS.md`), and a reader can arrive at any one of them
directly - a search result, a link a friend sent, a bookmark to one chapter. Without a
sidebar, that reader has no way to see the other ten chapters exist short of guessing
at a URL or going back to `/guide/` itself. A page that describes twenty screens
across four tabs is exactly the shape of content a table of contents is for.

The footer bar was deliberately kept to one entry point for the whole site (its own
decision, 2026-08-28): portfolio, source, language, theme. A page that needed more
than that got no more than that, because nothing on the site so far had more than one
scroll's worth of its own structure to expose. The Guide is the first page that does,
and the sidebar is scoped to it alone - the splash and the privacy page do not gain a
second nav bar they have no content to justify.

The sidebar needs no client-side routing to work. Every chapter is a real
server-rendered page, so `aria-current` is read straight off which page rendered:
consistent with the rest of the site's no-JS-required stance (landing-site phase
ticket 07), and cheaper than a script that would have to know which of eleven routes
it is currently looking at.

## Consequences

A future page that wants persistent navigation of its own has a precedent to argue
from or against: does it have enough internal structure - multiple routes a reader can
land on directly - to earn chrome beyond the footer, or is it still one scroll that the
footer already serves. The Guide's sidebar is not a general navigation component
lifted for reuse; it is built for eleven specific chapters, and a second section with a
different shape of content should not assume it fits without checking that question
first.

The sidebar's own composition, spacing and responsive behaviour are deliberately not
settled here. Ticket 01 builds it legible enough from the existing design system
(tokens, `Prose`'s and `PrivacyPage`'s reading-column widths) to be readable and
testable while six chapters' worth of content and a translation pass are written into
it; ticket 09's `/impeccable` pass designs it properly once that content exists.
