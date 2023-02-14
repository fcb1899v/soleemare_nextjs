import { NextPage } from "next"
import React, {useEffect, useState} from "react"
import styles from '../styles/Header.module.css'
import SnsButtons from "./SNSButtons";
import Link from "next/link";

const menu_titles: string[] = [
  "ホーム",
  "商品紹介",
  "当店のこだわり",
  "お知らせ",
  "お問い合せ",
  "プライバシーポリシー",
];

const menu_urls: string[] = [
  "#",
  "#products",
  "#features",
  "#info",
  "#footer",
  "privacypolicy",
];

const HomeHeader: NextPage = () => {

  const [windowSize, setWindowSize] = useState({width: 0, height: 0});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {setWindowSize({ 
        width: window.innerWidth,
        height: window.innerHeight,
      });};
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    } else {
      return;
    }
  }, []);

  const [openMenu, setOpenMenu] = useState(false);
  const toMenu = () => setOpenMenu(!openMenu);

  const menu_links = [];
  for (let i = 0; i < menu_titles.length; i++) {
    menu_links.push(<li><Link href={menu_urls[i]} onClick={windowSize.width < 960 ? toMenu: undefined}>{menu_titles[i]}</Link></li>)
  }

  return (<div id="header" className={styles.header}>
    <div>
      <div className={styles.headerLogo}>
        <Link href="/"><img src="../images/soleemare_icon.png" alt="ソレ・エ・マーレ"/></Link>
        <Link href="/" className={styles.headerTitle}><img src="../images/soleemare.png" alt="ソレ・エ・マーレ"/></Link>
        <div className={styles.menuList__pc}>
          {menu_links}
        </div>
      </div>
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
          <Link href="#"><img src="../images/soleemare_logo.png" alt="ソレ・エ・マーレ"/></Link>
        </div>
        <div className={styles.menuList}>
          {menu_links}
        </div>
      </div>
      <SnsButtons/>
      <div className={styles.contact}>
        <li>e-mail : info@sole-e-mare.com</li>    
        <li>©Sole e Mare. ALL RIGHTS RESERVED.</li>
      </div>
    </div>
  </div>);
}

export default HomeHeader
