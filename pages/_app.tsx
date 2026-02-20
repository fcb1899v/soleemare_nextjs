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
import { usePageView } from '../hooks/usePageView'
import ErrorBoundary from '../components/Common/ErrorBoundary'

/**
 * MyApp component
 * Root application component with analytics, error boundary, and global styles
 */
function MyApp({ Component, pageProps }: AppProps) {
  usePageView()

  return (
    <>
      {process.env.GA_ID && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`} />
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GA_ID}', {
                page_path: window.location.pathname,
              });`,
          }} />
        </>
      )}
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  )
}

export default MyApp;

