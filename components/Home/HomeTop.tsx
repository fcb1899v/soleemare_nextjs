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
 * - homeConstant for content data
 * - useLayout (useOnScreen) for scroll detection
 */

import { NextPage } from "next";
import { CSSProperties, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules'
import HomePicture from "./HomePicture";
import { homeTop, homeCarousel } from "../../utils/homeConstant";
import { getBreakpointFlags } from '../../utils/commonConstant';
import { getImageBaseAndExt, getResponsiveSrcSet, CAROUSEL_SIZES } from '../../utils/imageUtils';
import { useOnScreen } from '../../hooks/useLayout';

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
  const { isSP, isPC } = getBreakpointFlags(width)

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
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
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
  
  /** Fill slide without driving layout (size comes from wrapper) to avoid CLS */
  const carouselImageStyle: CSSProperties = { 
    width: "100%",
    height: "100%",
    objectFit: "cover",
    animation: "animationZoom 50s ease-in-out forwards",
  }

  return (
    <section id="top">
      <div className={isPC ? "large_container": "container"}>
        {/* Hero carousel: .hero_carousel_wrapper uses CSS media query for aspect-ratio (avoids CLS on hydration) */}
        <div className="hero_carousel_wrapper">
          <Swiper
            key={`home-top-swiper-${isSP}`}
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
            loopAdditionalSlides={2}
            style={carouselStyle}
          >
          {(() => {
            const slides = homeCarousel(isSP)
            const slidesForLoop = slides.length >= 2 ? slides : [...slides, ...slides]
            return slidesForLoop.map((slide: { title: string[]; image: string }, i: number) => {
            const imgSrc = slide.image
            const { base, ext } = getImageBaseAndExt(imgSrc)
            const isFirst = i === 0
            return (
            <SwiperSlide key={`home_carousel_${i}`} style={{ position: "relative", height: "100%" }}>
              <div style={{ position: "absolute", inset: 0 }}>
                <picture style={{ display: "block", width: "100%", height: "100%" }}>
                  <source type="image/avif" srcSet={getResponsiveSrcSet(base, 'avif')} sizes={CAROUSEL_SIZES} />
                  <source type="image/webp" srcSet={getResponsiveSrcSet(base, 'webp')} sizes={CAROUSEL_SIZES} />
                  <img
                  className="animationZoom"
                  style={carouselImageStyle}
                  src={imgSrc}
                  srcSet={getResponsiveSrcSet(base, ext)}
                  sizes={CAROUSEL_SIZES}
                  alt={slide.title[0]}
                  width={1920}
                  height={1280}
                  decoding="async"
                  {...(isFirst ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
                  />
                </picture>
              </div>
              <div className="placeCenter">
                <p className="content-like-h3" style={carouselMessageStyle}>
                  自家農園の季節の柑橘を贅沢に使用した<br/>手作りイタリアンスイーツ
                </p>
                <h1 style={carouselItTitleStyle}>{slide.title[1]}</h1>
                <h1 style={carouselJaTitleStyle}>{slide.title[0]}</h1>
              </div>
            </SwiperSlide>
            )
            })
          })() }
          </Swiper>
        </div>

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