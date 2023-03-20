import { NextPage } from 'next'
import Link from 'next/link';
import styles from '../styles/Footer.module.css'
import SnsButtons from "./SNSButtons";

const Footer: NextPage = () => {
  const onScrollTop = () => window.scroll({ top: 0, behavior: 'smooth' });
  return (
    <div id="footer" className={styles.footer}>
      <div className={styles.toTop} onClick={onScrollTop}>
        <h4>ページトップへ戻る</h4> 
      </div>
      <div className={styles.footer_container}>
        <div className={styles.footer_logo}>
          <Link href="/"><img src="../images/soleemare_logo.png" alt="ソレ・エ・マーレ"/></Link>
        </div>
        <div className={styles.footer_info}>
          <SnsButtons/>
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
