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
 * - HomeConstant for SNS data
 */

import { NextPage } from 'next'
import Link from 'next/link';
import { mySNS } from '../../utils/HomeConstant';
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

  // Responsive breakpoint detection
  const isSP = (width < 600)
  const isPC = (width > 1024)

  // Style definitions
  const snsStyle: CSSProperties = { 
    display: "inline-flex",
    marginTop: isPC ? "2.5px 0px 0px 0px": "2.5px 0px 15px 0px",
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

  return (<div style={snsStyle}> 
    {/* Social media buttons */}
    {mySNS.map((_, i) => <ul style={snsButtonStyle} key={`sns_${i}`}>
      <Link href={mySNS[i].link} target="_blank" rel="noreferrer">
        <img src={mySNS[i].image[0]} alt={mySNS[i].title} style={snsImageStyle}/>
      </Link>
    </ul>)}
  </div>)
}

export default SNSButtons
