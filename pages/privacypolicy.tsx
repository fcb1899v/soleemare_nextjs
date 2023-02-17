import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Head from '../components/Head'
import Splash from '../components/Splash'
import Header from '../components/Header'
import PrivacyPolicyBody from '../components/PrivacyPolicyBody'
import Footer from '../components/Footer'

const menu_titles: string[] = [
  "ホーム",
  "お問い合わせ",
  "プライバシーポリシー",
];

const menu_links: string[] = [
  "/",
  "contact",
  "/privacypolicy",
];

const menu_isinpages: boolean[] = [
  false,
  true,
  false,
];

const Policy: NextPage = () => {
  return (
    <div>
      <Head/>
      <main className={styles.main}>
        <Splash/>
        <Header titles={menu_titles} links={menu_links} isinpages={menu_isinpages}/>
        <PrivacyPolicyBody/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Policy