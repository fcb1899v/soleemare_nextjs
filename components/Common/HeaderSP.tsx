import { NextPage } from "next"
import React, {useState} from "react"
import styles from '/styles/Header.module.css'
import SnsButtons from "./SNSButtons";
import Link from "next/link";
import LinkButton from "./LinkButton";

interface Props  {
  titles: string[]
  links: string[] 
  isInpages: boolean[]
}

const HeaderSP: NextPage<Props> = ({titles, links, isInpages}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const toMenu = () => setOpenMenu(!openMenu);
  const menu_links = [];
  if (titles.length > 0) {
    for (let i = 0; i < titles.length; i++) {
      menu_links.push(
        <li onClick={toMenu} key={"headersp_menu_" + i}>
          <LinkButton title={titles[i]} link={links[i]} isInpage={isInpages[i]} key={`linksp_${i}`}/>
        </li>
      )
    }  
  }
  return (<div id="header" className={styles.header}>
    <div>
      <div className={styles.headerLogo}>
        <Link href="/">
          <img src="../images/soleemare_icon.png" alt="ソレ・エ・マーレ"/>
          <img src="../images/soleemare.png" alt="ソレ・エ・マーレ"/>
        </Link>
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
          <Link href="/">
            <img src="../images/soleemare_logo.png" alt="ソレ・エ・マーレ"/>
          </Link>
        </div>
        <div className={styles.menuList}>
          {menu_links}
        </div>
      </div>
      <SnsButtons/>
      <div className={styles.contact}>
        <li key={"e-mail"}>e-mail : info@sole-e-mare.com</li>    
        <li key={"copyright"}>©Sole e Mare. ALL RIGHTS RESERVED.</li>
      </div>
    </div>
  </div>);
}

export default HeaderSP
