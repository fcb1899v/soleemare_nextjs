import { NextPage } from 'next';
import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react'
import HomeTitle from '../Common/Title';
import HomePicture from './HomePicture';
import { homeProducts } from '../../utils/HomeConstant';
import { useOnScreen } from '../../utils/HomeFunction';

interface Props  {
  width: number
}

const HomeProduct: NextPage<Props> = ({width}) => {

  const isSP = (width < 600)
  const isPC = (width > 1024)

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

  const productStyle: CSSProperties = {
    margin: isSP ? 0: isPC ? 0: "0 50px", 
    columnGap: 50,
    paddingTop: 10,
    opacity: 0,
    transform: "translateY(50px)",
    transition: "opacity 2s ease-out, transform 2s ease-out",
  }

  return (
    <section id="products" className={ isPC ? "large_container": "container" }>
      <HomeTitle width={width} title={["商品紹介", "Prodotto"]} index={0}/>
      {homeProducts.map((_, i) => 
        <div ref={blockRef} style={productStyle} className={isPC ? "flex_center": undefined} key={`product_container_${i}`}> 
          {homeProducts[i].image.map((_, j) => 
            <HomePicture 
              width={width}
              color={"linear-gradient(to right bottom, var(--yellow), var(--orange))"}
              title={homeProducts[i].title[j]}
              image={homeProducts[i].image[j]}
              features={homeProducts[i].features[i]}
              message={homeProducts[i].message[i]}
              key={`home_product_${i}_${j}`}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default HomeProduct