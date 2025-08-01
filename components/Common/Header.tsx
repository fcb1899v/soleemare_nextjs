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
 * - HomeConstant for menu data
 * - Next.js Link component for navigation
 */

import { NextPage } from "next"
import Link from "next/link";
import { CSSProperties, useState } from "react";
import { myFooterMenu, myHeaderMenu } from "../../utils/HomeConstant";
import SNSButtons from "./SNSButtons";

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
  
  // Responsive breakpoint detection
  const isSP = (width < 600)
  const isPC = (width > 1024)

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
  const headerLogoStyle: CSSProperties = { 
    height: 40,
    margin: "10px 10px 10px 0",
  }
  const headerTitleStyle: CSSProperties = {
    height: 35,
    margin: 10,
    padding: (width > 360) ? 0: "5px 0 0 20px", 
  }
  const headerMenuStyle: CSSProperties = {
    display: (isPC && isHome) ? "flex": "block", 
    height: "100vh",
    backgroundColor: !openMenu ? "transparent": "rgba(244, 245, 240, 0.95)",
    paddingTop: (isPC && isHome) ? 15: 50,
    margin: (isPC && isHome) ? "0 100px 0 auto": "-10px auto 0 auto",
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
  const menuLogoStyle: CSSProperties = {
    width: 150, 
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
        <img src={`/images/${openMenu ? "close": "menu"}.svg`} alt="open"/>
      </div>}
      {/* Logo and title (hidden when menu is open) */}
      {(!openMenu) && <Link href="/" style={{margin: (isPC && isHome) ? 0: "0 auto"}}>
        {(width > 360) && <img style={headerLogoStyle} src="../images/soleemare_icon.png" alt="ソレ・エ・マーレ"/>}
        <img style={headerTitleStyle} src="../images/soleemare.png" alt="ソレ・エ・マーレ"/>
      </Link>}
      {/* Navigation menu */}
      {(isPC || openMenu) && <div style={headerMenuStyle} >
        {/* Logo in mobile menu */}
        {(!isPC || openMenu) && <Link href="/">
          <img style={menuLogoStyle} src="../images/soleemare_logo.png" alt="ソレ・エ・マーレ"/>
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
          <li style={{fontSize: 14}} key={"copyright"}>©Sole e Mare. ALL RIGHTS RESERVED.</li>
        </div>}
      </div>}
    </div>
  </header>);
}

export default Header
