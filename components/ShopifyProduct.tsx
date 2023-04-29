import { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '/styles/Shopify.module.css'
import Client, {Checkout, Product} from 'shopify-buy'
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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
  const [inventoryQuantity, setInventoryQuantity] = useState(1);
  const [isChangeQuantity, setIsChangeQuantity] = useState(false);  
  const [isOnDestroy, setOnDestroy] = useState(false);
  const updateQuantity = (e: SelectChangeEvent<number>) => setQuantity(Number(e.target.value));
  
  const client = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "",
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || "",
    apiVersion: '2023-04',
    language: 'ja-JP'
  });        

  const adminUrl = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_DOMAIN || '';

  const adminConfig = {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "content-type": "application/json",
      'X-Shopify-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN || '',
    },
  };

  SwiperCore.use([Autoplay]);

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
        // const response = await fetch(adminUrl, adminConfig);
        // console.log(response);
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
        <div className={styles.swiper_image}>
            <Swiper
              loop={true}    
              loopedSlides={100}
              slidesPerView={1}
              centeredSlides={true}
              spaceBetween={10}
              speed={8000}
              autoplay={isOnDestroy ? false: {delay: 0, disableOnInteraction: false}}
              breakpoints={{ 960: {slidesPerView: 2,},}}
              onBeforeDestroy={() => setOnDestroy(true)}
            >
              {salesProduct.images.map((image: any, i: number) => 
                <SwiperSlide key={`${image.id}`}>
                  <div className={styles.border__yellow}>
                    <div className={styles.box}>
                      <img src={image.src} className={styles.product_image} alt={`${salesProduct.title}_${i}`}/>
                    </div>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
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
        </div>
      }
    </div>
  );
}

export default ShopifyProduct

// href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/products/${product.handle}`}
// `在庫数：${salesProduct.variants[variantNumber].inventory_quantity}`