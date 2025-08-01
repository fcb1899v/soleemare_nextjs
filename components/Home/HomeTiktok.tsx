/**
 * HomeTiktok.tsx
 * 
 * Home page TikTok embed component
 * 
 * Features:
 * - Embeds TikTok creator profile widget
 * - Dynamic script loading for TikTok API
 * - Responsive design for different screen sizes
 * - SNS link integration
 * 
 * Dependencies:
 * - TikTok Embed API
 * - HomeSNSLink component for SNS navigation
 * - HomeConstant for SNS data
 */

import { NextPage } from 'next'
import { CSSProperties, useEffect, useState } from "react"
import HomeSNSLink from './HomeSNSTitle';
import { mySNS } from '../../utils/HomeConstant';

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props  {
  width: number
}

/**
 * HomeTiktok component
 * Displays embedded TikTok creator profile with SNS navigation
 */
const HomeTiktok: NextPage<Props> = ({width}) => {

  // Responsive breakpoint detection
  const isSP = (width < 600)
  const isPC = (width > 1024)

  // SNS index for TikTok
  const snsNumber = 4;

  // TikTok widget loading state
  const [isLoadwidgets, setLoadwidgets] = useState(false);

  /**
   * Embedded TikTok component
   * Loads TikTok embed script and renders creator profile
   */
  const EmbededTiktok = () => {
    useEffect(() => {
      if (!isLoadwidgets) {
        const s = document.createElement("script");
        s.setAttribute("src", "https://www.tiktok.com/embed.js");
        document.body.appendChild(s);
        setLoadwidgets(true);
      }
    }, []);
    return (
      <blockquote className="tiktok-embed" cite="https://www.tiktok.com/@sole_e_mare_dolce" data-unique-id="sole_e_mare_dolce" data-embed-type="creator">
        <section>
          <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@sole_e_mare_dolce?refer=creator_embed"></a> 
        </section> 
      </blockquote> 
    );
  };
  
  // Style definitions
  const tiktokStyle: CSSProperties = { 
    width: "100%",
    margin: "0 auto",
    padding: "30px 0 40px",
    color: "var(--black)",
    textShadow: "1px 2px 3px var(--white)",
    position: "relative",
    background: "linear-gradient(to right bottom, var(--yellow), var(--orange))",  
  }

  return (
    <div style={tiktokStyle}>
      {/* SNS navigation link */}
      <HomeSNSLink sns={mySNS[snsNumber]} isDark={true}/>
      {/* TikTok creator profile embed */}
      <EmbededTiktok/>
    </div>
  );
};

export default HomeTiktok
  
  