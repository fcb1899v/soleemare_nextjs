export const infoMessage = [
  'クラウドファンディングMakuake（マクアケ）にて、「スフォリアテッラ」の先行予約を開始し、予定数量を完売いたしました。',
  'ご支援いただいた皆様には、感謝しかありません。おかげ様の精神で、皆様においしいスフォリアテッラがお届けできるように精進いたします。',
];

export const shopifyItems = [
  {
    id: `${process.env.NEXT_PUBLIC_SHOPIFY_SFOGLIATELLA_ID}`,
    unit: '箱',
    variant: 0,
  }
]
    
export const homeCarousel = (isSP: boolean) => [
  {
    title: ["スフォリアテッラ", "Sfogliatella",],
    image: isSP ? "/images/sfogliatella_mobile.jpg": "/images/sfogliatella_pc.jpg",
  },
//   {
//     title: ["パスティチョッティ", "Pasticciotti",],
//     image: isSP ? "/images/pasticciotti.jpg": "/images/pasticciotti.jpg",
//   },
//   {
//     title: ["ソスピーリ", "Sospiri",],
//     image: isSP ? "/images/sospiri.jpeg": "/images/sospiri.jpeg",
//   }
]

export const homeTop = [
  {
    title: ['ソレ・エ・マーレ', 'Sole e Mare'],
    image: "/images/sunandsea.jpeg",
    features: '　ソレ エ マーレ（Sole e Mare）とは、神奈川県小田原市のイタリアンスイーツ店です。イタリア語で『太陽と海』という意味があリます。',
    message: [
      '　相模湾を望み温暖な気候の小田原市根府川地区に家族で運営する自家農園で、レモン・みかん・甘夏・湘南ゴールドなどの柑橘を栽培していて、季節の柑橘を贅沢に使用したイタリアンスイーツが特徴です。',
      '　小田原市根府川地区は伊豆半島東側の付け根にあり、太陽の光がさんさんと降り注ぐ温暖な気候を有し、入り組んだリアス海岸が続く垂直に切り立った断崖の斜面に、たくさんの柑橘畑があります。',
      '　農園から見る景色は、まさにソレ エ マーレ。10月の早生みかんから収穫が始まり、翌年の5月ごろまで次々と旬を迎える季節の柑橘を食べることが、小さい頃からの私の楽しみです。',
    ]
  },
  {
    title: ['', ''],
    image: "/images/amalfi.png",
    features: '　2009年、私はイタリア南部カンパニア州のアマルフィ海岸を訪問し、小田原市根府川地区と強いシンパシーを感じました。',
    message: [
      '　アマルフィ海岸には、小田原市根府川地区と同様、温暖な気候とリアス海岸の断崖にたくさんの柑橘畑があります。スフォリアテッラなどの季節の柑橘を使用した美味しいイタリアンスイーツを食べたことも、忘れられない大切な思い出です。',
      '　イタリアンスイーツを通じて、自家農園の季節の柑橘を感じていただきたい。私がソレエマーレを始めた理由です。',
    ]
  }
]

export const homeFeatures = [
  {
    title: '自家農園の柑橘を贅沢に使用', 
    image: ["/images/farm1.jpg", "/images/farm2.jpg",],
    features: [
      '　当店のスフォリアテッラは、爽やかな酸味と芳醇な香りが特徴の自家農園のこだわりの柑橘を贅沢に使用しています。',
      '　収穫したての新鮮な柑橘は特に香りが強く、収穫している私の心をいつも幸せな気持ちにさせてくれます。',
    ],
    message: [
      ['　自家製の柑橘ピールを手作りリコッタチーズに混ぜ込んだクリームが贅沢に入っていて、自家農園のこだわり柑橘を存分に味わうことができます。',],
      ['　農薬については、収穫期の散布は避け、半年前ごろに1度しか散布していません。また、防カビ剤、防腐剤、ワックスなどのポストハーベスト農薬は全く使用していません。',],
    ],
  },
  {
    title: '心を込めた手作りスイーツ', 
    image: ["/images/sfogliatella1.jpg", "/images/crust.jpg",],
    features: [
      '　当店のスフォリアテッラは、ひとつひとつ心を込めて手作りしています。',
      '　スフォリアテッラの生地作りの工程は、繊細な技術が必要なため、量産が難しいと言われています。',
    ],    
    message: [
      ['　柑橘の収穫から始まり、生地やクリームの原材料の仕込み、生地作り、焼成、パッケージまでの全工程を一貫生産しています。',],
      ['　何度も試作を重ねながら、生地作りの技術を習得し、また、生地の原材料や厚み、焼成温度および焼成時間を試行錯誤することで、独特のパリパリ食感と香り高い風味を実現しました。',],
    ],
  }, 
  {
    title: 'こだわりの厳選素材', 
    image: ["/images/cream.jpg", "/images/lard.jpg",],
    features: [
      '　当店のスフォリアテッラは、イタリア伝統のフレッシュチーズ「リコッタチーズ」を使用しています。',
      '　当店のスフォリアテッラは、独特のパリパリ食感を実現するために国産無添加ラードを使用しています。',
    ],    
    message: [
      [
        '　リコッタチーズに、自家製柑橘ピール、北海道産てんさい糖、イタリア産セモリナ小麦粉、オーガニックシナモンなどの厳選素材を加えて、スフォリアテッラ用のクリームが完成します。',
        '　リコッタチーズの特徴は、さっぱりとした口当たりと自然なミルクの甘さで、高タンパク・低脂肪・低カロリーな上、カルシウムやカリウム、ビタミンなどが含まれています。',
      ],
      [
        '　鮮度のよい国産豚脂を平釜で時間をかけてゆっくりと炊き上げた無添加ラードの鼻から抜ける香ばしくも甘い香りと特有のコクのあるうまみは格別です。',
        '　ラードが体に良くないイメージがあるかもしれませんが、実は、トランス脂肪酸フリーで、成長期の子どもに不足しがちなビタミンAやビタミンEを多く含んでいます。また、カロリーも植物油と比較してほとんど差はありません。',
      ],
    ],
  },
]

