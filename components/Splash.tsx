import { NextPage } from "next";
import React, {useState, useEffect} from "react"
import styles from '../styles/Header.module.css'

const Splash: NextPage = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [isVanish, setIsVanish] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false)
      setTimeout(() => {setIsVanish(true)}, 3000);
    }, 3000);
  }, []);
  return <div className={isVanish ? styles.vanish: isLoad ? styles.loading: styles.loaded}>
    <img src="../images/soleemare_logo.png" alt="Sole e Mare"/>
  </div>  
}

export default Splash


