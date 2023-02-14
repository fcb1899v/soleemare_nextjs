import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import SnsButtons from "./SNSButtons";

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
