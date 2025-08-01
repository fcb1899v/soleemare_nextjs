/**
 * HomeTwitter.tsx
 * 
 * Home page Twitter timeline component
 * 
 * Features:
 * - Embeds Twitter timeline widget
 * - Dynamic script loading for Twitter API
 * - Responsive design for different screen sizes
 * - SNS link integration
 * 
 * Dependencies:
 * - Twitter Widgets API
 * - HomeSNSLink component for SNS navigation
 * - BlueBorder component for styling
 * - HomeConstant for SNS data
 */

import { NextPage } from 'next'
import Link from 'next/link';
import { CSSProperties, useEffect, useState } from "react"
import HomeSNSLink from './HomeSNSTitle';
import { mySNS } from '../../utils/HomeConstant';
import BlueBorder from '../Common/BlueBorder';

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props  {
  width: number
}

/**
 * HomeTwitter component
 * Displays embedded Twitter timeline with SNS navigation
 */
const HomeTwitter: NextPage<Props> = ({width}) => {

  // Responsive breakpoint detection
  const isSP = (width < 600)
  const isPC = (width > 1024)

  // SNS index for Twitter
  const snsNumber = 0

  // Twitter widget loading state
  const [isLoadwidgets, setIsLoad] = useState(false);
  
  // Load Twitter widgets script dynamically
  useEffect(() => {
    if (!isLoadwidgets) {
      const s = document.createElement("script");
      s.setAttribute("src", "https://platform.twitter.com/widgets.js");
      s.setAttribute("async", "");
      document.body.appendChild(s);
      setIsLoad(true);
    }
  }, [isLoadwidgets]);

  // Style definitions
  const twitterStyle: CSSProperties = {
    width: "100%",
    margin: "0 auto",
    padding: "30px 0 40px",
    color: "var(--white)",
    textShadow: "1px 2px 3px var(--black)",
    position: "relative",
    background: "linear-gradient(to right bottom, var(--blue), var(--darkblue))", 
  }

  return (<div>
    <div style={twitterStyle}>
      {/* SNS navigation link */}
      <HomeSNSLink sns={mySNS[snsNumber]} isDark={false}/>
      {/* Twitter timeline embed */}
      <Link className="twitter-timeline" 
        data-height="1480" 
        data-theme="light" 
        data-lang="ja"
        data-conversation="none"
        data-align="center"
        data-chrome="noheader nofooter noborders"
        href="https://twitter.com/soleemare_dolce?ref_src=twsrc%5Etfw"
      />
    </div>
    <BlueBorder/>
  </div>);
};  

export default HomeTwitter