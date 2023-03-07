import { Button } from '@mui/material'
import { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/HomeProduct.module.css'

interface Props  {
  isTitle: boolean
  itTitle: string
  jaTitle: string
  image: string
  message1: string
  messages: string[]
}
  
const PictureYellowContent: NextPage<Props> = ({ isTitle, itTitle, jaTitle, image, message1, messages }) => {
  const [showChild, setShowChild] = useState(false);
  const [vanishButton, setVanishButton] = useState(false);
  const handleClick = () => {
    setShowChild(!showChild);
    setVanishButton(!vanishButton);
  };
  return (
    <div className={styles.explain}> 
      <div className={styles.border__yellow}>
        <div className={styles.box}>
          <img src={image} alt={jaTitle}></img>
        </div>
        <div className={isTitle ? styles.title: styles.none}>
          <h1>{jaTitle}</h1>
          <h1><span>{itTitle}</span></h1>
        </div>
      </div>
      <div className={styles.message}>
        <h5 style={{paddingBottom: showChild ? "5px": "0px"}}>{message1}</h5>
        {
          messages.map((value: string, i: number) => <h5 key={i} style={{
            height: showChild ? "auto" : "0px", 
            color: showChild ? "black" : "transparent",
            paddingBottom: showChild ? "5px": "0px",
          }}>{value}</h5>)
        }
        <Button onClick={handleClick} style={{height: showChild ? "0px": "20px", display: showChild ? "none" : "block",}}>
          <h5>＋ 続きを読む</h5>
        </Button>
      </div>
    </div>
  );
};



export default PictureYellowContent