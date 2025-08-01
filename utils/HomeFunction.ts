/**
 * utils/HomeFunction.ts
 * 
 * Custom React hooks for home page functionality
 * 
 * Features:
 * - Window size detection hook
 * - Intersection observer hook for scroll animations
 * - Responsive design utilities
 * - Real-time window resize handling
 * 
 * Dependencies:
 * - React hooks (useState, useEffect, useLayoutEffect)
 * - Intersection Observer API
 */

import { RefObject, useEffect, useLayoutEffect, useState } from "react";

/**
 * useWindowSize hook
 * Tracks window dimensions and updates on resize
 * @returns Array containing [width, height] of the window
 */
export const useWindowSize = (): number[] => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      const updateSize = (): void => {
        setSize([window.innerWidth, window.innerHeight]);
      };
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  };

/**
 * useOnScreen hook
 * Detects when an element becomes visible in the viewport
 * @param ref - Reference to the element to observe
 * @returns Boolean indicating if element is visible
 */
export const useOnScreen = (ref: RefObject<HTMLElement | null | undefined>) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
      const blockRef = ref.current;
      const observer = new IntersectionObserver(([entry]) => {
        // Check if element is visible in viewport
        setIntersecting(entry.isIntersecting);
      });
      if (blockRef) {
        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => {
          if (currentRef) observer.unobserve(currentRef);
        };
      }  
    }, [ref]);
    return isIntersecting;
  }
  