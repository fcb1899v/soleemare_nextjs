/**
 * Header.tsx
 * 
 * Common header navigation component
 * 
 * Features:
 * - Responsive navigation menu
 * - Mobile hamburger menu
 * - Smooth scroll to sections
 * - SNS buttons integration
 * - Footer menu in mobile view
 * - Logo and branding display
 * 
 * Dependencies:
 * - SNSButtons component for social media links
 * - homeConstant for menu data
 * - Next.js Link component for navigation
 */

import { NextPage } from "next"
import Link from "next/link";
import { CSSProperties, useState } from "react";
import { myFooterMenu, myHeaderMenu } from "../../utils/homeConstant";
import { BREAKPOINT_HEADER_LOGO, getBreakpointFlags } from "../../utils/commonConstant";
import { getImageBaseAndExt, getResponsiveSrcSet, LOGO_WIDTH } from "../../utils/imageUtils";
import SNSButtons from "./SNSButtons";

const W_800 = [LOGO_WIDTH];

/** Wrapper reserves space via aspect-ratio to avoid CLS; img fills with object-fit: contain so aspect ratio is preserved. */
function ResponsiveImg({ src, alt, sizes, wrapperStyle, imgStyle }: { src: string; alt: string; sizes: string; wrapperStyle: CSSProperties; imgStyle: CSSProperties }) {
  const { base, ext } = getImageBaseAndExt(src);
  return (
    <span style={wrapperStyle}>
      <picture>
        <source type="image/avif" srcSet={getResponsiveSrcSet(base, 'avif', W_800)} />
        <source type="image/webp" srcSet={getResponsiveSrcSet(base, 'webp', W_800)} />
        <img src={src} srcSet={getResponsiveSrcSet(base, ext, W_800)} sizes={sizes} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", ...imgStyle }} loading="lazy" decoding="async" />
      </picture>
    </span>
  );
}

/**
 * Props interface
 * @param width - Screen width for responsive design
 * @param isHome - Whether current page is home page
 */
interface Props {
  width: number
  isHome: boolean
}

/**
 * Header component
 * Provides navigation menu with responsive design
 */
const Header: NextPage<Props> = ({ width, isHome }) => {
  
  const { isSP, isPC } = getBreakpointFlags(width)

  // Mobile menu state
  const [openMenu, setOpenMenu] = useState(false);
  const toMenu = () => setOpenMenu(!openMenu);

  // Smooth scroll to section
  const handleClick = (i: number) => {
    const target = document.getElementById(myHeaderMenu[i].link);
    if (target) target.scrollIntoView({behavior: "smooth", block: "start",});
    setOpenMenu(false);
  };
  
  // Style definitions
  const headerStyle: CSSProperties = {
    width: "100%", 
    height: 60,
    top: 0,
    zIndex: 10,
    backgroundColor: "var(--white)",
  }
  const headerContainerStyle: CSSProperties = {
    display: (isPC && isHome) ? "flex": "block", 
    margin: (isPC && isHome) ? "0 0 0 100px": 0,
    height: 60,
  }
  const headerLogoWrapperStyle: CSSProperties = {
    display: "inline-block",
    height: 40,
    aspectRatio: "1",
    margin: "10px 10px 10px 0",
  }
  const headerTitleWrapperStyle: CSSProperties = {
    display: "inline-block",
    height: 35,
    aspectRatio: "800 / 133",
    margin: 10,
    padding: (width > BREAKPOINT_HEADER_LOGO) ? 0 : "5px 0 0 20px",
  }
  const headerMenuStyle: CSSProperties = {
    display: (isPC && isHome) ? "flex" : "block",
    height: openMenu && !isPC ? "100vh" : "auto",
    backgroundColor: !openMenu ? "transparent" : "rgba(244, 245, 240, 0.95)",
    paddingTop: (isPC && isHome) ? 15 : 50,
    margin: (isPC && isHome) ? "0 100px 0 auto" : "-10px auto 0 auto",
    columnGap: 15,
    zIndex: 999,
  }
  const menuOpenStyle: CSSProperties = {
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end", 
    margin: openMenu ? "28px 18px": 18,
    fontSize: 32,
    cursor: "pointer",
    zIndex: 1000,
  }
  const menuLogoWrapperStyle: CSSProperties = {
    display: "inline-block",
    width: 150,
    aspectRatio: "1",
    margin: "30px 0 10px",
  }
  const menuButtonStyle: CSSProperties = {
    textDecoration: "none",
    color: "var(--black)", 
    backgroundColor: "transparent",
    border: "none",
    fontSize: 18,
  }
  const menuContactStyle: CSSProperties = {
    padding: "15px 10px",
    gap: 15,
    fontSize: 16,
  }
  const menuLinkStyle: CSSProperties = {
    textDecoration: "none",
    color: "var(--black)", 
    fontSize: 16,
    margin: 0,
  }  

  return (<header id="header" className="fixed_center" style={headerStyle}>
    <div style={headerContainerStyle}>
      {/* Mobile hamburger menu button */}
      {(!isPC || !isHome) && <div style={menuOpenStyle} onClick={toMenu}>
        <img src={`/images/${openMenu ? "close": "menu"}.svg`} alt="open" loading="lazy" decoding="async" />
      </div>}
      {/* Logo and title (hidden when menu is open) */}
      {(!openMenu) && <Link href="/" style={{margin: (isPC && isHome) ? 0: "0 auto"}}>
        {(width > BREAKPOINT_HEADER_LOGO) && <ResponsiveImg src="/images/soleemare_icon.png" alt="ソレ・エ・マーレ" sizes="40px" wrapperStyle={headerLogoWrapperStyle} imgStyle={{}} />}
        <ResponsiveImg src="/images/soleemare.png" alt="ソレ・エ・マーレ" sizes="211px" wrapperStyle={headerTitleWrapperStyle} imgStyle={{}} />
      </Link>}
      {/* Navigation menu */}
      {(isPC || openMenu) && <div style={headerMenuStyle} >
        {/* Logo in mobile menu */}
        {(!isPC || openMenu) && <Link href="/">
          <ResponsiveImg src="/images/soleemare_logo.png" alt="ソレ・エ・マーレ" sizes="150px" wrapperStyle={menuLogoWrapperStyle} imgStyle={{}} />
        </Link>}
        {/* Navigation links (home page only) */}
        {isHome && myHeaderMenu.map((_, i) => <div style={{padding: "10px 0"}} key={`menu_link_${i}`}>
          <button style={menuButtonStyle} onClick={() => handleClick(i)}>
            {myHeaderMenu[i].title}
          </button>
        </div>)}
        {/* Mobile menu content */}
        {(openMenu) && <div style={{padding: "20px 0"}}>
          {/* SNS buttons */}
          <SNSButtons width={width}/>
          {/* Footer menu links */}
          <div style={menuContactStyle} className="flex_center_wrap">
            {myFooterMenu.map((_, j) => <div style={{padding: "5px 0"}} key={`footermenu_${j}`}>
              <Link style={menuLinkStyle} href={myFooterMenu[j].link} onClick={() => setOpenMenu(false)}>
                {myFooterMenu[j].title}
              </Link>  
            </div>)}
          </div>
          {/* Copyright notice */}
          <p style={{fontSize: 14, margin: 0}} key={"copyright"}>©Sole e Mare. ALL RIGHTS RESERVED.</p>
        </div>}
      </div>}
    </div>
  </header>);
}

export default Header
