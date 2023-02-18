import { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/HomeInfo.module.css'

interface Props {
  href: string
  src: string
  alt: string
}
  
const SNSLink: NextPage<Props> = ({ href, src, alt }) => {
  return (
    <div className={styles.title}>
      <h3>{alt}</h3>
      <div className={styles.snsIcon}>
        <Link href={href} target="_blank" rel="noreferrer" className={styles.snsLink}>
          <img src={src} alt={alt}/>
        </Link>
      </div>
    </div>
  );
};

export default SNSLink
