/**
 * Unit tests for pages/api/sendgrid.ts
 * Tests 405, 503 (no API key), and 400 validation. Send is mocked to avoid real API calls.
 */
import type { NextApiRequest, NextApiResponse } from 'next'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

const mockSend = vi.fn()
vi.mock('@sendgrid/mail', () => ({
  default: {
    setApiKey: vi.fn(),
    send: (...args: unknown[]) => mockSend(...args),
  },
}))

function createRes() {
  const json = vi.fn()
  const status = vi.fn().mockReturnValue({ json })
  const setHeader = vi.fn()
  return { json, status, setHeader } as unknown as NextApiResponse
}

describe('sendgrid API', () => {
  beforeAll(() => {
    vi.stubEnv('SENDGRID_API_KEY', 'test-key-for-unit-test')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  beforeEach(async () => {
    vi.resetModules()
    mockSend.mockResolvedValue(undefined)
  })

  it('returns 405 for GET', async () => {
    const { default: sendEmail } = await import('./sendgrid')
    const res = createRes()
    await sendEmail({ method: 'GET' } as NextApiRequest, res)
    expect(res.setHeader).toHaveBeenCalledWith('Allow', 'POST')
    expect(res.status).toHaveBeenCalledWith(405)
    expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' })
  })

  it('returns 405 for PUT', async () => {
    const { default: sendEmail } = await import('./sendgrid')
    const res = createRes()
    await sendEmail({ method: 'PUT' } as NextApiRequest, res)
    expect(res.status).toHaveBeenCalledWith(405)
  })

  it('returns 503 when API key is empty', async () => {
    const orig = process.env.SENDGRID_API_KEY
    process.env.SENDGRID_API_KEY = ''
    vi.resetModules()
    const { default: sendEmail } = await import('./sendgrid')
    const res = createRes()
    await sendEmail({ method: 'POST', body: {} } as NextApiRequest, res)
    expect(res.status).toHaveBeenCalledWith(503)
    expect(res.json).toHaveBeenCalledWith({ error: 'Email service not configured' })
    process.env.SENDGRID_API_KEY = orig
    vi.resetModules()
  })

  it('returns 400 for missing name', async () => {
    const { default: sendEmail } = await import('./sendgrid')
    const res = createRes()
    await sendEmail({
      method: 'POST',
      body: { email: 'a@b.co', message: 'hello' },
    } as NextApiRequest, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or missing name' })
  })

  it('returns 400 for missing email', async () => {
    const { default: sendEmail } = await import('./sendgrid')
    const res = createRes()
    await sendEmail({
      method: 'POST',
      body: { name: 'Test', message: 'hello' },
    } as NextApiRequest, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or missing email' })
  })

  it('returns 400 for invalid email format', async () => {
    const { default: sendEmail } = await import('./sendgrid')
    const res = createRes()
    await sendEmail({
      method: 'POST',
      body: { name: 'Test', email: 'not-an-email', message: 'hello' },
    } as NextApiRequest, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or missing email' })
  })

  it('returns 400 for missing message', async () => {
    const { default: sendEmail } = await import('./sendgrid')
    const res = createRes()
    await sendEmail({
      method: 'POST',
      body: { name: 'Test', email: 'a@b.co' },
    } as NextApiRequest, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or missing message' })
  })

  it('returns 200 and calls send with valid body', async () => {
    const { default: sendEmail } = await import('./sendgrid')
    const res = createRes()
    await sendEmail({
      method: 'POST',
      body: { name: 'Test User', email: 'user@example.com', message: 'Hello' },
    } as NextApiRequest, res)
    expect(mockSend).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ error: '' })
  })

  it('returns 500 when send throws', async () => {
    mockSend.mockRejectedValueOnce(new Error('Send failed'))
    const { default: sendEmail } = await import('./sendgrid')
    const res = createRes()
    await sendEmail({
      method: 'POST',
      body: { name: 'Test', email: 'a@b.co', message: 'Hi' },
    } as NextApiRequest, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to send email' })
  })
})
