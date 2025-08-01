/**
 * HomeImage.tsx
 * 
 * Home page image display component
 * 
 * Features:
 * - Displays images with overlay titles
 * - Responsive design for different screen sizes
 * - Custom gradient backgrounds
 * - Bilingual title support (Japanese/Italian)
 * - Conditional title visibility
 * 
 * Dependencies:
 * - CSS custom properties for theming
 */

import { NextPage } from 'next'
import { CSSProperties } from 'react'

/**
 * Props interface
 * @param width - Screen width for responsive design
 * @param color - Background gradient color
 * @param title - Array of titles [Japanese, Italian]
 * @param image - Image URL
 */
interface Props  {
  width: number
  color: string 
  title: string[]
  image: string
}
  
/**
 * HomeImage component
 * Displays images with overlay titles and responsive styling
 */
const HomeImage: NextPage<Props> = ({ width, color, title, image }) => {

  // Responsive breakpoint detection
  const isSP = (width < 600)
  const isPC = (width > 1024)

  // Style definitions
  const border: CSSProperties = { 
    color: "#F4F5F0",
    textShadow: "1px 2px 3px var(--black)",
    background: color,
    position: "relative",
    padding: "6px 6px 0px 6px",
    margin: "0 auto",
    maxWidth: 600,
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

  return (<div style={border}>
    {/* Product image */}
    <img style={borderImage} src={image} alt={title[0]}/>
    {/* Overlay titles (Japanese and Italian) */}
    <div className="placeCenter" style={borderTitle}>
      <h1 style={borderJaTitle}>{title[0]}</h1>
      <h1 style={borderItTitle}>{title[1]}</h1>
    </div>
  </div>);
};

export default HomeImage