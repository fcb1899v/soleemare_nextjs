/**
 * Title.tsx
 * 
 * Common title component with bilingual support
 * 
 * Features:
 * - Displays bilingual titles (Japanese/Italian)
 * - Responsive design for different screen sizes
 * - Optional decorative images
 * - Custom styling with Italian font
 * 
 * Dependencies:
 * - CSS custom properties for theming
 * - Kleymisska font for Italian text
 */

import { NextPage } from 'next';
import React, { CSSProperties, } from 'react'

/**
 * Props interface
 * @param width - Screen width for responsive design
 * @param title - Array of titles [Japanese, Italian]
 * @param index - Index for decorative image (0 = no image)
 */
interface Props  {
  width: number
  title: string[]
  index: number
}

/**
 * HomeTitle component
 * Displays bilingual section titles with optional decorative images
 */
const HomeTitle: NextPage<Props> = ({width, title, index}) => {

  // Responsive breakpoint detection
  const isSP = (width < 600)
  const isPC = (width > 1024)

  // Style definitions
  const titleStyle: CSSProperties = {
    margin: "0 auto",
    padding: "25px 0 0", 
  }
  const titleStringStyle: CSSProperties = {
    columnGap: 25,
  }
  const jaTitleStyle: CSSProperties = {
    padding: (index > 0) ? 0: "15px 0 0",
    marginTop: isSP ? -20: 0,
    fontSize: isSP ? 24: 28,
  }
  const itTitleStyle: CSSProperties = {
    fontSize: 54,
    fontFamily: "Kleymisska",
    margin: 0,
  }
  const imageStyle: CSSProperties = {
    width: 80,
    height: 80,    
    margin: isSP ? "0 0 20px": "-15px 0 0"
  }

  return (<div style={titleStyle}>
    <div className={isSP ? "block": "flex_center_wrap"} style={titleStringStyle}>
      {/* Decorative image (optional) */}
      {(index > 0) && <img src={`/images/${index}.png`} alt={`image_${index}`} style={imageStyle}></img>}
      {/* Italian title */}
      {(title[1] != "") && <h2 style={itTitleStyle}>{title[1]}</h2>}
      {/* Japanese title */}
      <h2 style={jaTitleStyle}>{title[0]}</h2>
    </div>
  </div>);
};

export default HomeTitle