import { NextPage } from 'next'
import React from 'react'
import PictureYellowContent from './PictureYellowContent'

interface Props  {
  num: string
  title: string
  image: string
  message1: string
  messages: string[]
}
  
const HomeProductContent: NextPage<Props> = ({ num, title, image, message1, messages }) => {
  return (
    <div> 
      <div>
        <img src={num} alt={title}/>
        <h2>{title}</h2>
      </div>
      <PictureYellowContent
        isTitle={false}
        itTitle=''
        jaTitle=''
        image={image}
        message1={message1}
        messages={messages}
      />
    </div>
  );
};

export default HomeProductContent
