/**
 * src/hooks/usePageView.ts
 * 
 * Custom hook for Google Analytics page view tracking
 * 
 * Features:
 * - Tracks page views for Google Analytics
 * - Handles route changes in Next.js
 * - Excludes shallow routing from tracking
 * - Automatic cleanup on unmount
 * 
 * Dependencies:
 * - Next.js router for route change detection
 * - Google Analytics gtag library
 * - React useEffect for lifecycle management
 */

import { useRouter } from "next/router";
import { useEffect } from "react";
import { GA_ID, pageview } from "../../lib/gtag";

/**
 * usePageView hook
 * Tracks page views for Google Analytics when routes change
 */
export const usePageView = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Skip if Google Analytics is not configured
    if (!GA_ID) {
      return;
    }

    // Handle route change events
    const handleRouteChange = (url: string, { shallow }: any) => {
      // Only track non-shallow route changes
      if (!shallow) {
        pageview(url);
      }
    };

    // Subscribe to route change events
    router.events.on("routeChangeComplete", handleRouteChange);
    
    // Cleanup subscription on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

