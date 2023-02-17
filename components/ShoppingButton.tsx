import { NextPage } from 'next'
import React, { useEffect } from "react"
import styles from '../styles/HomeTop.module.css'

interface Props  {
  isVisible: boolean
}
const ShoppingTitle: NextPage = () => {
  const shoppingClick = () => {
    gtag('event','to_store',{'event_category':'want','event_label':'buy','value':1})
  }
  return (
    <a onClick={shoppingClick} href="https://shop.sole-e-mare.com" target="_blank" rel="noopener noreferrer">
      オンラインショップはこちら
    </a>
  );
};
const ShoppingButton: NextPage<Props> = ({ isVisible }) => {
  return (
    <div className={isVisible ? styles.shopping: styles.shoppingNone}>
      <ShoppingTitle/>
    </div>
  );
};

export default ShoppingButton
