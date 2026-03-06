/**
 * usePageView.ts
 *
 * Custom hook for Google Analytics page view tracking.
 *
 * - Tracks page views when routes change
 * - Excludes shallow routing from tracking
 * - Cleanup on unmount
 */

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GA_ID, GTM_ID, pageview } from '../utils/gtag'

const isAnalyticsEnabled = () => !!GA_ID || !!GTM_ID

/**
 * usePageView hook
 * Tracks page views for Google Analytics / GTM when routes change.
 */
export const usePageView = () => {
  const router = useRouter()

  useEffect(() => {
    if (!isAnalyticsEnabled()) return

    const handleRouteChange = (url: string, { shallow }: { shallow?: boolean }) => {
      if (!shallow) pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])
}
