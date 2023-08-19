import { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect, CSSProperties } from 'react'
import HomeSNSLink from './HomeSNSTitle';
import { mySNS } from '../../utils/HomeConstant';
import BlueBorder from '../Common/BlueBorder';

interface Props  {
  width: number
}

async function getInstaItems(): Promise<[]> {
  try {
    const userId = process.env.NEXT_PUBLIC_INSTA_ID;
    const token = process.env.NEXT_PUBLIC_INSTA_TOKEN;
    const instaUrl = `https://graph.facebook.com/v15.0/${userId}?fields=media.limit(10){id,caption,media_url,thumbnail_url,timestamp,media_type,permalink,like_count}&access_token=${token}`;
    const response: any = await axios.get<[]>(instaUrl);
    // console.log(response.data["media"]["data"])
    return response.data["media"]["data"];
  } catch (error) {
    console.error(error);
    return []
  }
}

const HomeInstagram: NextPage<Props> = ({width}) => {

  const isSP = (width < 600)
  const isPC = (width > 1024)

  const snsNumber = 2;

  const [instaItems, setInstaItems] = useState<[] |[]>([]);
  useEffect(() => {
    (async () => {
      const instaItems: [] = await getInstaItems();
      setInstaItems(instaItems);
    })();
  }, []);

  const instaStyle: CSSProperties = { 
    width: "100%",
    margin: "0 auto",
    padding: "30px 0 40px",
    color: "var(--black)",
    textShadow: "1px 2px 3px var(--white)",
    position: "relative",
    background: "linear-gradient(to right bottom, var(--yellow), var(--orange))",  
  }
  const instaContainerStyle: CSSProperties =  { 
    marginBottom: 15,
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: `repeat(${Math.floor(width / 250)}, 1fr)`,
    gap: 20,
    margin: "0 auto",
  }
  const instaImageStyle: CSSProperties =  { 
    width: 225, 
    aspectRatio: 1, 
    marginBottom: 20,
  }
  const instaLinkStyle: CSSProperties =  { 
    textDecoration: "none", 
  }
  const instaLikeStyle: CSSProperties = {
    width: "100%", 
    color: "var(--red)", 
    marginTop: -24,
  }
  
  return (<div>
    <div style={instaStyle}>
      <HomeSNSLink sns={mySNS[snsNumber]} isDark={true}/>
      <div className="flex_center_wrap">
        {(instaItems.length != 0) && <div style={instaContainerStyle}>
          {instaItems.map((item: any, i: number) => (
            <Link key={i} href={item["permalink"]} style={instaLinkStyle} >
              <img style={instaImageStyle} alt={`insta_image_${i}!`} src={(item["media_type"] == "VIDEO") ? item["thumbnail_url"]: item["media_url"]}/>
              <div style={instaLikeStyle}>♥ {item["like_count"]}</div>
            </Link>
          ))}
        </div>}
      </div>
    </div>
    <BlueBorder/> 
  </div>);
}

export default HomeInstagram

