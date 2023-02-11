import { NextPage } from 'next'
import styles from '../styles/Header.module.css'

interface Props  {
  alt: string
  icon: string
  link: string
}
  
const MovePage: NextPage<Props> = ({ alt, icon, link }) => {
  return (
    <ul className={styles.snsButton}>
      <a href={link} target="_blank" rel="noreferrer" className={styles.snsLink}>
        <img src={icon} alt={alt}/>
      </a>
    </ul>
  );
};

export default MovePage
