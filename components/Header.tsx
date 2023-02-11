import React, {useState, useEffect} from "react"
import styles from '../styles/Header.module.css'
import SnsButton from "./HomeSNSButton";

export default function Header() {

  const [openMenu, setOpenMenu] = useState(false);
  const toMenu = () => setOpenMenu(!openMenu);

  return <div id="header" className={styles.header}>
    <div className={styles.headerLogo}>
      <a href="#"><img src="../images/soleemare_icon.png" alt="ソレ・エ・マーレ"/></a>
      <a href="#" className={styles.headerTitle}><img src="../images/soleemare.png" alt="ソレ・エ・マーレ"/></a>
    </div>
    <div className={openMenu ? styles.openNone: undefined}>
      <div className={styles.open} onClick={toMenu}>
        <img src="../images/menu.svg" alt="open"/>
      </div>
    </div>
    <div className={openMenu ? styles.overlayShow: styles.overlayNone}>
      <div className={styles.close} onClick={toMenu}>
        <img src="../images/close.svg" alt="close"/>
      </div>
      <div className={styles.menu}>
        <div className={styles.menuLogo} onClick={toMenu}>
          <a href="#">
            <img src="../images/soleemare_logo.png" alt="ソレ・エ・マーレ"/>
          </a>
        </div>
        <div className={styles.menuList}>
          <li><a href="#" onClick={toMenu}>ホーム</a></li>
          {/* <li><a href="https://shop.sole-e-mare.com" onClick={toMenu}>オンラインショップ</a></li> */}
          <li><a href="#products" onClick={toMenu}>商品紹介</a></li>
          <li><a href="#features" onClick={toMenu}>当店のこだわり</a></li>
          <li><a href="#sns" onClick={toMenu}>SNS</a></li>  
        </div>
      </div>
      <div className={styles.snsList}>  
        <SnsButton alt="Instagram" icon="../sns/instagram_w.svg" link="https://www.instagram.com/soleemare_dolce/"/>
        <SnsButton alt="Twitter" icon="../sns/twitter_w.svg" link="https://twitter.com/soleemare_dolce"/>
        <SnsButton alt="Makuake" icon="../sns/makuake_logo.png" link="https://www.makuake.com/project/sole_e_mare/"/>
        <SnsButton alt="Line" icon="../sns/line_w.svg" link="https://lin.ee/65M8hVl"/>
        <SnsButton alt="Tiktok" icon="../sns/tiktok_w.svg" link="https://www.tiktok.com/@soleemare_dolce"/>
        {/* <SnsButton alt="Facebook" icon="../sns/facebook_w.svg" link="https://www.facebook.com/soleemaredolce"/> */}
        {/* <SnsButton alt="Mercari" icon="../sns/mercari_w.png" link="https://jp.mercari.com/"/> */}
      </div>
      <div className={styles.contact}>
        <li>e-mail : info@sole-e-mare.com</li>    
        <li>©Sole e Mare. ALL RIGHTS RESERVED.</li>
      </div>
    </div>
  </div>
}
