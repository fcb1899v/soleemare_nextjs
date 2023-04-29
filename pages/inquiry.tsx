import type { NextPage } from 'next'
import styles from '../styles/Footer.module.css'
import Head from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import InquaryHeader from '../components/Inquiry/InquiryHeader'
import InquaryBody from '../components/Inquiry/InquiryBody'
import Footer from '../components/Common/Footer'

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