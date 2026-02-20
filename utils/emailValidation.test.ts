/**
 * Unit tests for utils/emailValidation.ts
 */
import { describe, it, expect } from 'vitest'
import { escapeHtml, isValidEmail, isValidPhone } from './emailValidation'

describe('escapeHtml', () => {
  it('escapes & to &amp;', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b')
  })
  it('escapes < and >', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;')
  })
  it('escapes double and single quotes', () => {
    expect(escapeHtml('"foo" \'bar\'')).toBe('&quot;foo&quot; &#39;bar&#39;')
  })
  it('escapes multiple special chars', () => {
    expect(escapeHtml('<a href="x">')).toBe('&lt;a href=&quot;x&quot;&gt;')
  })
  it('leaves plain text unchanged', () => {
    expect(escapeHtml('hello 世界')).toBe('hello 世界')
  })
})

describe('isValidEmail', () => {
  it('accepts simple valid email', () => {
    expect(isValidEmail('a@b.co')).toBe(true)
    expect(isValidEmail('user@example.com')).toBe(true)
  })
  it('rejects empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })
  it('rejects missing @', () => {
    expect(isValidEmail('userexample.com')).toBe(false)
  })
  it('rejects missing domain part', () => {
    expect(isValidEmail('user@')).toBe(false)
  })
  it('rejects email with spaces', () => {
    expect(isValidEmail('user @example.com')).toBe(false)
  })
  it('rejects over 254 chars', () => {
    // 249 + 5 ('@b.co') = 254
    const long = 'a'.repeat(249) + '@b.co'
    expect(long.length).toBe(254)
    expect(isValidEmail(long)).toBe(true)
    expect(isValidEmail(long + 'x')).toBe(false)
  })
})

describe('isValidPhone', () => {
  it('accepts 10-digit Japanese mobile', () => {
    expect(isValidPhone('09012345678')).toBe(true)
  })
  it('accepts 11-digit number starting with 0 (0 + 10 digits)', () => {
    expect(isValidPhone('09012345678')).toBe(true)
  })
  it('rejects empty string', () => {
    expect(isValidPhone('')).toBe(false)
  })
  it('rejects without leading 0', () => {
    expect(isValidPhone('9012345678')).toBe(false)
  })
  it('rejects too short', () => {
    expect(isValidPhone('012345678')).toBe(false)
  })
  it('rejects too long', () => {
    expect(isValidPhone('0901234567890')).toBe(false)
  })
})
