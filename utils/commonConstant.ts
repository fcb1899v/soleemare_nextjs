/**
 * utils/commonConstant.ts
 *
 * Shared constants used across the project.
 * Defines responsive breakpoints, layout values, and other common constants.
 *
 * Usage (responsive):
 *   const { isSP, isPC } = getBreakpointFlags(width)
 */

// --- Responsive breakpoints (px) ---

/** Mobile / small screen: treat as SP when width < BREAKPOINT_SP */
export const BREAKPOINT_SP = 600

/** Desktop / large screen: treat as PC when width > BREAKPOINT_PC */
export const BREAKPOINT_PC = 1024

/** Min width to show the icon logo in the header (shown when width > BREAKPOINT_HEADER_LOGO) */
export const BREAKPOINT_HEADER_LOGO = 360

/** Returns { isSP, isPC } for the given viewport width. Use in components that receive width. */
export const getBreakpointFlags = (width: number): { isSP: boolean; isPC: boolean } => ({
  isSP: width < BREAKPOINT_SP,
  isPC: width > BREAKPOINT_PC,
})
