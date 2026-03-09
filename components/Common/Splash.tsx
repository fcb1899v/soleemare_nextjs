/**
 * Splash.tsx
 * 
 * Loading splash screen component
 * 
 * Features:
 * - Displays loading animation with logo
 * - Automatic transition after 3 seconds
 * - Smooth fade out animation
 * - Full screen overlay
 * 
 * Dependencies:
 * - picture + responsive srcset (WebP/AVIF, 800w) for logo
 * - CSS transitions for smooth animations
 */

import { NextPage } from "next";
import React, { useState, useEffect, CSSProperties } from "react"
import { getImageBaseAndExt, getResponsiveSrcSet, LOGO_WIDTH } from "../../utils/imageUtils"

/**
 * Splash component
 * Displays loading screen with logo and automatic transition
 */
const Splash: NextPage = () => {

  // Loading state management
  const [isLoad, setIsLoad] = useState(true);
  const [isVanish, setIsVanish] = useState(false)
  
  // Timer for splash screen transitions
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false)
      setTimeout(() => {setIsVanish(true)}, 3000);
    }, 3000);
  }, []);
  
  // Style definitions: when not loading, allow clicks to pass through so form/links work
  const splashStyle: CSSProperties = {
    position: "fixed",
    width: "100vw",
    height: "110vh",
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: "var(--white)",
    transition: "all 3s ease",
    pointerEvents: isLoad ? "auto" : "none",
  }

  const splashImageStyle: CSSProperties = {
    width: 280,
    height: 280,
  }

  const logo = "/images/soleemare_logo.png"
  const { base, ext } = getImageBaseAndExt(logo)
  const w = [LOGO_WIDTH]

  return <div style={splashStyle} className={isVanish ? "vanish" : isLoad ? "loading" : "loaded"}>
    <picture className="placeCenter" style={splashImageStyle}>
      <source type="image/avif" srcSet={getResponsiveSrcSet(base, 'avif', w)} />
      <source type="image/webp" srcSet={getResponsiveSrcSet(base, 'webp', w)} />
      <img src={logo} srcSet={getResponsiveSrcSet(base, ext, w)} sizes="280px" alt="Sole e Mare" width={280} height={280} decoding="async" style={{ width: 280, height: 280 }} />
    </picture>
  </div>  
}

export default Splash