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
 * - homeConstant for SNS data
 */

import { NextPage } from 'next'
import Link from 'next/link';
import { CSSProperties, useEffect, useRef, useState } from "react"
import HomeSNSLink from './HomeSNSTitle';
import { mySNS } from '../../utils/homeConstant';
import { getBreakpointFlags } from '../../utils/commonConstant';
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

  const { isSP, isPC } = getBreakpointFlags(width)

  // SNS index for Twitter
  const snsNumber = 0

  // Load Twitter widgets script only when this section is near viewport (reduces initial payload)
  const [shouldLoadWidget, setShouldLoadWidget] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoadWidget(true);
      },
      { rootMargin: '200px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadWidget) return;
    if (document.querySelector('script[src*="platform.twitter.com/widgets.js"]')) return;
    const s = document.createElement('script');
    s.src = 'https://platform.twitter.com/widgets.js';
    s.async = true;
    document.body.appendChild(s);
  }, [shouldLoadWidget]);

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

  return (<div ref={containerRef}>
    <div style={twitterStyle}>
      {/* SNS navigation link */}
      <HomeSNSLink sns={mySNS[snsNumber]} isDark={false}/>
      {/* Twitter timeline embed */}
      <Link
        className="twitter-timeline"
        data-height="1480"
        data-theme="light"
        data-lang="ja"
        data-conversation="none"
        data-align="center"
        data-chrome="noheader nofooter noborders"
        href="https://twitter.com/soleemare_dolce?ref_src=twsrc%5Etfw"
        aria-label="Sole e Mare の Twitter タイムライン（@soleemare_dolce）"
      />
    </div>
    <BlueBorder/>
  </div>);
};  

export default HomeTwitter