import type {NextPage} from 'next'
import { GA_ID } from '../lib/gtag'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Splash from '../components/Splash'
import Header from '../components/Header'
import HomeTop from '../components/HomeTop'
import HomeFeature from '../components/HomeFeature'
import HomeProduct from '../components/HomeProduct'
import HomeSNS from '../components/HomeSNS'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  return (
    
    <div className={styles.container}>

      <Head>
        <title>ソレ・エ・マーレ Sole e Mare</title>
        <meta name="description" content="ソレ・エ・マーレ Sole e Mare" />
        <link rel="icon" href="../favicons/favicon.ico" />
      {/* Google Analytics */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });`,
              }}
            />
          </>
        )}
      </Head>

      <main className={styles.main}>
        <Splash/>
        <Header/>
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

export default Home