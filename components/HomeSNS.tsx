import { NextPage } from 'next'
import styles from '../styles/HomeInfo.module.css'
import HomeInstagram from './HomeInstagram'
import HomeTwitter from './HomeTwitter'
import HomeTiktok from './HomeTiktok'

const HomeSNS: NextPage = () => {
 
  const onScrollTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  return (
    <div id="sns" className={styles.info}>
      <div className={styles.contents}>
        <HomeInstagram/>
        <HomeTwitter/>
        {/* <HomeTiktok/> */}
      </div>
      <div className={styles.toTop} onClick={onScrollTop}>
        <h5>ページトップへ戻る</h5> 
      </div>
    </div>
  );
};

export default HomeSNS
  
  