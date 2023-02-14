import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Splash from '../components/Splash'
import PrivacyHeader from '../components/PrivacyPolicyHeader'
import HomeHead from '../components/Head'
import PrivacyPolicyBody from '../components/PrivacyPolicyBody'
import Footer from '../components/Footer'

const Policy: NextPage = () => {
  return (
    <div>
      <HomeHead/>
      <main className={styles.main}>
        <Splash/>
        <PrivacyHeader/>
        <PrivacyPolicyBody/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Policy