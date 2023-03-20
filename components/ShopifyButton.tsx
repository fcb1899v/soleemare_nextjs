import { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Client, { Cart } from 'shopify-buy'
import styles from '../styles/Shopify.module.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { CircularProgress } from '@mui/material';

interface Props{
  num: number
}

const options = [
  { value: 1, label: "1箱", price: "¥1,600" },
  { value: 2, label: "2箱", price: "¥3,200" },
  { value: 4, label: "4箱", price: "¥6,400" },
  { value: 8, label: "8箱", price: "¥12,800" },
];

const ShopifyButton: NextPage<Props> = ({num}) => { 
  const [products, setProducts] = useState([]);
  const [isCheckOut, setIsCheckOut] = useState(true);
  const [checkoutLink, setCheckoutLink] = useState("");
  const [quantity, setQuantity] = useState(1);  
  const updateQuantity = (e: any) => {
    const newQuantity = Number(e.target.value);
    setIsCheckOut(false);
    setQuantity(newQuantity);
  }

  useEffect(() => {
    (async () => {
      const client = Client.buildClient({
        domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "",
        storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || "",
        apiVersion: '2023-01',
        language: 'ja-JP'
      });  
      const products: any = await client.product.fetchAll();
      setProducts(products);
      setQuantity(quantity);
      if (!isCheckOut) setTimeout(() => setIsCheckOut(true), 3000);  
      client.checkout.create().then((checkout: any) => {
        const variantsId = products[num].variants[0].id;
        client.checkout.addLineItems(checkout.id, [{ variantId: variantsId, quantity: quantity}])
          .then((checkout) => {
            setCheckoutLink(checkout.webUrl);
          });
      });
    })();
  }, [quantity, isCheckOut]);

  return (
    (checkoutLink == "") ? null:
    <section className={styles.shopify}>
      {
        products.map((product: any, i: number) => 
          (i == num) ?
            <div className={styles.shopify_container} key={product.id} >
              <FormControl variant="standard">
                <InputLabel className={styles.product_title}>{product.title}</InputLabel>
                <Select className={styles.select_amount} value={quantity} onChange={updateQuantity}>
                  {
                    options.map((option) => 
                      <MenuItem value={option.value} key={`option_${option.value}`}>
                        {`${option.label} : ${option.price}`}
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
              <br className={styles.sp_br}/>
              {
                (isCheckOut) ? 
                <div className={styles.buy_button}>              
                  <Link href={checkoutLink} target="_blank" rel="noreferrer">注文する</Link>       
                </div>:
                <div className={styles.buy_button_off}>              
                  <CircularProgress className={styles.progress}/>       
                </div>
              }
            </div>
            : null
        )
      }
    </section>
  );
}

export default ShopifyButton

// href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/products/${product.handle}`}
