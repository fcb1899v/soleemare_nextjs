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
import ShopifyProduct from '../components/ShopifyProduct'

const sfogliatellaID = `${process.env.NEXT_PUBLIC_SHOPIFY_SFOGLIATELLA_ID}`

const Main: NextPage = () => {
  return (
    <div lang={"ja"}>
      <Head/>
      <main className={styles.main}>
        <Splash/>
        <HomeHeader/>
        <HomeTop/>
        <HomeProduct/>
        <ShopifyProduct id={sfogliatellaID} unit='箱' variantNumber={0}/>
        <HomeFeature/>
        <ShopifyProduct id={sfogliatellaID} unit='箱' variantNumber={0}/>
        <HomeSNS/>
        <ShopifyProduct id={sfogliatellaID} unit='箱' variantNumber={0}/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Main