/**
 * pages/_document.tsx
 *
 * GTM and gtag (GA4) are loaded deferred from _app via loadAnalytics()
 * to reduce initial JavaScript and improve LCP/FCP. Set GA_ID and/or GTM_ID in .env.
 */

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
