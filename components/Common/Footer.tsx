/**
 * Footer.tsx
 * 
 * Common footer component
 * 
 * Features:
 * - Displays logo and navigation links
 * - Social media buttons integration
 * - Mobile "back to top" button
 * - Responsive design for different screen sizes
 * - Copyright notice
 * 
 * Dependencies:
 * - SNSButtons component for social media links
 * - BlueBorder component for styling
 * - HomeConstant for footer menu data
 * - Next.js Link component for navigation
 */

import { NextPage } from 'next'
import { CSSProperties } from 'react';
import Link from 'next/link';
import SnsButtons from "./SNSButtons";
import BlueBorder from './BlueBorder';
import { myFooterMenu } from '../../utils/HomeConstant';

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props {
  width: number
}

/**
 * Footer component
 * Displays footer with logo, navigation, and social media links
 */
const Footer: NextPage<Props> = ({width}) => {
  
  // Responsive breakpoint detection
  const isSP = (width < 600);
  const isPC = (width > 1024);

  // Smooth scroll to top function
  const onScrollTop = () => window.scroll({ top: 0, behavior: 'smooth' });

  // Style definitions
  const footerToTopTextStyle: CSSProperties = {
    margin: 0,
    padding: "15px 0", 
    color: "var(--white)",
    textAlign: "center"
  }
  const footerLogoStyle: CSSProperties = {
    width: 120,
    paddingTop: isSP ? 20: 25,
  }
  const footerLinkStyle: CSSProperties = {
    color: "var(--black)", 
    textDecoration: "none",
    fontSize: 16,
    paddingTop: 5,
  }
  const footerCopyRightStyle: CSSProperties = {
    fontSize: 14,
    padding: "10px 0 30px 0",
  }

  return (<footer id="footer">
      {/* Mobile back to top button */}
      {isSP && <div style={{background: "linear-gradient(to bottom, var(--blue), var(--darkblue))"}} onClick={onScrollTop}>
        <h4 style={footerToTopTextStyle}>ページトップへ戻る</h4> 
      </div>}
      {/* Mobile border separator */}
      {isSP && <BlueBorder/>}
      {/* Footer content */}
      <div className={isSP ? "block": "flex_center"} style={{paddingTop: isSP ? 10: 0, columnGap: 50}}>
        {/* Logo */}
        <Link href="/"><img src="../images/soleemare_logo.png" alt="ソレ・エ・マーレ" style={footerLogoStyle}/></Link>
        <div style={{gap: 15, paddingTop: isSP ? 15: 30}}>
          {/* Social media buttons */}
          <SnsButtons width={width}/>
          {/* Footer navigation links */}
          <div className='flex_center_wrap' style={{columnGap: 15, padding: "5px 10px 0 10px"}}>
            {myFooterMenu.map((_, j) => <div style={{padding: "5px 0"}} key={`footermenu_${j}`}>
              <Link href={myFooterMenu[j].link} style={footerLinkStyle}>{myFooterMenu[j].title}</Link>  
            </div>)}
          </div>    
          {/* Copyright notice */}
          <li style={footerCopyRightStyle}>©Sole e Mare. ALL RIGHTS RESERVED.</li>
        </div>
      </div>
    </footer>
  );
};

export default Footer

// .toTop { background: var(--gray); }  
// .toTop h4 { padding: 15px 0; font-size: 18px !important; font-weight: normal; color:var(--white); }
