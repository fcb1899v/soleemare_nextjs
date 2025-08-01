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
 * - HomeFunction for window size detection
 */

import type { NextPage } from 'next'
import Head from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import Header from '../components/Common/Header'
import InquaryBody from '../components/Inquiry/InquiryBody'
import Footer from '../components/Common/Footer'
import BlueBorder from '../components/Common/BlueBorder'
import { useWindowSize } from '../utils/HomeFunction'

/**
 * Inquiry component
 * Contact page with form and common layout elements
 */
const Inquiry: NextPage = () => (<div>
  {/* SEO and meta tags */}
  <Head/>
  {/* Loading splash screen */}
  <Splash/>
  {/* Navigation header (not home page) */}
  <Header width={useWindowSize()[0]} isHome={false}/>
  {/* Contact form content */}
  <main><InquaryBody width={useWindowSize()[0]}/></main>
  {/* Decorative border */}
  <BlueBorder/>
  {/* Footer with navigation and social links */}
  <Footer width={useWindowSize()[0]}/>
</div>);

export default Inquiry