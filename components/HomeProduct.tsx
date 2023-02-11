import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../styles/HomeProduct.module.css'
import PictureYellowContent from './PictureYellowContent'


const message1_sfogliatella_history = 
  '　スフォリアテッラとは、イタリア南部カンパニア州ナポリの名物焼き菓子です。';
const messages_sfogliatella_history = [
  '　17世紀にアマルフィ海岸に面したリマの聖ローサ修道院で生まれた焼き菓子「サンタローサ」のレシピを、1818年にナポリのピンタウロ（Pintauro）氏がそのレシピを改良して生まれました。',
  '　ナポリ以外でも、イタリアの高級レストランのデザートとして登場することもあります。',
];

const message1_sfogliatella_feature = 
  '　スフォリアテッラには、イタリア語で「ひだを何枚も重ねた」という意味があります。';
const messages_sfogliatella_feature = [
  '　何層も重ねた貝殻形状のパイ生地の中に、リコッタチーズクリームなどのクリームを入れ、オーブンで焼き上げます。',
  '　本場ナポリと同様、バターではなくラードを使用し、低温でじっくり焼き上げるため、クロワッサンのようなサクサク食感ではなく、新感覚のパリパリ食感を生み出すことができます。',
];

export default function　HomeProduct() {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => { 
    window.scrollY > 0 ? setIsVisible(true): setIsVisible(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div id="products" className={isVisible ? styles.products: styles.none}>
      <div className={styles.products_title}>
        <h2>商品紹介</h2>
      </div>
      <div className={styles.container}>
        <PictureYellowContent
          isTitle={true}
          itTitle="Sfogliatella"
          jaTitle='スフォリアテッラ'
          image="../images/sfogliatella3.jpg"
          message1={message1_sfogliatella_history}
          messages={messages_sfogliatella_history}
        />
        <PictureYellowContent
          isTitle={false}
          itTitle=""
          jaTitle=''
          image="../images/sfogliatella2.jpg"
          message1={message1_sfogliatella_feature}
          messages={messages_sfogliatella_feature}
        />
      </div>  
    </div>
  );
};

// スクロールをしたら下から表示される
// window.addEventListener('scroll', showElementAnimation);
// function showElementAnimation() {
//     var element = document.getElementsByClassName('js-animation');
//     if(!element) return; // 要素がなかったら処理をキャンセル
//     var showTiming = window.innerHeight > 768 ? 200 : 40; // 要素が出てくるタイミングはここで調整
//     var scrollY = window.pageYOffset;
//     var windowH = window.innerHeight;
//     for(var i=0;i<element.length;i++) { 
//         var elemClientRect = element[i].getBoundingClientRect(); 
//         var elemY = scrollY + elemClientRect.top; 
//         if(scrollY + windowH - showTiming > elemY) {
//             element[i].classList.add('is-show');
//         } else if(scrollY + windowH < elemY) {
//         // 上にスクロールして再度非表示にする場合はこちらを記述
//             element[i].classList.remove('is-show');
//         }
//     }
// }
