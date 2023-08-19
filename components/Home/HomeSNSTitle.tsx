import { NextPage } from 'next'
import Link from 'next/link'
import { CSSProperties } from 'react'

interface Props {
  sns: {
    title: string  
    image: string[]
    link: string
  }
  isDark: boolean
}

const HomeSNSLink: NextPage<Props> = ({ sns, isDark }) => {

  const snsLinkStyle: CSSProperties = {
    textDecoration: "none",
    color: isDark ? "black": "white",
    margin: "0 auto"
  }
  const snsTitleStyle: CSSProperties = {
    fontSize: 54,
    fontFamily: "Kleymisska",
    margin: 0,
  }
  const snsIconStyle: CSSProperties = {
    width: 50, 
    height: 50,
    margin: "10px 0 40px 0",
  }

  return <Link className="flex_center" style={snsLinkStyle} href={sns.link} target="_blank" rel="noreferrer" >
    <img style={snsIconStyle} src={sns.image[isDark ? 1: 0]} alt={sns.title} />
  </Link>;
};

export default HomeSNSLink
