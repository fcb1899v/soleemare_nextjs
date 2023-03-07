import { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Client from 'shopify-buy'
import styles from '../styles/HomeProduct.module.css'

interface Props{
  i: number
}

const ShopifyButton: NextPage<Props> = ({i}) => { 
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const client = Client.buildClient({
        domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "",
        storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || "",
        apiVersion: '2023-01'
      });  
      const products: any = await client.product.fetchAll();
      setProducts(products);
    })();
  }, []);
  return (
    <div className={styles.shopify_container} >
      {
        products.map((product: any, j: number) => 
          (j == i) ?
            <Link key={product.id} className={styles.shopify_button} href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/products/${product.handle}`} target="_blank" rel="noreferrer">
              {`　注文する（¥${product.variants[0].price.amount.slice(0, -2)}〜）` }              
            </Link>
            : null
        )
      }
    </div>
  );
}

export default ShopifyButton