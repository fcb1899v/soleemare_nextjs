import { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Shopify.module.css'
import Client, {Checkout, Product} from 'shopify-buy'
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface ShopifyProductProps{
  id: string
  unit: string
  variantNumber: number
}

const options = [1, 2, 4];

const ShopifyProduct: NextPage<ShopifyProductProps> = ({id, unit, variantNumber}) => { 

  const productID = `gid://shopify/Product/${id}`;
  const [salesProduct, setSalesProduct] = useState<Product|null>(null);
  const [isSoldOut, setIsSoldOut] = useState(true);
  const [checkoutLink, setCheckoutLink] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isChangeQuantity, setIsChangeQuantity] = useState(false);  
  const updateQuantity = (e: SelectChangeEvent<number>) => setQuantity(Number(e.target.value));
  
  const client = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "",
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || "",
    apiVersion: '2023-04',
    language: 'ja-JP'
  });        

  useEffect(() => {
    (async () => {
      setIsChangeQuantity(true);
      try {
        const fetchedProduct: Product = await client.product.fetch(productID);
        setSalesProduct(fetchedProduct);
        setIsSoldOut(!fetchedProduct.availableForSale);  
        const checkout: Checkout = await client.checkout.create();
        await client.checkout.addLineItems(checkout.id, [{ 
          variantId: fetchedProduct.variants[variantNumber].id, 
          quantity: quantity
        }]).then((checkoutResult) => {
          setCheckoutLink(checkoutResult.webUrl);
          setIsChangeQuantity(false);
        });
      } catch (error) {
        console.error(error);
        setIsChangeQuantity(false);
      }
    })();
  }, [quantity]);

  if (checkoutLink == "" || salesProduct == null) return null;

  return (
    <div className={styles.shopify}>
      {
        <div className={styles.container}>
          <FormControl variant="standard">
          <InputLabel className={styles.product_title}>{salesProduct.title}</InputLabel>
          <Select className={styles.select_amount} value={quantity} onChange={updateQuantity}>
            {
              options.map((option) => 
                <MenuItem value={option} key={`${salesProduct.id}_${option}`}>
                  {`${option}${unit}：${Number(salesProduct.variants[variantNumber].price.amount * option)}円`}
                </MenuItem>
              )
            }
          </Select>
          </FormControl>
          <br className={styles.sp_br}/>
          <div className={(isSoldOut || isChangeQuantity) ? styles.soldout_button: styles.buy_button}>              
            {
              (isChangeQuantity) ?  
                <CircularProgress className={styles.progress}/>:   
                <Link href={checkoutLink} target="_blank" rel="noreferrer">
                  {isSoldOut ? "Coming Soon": "注文する"}
                </Link>
            }       
          </div>
        </div>
      }
    </div>
  );
}

export default ShopifyProduct

// href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/products/${product.handle}`}
