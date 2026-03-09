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
 * - homeConstant for Shopify product data
 * - useLayout (useWindowSize) for window size detection
 */

import type { NextPage } from 'next'
import Head from 'next/head'
import PageHead from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import Header from '../components/Common/Header'
import HomeTop from '../components/Home/HomeTop'
import HomeProduct from '../components/Home/HomeProduct'
import HomeFeature from '../components/Home/HomeFeature'
import HomeSNS from '../components/Home/HomeInfo'
import HomeShopify from '../components/Home/HomeShopify'
import Footer from '../components/Common/Footer'
import BlueBorder from '../components/Common/BlueBorder'
import { shopifyItems } from '../utils/homeConstant'
import { useWindowSize } from '../hooks/useLayout'

/**
 * Main component
 * Home page with all sections and components
 */
const Main: NextPage = () => {
  const width = useWindowSize()[0]

  return (<div lang={"ja"}>
    {/* SEO and meta tags */}
    <PageHead />
    {/* Preload LCP carousel images with high fetch priority */}
    <Head>
      <link rel="preload" as="image" href="/images/sfogliatella_pc.jpg" fetchPriority="high" media="(min-width: 600px)" />
      <link rel="preload" as="image" href="/images/sfogliatella_mobile.jpg" fetchPriority="high" media="(max-width: 599px)" />
    </Head>
    {/* Loading splash screen */}
    <Splash/>
    {/* Navigation header */}
    <Header width={width} isHome={true}/>
    {/* Main content area */}
    <main style={{marginTop: 60}}>
      {/* Hero section with carousel */}
      <HomeTop width={width}/>
      <BlueBorder/>
      {/* Product showcase section */}
      <HomeProduct width={width}/>
      <BlueBorder/>
      {/* Shopify product section */}
      <HomeShopify width={width} item={shopifyItems[0]}/>
      {/* Features section */}
      <HomeFeature width={width}/>
      <BlueBorder/>
      {/* Additional Shopify product section */}
      <HomeShopify width={width} item={shopifyItems[0]}/>
      {/* SNS and information section */}
      <HomeSNS width={width}/>
      {/* Final Shopify product section */}
      <HomeShopify width={width} item={shopifyItems[0]}/>
    </main>
    {/* Footer with navigation and social links */}
    <Footer width={width}/>
  </div>)
}

export default Main