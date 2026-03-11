/**
 * SNSButtons.tsx
 * 
 * Social media buttons component
 * 
 * Features:
 * - Displays social media icons as buttons
 * - Responsive design for different screen sizes
 * - External link handling
 * - Circular button styling
 * 
 * Dependencies:
 * - Next.js Link component for navigation
 * - homeConstant for SNS data
 */

import { NextPage } from 'next'
import Link from 'next/link';
import { mySNS } from '../../utils/homeConstant';
import { getBreakpointFlags } from '../../utils/commonConstant';
import { CSSProperties } from 'react';

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props {
  width: number
}

/**
 * SNSButtons component
 * Displays social media buttons with responsive styling
 */
const SNSButtons: NextPage<Props> = ({width}) => {

  const { isSP, isPC } = getBreakpointFlags(width)

  // Style definitions
  const snsListStyle: CSSProperties = {
    display: "inline-flex",
    marginTop: isPC ? "2.5px 0px 0px 0px" : "2.5px 0px 15px 0px",
    listStyle: "none",
    padding: 0,
    margin: 0,
  }
  const snsButtonStyle: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: "auto 10px",
    padding: 0,
    backgroundColor: "var(--gray)",
  }

  const snsImageStyle: CSSProperties = {
    height: 25,
    margin: 7.5,
  }

  return (
    <ul style={snsListStyle} aria-label="SNS Link">
      {mySNS.map((_, i) => (
        <li key={`sns_${i}`} style={snsButtonStyle}>
          <Link href={mySNS[i].link} target="_blank" rel="noreferrer">
            <img src={mySNS[i].image[0]} alt={mySNS[i].title} width={25} height={25} style={snsImageStyle} loading="lazy" decoding="async" />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SNSButtons
