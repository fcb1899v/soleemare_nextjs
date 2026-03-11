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
 * - homeConstant for footer menu data
 * - Next.js Link component for navigation
 */

import { NextPage } from 'next'
import { CSSProperties } from 'react';
import Link from 'next/link';
import SnsButtons from "./SNSButtons";
import BlueBorder from './BlueBorder';
import { myFooterMenu } from '../../utils/homeConstant';
import { getBreakpointFlags } from '../../utils/commonConstant';
import { getImageBaseAndExt, getResponsiveSrcSet, LOGO_WIDTH } from '../../utils/imageUtils';

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
  
  const { isSP, isPC } = getBreakpointFlags(width);

  // Smooth scroll to top function
  const onScrollTop = () => window.scroll({ top: 0, behavior: 'smooth' });

  // Style definitions
  const footerToTopTextStyle: CSSProperties = {
    margin: 0,
    padding: "15px 0",
    color: "var(--white)",
    textAlign: "center",
  }
  const footerLogoWrapperStyle: CSSProperties = {
    display: "inline-block",
    width: 120,
    aspectRatio: "1",
    paddingTop: isSP ? 20 : 25,
  }
  const footerLogoImgStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
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
    margin: 0,
  }

  return (<footer id="footer">
      {/* Mobile back to top button */}
      {isSP && <div style={{background: "linear-gradient(to bottom, var(--blue), var(--darkblue))"}} onClick={onScrollTop}>
        <p className="content-like-h4" style={footerToTopTextStyle}>ページトップへ戻る</p> 
      </div>}
      {/* Mobile border separator */}
      {isSP && <BlueBorder/>}
      {/* Footer content */}
      <div className={isSP ? "block": "flex_center"} style={{paddingTop: isSP ? 10: 0, columnGap: 50}}>
        {/* Logo */}
        <Link href="/">
          {(() => {
            const logo = "/images/soleemare_logo.png";
            const { base, ext } = getImageBaseAndExt(logo);
            const w = [LOGO_WIDTH];
            return (
              <span style={footerLogoWrapperStyle}>
                <picture>
                  <source type="image/avif" srcSet={getResponsiveSrcSet(base, 'avif', w)} />
                  <source type="image/webp" srcSet={getResponsiveSrcSet(base, 'webp', w)} />
                  <img src={logo} srcSet={getResponsiveSrcSet(base, ext, w)} sizes="120px" alt="ソレ・エ・マーレ" style={footerLogoImgStyle} loading="lazy" decoding="async" />
                </picture>
              </span>
            );
          })()}
        </Link>
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
          <p style={footerCopyRightStyle}>©Sole e Mare. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer

// .toTop { background: var(--gray); }  
// .toTop h4 { padding: 15px 0; font-size: 18px !important; font-weight: normal; color:var(--white); }
