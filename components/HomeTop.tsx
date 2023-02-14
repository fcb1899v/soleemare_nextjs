import React, {useEffect, useState} from "react"
import styles from '../styles/HomeTop.module.css'
import HomeTopCarousel from './HomeTopCarousel'
import PictureBlueContent from "./PictureBlueContent";
import ShoppingButton from "./ShoppingButton";

const message1_soleemare = 
  '　ソレ エ マーレ（Sole e Mare）とは、神奈川県小田原市のイタリアンスイーツ店です。イタリア語で『太陽と海』という意味があリます。'
const messages_soleemare = [
  '　相模湾を望み温暖な気候の小田原市根府川地区に家族で運営する自家農園で、レモン・みかん・甘夏・湘南ゴールドなどの柑橘を栽培していて、季節の柑橘を贅沢に使用したイタリアンスイーツが特徴です。',
  '　小田原市根府川地区は伊豆半島東側の付け根にあり、太陽の光がさんさんと降り注ぐ温暖な気候を有し、入り組んだリアス海岸が続く垂直に切り立った断崖の斜面に、たくさんの柑橘畑があります。',
  '　農園から見る景色は、まさにソレ エ マーレ。10月の早生みかんから収穫が始まり、翌年の5月ごろまで次々と旬を迎える季節の柑橘を食べることが、小さい頃からの私の楽しみです。',
];

const message1_amalfi = 
  '　2009年、私はイタリア南部カンパニア州のアマルフィ海岸を訪問し、小田原市根府川地区と強いシンパシーを感じました。'
const messages_amalfi = [
  '　アマルフィ海岸には、小田原市根府川地区と同様、温暖な気候とリアス海岸の断崖にたくさんの柑橘畑があります。スフォリアテッラなどの季節の柑橘を使用した美味しいイタリアンスイーツを食べたことも、忘れられない大切な思い出です。',
  '　イタリアンスイーツを通じて、自家農園の季節の柑橘を感じていただきたい。私がソレエマーレを始めた理由です。',
];

export default function HomeTop() {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => { 
    window.scrollY > 0 ? setIsVisible(true): setIsVisible(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return <div>
    {/* <ShoppingButton isVisible={isVisible}/> */}
    <div className={styles.carouselstyle}>
      <HomeTopCarousel/>
    </div>
    <div className={styles.container}>
      <PictureBlueContent
        isTitle={true}
        itTitle='Sole e Mare'
        jaTitle='ソレ・エ・マーレ'
        image="/images/sunandsea.jpeg"
        message1={message1_soleemare}
        messages={messages_soleemare}
      />
      <PictureBlueContent
        isTitle={false}
        itTitle=''
        jaTitle=''
        image="/images/amalfi.png"
        message1={message1_amalfi}
        messages={messages_amalfi}
      />
    </div>
  </div>
}
