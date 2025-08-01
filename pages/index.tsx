/**
 * pages/index.tsx
 * 
 * Home page component
 * 
 * Features:
 * - Main landing page layout
 * - Responsive design with window size detection
 * - Component composition for different sections
 * - Shopify integration for product display
 * - SNS feeds integration
 * 
 * Dependencies:
 * - Common components (Head, Splash, Header, Footer, BlueBorder)
 * - Home components (HomeTop, HomeProduct, HomeFeature, HomeSNS, HomeShopify)
 * - HomeConstant for Shopify product data
 * - HomeFunction for window size detection
 */

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

/**
 * Main component
 * Home page with all sections and components
 */
const Main: NextPage = () => {

  return (<div lang={"ja"}>
    {/* SEO and meta tags */}
    <Head/>
    {/* Loading splash screen */}
    <Splash/>
    {/* Navigation header */}
    <Header width={useWindowSize()[0]} isHome={true}/>
    {/* Main content area */}
    <main style={{marginTop: 60}}>
      {/* Hero section with carousel */}
      <HomeTop width={useWindowSize()[0]}/>
      <BlueBorder/>
      {/* Product showcase section */}
      <HomeProduct width={useWindowSize()[0]}/>
      <BlueBorder/>
      {/* Shopify product section */}
      <HomeShopify width={useWindowSize()[0]} item={shopifyItems[0]}/>
      {/* Features section */}
      <HomeFeature width={useWindowSize()[0]}/>
      <BlueBorder/>
      {/* Additional Shopify product section */}
      <HomeShopify width={useWindowSize()[0]} item={shopifyItems[0]}/>
      {/* SNS and information section */}
      <HomeSNS width={useWindowSize()[0]}/>
      {/* Final Shopify product section */}
      <HomeShopify width={useWindowSize()[0]} item={shopifyItems[0]}/>
    </main>
    {/* Footer with navigation and social links */}
    <Footer width={useWindowSize()[0]}/>
  </div>)
}

export default Main