import { NextPage } from 'next'
import React, { useEffect } from "react"
import styles from '/styles/Info.module.css'
import HomeSNSLink from './HomeSNSLink';

let isLoadwidgets = false;
export const EmbededTiktok = () => {
  useEffect(() => {
    if (!isLoadwidgets) {
      const s = document.createElement("script");
      s.setAttribute("src", "https://www.tiktok.com/embed.js");
      document.body.appendChild(s);
      isLoadwidgets = true;
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

const HomeTiktok: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.border__yellow}>
        <div className={styles.box}>
          <div className={styles.title}>
            <h2>Tiktok</h2>
            <HomeSNSLink href="https://www.tiktok.com/@sole_e_mare_dolce" src="../sns/tiktok_b.svg" alt="Tiktok"/>
          </div>
          <EmbededTiktok/>
        </div>
      </div>
    </div>
  );
};

export default HomeTiktok
  
  