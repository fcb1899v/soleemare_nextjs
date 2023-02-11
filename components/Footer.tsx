import { NextPage } from 'next'
import SnsButton from "./HomeSNSButton";
import styles from '../styles/Home.module.css'

const Footer: NextPage = () => {
    return (
    <div id="footer" className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_logo}>
          <a href="index.html">
            <img src="../images/soleemare_logo.png" alt="ソレ・エ・マーレ"/>
          </a>
        </div>
        <div className={styles.footer_info}>
          <nav className={styles.sns_list}>  
            <SnsButton alt="Instagram" icon="../sns/instagram_w.svg" link="https://www.instagram.com/soleemare_dolce/"/>
            <SnsButton alt="Twitter" icon="../sns/twitter_w.svg" link="https://twitter.com/soleemare_dolce"/>
            <SnsButton alt="Makuake" icon="../sns/makuake_logo.png" link="https://www.makuake.com/project/sole_e_mare/"/>
            <SnsButton alt="Line" icon="../sns/line_w.svg" link="https://lin.ee/65M8hVl"/>
            <SnsButton alt="Tiktok" icon="../sns/tiktok_w.svg" link="https://www.tiktok.com/@soleemare_dolce"/>
            {/* <SnsButton alt="Facebook" icon="../sns/facebook_w.svg" link="https://www.facebook.com/soleemaredolce"/> */}
            {/* <SnsButton alt="Mercari" icon="../sns/mercari_w.png" link="https://jp.mercari.com/"/> */}
          </nav>
          <div className={styles.contact}>
            <li>e-mail : info@sole-e-mare.com</li>    
            <li>©Sole e Mare. ALL RIGHTS RESERVED.</li>
          </div>    
        </div>
      </div>
    </div>
  );
};

export default Footer
