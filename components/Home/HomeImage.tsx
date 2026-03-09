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
import { BREAKPOINT_SP, getBreakpointFlags } from '../../utils/commonConstant'
import { getImageBaseAndExt, getResponsiveSrcSet, CONTENT_IMAGE_SIZES } from '../../utils/imageUtils'

/**
 * Props interface
 * @param width - Screen width for responsive design
 * @param color - Background gradient color
 * @param title - Array of titles [Japanese, Italian]
 * @param image - Image URL
 * @param srcSet - Optional responsive srcSet (e.g. Shopify transform URLs)
 * @param sizes - Optional sizes attribute when srcSet is used
 */
interface Props  {
  width: number
  color: string 
  title: string[]
  image: string
  srcSet?: string
  sizes?: string
}
  
/**
 * HomeImage component
 * Displays images with overlay titles and responsive styling
 */
const HomeImage: NextPage<Props> = ({ width, color, title, image, srcSet, sizes }) => {

  const { isSP, isPC } = getBreakpointFlags(width)

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

  const isLocalImage = image.startsWith('/')
  const { base, ext } = getImageBaseAndExt(image)

  const imgEl = (
    <img
      style={borderImage}
      src={image}
      alt={title[0]}
      loading="lazy"
      decoding="async"
      {...(srcSet && sizes && { srcSet, sizes })}
      {...(isLocalImage && !srcSet && {
        srcSet: getResponsiveSrcSet(base, ext),
        sizes: CONTENT_IMAGE_SIZES,
      })}
    />
  )

  return (<div style={border}>
    {isLocalImage ? (
      <picture>
        <source type="image/avif" srcSet={getResponsiveSrcSet(base, 'avif')} sizes={CONTENT_IMAGE_SIZES} />
        <source type="image/webp" srcSet={getResponsiveSrcSet(base, 'webp')} sizes={CONTENT_IMAGE_SIZES} />
        {imgEl}
      </picture>
    ) : (
      imgEl
    )}
    {/* Overlay titles (Japanese and Italian) */}
    <div className="placeCenter" style={borderTitle}>
      <h1 style={borderJaTitle}>{title[0]}</h1>
      <h1 style={borderItTitle}>{title[1]}</h1>
    </div>
  </div>);
};

export default HomeImage