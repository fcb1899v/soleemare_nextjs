/**
 * pages/privacypolicy.tsx
 * 
 * Privacy policy page component
 * 
 * Features:
 * - Privacy policy and terms of service page layout
 * - Responsive design with window size detection
 * - Common header and footer integration
 * - Policy content component integration
 * 
 * Dependencies:
 * - Common components (Head, Splash, Header, Footer, BlueBorder)
 * - PolicyBody component for privacy policy content
 * - HomeFunction for window size detection
 */

import type { NextPage } from 'next'
import Head from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import Header from '../components/Common/Header'
import PolicyBody from '../components/PrivacyPolicy/PolicyBody'
import Footer from '../components/Common/Footer'
import BlueBorder from '../components/Common/BlueBorder'
import { useWindowSize } from '../utils/HomeFunction'

/**
 * PrivacyPolicy component
 * Privacy policy page with content and common layout elements
 */
const PrivacyPolicy: NextPage = () => (<div>
  {/* SEO and meta tags */}
  <Head/>
  {/* Loading splash screen */}
  <Splash/>
  {/* Navigation header (not home page) */}
  <Header width={useWindowSize()[0]} isHome={false}/>
  {/* Privacy policy content */}
  <main><PolicyBody width={useWindowSize()[0]}/></main>
  {/* Decorative border */}
  <BlueBorder/>
  {/* Footer with navigation and social links */}
  <Footer width={useWindowSize()[0]}/>
</div>)

export default PrivacyPolicy