/**
 * HomeInfo.tsx
 * 
 * Home page information and SNS section component
 * 
 * Features:
 * - Displays information messages in styled table
 * - Integrates multiple SNS components (Instagram, Twitter, TikTok)
 * - Responsive design for different screen sizes
 * - Styled message container with background
 * 
 * Dependencies:
 * - HomeTitle component for section titles
 * - HomeInstagram component for Instagram feed
 * - HomeTwitter component for Twitter timeline
 * - HomeTiktok component for TikTok content (commented out)
 * - HomeConstant for information data
 */

import { NextPage } from 'next'
import HomeTitle from '../Common/Title'
import HomeInstagram from './HomeInstagram'
import HomeTwitter from './HomeTwitter'
import HomeTiktok from './HomeTiktok'
import { CSSProperties } from 'react'
import { infoMessage } from '../../utils/HomeConstant'

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props  {
  width: number
}

/**
 * HomeSNS component
 * Displays information messages and SNS feeds
 */
const HomeSNS: NextPage<Props> = ({width}) => {

  // Responsive breakpoint detection
  const isSP = (width < 600)
  const isPC = (width > 1024)

  // Style definitions
  const borderStyle: CSSProperties = {
    maxWidth: 700,
    position: "relative", 
    padding: 5,
    margin: "10px auto 50px", 
    width: "Calc(100% - 30px)",
    background: "linear-gradient(to right bottom, var(--blue), var(--darkblue))",
  }
  const messageStyle: CSSProperties = { 
    fontSize: 18, 
    color: "var(--black)", 
    backgroundImage: "linear-gradient(var(--transpgray), var(--transpgray)), url('/images/wave_blue.png')",
    margin: 1.5,
    padding: 10,
    textAlign: "left"
  }
  
  return (
    <section id="info">
      {/* Information section title */}
      <HomeTitle width={width} title={["お知らせ", "Comunicazione"]} index={0}/>
      {/* Information messages container */}
      <div style={borderStyle}>
        <div style={messageStyle}>
          <table>
            <tbody>
              {/* Information messages table */}
              {infoMessage.map((value: string, i: number) => 
                <tr key={i}><td>{value}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* SNS feeds section */}
      <div>
        <HomeInstagram width={width}/>
        <HomeTwitter width={width}/>
        {/* <HomeTiktok width={width}/> */}
      </div>
    </section>
  );
};

export default HomeSNS
  
  