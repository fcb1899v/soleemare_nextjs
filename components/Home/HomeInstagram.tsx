/**
 * HomeInstagram.tsx
 * 
 * Home page Instagram feed component
 * 
 * Features:
 * - Fetches Instagram posts via Facebook Graph API
 * - Displays Instagram feed with images and like counts
 * - Responsive grid layout for different screen sizes
 * - Dynamic grid columns based on screen width
 * - SNS link integration
 * 
 * Dependencies:
 * - Facebook Graph API for Instagram data
 * - HomeSNSLink component for SNS navigation
 * - BlueBorder component for styling
 * - homeConstant for SNS data
 * 
 * In dev: uses /api/instagram (INSTA_ID, INSTA_TOKEN server-side).
 * In production static export: API routes are unavailable, so falls back to
 * client-side fetch with INSTA_ID and INSTA_TOKEN.
 */

import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState, useEffect, CSSProperties } from 'react'
import HomeSNSLink from './HomeSNSTitle';
import { mySNS } from '../../utils/homeConstant';
import { getBreakpointFlags } from '../../utils/commonConstant';
import BlueBorder from '../Common/BlueBorder';

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props  {
  width: number
}

/**
 * Fetches Instagram media: tries API route first, then client-side Graph API for static export.
 */
async function fetchInstaItems(): Promise<Array<Record<string, unknown>>> {
  // Prefer API route when available (dev or server deployment)
  try {
    const res = await fetch('/api/instagram');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // API route not available (e.g. static export)
  }

  // Fallback: direct Graph API (required for static export; token is client-visible)
  const userId = process.env.INSTA_ID;
  const token = process.env.INSTA_TOKEN;
  if (!userId || !token) return [];

  try {
    const url = `https://graph.facebook.com/v15.0/${userId}?fields=media.limit(10){id,caption,media_url,thumbnail_url,timestamp,media_type,permalink,like_count}&access_token=${token}`;
    const res = await fetch(url);
    const data = await res.json();
    const media = data?.media?.data ?? [];
    return Array.isArray(media) ? media : [];
  } catch {
    return [];
  }
}

/**
 * HomeInstagram component
 * Displays Instagram feed with dynamic grid layout
 */
const HomeInstagram: NextPage<Props> = ({width}) => {

  const { isSP, isPC } = getBreakpointFlags(width)

  // SNS index for Instagram
  const snsNumber = 2;

  // Instagram posts state
  const [instaItems, setInstaItems] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    (async () => {
      const items = await fetchInstaItems();
      setInstaItems(items);
    })();
  }, []);

  // Style definitions
  const instaStyle: CSSProperties = { 
    width: "100%",
    margin: "0 auto",
    padding: "30px 0 40px",
    color: "var(--black)",
    textShadow: "1px 2px 3px var(--white)",
    position: "relative",
    background: "linear-gradient(to right bottom, var(--yellow), var(--orange))",  
  }
  const instaContainerStyle: CSSProperties =  { 
    marginBottom: 15,
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: `repeat(${Math.floor(width / 250)}, 1fr)`,
    gap: 20,
    margin: "0 auto",
  }
  const instaImageStyle: CSSProperties =  { 
    width: 225, 
    aspectRatio: 1, 
    marginBottom: 20,
  }
  const instaLinkStyle: CSSProperties =  { 
    textDecoration: "none", 
  }
  const instaLikeStyle: CSSProperties = {
    width: "100%", 
    color: "var(--red)", 
    marginTop: -24,
  }
  
  return (<div>
    <div style={instaStyle}>
      {/* SNS navigation link */}
      <HomeSNSLink sns={mySNS[snsNumber]} isDark={true}/>
      <div className="flex_center_wrap">
        {/* Instagram feed grid */}
        {(instaItems.length !== 0) && <div style={instaContainerStyle}>
          {instaItems.map((item, i) => (
            <Link key={i} href={String(item.permalink ?? '')} style={instaLinkStyle} >
              {/* Instagram post image (video thumbnail for videos) */}
              <img style={instaImageStyle} alt={`insta_image_${i}`} src={String((item.media_type === 'VIDEO') ? item.thumbnail_url : item.media_url)} loading="lazy" decoding="async" />
              {/* Like count display */}
              <div style={instaLikeStyle}>♥ {Number(item.like_count) || 0}</div>
            </Link>
          ))}
        </div>}
      </div>
    </div>
    <BlueBorder/> 
  </div>);
}

export default HomeInstagram

