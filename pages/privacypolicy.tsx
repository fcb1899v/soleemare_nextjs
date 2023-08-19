import type { NextPage } from 'next'
import Head from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import Header from '../components/Common/Header'
import PolicyBody from '../components/PrivacyPolicy/PolicyBody'
import Footer from '../components/Common/Footer'
import BlueBorder from '../components/Common/BlueBorder'
import { useWindowSize } from '../utils/HomeFunction'

const PrivacyPolicy: NextPage = () => (<div>
  <Head/>
  <Splash/>
  <Header width={useWindowSize()[0]} isHome={false}/>
  <main><PolicyBody width={useWindowSize()[0]}/></main>
  <BlueBorder/>
  <Footer width={useWindowSize()[0]}/>
</div>)

export default PrivacyPolicy