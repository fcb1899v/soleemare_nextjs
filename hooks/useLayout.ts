/**
 * useLayout.ts
 *
 * Layout/viewport hooks used across pages and components.
 *
 * - useWindowSize: track window dimensions for responsive layout
 * - useOnScreen: detect when an element is visible (Intersection Observer)
 */

import { RefObject, useEffect, useLayoutEffect, useState } from 'react'

/**
 * useWindowSize hook
 * Tracks window dimensions and updates on resize and orientation change.
 * Ensures layout updates when the user rotates a smartphone or resizes the window.
 * @returns [width, height]
 */
export const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    window.addEventListener('orientationchange', updateSize)
    updateSize()
    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('orientationchange', updateSize)
    }
  }, [])
  return size
}

/**
 * useOnScreen hook
 * Detects when an element becomes visible in the viewport.
 * @param ref - Ref to the element to observe
 * @returns Whether the element is visible
 */
export const useOnScreen = (ref: RefObject<HTMLElement | null | undefined>): boolean => {
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const blockRef = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting)
    })
    if (blockRef) {
      observer.observe(blockRef)
      return () => observer.unobserve(blockRef)
    }
  }, [ref])
  return isIntersecting
}
