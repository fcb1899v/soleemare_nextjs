import { NextPage } from 'next'
import Link from 'next/link'
import React from "react"

interface Props {
  title: string
  link: string
  isInpage: boolean
}

const LinkButton: NextPage<Props> = ({ title, link, isInpage }) => { 
  const handleClick = () => {
    const target = document.getElementById(link);
    if (target) {
      target.scrollIntoView({behavior: "smooth", block: "start",});
    }
  };
  return (
    <div>
      {
        isInpage ? 
        <button onClick={handleClick}>{title}</button>: 
        <Link href={link}>{title}</Link>  
      }
    </div>
  );
}

export default LinkButton
