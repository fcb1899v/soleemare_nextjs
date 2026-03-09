/**
 * useLayout.ts
 *
 * Layout/viewport hooks used across pages and components.
 *
 * - useWindowSize: track window dimensions for responsive layout
 * - useOnScreen: detect when an element is visible (Intersection Observer)
 */

import { RefObject, useEffect, useState } from 'react'

/** Same initial value on server and client to avoid hydration mismatch. */
const INITIAL_SIZE: [number, number] = [1024, 768]

const RESIZE_DEBOUNCE_MS = 250

/**
 * useWindowSize hook
 * Tracks window dimensions and updates on resize and orientation change.
 * Resize is debounced (250ms) + requestAnimationFrame to reduce forced reflow.
 * Initial size is set in rAF after mount so the first layout read happens after paint.
 * @returns [width, height]
 */
export const useWindowSize = (): number[] => {
  const [size, setSize] = useState<[number, number]>(INITIAL_SIZE)
  useEffect(() => {
    let rafId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight])
    }

    const scheduleUpdate = (): void => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        timeoutId = null
        if (rafId !== null) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(updateSize)
      }, RESIZE_DEBOUNCE_MS)
    }

    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('orientationchange', scheduleUpdate)
    // Defer initial read to next frame so first paint isn't followed immediately by a layout read
    rafId = requestAnimationFrame(updateSize)
    return () => {
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('orientationchange', scheduleUpdate)
      if (timeoutId) clearTimeout(timeoutId)
      if (rafId !== null) cancelAnimationFrame(rafId)
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
