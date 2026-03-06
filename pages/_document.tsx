/**
 * pages/_document.tsx
 *
 * Injects in <head> (recommended by Google):
 * - Google tag (gtag.js) for GA4 (G-YDLSD40144)
 * - Google Tag Manager (GTM) when GTM_ID is set
 *
 * Set GA_ID and/or GTM_ID in .env.
 */

import { Html, Head, Main, NextScript } from 'next/document'

const GA_ID = process.env.GA_ID || 'G-YDLSD40144'
const GTM_ID = process.env.GTM_ID || 'GTM-W4LC27CK'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* Google tag (gtag.js) - place right after <head> per Google's instructions */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');`,
              }}
            />
          </>
        )}
        {GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </Head>
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
