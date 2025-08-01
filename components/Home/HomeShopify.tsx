/**
 * HomeShopify.tsx
 * 
 * Shopify product display and purchase component
 * 
 * Features:
 * - Fetch product information using Shopify API
 * - Display product images in slider
 * - Quantity selection and purchase button
 * - Generate checkout links
 * - Responsive design support
 * 
 * Required environment variables:
 * - NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: Shopify store domain
 * - NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN: Shopify Storefront API access token
 * - NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN: Shopify Admin API access token
 */

import { NextPage } from 'next'
import Link from 'next/link';
import { CSSProperties, useEffect, useState } from 'react';
import Client, {Checkout, Product} from 'shopify-buy'
import { CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import HomeImage from './HomeImage';
import BlueBorder from '../Common/BlueBorder';

/**
 * Props interface
 * @param width - Screen width for responsive design
 * @param item - Product information
 */
interface Props{
  width: number
  item: {
    id: string
    unit: string
    variant: number
  }
}

// Quantity selection options
const options = [1, 2, 4];

/**
 * HomeShopify component
 * Provides Shopify product display and purchase functionality
 */
const HomeShopify: NextPage<Props> = ({width, item}) => { 

  // Responsive breakpoint detection
  const isSP = (width < 600)
  const isPC = (width > 1024)

  // Build Shopify product ID
  const productID = `gid://shopify/Product/${item.id}`;
  
  // State management
  const [salesProduct, setSalesProduct] = useState<Product|null>(null);
  const [isSoldOut, setIsSoldOut] = useState(true);
  const [checkoutLink, setCheckoutLink] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isChangeQuantity, setIsChangeQuantity] = useState(false);
  const [error, setError] = useState<string>("");
  
  // Quantity change handler
  const updateQuantity = (e: SelectChangeEvent<number>) => setQuantity(Number(e.target.value));
  
  // Get environment variables
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const shopifyToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
  
  // Initialize Shopify client
  const client = Client.buildClient({
    domain: shopifyDomain || "",
    storefrontAccessToken: shopifyToken || "",
    apiVersion: '2023-10',
    language: 'ja-JP'
  });        

  // Admin URL (unused but for future expansion)
  const adminUrl = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_DOMAIN || '';

  // Admin API configuration (unused but for future expansion)
  const adminConfig = {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "content-type": "application/json",
      'X-Shopify-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN || '',
    },
  };

  /**
   * Main process for fetching product information and creating checkout
   * Re-executes when quantity changes
   */
  useEffect(() => {(async () => {
    // Error handling for missing environment variables
    if (!shopifyDomain || !shopifyToken) {
      setError("Shopify environment variables are not set. Please configure NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN.");
      return;
    }

    setIsChangeQuantity(true);
    try {
      console.log("Shopify API connection started:", { domain: shopifyDomain, productID });
      
      // Fetch product information
      const fetchedProduct: Product = await client.product.fetch(productID);
      console.log("Product fetched successfully:", fetchedProduct.title);
      
      setSalesProduct(fetchedProduct);
      setIsSoldOut(!fetchedProduct.availableForSale);  
      
      // Create checkout
      console.log("Checkout creation started");
      const checkout: Checkout = await client.checkout.create();
      console.log("Checkout created successfully:", checkout.id);
      
      // Add product to checkout
      await client.checkout.addLineItems(checkout.id, [{ 
        variantId: fetchedProduct.variants[item.variant].id, 
        quantity: quantity
      }]).then((checkoutResult) => {
        console.log("Product added successfully:", checkoutResult.webUrl);
        setCheckoutLink(checkoutResult.webUrl);
        setIsChangeQuantity(false);
      });
    } catch (error) {
      console.error("Shopify API error:", error);
      setError(`Shopify API error: ${error}`);
      setIsChangeQuantity(false);
    }
  })();}, [quantity, client, productID, item.variant, shopifyDomain, shopifyToken]);

  // Display error if occurred
  if (error) {
    return (
      <div style={{margin: "20px 0 0", padding: "20px", backgroundColor: "#fff3cd", border: "1px solid #ffeaa7", borderRadius: "5px"}}>
        <h3 style={{color: "#856404", margin: "0 0 10px 0"}}>Shopify Configuration Error</h3>
        <p style={{color: "#856404", margin: "0", fontSize: "14px"}}>{error}</p>
        <p style={{color: "#856404", margin: "10px 0 0 0", fontSize: "12px"}}>
          Required environment variables: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN
        </p>
      </div>
    );
  }

  // Display loading state
  if (checkoutLink == "" || salesProduct == null) {
    return (
      <div style={{margin: "20px 0 0", padding: "20px", textAlign: "center"}}>
        <CircularProgress style={{width: 40, height: 40, color: "var(--orange)"}}/>
        <p style={{margin: "10px 0 0 0", color: "var(--gray)"}}>Loading Shopify product...</p>
      </div>
    );
  }

  // Style definitions
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

  // Purchase button style (disabled when sold out or processing)
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
    {/* Product image slider */}
    <Swiper
      loop={true}    
      slidesPerView={1}
      centeredSlides={true}
      spaceBetween={10}
      speed={8000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        stopOnLastSlide: false,
      }}
      breakpoints={{ 960: {slidesPerView: 2,},}}
      modules={[Autoplay]}
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
    
    {/* Quantity selection and purchase button */}
    <div className={isSP ? "block": "flex_center"} style={{margin: "0 auto 50px", columnGap: 50}}>
      {/* Quantity selection form */}
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
      
      {/* Purchase button */}
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

// Reference: Direct link to product page (unused)
// href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/products/${product.handle}`}
