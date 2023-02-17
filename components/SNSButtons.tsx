import { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const alternatives: string[] = [
  "Twitter",
  "Instagram",
  "Makuake",
  "Line",
  "Facebook"
  // "Tiktok",
  // "Mercari",
];

const icons: string[] = [
  "../sns/instagram_w.svg",
  "../sns/twitter_w.svg",
  "../sns/makuake_logo.png",
  "../sns/line_w.svg",
  "../sns/facebook_w.svg",
  // "../sns/tiktok_w.svg",
  // "../sns/mercari_w.png",
];

const urls: string[] = [
  "https://www.instagram.com/soleemare_dolce/",
  "https://twitter.com/soleemare_dolce",
  "https://www.makuake.com/project/sole_e_mare/",
  "https://lin.ee/65M8hVl",
  "https://www.facebook.com/soleemaredolce",
  // "https://www.tiktok.com/@soleemare_dolce",
  // "https://jp.mercari.com/",
];

const SNSButtons: NextPage = () => {
  const sns_list = [];
  for (let i = 0; i < alternatives.length; i++) {
    sns_list.push( 
      <ul className={styles.snsButton}>
        <a href={urls[i]} target="_blank" rel="noreferrer" className={styles.snsLink}>
          <img src={icons[i]} alt={alternatives[i]}/>
        </a>
      </ul>
    )
  }
  return (
    <div className={styles.snsList}> 
      {sns_list}
    </div>
  );
};

export default SNSButtons
