/**
 * HomeTop.tsx
 * 
 * Home page top section component
 * 
 * Features:
 * - Hero carousel with autoplay and fade effects
 * - Responsive design for different screen sizes
 * - Animated content reveal on scroll
 * - Product showcase with features
 * 
 * Dependencies:
 * - Swiper for carousel functionality
 * - HomePicture component for product display
 * - HomeConstant for content data
 * - HomeFunction for scroll detection
 */

import { NextPage } from "next";
import { CSSProperties, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules'
import HomePicture from "./HomePicture";
import { homeTop, homeCarousel } from "../../utils/HomeConstant";
import { useOnScreen } from "../../utils/HomeFunction";

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props {
  width: number
}

/**
 * HomeTop component
 * Displays hero carousel and product showcase sections
 */
const HomeTop: NextPage<Props> = ({width}) => {
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
  const topStyle: CSSProperties = {
    margin: isSP ? "40px 0 0": isPC ? "40px 0 0": "40px 50px", 
    columnGap: 50,
    opacity: 0,
    transform: "translateY(50px)",
    transition: "opacity 2s ease-out, transform 2s ease-out",
  }
  
  const carouselStyle: CSSProperties = { 
    color: "#F4F5F0",
    textShadow: "1px 2px 3px var(--black)",
    position: "relative",
    marginBottom: 20
  }
  
  const carouselJaTitleStyle: CSSProperties = {
    fontSize: "min(10vw, 45px)",
    margin: 0,
  }
  
  const carouselItTitleStyle: CSSProperties = {
    fontSize: "min(20vw, 120px)",
    fontFamily: "Kleymisska",
    margin: isPC ? "50px 0": "10px 0 0 0",
  }
  
  const carouselMessageStyle: CSSProperties = { 
    fontSize: "min(5vw, 30px)",
    margin: 0,
  }
  
  const carouselImageStyle: CSSProperties = { 
    width: "100%",
    animation: "animationZoom 50s ease-in-out forwards",
  }

  return (
    <section id="top">
      <div className={isPC ? "large_container": "container"}>
        {/* Hero carousel with autoplay and fade effects */}
        <Swiper
          key="home-top-swiper"
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            stopOnLastSlide: false,
          }}
          speed={2000}
          pagination={{ clickable: true }}
          centeredSlides={true}
          scrollbar={{ draggable: true }}
          effect={"fade"}
          fadeEffect={{ crossFade: true }}
          loop={true}
          style={carouselStyle}
        >
          {homeCarousel(isSP).map((_, i: number) => (
            <SwiperSlide key={`home_carousel_${i}`}>
              <img 
                className="animationZoom" 
                style={carouselImageStyle} 
                src={homeCarousel(isSP)[i].image} 
                alt={homeCarousel(isSP)[i].title[0]}
              />
              <div className="placeCenter">
                <h3 style={carouselMessageStyle}>
                  自家農園の季節の柑橘を贅沢に使用した<br/>手作りイタリアンスイーツ
                </h3>
                <h1 style={carouselItTitleStyle}>{homeCarousel(isSP)[i].title[1]}</h1>
                <h1 style={carouselJaTitleStyle}>{homeCarousel(isSP)[i].title[0]}</h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Product showcase section with scroll animation */}
        <div ref={blockRef} className={isPC ? "flex_center": undefined} style={topStyle}>
          {homeTop.map((_, i: number) => (
            <HomePicture
              width={width}
              color={"linear-gradient(to right bottom, var(--blue), var(--darkblue))"}
              title={homeTop[i].title}
              image={homeTop[i].image}
              features={homeTop[i].features}
              message={homeTop[i].message}
              key={`home_top_${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeTop