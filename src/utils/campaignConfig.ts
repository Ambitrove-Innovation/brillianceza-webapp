/**
 * Campaign Announcement Banner — Central Config
 * ─────────────────────────────────────────────
 * To run a new campaign:
 *   1. Set `enabled: true`
 *   2. Fill in the fields below
 *   3. Commit + push — banner appears site-wide automatically
 *
 * To turn it off:
 *   1. Set `enabled: false`
 *   2. Commit + push — banner disappears, nav resets
 *
 * The banner has 3 automatic states:
 *   • COUNTDOWN  — from now until `dropDate`
 *   • LIVE       — from `dropDate` until `endDate`
 *   • HIDDEN     — after `endDate` (or when `enabled: false`)
 */

export const CAMPAIGN = {
  // ── Master switch ──────────────────────────────────────────
  enabled: true,

  // ── Identity ───────────────────────────────────────────────
  /** Small label shown before the teaser text e.g. "🖤 Black Friday" */
  label: "💚 Black Friday",

  // ── Countdown phase ────────────────────────────────────────
  /** Text shown during the countdown */
  teaser: "Something big drops Nov 27 we're cooking 🔥",
  /** Show the teaser CTA button during countdown */
  showCta: true,
  /** Button label for the countdown CTA (e.g. "Follow on IG", "Notify Me") */
  ctaLabel: "Follow on IG",
  /** Destination URL when clicked (e.g. Instagram profile or WhatsApp link) */
  ctaLink: "https://www.instagram.com/brilliance_za",

  // ── Live phase ─────────────────────────────────────────────
  /** Text shown when the drop is live */
  liveLabel: "DEALS ARE LIVE 🔥",
  /** Where the "Shop Now" button links to */
  liveLink: "/shop",
  /** Label for the live CTA button */
  liveLinkLabel: "Shop Now →",

  // ── Dates (ISO 8601, include timezone offset) ──────────────
  /** Banner switches from countdown → live at this moment */
  dropDate: new Date("2026-11-27T00:00:00+02:00"),
  /** Banner disappears entirely after this moment */
  endDate: new Date("2026-11-28T00:00:00+02:00"),
} as const;
