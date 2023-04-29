import { NextPage } from "next"
import React from "react"
import styles from '/styles/Header.module.css'
import Link from "next/link";
import LinkButton from "./LinkButton";

interface Props {
  titles: string[]
  links: string[] 
  isInpages: boolean[]
}

const HeaderPC: NextPage<Props> = ({titles, links, isInpages}) => {

  const menu_links = [];
  if (titles.length > 0) {
    for (let i = 0; i < titles.length; i++) {
      menu_links.push(<LinkButton title={titles[i]} link={links[i]} isInpage={isInpages[i]} key={`linkpc_${i}`}/>)
    }  
  }

  return (<div id="header" className={styles.header}>
    <div>
      <div className={styles.headerLogo}>
        <Link href="/"><img src="../images/soleemare_icon.png" alt="ソレ・エ・マーレ"/></Link>
        <Link href="/" className={styles.headerTitle}><img src="../images/soleemare.png" alt="ソレ・エ・マーレ"/></Link>
        <div className={styles.menuList}>
          {menu_links}
        </div>
      </div>
    </div>
  </div>);
}

export default HeaderPC
