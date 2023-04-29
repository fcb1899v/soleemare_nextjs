import type { NextPage } from 'next'
import styles from '../styles/Footer.module.css'
import Head from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import HomeHeader from '../components/Home/HomeHeader'
import HomeProduct from '../components/Home/HomeProduct/HomeProduct'
import HomeFeature from '../components/Home/HomeFeature/HomeFeature'
import HomeSNS from '../components/Home/HomeInfo/HomeInfo'
import Footer from '../components/Common/Footer'
import ShopifyProduct from '../components/ShopifyProduct'
import HomeTop from '../components/Home/HomeTop/HomeTop'

const ids = [`${process.env.NEXT_PUBLIC_SHOPIFY_SFOGLIATELLA_ID}`];
const variants = [0]
const images = [0]

const Main: NextPage = () => {
  return (
    <div lang={"ja"}>
      <Head/>
      <main className={styles.main}>
        <Splash/>
        <HomeHeader/>
        <HomeTop/>
        <HomeProduct/>
        <ShopifyProduct id={ids[0]} unit='箱' variantNumber={variants[0]}/>
        <HomeFeature/>
        <ShopifyProduct id={ids[0]} unit='箱' variantNumber={variants[0]}/>
        <HomeSNS/>
        <ShopifyProduct id={ids[0]} unit='箱' variantNumber={variants[0]}/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Main