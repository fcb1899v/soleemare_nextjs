import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Head from '../components/Head'
import Splash from '../components/Splash'
import Header from '../components/Header'
import HomeTop from '../components/HomeTop'
import HomeFeature from '../components/HomeFeature'
import HomeProduct from '../components/HomeProduct'
import HomeSNS from '../components/HomeInfo'
import Footer from '../components/Footer'

const menu_titles: string[] = [
  "ホーム",
  "商品紹介",
  "当店のこだわり",
  "お知らせ",
  "プライバシーポリシー",
];

const menu_links: string[] = [
  "/",
  "products",
  "features",
  "info",
  "/privacypolicy",
];

const menu_isinpages: boolean[] = [
  false,
  true,
  true,
  true,
  false,
];


const Main: NextPage = () => {
  return (
    <div>
      <Head/>
      <main className={styles.main}>
        <Splash/>
        <Header titles={menu_titles} links={menu_links} isinpages={menu_isinpages}/>
        <HomeTop/>
        <HomeProduct/>
        <HomeFeature/>
        <HomeSNS/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Main