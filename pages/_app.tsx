/**
 * pages/_app.tsx
 * 
 * Next.js App component
 * 
 * Features:
 * - Global styles and CSS imports
 * - Google Analytics integration
 * - Page view tracking
 * - Swiper CSS bundle import
 * 
 * Dependencies:
 * - Next.js AppProps type
 * - usePageView hook for analytics
 * - Google Analytics (conditional)
 */

import '../styles/globals.css'
import 'swiper/css/bundle'
import type { AppProps } from 'next/app'
import { usePageView } from '../src/hooks/usePageView';

/**
 * MyApp component
 * Root application component with analytics and global styles
 */
function MyApp({ Component, pageProps }: AppProps) {

  // Track page views for analytics
  usePageView();
  
  return <>
    {/* Google Analytics integration (conditional) */}
    {process.env.NEXT_PUBLIC_GA_ID && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });`,
        }}/>
      </>
    )}
    {/* Render the page component */}
    <Component {...pageProps} />
  </>
}

export default MyApp;

