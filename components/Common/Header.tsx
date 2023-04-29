import { NextPage } from "next"
import React, {useEffect, useState} from "react"
import styles from '/styles/Header.module.css'
import HeaderPC from "./HeaderPC";
import HeaderSP from "./HeaderSP";

interface Props {
  titles: string[]
  links: string[]
  isinpages: boolean[]
}

const Header: NextPage<Props> = ({ titles, links, isinpages }) => {
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
  return (<div id="header" className={styles.header}>
    {
      windowSize.width < 960 ? 
      <HeaderSP titles={titles} links={links} isInpages={isinpages}/> :
      <HeaderPC titles={titles} links={links} isInpages={isinpages}/>
    }
  </div>);
}

export default Header
