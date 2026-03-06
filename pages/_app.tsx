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
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  )
}

export default MyApp;

