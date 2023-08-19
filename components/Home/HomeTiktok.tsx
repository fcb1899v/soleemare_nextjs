import { NextPage } from 'next'
import { CSSProperties, useEffect, useState } from "react"
import HomeSNSLink from './HomeSNSTitle';
import { mySNS } from '../../utils/HomeConstant';

interface Props  {
  width: number
}

const HomeTiktok: NextPage<Props> = ({width}) => {

  const isSP = (width < 600)
  const isPC = (width > 1024)

  const snsNumber = 4;

  const [isLoadwidgets, setLoadwidgets] = useState(false);

  const EmbededTiktok = () => {
    useEffect(() => {
      if (!isLoadwidgets) {
        const s = document.createElement("script");
        s.setAttribute("src", "https://www.tiktok.com/embed.js");
        document.body.appendChild(s);
        setLoadwidgets(true);
      }
    }, []);
    return (
      <blockquote className="tiktok-embed" cite="https://www.tiktok.com/@sole_e_mare_dolce" data-unique-id="sole_e_mare_dolce" data-embed-type="creator">
        <section>
          <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@sole_e_mare_dolce?refer=creator_embed"></a> 
        </section> 
      </blockquote> 
    );
  };
  
  const tiktokStyle: CSSProperties = { 
    width: "100%",
    margin: "0 auto",
    padding: "30px 0 40px",
    color: "var(--black)",
    textShadow: "1px 2px 3px var(--white)",
    position: "relative",
    background: "linear-gradient(to right bottom, var(--yellow), var(--orange))",  
  }

  return (
    <div style={tiktokStyle}>
      <HomeSNSLink sns={mySNS[snsNumber]} isDark={true}/>
      <EmbededTiktok/>
    </div>
  );
};

export default HomeTiktok
  
  