import { NextPage } from 'next'
import React from 'react'
import styles from '../styles/HomeProduct.module.css'
import PictureYellowContent from './PictureYellowContent'

interface Props  {
  jaTitle: string
  itTitle: string
  images: string[]
  message: string[]
  messages: string[][]
}
  
const HomeProductContent: NextPage<Props> = ({ jaTitle, itTitle, images, message, messages }) => {
  return (
    <div className={styles.container}> 
      <PictureYellowContent
        isTitle={true}
        itTitle={itTitle}
        jaTitle={jaTitle}
        image={images[0]}
        message1={message[0]}
        messages={messages[0]}
      />
      <PictureYellowContent
        isTitle={false}
        itTitle=""
        jaTitle=''
        image={images[1]}
        message1={message[1]}
        messages={messages[1]}
      />
    </div>
  );
};

export default HomeProductContent
