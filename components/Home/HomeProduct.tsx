/**
 * HomeProduct.tsx
 * 
 * Home page products section component
 * 
 * Features:
 * - Displays product showcase with images and descriptions
 * - Scroll-triggered animations for content reveal
 * - Responsive design for different screen sizes
 * - Product categorization and display
 * 
 * Dependencies:
 * - HomePicture component for product display
 * - HomeTitle component for section titles
 * - HomeConstant for product data
 * - HomeFunction for scroll detection
 */

import { NextPage } from 'next';
import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react'
import HomeTitle from '../Common/Title';
import HomePicture from './HomePicture';
import { homeProducts } from '../../utils/HomeConstant';
import { useOnScreen } from '../../utils/HomeFunction';

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props  {
  width: number
}

/**
 * HomeProduct component
 * Displays product showcase with scroll animations
 */
const HomeProduct: NextPage<Props> = ({width}) => {

  // Responsive breakpoint detection
  const isSP = (width < 600)
  const isPC = (width > 1024)

  // Scroll animation setup
  const blockRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(blockRef);
  
  // Animate content when it becomes visible
  useEffect(() => {
    const blockElement = blockRef.current;
    if (blockElement && isVisible) {
      blockElement.style.opacity = "1";
      blockElement.style.transform = "translateY(0)";
    }
  }, [blockRef, isVisible]);

  // Style definitions
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
      {/* Products section title */}
      <HomeTitle width={width} title={["商品紹介", "Prodotto"]} index={0}/>
      {/* Product categories */}
      {homeProducts.map((_, i) => 
        <div ref={blockRef} style={productStyle} className={isPC ? "flex_center": undefined} key={`product_container_${i}`}> 
          {/* Product images and descriptions */}
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