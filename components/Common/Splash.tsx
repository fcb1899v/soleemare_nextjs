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
 * - Next.js Image component for optimized image loading
 * - CSS transitions for smooth animations
 */

import { NextPage } from "next";
import React, {useState, useEffect, CSSProperties} from "react"
import Image from "next/image"

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
  
  // Style definitions
  const splashStyle: CSSProperties = {
    position: "fixed",
    width: "100vw",
    height: "110vh",
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: "var(--white)",
    transition: "all 3s ease",
  }

  const splashImageStyle: CSSProperties = {
    width: 280,
    height: 280,
  }

  return <div style={splashStyle} className={isVanish ? "vanish": isLoad ? "loading": "loaded"}>
    {/* Logo image with centered positioning */}
    <Image className="placeCenter" style={splashImageStyle} width={500} height={500} src="/images/soleemare_logo.png" alt="Sole e Mare"/>
  </div>  
}

export default Splash