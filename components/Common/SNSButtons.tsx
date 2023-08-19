import { NextPage } from 'next'
import Link from 'next/link';
import { mySNS } from '../../utils/HomeConstant';
import { CSSProperties } from 'react';

interface Props {
  width: number
}

const SNSButtons: NextPage<Props> = ({width}) => {

  const isSP = (width < 600)
  const isPC = (width > 1024)

  const snsStyle: CSSProperties = { 
    display: "inline-flex",
    marginTop: isPC ? "2.5px 0px 0px 0px": "2.5px 0px 15px 0px",
  }
  const snsButtonStyle: CSSProperties = { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    margin: "auto 10px",
    padding: 0,
    backgroundColor: "var(--gray)", 
  }

  const snsImageStyle: CSSProperties = { 
    height: 25,
    margin: 7.5,
  }

  return (<div style={snsStyle}> 
    {mySNS.map((_, i) => <ul style={snsButtonStyle} key={`sns_${i}`}>
      <Link href={mySNS[i].link} target="_blank" rel="noreferrer">
        <img src={mySNS[i].image[0]} alt={mySNS[i].title} style={snsImageStyle}/>
      </Link>
    </ul>)}
  </div>)
}

export default SNSButtons
