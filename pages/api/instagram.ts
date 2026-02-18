/**
 * pages/api/instagram.ts
 *
 * Proxies Instagram media from Facebook Graph API so the token stays server-side.
 * Use INSTA_ID and INSTA_TOKEN (no NEXT_PUBLIC_) in .env.local.
 */
import type { NextApiRequest, NextApiResponse } from 'next'

const userId = process.env.INSTA_ID ?? ''
const token = process.env.INSTA_TOKEN ?? ''

export default async function instagram(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!userId || !token) {
    return res.status(500).json({ error: 'Instagram API not configured' })
  }

  try {
    const url = `https://graph.facebook.com/v15.0/${userId}?fields=media.limit(10){id,caption,media_url,thumbnail_url,timestamp,media_type,permalink,like_count}&access_token=${token}`
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json(data)
    }

    const media = data?.media?.data ?? []
    return res.status(200).json(media)
  } catch {
    return res.status(500).json({ error: 'Failed to fetch Instagram media' })
  }
}