// '最強力粉とは強力粉の中でも最もたんぱく質を多く含む小麦粉です。灰分が高いため小麦の風味が強く、また、スフォリアテッラの特徴である表面のパリパリ感を生み出すことができます。'
// 'てんさい糖とは、イタリアで主流のてんさい（ビート・砂糖大根）が原料の砂糖です。腸内環境を整える天然のオリゴ糖が含まれているため、血糖値の上昇を緩やかにし、身体を温める効果が期待できます。'
// 'イタリアが発祥地のリコッタチーズは、チーズ製造時に出るホエイを煮詰めて固めたフレッシュチーズです。高タンパク・低脂肪・低カロリーな上、カルシウムやカリウム、ビタミンなどが含んでおり、さっぱりとした口当たりと自然なミルク甘さが特徴です。'

export const homeProducts = [
  { 
    title: [
      ["スフォリアテッラ", "Sfogliatella"],
      ["", ""]
    ],
    image: [
      "/images/sfogliatella3.jpg", 
      "/images/sfogliatella2.jpg",
    ],
    features: [
      '　スフォリアテッラとは、イタリア南部カンパニア州ナポリの名物焼き菓子です。',
      '　スフォリアテッラには、イタリア語で「ひだを何枚も重ねた」という意味があります。',
    ],
    message: [
      [
        '　17世紀にアマルフィ海岸に面したリマの聖ローサ修道院で生まれた焼き菓子「サンタローサ」のレシピを、1818年にナポリのピンタウロ（Pintauro）氏がそのレシピを改良して生まれました。',
        '　ナポリ以外でも、イタリアの高級レストランのデザートとして登場することもあります。',
      ],
      [
        '　何層も重ねた貝殻形状のパイ生地の中に、リコッタチーズクリームなどのクリームを入れ、オーブンで焼き上げます。',
        '　本場ナポリと同様、バターではなくラードを使用し、低温でじっくり焼き上げるため、クロワッサンのようなサクサク食感ではなく、新感覚のパリパリ食感を生み出すことができます。',
      ],
    ],
  }
] 

export const myHeaderMenu = [
    {
      title: "トップ",
      link: "top",
    },
    {
      title: "商品紹介",
      link:  "products",
    },
    {
      title: "当店のこだわり",
      link: "features",
    },
    {
      title: "お知らせ",
      link: "info",
    },
  ]
  
  export const myFooterMenu = [
    {
      title: "ホーム",
      link: "/",
    },
    {
      title: "お問い合わせ",
      link: "/inquiry",
    },
    {
      title: "プライバシーポリシー",
      link: "/privacypolicy",
    },
  ]

  export const mySNS = [
    {
      title: "X",
      image: [`/sns/x_w.png`, `/sns/x_b.png`],
      link: "https://twitter.com/soleemare_dolce",
    },
    {
      title: "Makuake",
      image: ["/sns/makuake_logo.png", "/sns/makuake_logo.png"],
      link: "https://www.makuake.com/project/sole_e_mare/",
    },
    {
      title: "Instagram",
      image: [`/sns/instagram_w.svg`, `/sns/instagram_b.svg`],
      link: "https://www.instagram.com/soleemare_dolce/",
    },
    {
      title: "Line",
      image: ["/sns/line_w.svg", `/sns/line_b.svg`],
      link: "https://lin.ee/65M8hVl",
    },
    {
      title: "Tiktok",
      image: ["/sns/tiktok_w.svg", "/sns/tiktok_b.svg"],
      link: "https://www.tiktok.com/@soleemare_dolce",
    },
    // {
    //   title: "Facebook",
    //   image: ["/sns/facebook_w.svg", "/sns/facebook_b.svg"],
    //   link: "https://www.facebook.com/soleemaredolce",
    // },
    //{
    //   title: "Mercari",
    //   image: ["/sns/mercari_w.png", "/sns/mercari_b.png"],
    //   link: "https://mercari-shops.com/shops/jDp6gDDhYbMb8kTq8ZSWcX",
    // },
  ];
  

  