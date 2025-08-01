/**
 * HomeSNSTitle.tsx
 * 
 * Home page SNS link component
 * 
 * Features:
 * - Displays SNS icons with links
 * - Supports light and dark themes
 * - Responsive icon sizing
 * - External link handling
 * 
 * Dependencies:
 * - Next.js Link component for navigation
 */

import { NextPage } from 'next'
import Link from 'next/link'
import { CSSProperties } from 'react'

/**
 * Props interface
 * @param sns - SNS information object
 * @param sns.title - SNS platform name
 * @param sns.image - Array of icon images [light, dark]
 * @param sns.link - SNS profile URL
 * @param isDark - Whether to use dark theme styling
 */
interface Props {
  sns: {
    title: string  
    image: string[]
    link: string
  }
  isDark: boolean
}

/**
 * HomeSNSLink component
 * Displays SNS icon with link to profile
 */
const HomeSNSLink: NextPage<Props> = ({ sns, isDark }) => {

  // Style definitions
  const snsLinkStyle: CSSProperties = {
    textDecoration: "none",
    color: isDark ? "black": "white",
    margin: "0 auto"
  }
  const snsTitleStyle: CSSProperties = {
    fontSize: 54,
    fontFamily: "Kleymisska",
    margin: 0,
  }
  const snsIconStyle: CSSProperties = {
    width: 50, 
    height: 50,
    margin: "10px 0 40px 0",
  }

  return <Link className="flex_center" style={snsLinkStyle} href={sns.link} target="_blank" rel="noreferrer" >
    {/* SNS icon (light or dark version based on theme) */}
    <img style={snsIconStyle} src={sns.image[isDark ? 1: 0]} alt={sns.title} />
  </Link>;
};

export default HomeSNSLink
