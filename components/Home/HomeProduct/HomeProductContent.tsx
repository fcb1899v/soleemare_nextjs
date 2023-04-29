import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import styles from '/styles/Product.module.css'
import HomePictureYellow from '../HomeCommon/HomePictureYellow'

interface Props  {
  jaTitle: string
  itTitle: string
  images: string[]
  message: string[]
  messages: string[][]
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

const HomeProductContent: NextPage<Props> = ({ jaTitle, itTitle, images, message, messages }) => {
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
      <div className={styles.container}> 
        <HomePictureYellow
          isTitle={true}
          itTitle={itTitle}
          jaTitle={jaTitle}
          image={images[0]}
          message1={message[0]}
          messages={messages[0]}
        />
        <HomePictureYellow
          isTitle={false}
          itTitle=""
          jaTitle=''
          image={images[1]}
          message1={message[1]}
          messages={messages[1]}
        />
      </div>
    </div>
  );
};

export default HomeProductContent
