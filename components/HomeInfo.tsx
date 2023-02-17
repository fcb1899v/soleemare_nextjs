import { NextPage } from 'next'
import styles from '../styles/HomeInfo.module.css'
import bg from 'public/images/wave_blue.png'
import HomeInstagram from './HomeInstagram'
import HomeTwitter from './HomeTwitter'
import HomeTiktok from './HomeTiktok'

const messages_info = [
  'クラウドファンディングMakuake（マクアケ）にて、「スフォリアテッラ」の先行予約を開始し、予定数量を完売いたしました。',
  'ご支援いただいた皆様には、感謝しかありません。おかげ様の精神で、皆様においしいスフォリアテッラがお届けできるように精進いたします。',
];

const HomeSNS: NextPage = () => {
 
  const onScrollTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="info" className={styles.info}>
      <div className={styles.info}>
        <h2>お知らせ</h2>
      </div>
      <div className={styles.border__info}>
        <div className={styles.table} style={{backgroundImage: `linear-gradient(rgba(244, 245, 240, 0.6),rgba(244, 245, 240, 0.6)), url(${bg.src})`}}>
          <table>
            <tbody>
              {
                messages_info.map((value: string, i: number) => <tr key={i}><td>{value}</td></tr>) 
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.contents}>
        <HomeInstagram/>
        <HomeTwitter/>
        {/* <HomeTiktok/> */}
      </div>
      <div className={styles.toTop} onClick={onScrollTop}>
        <h4>ページトップへ戻る</h4> 
      </div>
    </section>
  );
};

export default HomeSNS
  
  