/**
 * BlueBorder.tsx
 * 
 * Decorative border component
 * 
 * Features:
 * - Displays a decorative blue border line
 * - Full width styling
 * - Double border effect
 * 
 * Dependencies:
 * - CSS custom properties for theming
 */

import type { NextPage } from 'next'
import { CSSProperties } from 'react'

/**
 * BlueBorder component
 * Displays a decorative blue border line
 */
const BlueBorder: NextPage = () => {

  // Style definitions
  const borderStyle: CSSProperties = {
    width: "100vw", 
    height: 0, 
    borderBottom: "10px double var(--blue)",
  }

  return (<div style={borderStyle}/>)
}

export default BlueBorder