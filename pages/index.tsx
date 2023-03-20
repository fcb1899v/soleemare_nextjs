import type { NextPage } from 'next'
import styles from '../styles/Footer.module.css'
import Head from '../components/Head'
import Splash from '../components/Splash'
import HomeHeader from '../components/HomeHeader'
import HomeTop from '../components/HomeTop'
import HomeFeature from '../components/HomeFeature'
import HomeProduct from '../components/HomeProduct'
import HomeSNS from '../components/HomeInfo'
import Footer from '../components/Footer'
import ShopifyButton from '../components/ShopifyButton'

const Main: NextPage = () => {
  return (
    <div lang={"ja"}>
      <Head/>
      <main className={styles.main}>
        <Splash/>
        <HomeHeader/>
        <HomeTop/>
        <HomeProduct/>
        {/* <ShopifyButton num={0}/> */}
        <HomeFeature/>
        {/* <ShopifyButton num={0}/> */}
        <HomeSNS/>
        {/* <ShopifyButton num={0}/> */}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Main