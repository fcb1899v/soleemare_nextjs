import type { NextPage } from 'next'
import Head from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import Header from '../components/Common/Header'
import HomeTop from '../components/Home/HomeTop'
import HomeProduct from '../components/Home/HomeProduct'
import HomeFeature from '../components/Home/HomeFeature'
import HomeSNS from '../components/Home/HomeInfo'
import HomeShopify from '../components/Home/HomeShopify'
import Footer from '../components/Common/Footer'
import BlueBorder from '../components/Common/BlueBorder'
import { shopifyItems } from '../utils/HomeConstant'
import { useWindowSize } from '../utils/HomeFunction'

const Main: NextPage = () => {

  return (<div lang={"ja"}>
    <Head/>
    <Splash/>
    <Header width={useWindowSize()[0]} isHome={true}/>
    <main style={{marginTop: 60}}>
      <HomeTop width={useWindowSize()[0]}/>
      <BlueBorder/>
      <HomeProduct width={useWindowSize()[0]}/>
      <BlueBorder/>
      <HomeShopify width={useWindowSize()[0]} item={shopifyItems[0]}/>
      <HomeFeature width={useWindowSize()[0]}/>
      <BlueBorder/>
      <HomeShopify width={useWindowSize()[0]} item={shopifyItems[0]}/>
      <HomeSNS width={useWindowSize()[0]}/>
      <HomeShopify width={useWindowSize()[0]} item={shopifyItems[0]}/>
    </main>
    <Footer width={useWindowSize()[0]}/>
  </div>)
}

export default Main