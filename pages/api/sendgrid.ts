/**
 * pages/api/sendgrid.ts
 *
 * SendGrid email API endpoint (server-side only).
 * API key must be set via SENDGRID_API_KEY (no NEXT_PUBLIC_) so it is never exposed to the client.
 * Note: This endpoint may be unused in production when using static export.
 */
import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'

// Server-only: do not use NEXT_PUBLIC_ so the key is never exposed to the client
const apiKey = process.env.SENDGRID_API_KEY ?? ''
sgMail.setApiKey(apiKey)

type SendgridRequestBody = {
  name?: string
  email?: string
  message?: string
}

type SendgridResponseBody = {
  error: string
}

/** Escape HTML to prevent injection in email body */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Basic email format check */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse<SendgridResponseBody>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = (req.body ?? {}) as SendgridRequestBody
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || name.length > 200) {
    return res.status(400).json({ error: 'Invalid or missing name' })
  }
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid or missing email' })
  }
  if (!message || message.length > 10000) {
    return res.status(400).json({ error: 'Invalid or missing message' })
  }

  const nameSafe = escapeHtml(name)
  const emailSafe = escapeHtml(email)
  const messageSafe = escapeHtml(message)

  try {
    await sgMail.send({
      to: [email, 'info@sole-e-mare.com'],
      from: 'info@sole-e-mare.com',
      subject: '【自動返信】お問い合わせありがとうございます',
      text: `
        ${name} 様\n

        このたびは、ソレ・エ・マーレにお問い合わせいただき、誠にありがとうございます。\n
        このメールは自動返信となります。\n\n\

        [メールアドレス]\n
        ${email}\n\n

        [お問い合わせ内容]\n
        ${message}\n\n
        
        お問い合わせいただいた内容につきまして、ご担当者が確認次第、改めてご連絡差し上げます。\n
        なお、お問い合わせ内容によっては、回答までにお時間をいただく場合がございます。\n
        何卒ご了承くださいますよう、よろしくお願いいたします。\n
        何かご不明な点がございましたら、お気軽にお問い合わせください。\n\n
        
        今後とも、よろしくお願い申し上げます。\n
        
        敬具\n
        ソレ・エ・マーレ
      `,
      html: `
        <div style="font-size: 14px; font-family: Arial, sans-serif; line-height: 1;">
          <p>${nameSafe} 様</p>
          <br/>
          <p>このたびは、ソレ・エ・マーレにお問い合わせいただき、誠にありがとうございます。</p>
          <p>このメールは自動返信となります。</p>
          <br/>
          <p>[メールアドレス]</p>
          <p>${emailSafe}</p>
          <br/>
          <p>[お問い合わせ内容]</p>
          <p>${messageSafe}</p>
          <br/>
          <p>お問い合わせいただいた内容につきまして、ご担当者が確認次第、改めてご連絡差し上げます。</p>
          <p>なお、お問い合わせ内容によっては、回答までにお時間をいただく場合がございます。</p>
          <p>何卒ご了承くださいますよう、よろしくお願いいたします。</p>
          <p>何かご不明な点がございましたら、お気軽にお問い合わせください。</p>
          <br/>
          <p>今後とも、よろしくお願い申し上げます。</p>
          <br/>
          <p>敬具</p>
          <p>ソレ・エ・マーレ</p>
        </div>
      `,
    })
  } catch {
    return res.status(500).json({ error: 'Failed to send email' })
  }

  return res.status(200).json({ error: '' })
}
