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
 * - useLayout (useWindowSize) for window size detection
 */

import type { NextPage } from 'next'
import Head from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import Header from '../components/Common/Header'
import PolicyBody from '../components/PrivacyPolicy/PolicyBody'
import Footer from '../components/Common/Footer'
import BlueBorder from '../components/Common/BlueBorder'
import { useWindowSize } from '../hooks/useLayout'

/**
 * PrivacyPolicy component
 * Privacy policy page with content and common layout elements
 */
const PrivacyPolicy: NextPage = () => {
  const width = useWindowSize()[0]
  return (<div>
    <Head
      title="プライバシーポリシー・利用規約 | ソレ・エ・マーレ〜太陽と海〜 Sole e Mare"
      description="ソレ・エ・マーレのプライバシーポリシーと利用規約です。個人情報の取り扱いについて定めています。"
      path="/privacypolicy/"
    />
    {/* Loading splash screen */}
    <Splash/>
    {/* Navigation header (not home page) */}
    <Header width={width} isHome={false}/>
    {/* Privacy policy content */}
    <main><PolicyBody width={width}/></main>
    {/* Decorative border */}
    <BlueBorder/>
    {/* Footer with navigation and social links */}
    <Footer width={width}/>
  </div>)
}

export default PrivacyPolicy