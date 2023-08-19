import { NextPage } from 'next';
import React, { CSSProperties, } from 'react'

interface Props  {
  width: number
  title: string[]
  index: number
}

const HomeTitle: NextPage<Props> = ({width, title, index}) => {

  const isSP = (width < 600)
  const isPC = (width > 1024)

  const titleStyle: CSSProperties = {
    margin: "0 auto",
    padding: "25px 0 0", 
  }
  const titleStringStyle: CSSProperties = {
    columnGap: 25,
  }
  const jaTitleStyle: CSSProperties = {
    padding: (index > 0) ? 0: "15px 0 0",
    marginTop: isSP ? -20: 0,
    fontSize: isSP ? 24: 28,
  }
  const itTitleStyle: CSSProperties = {
    fontSize: 54,
    fontFamily: "Kleymisska",
    margin: 0,
  }
  const imageStyle: CSSProperties = {
    width: 80,
    height: 80,    
    margin: isSP ? "0 0 20px": "-15px 0 0"
  }

  return (<div style={titleStyle}>
    <div className={isSP ? "block": "flex_center_wrap"} style={titleStringStyle}>
      {(index > 0) && <img src={`/images/${index}.png`} alt={`image_${index}`} style={imageStyle}></img>}
      {(title[1] != "") && <h2 style={itTitleStyle}>{title[1]}</h2>}
      <h2 style={jaTitleStyle}>{title[0]}</h2>
    </div>
  </div>);
};

export default HomeTitle