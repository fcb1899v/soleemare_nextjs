/**
 * HomeShopify.tsx
 *
 * Shopify product display and purchase component
 *
 * Uses @shopify/storefront-api-client (Storefront API) for:
 * - Fetching product by ID
 * - Creating a cart and adding line items
 * - Checkout URL for purchase
 *
 * Required environment variables:
 * - SHOPIFY_STORE_DOMAIN: Shopify store domain
 * - SHOPIFY_ACCESS_TOKEN: Shopify Storefront API access token
 */

import { NextPage } from 'next'
import Link from 'next/link';
import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { BREAKPOINT_PC, getBreakpointFlags } from '../../utils/commonConstant';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import HomeImage from './HomeImage';
import BlueBorder from '../Common/BlueBorder';

/** UI-facing product shape (compatible with previous shopify-buy Product usage) */
interface ShopifyProduct {
  id: string;
  title: string;
  availableForSale: boolean;
  images: { id: string; src: string }[];
  variants: { id: string; price: { amount: string } }[];
}

interface Props {
  width: number;
  item: {
    id: string;
    unit: string;
    variant: number;
  };
}

const options = [1, 2, 4];
const isDev = process.env.NODE_ENV === 'development';
const API_VERSION = '2025-10';

const PRODUCT_QUERY = `
  query ProductById($id: ID!) {
    product(id: $id) {
      id
      title
      availableForSale
      images(first: 20) {
        nodes {
          id
          url
        }
      }
      variants(first: 10) {
        nodes {
          id
          price {
            amount
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cartCreate(input: $input) {
      userErrors {
        message
        code
        field
      }
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      userErrors {
        message
        code
        field
      }
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

/** Normalize Storefront API product to UI shape */
function toShopifyProduct(apiProduct: {
  id: string;
  title: string;
  availableForSale: boolean;
  images: { nodes: { id: string; url: string }[] };
  variants: { nodes: { id: string; price: { amount: string } }[] };
}): ShopifyProduct {
  return {
    id: apiProduct.id,
    title: apiProduct.title,
    availableForSale: apiProduct.availableForSale,
    images: (apiProduct.images?.nodes ?? []).map((img) => ({ id: img.id, src: img.url })),
    variants: (apiProduct.variants?.nodes ?? []).map((v) => ({
      id: v.id,
      price: { amount: v.price?.amount ?? '0' },
    })),
  };
}

/** Custom fetch that logs in development only */
function createCustomFetch(): (url: string, init?: RequestInit) => Promise<Response> {
  return (url: string, init?: RequestInit) => {
    if (isDev) {
      console.log('[Shopify] Request URL:', url);
      console.log('[Shopify] Request method:', init?.method ?? 'POST');
    }
    return fetch(url, init).then(
      (response) => {
        if (isDev) {
          console.log('[Shopify] Response status:', response.status, response.statusText, 'URL:', url);
        }
        if (!response.ok && isDev) {
          response
            .clone()
            .json()
            .then((body) => console.error('[Shopify] Error response body:', body))
            .catch(() => console.error('[Shopify] Could not parse error body as JSON'));
        }
        return response;
      },
      (err) => {
        if (isDev) console.error('[Shopify] Fetch failed:', err?.message ?? err, { url });
        throw err;
      }
    );
  };
}

const HomeShopify: NextPage<Props> = ({ width, item }) => {
  const { isSP } = getBreakpointFlags(width);
  const productID = `gid://shopify/Product/${item.id}`;

  const [salesProduct, setSalesProduct] = useState<ShopifyProduct | null>(null);
  const [isSoldOut, setIsSoldOut] = useState(true);
  const [checkoutLink, setCheckoutLink] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isChangeQuantity, setIsChangeQuantity] = useState(false);
  const [error, setError] = useState('');

  const updateQuantity = (e: SelectChangeEvent<number>) => setQuantity(Number(e.target.value));

  const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const shopifyToken = process.env.SHOPIFY_ACCESS_TOKEN;
  const normalizedDomain = shopifyDomain
    ? shopifyDomain.replace(/^https?:\/\//i, '').split('/')[0].trim()
    : '';

  const client = useMemo(() => {
    if (!normalizedDomain || !shopifyToken) return null;
    return createStorefrontApiClient({
      storeDomain: `https://${normalizedDomain}`,
      apiVersion: API_VERSION,
      publicAccessToken: shopifyToken,
      customFetchApi: createCustomFetch(),
    });
  }, [normalizedDomain, shopifyToken]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!normalizedDomain || !shopifyToken) {
      setError(
        'Shopify environment variables are not set. Please configure SHOPIFY_STORE_DOMAIN and SHOPIFY_ACCESS_TOKEN.'
      );
      return;
    }
    if (!client) return;

    let cancelled = false;
    setIsChangeQuantity(true);
    setError('');

    (async () => {
      try {
        if (isDev) console.log('[Shopify] API connection started:', { domain: normalizedDomain, productID });

        const productRes = await client.request<{ product: unknown }>(PRODUCT_QUERY, {
          variables: { id: productID },
        });
        if (cancelled) return;
        const apiErrors = productRes.errors;
        if (apiErrors?.message || (productRes.data as { product?: null })?.product == null) {
          const msg =
            (apiErrors?.graphQLErrors?.[0] as { message?: string })?.message ??
            apiErrors?.message ??
            'Product not found';
          throw new Error(msg);
        }
        const apiProduct = (productRes.data as { product: Parameters<typeof toShopifyProduct>[0] }).product;
        const fetchedProduct = toShopifyProduct(apiProduct);
        if (cancelled) return;
        if (isDev) console.log('[Shopify] Product fetched:', fetchedProduct.title);

        setSalesProduct(fetchedProduct);
        setIsSoldOut(!fetchedProduct.availableForSale);

        if (isDev) console.log('[Shopify] Creating cart');
        const createRes = await client.request<{
          cartCreate?: {
            userErrors: { message: string }[];
            cart?: { id: string; checkoutUrl: string | null };
          };
        }>(CART_CREATE_MUTATION, {
          variables: { input: {}, country: 'JP', language: 'JA' },
        });
        if (cancelled) return;
        const createPayload = createRes.data?.cartCreate;
        const createErrors = createPayload?.userErrors?.filter((e) => e.message);
        if (createErrors?.length) {
          throw new Error(createErrors.map((e) => e.message).join('; '));
        }
        const cartId = createPayload?.cart?.id;
        if (!cartId) {
          throw new Error('Cart creation did not return a cart ID');
        }
        if (isDev) console.log('[Shopify] Cart created:', cartId);

        const variantId = fetchedProduct.variants[item.variant]?.id;
        if (!variantId) {
          throw new Error('Selected variant not found');
        }
        const linesAddRes = await client.request<{
          cartLinesAdd?: {
            userErrors: { message: string }[];
            cart?: { id: string; checkoutUrl: string | null };
          };
        }>(CART_LINES_ADD_MUTATION, {
          variables: {
            cartId,
            lines: [{ merchandiseId: variantId, quantity }],
          },
        });
        if (cancelled) return;
        const addPayload = linesAddRes.data?.cartLinesAdd;
        const addErrors = addPayload?.userErrors?.filter((e) => e.message);
        if (addErrors?.length) {
          throw new Error(addErrors.map((e) => e.message).join('; '));
        }
        const url = addPayload?.cart?.checkoutUrl ?? null;
        if (isDev) console.log('[Shopify] Line items added, checkout URL:', url);
        setCheckoutLink(url ?? '');
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        if (isDev) console.error('[Shopify] API error:', err);
        if (message === 'Failed to fetch') {
          setError(
            'Shopify への接続に失敗しました（Failed to fetch）。確認: 1) SHOPIFY_STORE_DOMAIN は「ストア名.myshopify.com」形式のみ（https:// なし）、' +
              '2) SHOPIFY_ACCESS_TOKEN、3) ネットワーク・ブラウザのコンソールで [Shopify] のログを確認。'
          );
        } else {
          setError(`Shopify API error: ${message}`);
        }
      } finally {
        if (!cancelled) setIsChangeQuantity(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [quantity, client, productID, item.variant, normalizedDomain, shopifyToken]);

  if (error) {
    return (
      <div
        style={{
          margin: '20px 0 0',
          padding: '20px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '5px',
        }}
      >
        <h3 style={{ color: '#856404', margin: '0 0 10px 0' }}>Shopify Configuration Error</h3>
        <p style={{ color: '#856404', margin: '0', fontSize: '14px' }}>{error}</p>
        <p style={{ color: '#856404', margin: '10px 0 0 0', fontSize: '12px' }}>
          Required environment variables: SHOPIFY_STORE_DOMAIN, SHOPIFY_ACCESS_TOKEN
        </p>
      </div>
    );
  }

  if (checkoutLink === '' || salesProduct === null) {
    return (
      <div style={{ margin: '20px 0 0', padding: '20px', textAlign: 'center' }}>
        <CircularProgress style={{ width: 40, height: 40, color: 'var(--orange)' }} />
        <p style={{ margin: '10px 0 0 0', color: 'var(--gray)' }}>Loading Shopify product...</p>
      </div>
    );
  }

  const selectLabelStyle: CSSProperties = {
    fontSize: 24,
    color: 'var(--black)',
    top: -10,
  };
  const selectAmountStyle: CSSProperties = {
    fontSize: 22,
    width: 260,
    height: 60,
    backgroundColor: 'var(--white)',
  };
  const buyButtonStyle: CSSProperties = {
    display: 'block',
    width: 240,
    height: 36,
    padding: 10,
    margin: isSP ? '30px auto' : undefined,
    borderRadius: 30,
    background:
      isSoldOut || isChangeQuantity
        ? 'linear-gradient(to right bottom, var(--gray), var(--transpgray))'
        : 'linear-gradient(to right bottom, var(--yellow), var(--orange))',
  };
  const buyTextStyle: CSSProperties = {
    fontSize: 22,
    fontWeight: 'bold',
    color: isSoldOut || isChangeQuantity ? 'var(--white)' : 'var(--black)',
    textDecoration: 'none',
  };
  const progressStyle: CSSProperties = {
    width: 36,
    height: 36,
    color: 'var(--white)',
  };
  const buyText = isSoldOut ? '売り切れ' : '予約する';
  const variant = salesProduct.variants[item.variant];
  const priceAmount = variant ? Number(variant.price.amount) : 0;

  return (
    <div style={{ margin: '20px 0 0' }}>
      <Swiper
        loop
        slidesPerView={1}
        centeredSlides
        spaceBetween={10}
        speed={8000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false,
        }}
        breakpoints={{ [BREAKPOINT_PC]: { slidesPerView: 2 } }}
        modules={[Autoplay]}
      >
        {salesProduct.images.map((image) => (
          <SwiperSlide key={image.id}>
            <div style={{ margin: '30px 10px 60px 10px' }}>
              <HomeImage
                width={width}
                color="linear-gradient(to right bottom, var(--yellow), var(--orange))"
                title={['']}
                image={image.src}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={isSP ? 'block' : 'flex_center'} style={{ margin: '0 auto 50px', columnGap: 50 }}>
        <FormControl variant="standard">
          <InputLabel style={selectLabelStyle}>{`${salesProduct.title.split(' ')[0]}`}</InputLabel>
          <Select style={selectAmountStyle} value={quantity} onChange={updateQuantity}>
            {options.map((option) => (
              <MenuItem value={option} key={`${salesProduct.id}_${option}`}>
                {`${option}${item.unit}：¥${Number(priceAmount * option + 980)} (送料込)`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {isSP && <br />}

        <div style={buyButtonStyle}>
          {isChangeQuantity ? (
            <CircularProgress style={progressStyle} />
          ) : (
            <Link href={checkoutLink} style={buyTextStyle} target="_blank" rel="noreferrer">
              {buyText}
            </Link>
          )}
        </div>
      </div>
      <BlueBorder />
    </div>
  );
};

export default HomeShopify;
