import { NextPage } from 'next'
import { homeFeatures } from '../../utils/HomeConstant';
import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react';
import HomePicture from './HomePicture';
import HomeTitle from '../Common/Title';

interface Props  {
  width: number
}

const useOnScreen = (ref: RefObject<Element>) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const blockRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      // 画面内に表示されているかどうかを判定
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
  
const HomeFeature: NextPage<Props> = ({ width }) => {

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
        <HomeTitle width={width} title={["当店のこだわり", "Qualità"]} index={0}/>
        <div style={{marginTop: 20}}>
          {homeFeatures.map((_, i) => 
            <div key={`features_container_${i}`} style={{marginTop: -30}}>
              <HomeTitle width={width} title={[homeFeatures[i].title, ""]} index={i + 1}/>
              <div className={isPC ? "flex_center": undefined} style={featuresStyle} > 
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