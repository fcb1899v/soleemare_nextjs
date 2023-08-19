import { NextPage } from "next";
import { CSSProperties, RefObject, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import SwiperCore, { Pagination, Navigation, EffectFade, Autoplay } from 'swiper'
import HomePicture from "./HomePicture";
import { homeTop, homeCarousel } from "../../utils/HomeConstant";
import { useOnScreen } from "../../utils/HomeFunction";
// import ShoppingButton from "./ShopifyButton";
SwiperCore.use([Pagination, Navigation]) 

interface Props  {
  width: number
}

const HomeTop: NextPage<Props> = ({width}) => {

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

  return <section id="top" >
    <div className={isPC ? "large_container": "container"}>
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        slidesPerView={1}
        autoplay={true}
        speed={2000}
        pagination={{ clickable: true }}
        centeredSlides={true}
        scrollbar={{ draggable: true }}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        loop={true}
        style={carouselStyle}
      >
        {homeCarousel(isSP).map((_, i: number) => <SwiperSlide key={`home_carousel_${i}`}>
          <img className="animationZoom" style={carouselImageStyle} src={homeCarousel(isSP)[i].image} alt={homeCarousel(isSP)[i].title[0]}/>
          <div className="placeCenter">
            <h3 style={carouselMessageStyle}>自家農園の季節の柑橘を贅沢に使用した<br/>手作りイタリアンスイーツ</h3>
            <h1 style={carouselItTitleStyle}>{homeCarousel(isSP)[i].title[1]}</h1>
            <h1 style={carouselJaTitleStyle}>{homeCarousel(isSP)[i].title[0]}</h1>
          </div>
        </SwiperSlide>
      )}</Swiper>
      <div ref={blockRef} className={isPC ? "flex_center": undefined} style={topStyle}>
        {homeTop.map((_, i: number) => 
          <HomePicture
            width={width}
            color={"linear-gradient(to right bottom, var(--blue), var(--darkblue))"}
            title={homeTop[i].title}
            image={homeTop[i].image}
            features={homeTop[i].features}
            message={homeTop[i].message}
            key={`home_top_${i}`}
          />
        )}
      </div>
    </div>
  </section>
}

export default HomeTop

    // borderBottom: "10px double var(--blue)",
