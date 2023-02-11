import * as React from 'react';
import { useLayoutEffect, useState } from 'react';
import styles from '../styles/HomeTop.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation, EffectFade, Autoplay } from 'swiper'

SwiperCore.use([Pagination, Navigation]) 

const pcImages = [
  "../images/sfogliatella_pc.jpg",
  // "../images/pasticciotti.jpg",
  // "../images/sospiri.jpeg",
]

const mobileImages = [
  "../images/sfogliatella_mobile.jpg",
  // "../images/pasticciotti.jpg",
  // "../images/sospiri.jpeg",
]

const itTitles = [
  "Sfogliatella",
  // "Pasticciotti",
  // "Sospiri",
]

const jaTitles = [
  "スフォリアテッラ",
  // "パスティチョッティ",
  // "ソスピーリ",
]

const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export default function HomeTopCarousel() {
  const [width, height] = useWindowSize();
  var images = width < 520 ? mobileImages: pcImages;
  return (
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
      className={styles.mySwiper} 
    >
    {images.map((src: string, index: number) => {
      return (
        <SwiperSlide key={`${index}`}>
          <img className={styles.zoom} src={src} alt={index.toString()}/>
          <div className={styles.title}>
            <h3>自家農園の季節の柑橘を贅沢に使用した<br/>手作りイタリアンスイーツ</h3>
            <h1><span>{itTitles[index]}</span></h1>
            <h1>{jaTitles[index]}</h1>
          </div>
        </SwiperSlide>
      )
    })}</Swiper>
  )
}
