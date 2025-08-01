/**
 * HomeFeature.tsx
 * 
 * Home page features section component
 * 
 * Features:
 * - Displays product features and highlights
 * - Scroll-triggered animations
 * - Responsive design for different screen sizes
 * - Background image with overlay
 * - Custom intersection observer hook
 * 
 * Dependencies:
 * - HomePicture component for feature display
 * - HomeTitle component for section titles
 * - HomeConstant for feature data
 */

import { NextPage } from 'next'
import { homeFeatures } from '../../utils/HomeConstant';
import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react';
import HomePicture from './HomePicture';
import HomeTitle from '../Common/Title';

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props  {
  width: number
}

/**
 * Custom hook for intersection observer
 * Detects when element becomes visible on screen
 * @param ref - Reference to the element to observe
 * @returns boolean indicating if element is visible
 */
const useOnScreen = (ref: RefObject<Element | null>) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const blockRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      // Check if element is visible in viewport
      setIntersecting(entry.isIntersecting);
    });
    if (blockRef) {
      const currentRef = ref.current;
      if (currentRef) observer.observe(currentRef);
      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }  
  }, [ref]);
  return isIntersecting;
};
  
/**
 * HomeFeature component
 * Displays product features with scroll animations
 */
const HomeFeature: NextPage<Props> = ({ width }) => {

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
  const featuresBackStyle: CSSProperties = {
    backgroundImage: "linear-gradient(var(--transpgray), var(--transpgray)), url('/images/shikkui.jpg')",
    margin: 0,
    padding: "10px 0",
  }
  const featuresContainerStyle: CSSProperties = {
    opacity: 0,
    transform: "translateY(50px)",
    transition: "opacity 2s ease-out, transform 2s ease-out",
  }
  const featuresStyle: CSSProperties = {
    margin: isSP ? 0: isPC ? 0: "0 50px", 
    columnGap: 50,
    paddingTop: 10,
  }

  return (
    <section id="features" style={featuresBackStyle}>
      <div ref={blockRef} style={featuresContainerStyle} className={isPC ? "large_container": "container"}>
        {/* Main features title */}
        <HomeTitle width={width} title={["当店のこだわり", "Qualità"]} index={0}/>
        <div style={{marginTop: 20}}>
          {/* Feature sections */}
          {homeFeatures.map((_, i) => 
            <div key={`features_container_${i}`} style={{marginTop: -30}}>
              <HomeTitle width={width} title={[homeFeatures[i].title, ""]} index={i + 1}/>
              <div className={isPC ? "flex_center": undefined} style={featuresStyle} > 
                {/* Feature images and descriptions */}
                {homeFeatures[i].image.map((_, j) => 
                  <HomePicture
                    width={width} 
                    color={"linear-gradient(to right bottom, var(--yellow), var(--orange))"}
                    title={["", ""]}
                    image={homeFeatures[i].image[j]}
                    features={homeFeatures[i].features[j]}
                    message={homeFeatures[i].message[j]}
                    key={`home_features_${i}_${j}`}         
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>      
    </section>
  );
};

export default HomeFeature