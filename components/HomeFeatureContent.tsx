import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from "react";
import styles from '../styles/HomeFeature.module.css'
import PictureYellowContent from './PictureYellowContent'

interface Props {
  num: string
  title: string
  image1: string
  image2: string
  message1: string
  messages1: string[]
  message2: string
  messages2: string[]
}
  
const useOnScreen = (ref: React.RefObject<Element>) => {
const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const blockRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      // 画面内に表示されているかどうかを判定
      setIntersecting(entry.isIntersecting);
    });
    if (blockRef) {
      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }  
  }, [ref]);
  return isIntersecting;
};

const HomeFeatureContent: NextPage<Props> = ({ num, title, image1, image2, message1, messages1, message2, messages2 }) => {
  const fadeInUpStyle: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(50px)",
    transition: "opacity 2s ease-out, transform 2s ease-out",
  };  
  const blockRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(blockRef);
  useEffect(() => {
    const blockElement = blockRef.current;
    if (blockElement) {
      if (isVisible) {
        blockRef.current.style.opacity = "1";
        blockRef.current.style.transform = "translateY(0)";
      }
    }
  }, [blockRef, isVisible]);
  return (
    <div ref={blockRef} style={fadeInUpStyle}>
      <div className={styles.contents}>
        <div className={styles.title}>
          <img src={num} alt={title}></img>
          <h2>{title}</h2>
        </div>
        <div className={styles.container}> 
          <PictureYellowContent
            isTitle={false}
            itTitle=''
            jaTitle=''
            image={image1}
            message1={message1}
            messages={messages1}
          />
          <PictureYellowContent
            isTitle={false}
            itTitle=''
            jaTitle=''
            image={image2}
            message1={message2}
            messages={messages2}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeFeatureContent
