import { NextPage } from 'next'
import Link from 'next/link';
import { CSSProperties, useEffect, useState } from "react"
import HomeSNSLink from './HomeSNSTitle';
import { mySNS } from '../../utils/HomeConstant';
import BlueBorder from '../Common/BlueBorder';

interface Props  {
  width: number
}

const HomeTwitter: NextPage<Props> = ({width}) => {

  const isSP = (width < 600)
  const isPC = (width > 1024)

  const snsNumber = 0

  const [isLoadwidgets, setIsLoad] = useState(false);
  useEffect(() => {
    if (!isLoadwidgets) {
      const s = document.createElement("script");
      s.setAttribute("src", "https://platform.twitter.com/widgets.js");
      s.setAttribute("async", "");
      document.body.appendChild(s);
      setIsLoad(true);
    }
  }, [isLoadwidgets]);

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
      <HomeSNSLink sns={mySNS[snsNumber]} isDark={false}/>
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