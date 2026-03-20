/**
 * CivicChain Design System — Tokens
 * ─────────────────────────────────
 * Single source of truth for all design values.
 * Import and use these wherever raw values are needed.
 */

// ─── COLOR PALETTE ────────────────────────────────────────────────────────────

export const colors = {
  // Brand — Navy
  navyDeep:     "#071A35",   // darkest navy (sidebar bg)
  navy:         "#0B2447",   // primary brand navy
  navyMid:      "#163A62",   // hover states, borders
  navyLight:    "#1E4E82",   // light navy accents

  // Brand — Teal
  teal:         "#19A7CE",   // primary accent / CTA
  tealMid:      "#0E8FAF",   // teal hover
  tealLight:    "#7EB8D8",   // muted teal, sidebar subtitles
  tealPale:     "#E0F3FA",   // teal tint backgrounds

  // Neutrals
  bgPage:       "#EEF2F9",   // page background
  bgSurface:    "#FFFFFF",   // card / modal surface
  bgMuted:      "#F4F7FB",   // muted surface, table headers
  bgInput:      "#F0F4FA",   // form input bg

  border:       "#E2EAF4",   // default border
  borderDark:   "#C8D7ED",   // stronger border

  textPrimary:  "#0B2447",   // headings, strong text
  textSecondary:"#4B5E78",   // body text
  textMuted:    "#8A9BBE",   // captions, placeholders

  white:        "#FFFFFF",
  black:        "#000000",

  // Semantic
  success:      "#10B981",
  successBg:    "#D1FAE5",
  successText:  "#065F46",

  warning:      "#F59E0B",
  warningBg:    "#FEF3C7",
  warningText:  "#92400E",

  danger:       "#EF4444",
  dangerBg:     "#FEE2E2",
  dangerText:   "#991B1B",

  info:         "#3B82F6",
  infoBg:       "#DBEAFE",
  infoText:     "#1E40AF",

  // Category-specific
  pothole:      { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  garbage:      { bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3" },
  streetlight:  { bg: "#FEFCE8", text: "#A16207", border: "#FEF08A" },
  waterIssue:   { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
} as const;

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  // Size scale
  xs:   "0.75rem",    // 12px — captions, timestamps
  sm:   "0.8125rem",  // 13px — table cells, secondary text
  base: "0.875rem",   // 14px — body text, labels
  md:   "1rem",       // 16px — card values, subheadings
  lg:   "1.125rem",   // 18px — section headings
  xl:   "1.25rem",    // 20px — page headings
  "2xl":"1.5rem",     // 24px — stat values
  "3xl":"1.875rem",   // 30px — hero numbers

  // Weight
  regular: 400,
  medium:  500,
  semibold:600,
  bold:    700,
} as const;

// ─── SPACING ──────────────────────────────────────────────────────────────────

export const spacing = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
} as const;

// ─── BORDER RADIUS ────────────────────────────────────────────────────────────

export const radius = {
  sm:  "0.5rem",   // 8px  — small elements (badges, chips)
  md:  "0.75rem",  // 12px — inputs, small cards
  lg:  "1rem",     // 16px — cards, panels
  xl:  "1.25rem",  // 20px — modals, large cards
  "2xl":"1.5rem",  // 24px — big cards
  full:"9999px",   // pill / circle
} as const;

// ─── SHADOWS ──────────────────────────────────────────────────────────────────

export const shadows = {
  sm:  "0 1px 3px 0 rgba(11,36,71,0.06), 0 1px 2px -1px rgba(11,36,71,0.04)",
  md:  "0 4px 12px -2px rgba(11,36,71,0.08), 0 2px 6px -2px rgba(11,36,71,0.05)",
  lg:  "0 10px 30px -5px rgba(11,36,71,0.12), 0 4px 10px -4px rgba(11,36,71,0.06)",
  teal:"0 4px 14px 0 rgba(25,167,206,0.30)",
} as const;

// ─── STATUS MAPS ──────────────────────────────────────────────────────────────

export const statusStyles = {
  Open:         { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
  "In Progress":{ bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  Resolved:     { bg: "#D1FAE5", text: "#065F46", dot: "#10B981" },
} as const;

export const categoryStyles = {
  Pothole:       { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA", emoji: "🕳️" },
  Garbage:       { bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3", emoji: "🗑️" },
  Streetlight:   { bg: "#FEFCE8", text: "#A16207", border: "#FEF08A", emoji: "💡" },
  "Water Issue": { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE", emoji: "💧" },
} as const;

export const priorityStyles = {
  High:   { color: "#EF4444", bg: "#FEE2E2", label: "High" },
  Medium: { color: "#F59E0B", bg: "#FEF3C7", label: "Medium" },
  Low:    { color: "#10B981", bg: "#D1FAE5", label: "Low" },
} as const;
