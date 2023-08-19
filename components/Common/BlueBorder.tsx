import type { NextPage } from 'next'
import { CSSProperties } from 'react'

const BlueBorder: NextPage = () => {

  const borderStyle: CSSProperties = {
    width: "100vw", 
    height: 0, 
    borderBottom: "10px double var(--blue)",
  }

  return (<div style={borderStyle}/>)
}

export default BlueBorder