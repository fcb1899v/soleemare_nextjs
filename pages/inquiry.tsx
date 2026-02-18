/**
 * pages/inquiry.tsx
 * 
 * Contact page component
 * 
 * Features:
 * - Contact form page layout
 * - Responsive design with window size detection
 * - Common header and footer integration
 * - Contact form component integration
 * 
 * Dependencies:
 * - Common components (Head, Splash, Header, Footer, BlueBorder)
 * - InquiryBody component for contact form
 * - useLayout (useWindowSize) for window size detection
 */

import type { NextPage } from 'next'
import Head from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import Header from '../components/Common/Header'
import InquiryBody from '../components/Inquiry/InquiryBody'
import Footer from '../components/Common/Footer'
import BlueBorder from '../components/Common/BlueBorder'
import { useWindowSize } from '../hooks/useLayout'

/**
 * Inquiry component
 * Contact page with form and common layout elements
 */
const Inquiry: NextPage = () => {
  const width = useWindowSize()[0]
  return (<div>
    <Head
      title="お問い合わせ | ソレ・エ・マーレ〜太陽と海〜 Sole e Mare"
      description="ソレ・エ・マーレへのお問い合わせはこちらから。自家農園の柑橘を使ったイタリアンスイーツ、スフォリアテッラについてのご質問・ご注文はお気軽にどうぞ。"
      path="/inquiry/"
    />
    {/* Loading splash screen */}
    <Splash/>
    {/* Navigation header (not home page) */}
    <Header width={width} isHome={false}/>
    {/* Contact form content */}
    <main><InquiryBody width={width}/></main>
    {/* Decorative border */}
    <BlueBorder/>
    {/* Footer with navigation and social links */}
    <Footer width={width}/>
  </div>);
};

export default Inquiry