import { NextPage } from 'next'
import HomeTitle from '../Common/Title'
import HomeInstagram from './HomeInstagram'
import HomeTwitter from './HomeTwitter'
import HomeTiktok from './HomeTiktok'
import { CSSProperties } from 'react'
import { infoMessage } from '../../utils/HomeConstant'

interface Props  {
  width: number
}

const HomeSNS: NextPage<Props> = ({width}) => {

  const isSP = (width < 600)
  const isPC = (width > 1024)

  const borderStyle: CSSProperties = {
    maxWidth: 700,
    position: "relative", 
    padding: 5,
    margin: "10px auto 50px", 
    width: "Calc(100% - 30px)",
    background: "linear-gradient(to right bottom, var(--blue), var(--darkblue))",
  }
  const messageStyle: CSSProperties = { 
    fontSize: 18, 
    color: "var(--black)", 
    backgroundImage: "linear-gradient(var(--transpgray), var(--transpgray)), url('/images/wave_blue.png')",
    margin: 1.5,
    padding: 10,
    textAlign: "left"
  }
  
  return (
    <section id="info">
      <HomeTitle width={width} title={["お知らせ", "Comunicazione"]} index={0}/>
      <div style={borderStyle}>
        <div style={messageStyle}>
          <table>
            <tbody>
              {infoMessage.map((value: string, i: number) => 
                <tr key={i}><td>{value}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <HomeInstagram width={width}/>
        <HomeTwitter width={width}/>
        {/* <HomeTiktok width={width}/> */}
      </div>
    </section>
  );
};

export default HomeSNS
  
  