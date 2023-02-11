import { NextPage } from 'next'
import React, { useEffect, useState } from "react"
import styles from '../styles/HomeInfo.module.css'


const HomeTwitter: NextPage = () => {

  const [isLoadwidgets, setIsLoad] = useState(false);

  useEffect(() => {
    if (!isLoadwidgets) {
      const s = document.createElement("script");
      s.setAttribute("src", "https://platform.twitter.com/widgets.js");
      document.body.appendChild(s)
      setIsLoad(true);
    }
  }, [isLoadwidgets]);

  return (
    <div className={styles.container}>
      <div className={styles.border__blue}>
        <div className={styles.box}>
          <div className={styles.title}>
            <h2>Twitter</h2>
            <a className={styles.snsIcon} href="https://twitter.com/soleemare_dolce">
              <img src="../sns/twitter_w.svg" alt="Twitter"/>
            </a>
          </div>
          <div className={(isLoadwidgets) ? styles.twitter_box: styles.twitter_box_none}>
            <a 
              className="twitter-timeline" 
              data-height="800"
              href="https://twitter.com/soleemare_dolce?ref_src=twsrc%5Etfw">
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default HomeTwitter