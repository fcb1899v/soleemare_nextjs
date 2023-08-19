import { NextPage } from 'next'
import { CSSProperties } from 'react';
import Link from 'next/link';
import SnsButtons from "./SNSButtons";
import BlueBorder from './BlueBorder';
import { myFooterMenu } from '../../utils/HomeConstant';

interface Props {
  width: number
}

const Footer: NextPage<Props> = ({width}) => {
  
  const isSP = (width < 600);
  const isPC = (width > 1024);

  const onScrollTop = () => window.scroll({ top: 0, behavior: 'smooth' });

  const footerToTopTextStyle: CSSProperties = {
    margin: 0,
    padding: "15px 0", 
    color: "var(--white)",
    textAlign: "center"
  }
  const footerLogoStyle: CSSProperties = {
    width: 120,
    paddingTop: isSP ? 20: 25,
  }
  const footerLinkStyle: CSSProperties = {
    color: "var(--black)", 
    textDecoration: "none",
    fontSize: 16,
    paddingTop: 5,
  }
  const footerCopyRightStyle: CSSProperties = {
    fontSize: 14,
    padding: "10px 0 30px 0",
  }

  return (<footer id="footer">
      {isSP && <div style={{background: "linear-gradient(to bottom, var(--blue), var(--darkblue))"}} onClick={onScrollTop}>
        <h4 style={footerToTopTextStyle}>ページトップへ戻る</h4> 
      </div>}
      {isSP && <BlueBorder/>}
      <div className={isSP ? "block": "flex_center"} style={{paddingTop: isSP ? 10: 0, columnGap: 50}}>
        <Link href="/"><img src="../images/soleemare_logo.png" alt="ソレ・エ・マーレ" style={footerLogoStyle}/></Link>
        <div style={{gap: 15, paddingTop: isSP ? 15: 30}}>
          <SnsButtons width={width}/>
          <div className='flex_center_wrap' style={{columnGap: 15, padding: "5px 10px 0 10px"}}>
            {myFooterMenu.map((_, j) => <div style={{padding: "5px 0"}} key={`footermenu_${j}`}>
              <Link href={myFooterMenu[j].link} style={footerLinkStyle}>{myFooterMenu[j].title}</Link>  
            </div>)}
          </div>    
          <li style={footerCopyRightStyle}>©Sole e Mare. ALL RIGHTS RESERVED.</li>
        </div>
      </div>
    </footer>
  );
};

export default Footer

// .toTop { background: var(--gray); }  
// .toTop h4 { padding: 15px 0; font-size: 18px !important; font-weight: normal; color:var(--white); }
