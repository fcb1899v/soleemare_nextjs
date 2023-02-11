import { NextPage } from 'next'
import styles from '../styles/HomeFeature.module.css'
import PictureYellowContent from './PictureYellowContent'

interface Props {
  num: string
  title: string
  image1: string
  image2: string
  message1: string
  messages1: string[]
  message2: string
  messages2: string[]
}
  
const HomeFeatureContent: NextPage<Props> = ({ num, title, image1, image2, message1, messages1, message2, messages2 }) => {
  return (
    <div className={styles.contents}>
      <div className={styles.title}>
        <img src={num} alt={title}></img>
        <h2>{title}</h2>
      </div>
      <div className={styles.container}> 
        <PictureYellowContent
          isTitle={false}
          itTitle=''
          jaTitle=''
          image={image1}
          message1={message1}
          messages={messages1}
        />
        <PictureYellowContent
          isTitle={false}
          itTitle=''
          jaTitle=''
          image={image2}
          message1={message2}
          messages={messages2}
        />
      </div>
    </div>
  );
};

export default HomeFeatureContent
