import type { NextPage } from 'next'
import styles from '../styles/Footer.module.css'
import Head from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import PrivacyPolicyBody from '../components/PrivacyPolicy/PrivacyPolicyBody'
import Footer from '../components/Common/Footer'
import PrivacyPolicyHeader from '../components/PrivacyPolicy/PrivacyPolicyHeader'

const Policy: NextPage = () => {
  return (
    <div>
      <Head/>
      <main className={styles.main}>
        <Splash/>
        <PrivacyPolicyHeader/>
        <PrivacyPolicyBody/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Policy