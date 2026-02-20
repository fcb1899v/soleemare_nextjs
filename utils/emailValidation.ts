/**
 * utils/emailValidation.ts
 *
 * Shared validation and sanitization for email-related content.
 * Used by pages/api/sendgrid.ts and tested by emailValidation.test.ts
 */

/** Escape HTML to prevent injection in email body */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Basic email format check (RFC-style local@domain, max length 254) */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

/** Japanese phone format: 0 followed by 9 or 10 digits (e.g. 09012345678) */
export function isValidPhone(phone: string): boolean {
  return /^0\d{9,10}$/.test(phone)
}
