import type { NextPage } from 'next'
import styles from '../styles/Footer.module.css'
import Head from '../components/Head'
import Splash from '../components/Splash'
import InquaryHeader from '../components/InquiryHeader'
import InquaryBody from '../components/InquiryBody'
import Footer from '../components/Footer'

const Inquiry: NextPage = () => {
  return (
    <div>
      <Head/>
      <main className={styles.main}>
        <Splash/>
        <InquaryHeader/>
        <InquaryBody/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Inquiry