import { NextPage } from 'next'
import Link from 'next/link';
import React, { useEffect, useState } from "react"
import styles from '/styles/Info.module.css'
import HomeSNSLink from './HomeSNSLink';

const HomeTwitter: NextPage = () => {
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
  return (
    <div className={styles.container}>
      <div className={styles.border__blue}>
        <div className={styles.box}>
          <HomeSNSLink href="https://twitter.com/soleemare_dolce" src="../sns/twitter_w.svg" alt="Twitter"/>
          <div className={(isLoadwidgets) ? styles.twitter_box: styles.twitter_box_none}>
            <Link className="twitter-timeline" 
              data-height="1150" 
              data-theme="light" 
              data-lang="ja"
              data-conversation="none"
              data-align="center"
              data-chrome="noheader nofooter noborders"
              href="https://twitter.com/soleemare_dolce?ref_src=twsrc%5Etfw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};  

export default HomeTwitter