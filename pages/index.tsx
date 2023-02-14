import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Splash from '../components/Splash'
import HomeHeader from '../components/HomeHeader'
import HomeHead from '../components/Head'
import HomeTop from '../components/HomeTop'
import HomeFeature from '../components/HomeFeature'
import HomeProduct from '../components/HomeProduct'
import HomeSNS from '../components/HomeInfo'
import Footer from '../components/Footer'

const Main: NextPage = () => {
  return (
    <div>
      <HomeHead/>
      <main className={styles.main}>
        <Splash/>
        <HomeHeader/>
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