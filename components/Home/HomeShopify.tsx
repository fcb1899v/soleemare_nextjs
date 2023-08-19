import { NextPage } from 'next'
import Link from 'next/link';
import { CSSProperties, useEffect, useState } from 'react';
import Client, {Checkout, Product} from 'shopify-buy'
import { CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import HomeImage from './HomeImage';
import BlueBorder from '../Common/BlueBorder';

interface Props{
  width: number
  item: {
    id: string
    unit: string
    variant: number  
  }
}

const options = [1, 2, 4];

const HomeShopify: NextPage<Props> = ({width, item}) => { 

  const isSP = (width < 600)
  const isPC = (width > 1024)

  const productID = `gid://shopify/Product/${item.id}`;
  const [salesProduct, setSalesProduct] = useState<Product|null>(null);
  const [isSoldOut, setIsSoldOut] = useState(true);
  const [checkoutLink, setCheckoutLink] = useState("");
  const [quantity, setQuantity] = useState(1);
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

  useEffect(() => {(async () => {
    setIsChangeQuantity(true);
    try {
      const fetchedProduct: Product = await client.product.fetch(productID);
      setSalesProduct(fetchedProduct);
      setIsSoldOut(!fetchedProduct.availableForSale);  
      const checkout: Checkout = await client.checkout.create();
      await client.checkout.addLineItems(checkout.id, [{ 
        variantId: fetchedProduct.variants[item.variant].id, 
        quantity: quantity
      }]).then((checkoutResult) => {
        setCheckoutLink(checkoutResult.webUrl);
        setIsChangeQuantity(false);
      });
    } catch (error) {
      console.error(error);
      setIsChangeQuantity(false);
    }
  })();}, [quantity]);

  if (checkoutLink == "" || salesProduct == null) return null;

  const selectLabelStyle: CSSProperties = {
    fontSize: 24,
    color: "var(--black)",
    top: -10,
  }
  const selectAmountStyle: CSSProperties = {
    fontSize: 22,
    width: 260,
    height: 60, 
    backgroundColor: "var(--white)",
  }

  const buyButtonStyle: CSSProperties = {
    display: "block",
    width: 240, 
    height: 36,
    padding: 10,
    margin: isSP ? "30px auto": undefined, 
    borderRadius: 30,
    background: (isSoldOut || isChangeQuantity) ? 
      "linear-gradient(to right bottom, var(--gray), var(--transpgray))":
      "linear-gradient(to right bottom, var(--yellow), var(--orange))"
  }
  const buyTextStyle: CSSProperties = {
    fontSize: 22,
    fontWeight: "bold", 
    color: (isSoldOut || isChangeQuantity) ? "var(--white)": "var(--black)",
    textDecoration: "none",
  }
  const progressStyle: CSSProperties = {
    width: 36, 
    height: 36,
    color: "var(--white)",
  }
  const buyText: string = isSoldOut ? "売り切れ": "予約する"
  
  return (<div style={{margin: "20px 0 0"}}>
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
          <div style={{margin: "30px 10px 60px 10px"}}>
            <HomeImage 
              width={width} 
              color={"linear-gradient(to right bottom, var(--yellow), var(--orange))"} 
              title={[""]} 
              image={image.src}
            />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
    <div className={isSP ? "block": "flex_center"} style={{margin: "0 auto 50px", columnGap: 50}}>
      <FormControl variant="standard">
        <InputLabel style={selectLabelStyle}>{`${salesProduct.title.split(' ')[0]}`}</InputLabel>
        {/* {<FormHelperText>{`${salesProduct.title.split(' ')[1]}`}</FormHelperText>} */}
        <Select style={selectAmountStyle} value={quantity} onChange={updateQuantity}>
          {options.map((option) => 
            <MenuItem value={option} key={`${salesProduct.id}_${option}`}>
              {`${option}${item.unit}：¥${Number(salesProduct.variants[item.variant].price.amount * option + 980)} (送料込)`}
            </MenuItem>
          )}
        </Select>
      </FormControl>
      {isSP && <br/>}
      <div style={buyButtonStyle}>              
        {
          (isChangeQuantity) ? 
            <CircularProgress style={progressStyle}/>:   
            <Link href={checkoutLink} style={buyTextStyle} target="_blank" rel="noreferrer">{buyText}</Link>
        }       
      </div>
    </div>
    <BlueBorder/>
  </div>);
}

export default HomeShopify

// href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/products/${product.handle}`}
