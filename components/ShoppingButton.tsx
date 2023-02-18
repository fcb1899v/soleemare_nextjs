import { NextPage } from 'next'
import Link from 'next/link';
import React, { useEffect } from "react"
import styles from '../styles/HomeTop.module.css'

interface Props  {
  id: number
}

const ShoppingButton: NextPage<Props> = ({ id }) => {
  const shoppingClick = () => {
    gtag('event','to_buy',{'event_category':'want','event_label':'buy','value': 1})
  }
  return (
    <div className={styles.shopping}>
      <Link onClick={shoppingClick} href="https://shop.sole-e-mare.com" target="_blank" rel="noopener noreferrer">
        購入する
      </Link>
    </div>
  );
};

export default ShoppingButton
