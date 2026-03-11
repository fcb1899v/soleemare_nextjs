/**
 * HomePicture.tsx
 * 
 * Home page picture component with expandable content
 * 
 * Features:
 * - Displays product images with titles
 * - Expandable content with "read more" functionality
 * - Responsive design for different screen sizes
 * - Animated content reveal
 * - Custom styling with gradient backgrounds
 * 
 * Dependencies:
 * - HomeImage component for image display
 * - Material-UI Button component
 */

import { Button } from '@mui/material'
import { NextPage } from 'next'
import { CSSProperties, useState } from 'react'
import { BREAKPOINT_SP, getBreakpointFlags } from '../../utils/commonConstant'
import HomeImage from './HomeImage'

/**
 * Props interface
 * @param width - Screen width for responsive design
 * @param color - Background gradient color
 * @param title - Array of titles [Japanese, Italian]
 * @param image - Image URL
 * @param features - Product features text
 * @param message - Array of message texts
 */
interface Props  {
  width: number
  color: string 
  title: string[]
  image: string
  features: string
  message: string[]
}
  
// title={homeProducts[i].title[j]}
// image={homeProducts[i].image[j]}
// features={homeProducts[i].features[i]}
// message={homeProducts[i].message[i]}

/**
 * HomePicture component
 * Displays product images with expandable content sections
 */
const HomePicture: NextPage<Props> = ({ width, color, title, image, features, message }) => {

  const { isSP, isPC } = getBreakpointFlags(width)

  // Expandable content state
  const [showChild, setShowChild] = useState(false);
  const [vanishButton, setVanishButton] = useState(false);
  
  // Toggle content visibility
  const handleClick = () => {
    setShowChild(!showChild);
    setVanishButton(!vanishButton);
  };

  // Style definitions
  const border: CSSProperties = { 
    color: "#F4F5F0",
    textShadow: "1px 2px 3px var(--black)",
    background: color,
    position: "relative",
    padding: "6px 6px 0px 6px",
    margin: "0 auto",
    maxWidth: BREAKPOINT_SP,
  }
  const borderImage: CSSProperties = { 
    width: "100%", 
    aspectRatio: isPC ? 3/2: undefined,
    objectFit: "cover",
    margin: 0,
  }
  const borderTitle: CSSProperties = { 
    opacity: (title[0] == "" && title[1] == "") ? 0: 1,
    transition: "opacity 2s ease",
    margin: 0,
  }
  const borderJaTitle: CSSProperties = { 
    fontSize: "min(7vw, 35px)",
    margin: 0,
  }
  const borderItTitle: CSSProperties = { 
    fontSize: "min(16vw, 80px)",
    fontFamily: "Kleymisska",
    margin: 0,
  }
  const messageStyle: CSSProperties = {
    height: showChild ? "auto" : "0px",
    color: showChild ? "black" : "transparent",
    paddingBottom: showChild ? "5px" : "0px",
  }
  const featuresStyle: CSSProperties = {
    paddingBottom: showChild ? "5px" : "0px",
  }
  const readMoreTextStyle: CSSProperties = {
    margin: 0,
    fontWeight: 600,
    color: "inherit",
    textAlign: "center",
  }
  const buttonStyle: CSSProperties = {
    margin: "0 auto",
    paddingBottom: 30,
    height: showChild ? "0px" : "20px",
    display: showChild ? "none" : "block",
    textAlign: "center",
    // Dark blue: contrast ~5:1 on white (WCAG AA for normal text)
    color: "var(--darkblue)",
    backgroundColor: "transparent",
  }

  return (
    <div style={{ width: isPC ? "50%": "Calc(100% - 20px)", margin: "0 auto 30px", }}> 
      {/* Product image display */}
      <HomeImage width={width} color={color} title={title} image={image}/>
      {/* Product information and expandable content */}
      <div style={{ margin: "20px auto 0px", padding: 10, maxWidth: BREAKPOINT_SP, }}>
        {/* Product features (body text, same look as former h5) */}
        <p className="content-like-h5" style={featuresStyle}>{features}</p>
        {/* Expandable message content */}
        {message.map((_, i) => (
          <p className="content-like-h5" style={messageStyle} key={`blue_message_${i}`}>{message[i]}</p>
        ))}
        {/* Read more button */}
        <Button onClick={handleClick} style={buttonStyle}>
          <span className="content-like-h5" style={readMoreTextStyle}>＋ 続きを読む</span>
        </Button>
      </div>
    </div>
  );
};

export default HomePicture