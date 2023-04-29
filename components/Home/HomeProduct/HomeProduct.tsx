import { NextPage } from 'next';
import React from 'react'
import styles from '/styles/Product.module.css'
import HomeProductContent from './HomeProductContent';

const itTitles = [
  "Sfogliatella",
] 

const jaTitles = [
  "スフォリアテッラ",
] 

const images = [
  [
    "../images/sfogliatella3.jpg",
    "../images/sfogliatella2.jpg",
  ],
]

const message = [
  [
    '　スフォリアテッラとは、イタリア南部カンパニア州ナポリの名物焼き菓子です。',
    '　スフォリアテッラには、イタリア語で「ひだを何枚も重ねた」という意味があります。',
  ],
]
const messages = [
  [
    [
      '　17世紀にアマルフィ海岸に面したリマの聖ローサ修道院で生まれた焼き菓子「サンタローサ」のレシピを、1818年にナポリのピンタウロ（Pintauro）氏がそのレシピを改良して生まれました。',
      '　ナポリ以外でも、イタリアの高級レストランのデザートとして登場することもあります。',
    ],
    [
      '　何層も重ねた貝殻形状のパイ生地の中に、リコッタチーズクリームなどのクリームを入れ、オーブンで焼き上げます。',
      '　本場ナポリと同様、バターではなくラードを使用し、低温でじっくり焼き上げるため、クロワッサンのようなサクサク食感ではなく、新感覚のパリパリ食感を生み出すことができます。',
    ],
  ],
];

const HomeProduct: NextPage = () => {

  const product_contents = [];
  for (var i = 0; i < itTitles.length; i++) {
    product_contents.push(
      <div key={`homeproduct_${i}`}>
        <HomeProductContent
          itTitle={itTitles[i]}
          jaTitle={jaTitles[i]}
          images={images[i]}
          message={message[i]}
          messages={messages[i]}
        />
      </div>
    )
  }
  return (
    <section id="products" className={styles.products}>
      <div className={styles.products_title}>
        <h2><span>Prodotto</span><br/>商品紹介</h2>
      </div>
      {product_contents}
    </section>
  );
};

export default HomeProduct