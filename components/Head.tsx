import type {NextPage} from 'next'
import { GA_ID } from '../lib/gtag'
import Head from 'next/head'

const title = "ソレ・エ・マーレ〜太陽と海〜 Sole e Mare"
const description = "自家農園の季節の柑橘を贅沢に使用した手作りイタリアンスイーツ店『ソレ・エ・マーレ〜太陽と海〜 Sole e Mare』 自家農園のレモンを贅沢に使用したイタリア・ナポリの伝統焼菓子『スフォリアテッラ Sfogliatella』を販売しています"
const url = "https://sole-e-mare.com"

const HomeHead: NextPage = () => {
  return (
      <Head>
        <title>{title}</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="format-detection" content="email=no,telephone=no,address=no"/>
        <meta name="author" content="2022 Nakajima Masao"/>
        <meta name="keywords" content="ソレエマーレ, ソレ・エ・マーレ, ソレ エ マーレ, Sole e Mare, soleemare, 太陽と海, スフォリアテッラ, sfogliatella, sfogliatelle, 小田原, 根府川, 片浦, 湘南, 農園, 自家農園, Lemon, Limone, レモン, イタリア, イタリアンスイーツ, ドルチェ, お取り寄せ, マクアケ, Makuake"/>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title}/>
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://sole-e-mare.com/images/soleemare_icon.png" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="article:publisher" content="https://www.facebook.com/soleemaredolce" />
        <link rel="canonical" href={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:site" content="@soleemare_dolce" />
        <meta name="twitter:creator" content="@Nakajima_Masao" />
        <meta name="twitter:image" content="https://sole-e-mare.com/images/keyvisual.png" />
        <meta name="msapplication-square70x70logo" content="https://sole-e-mare.com/favicons/site-tile-70x70.png"/>
        <meta name="msapplication-square150x150logo" content="https://sole-e-mare.com/favicons/site-tile-150x150.png"/>
        <meta name="msapplication-wide310x150logo" content="https://sole-e-mare.com/favicons/site-tile-310x150.png"/>
        <meta name="msapplication-square310x310logo" content="https://sole-e-mare.com/favicons/site-tile-310x310.png"/>
        <meta name="msapplication-TileColor" content="#3366FF"/>
        <meta name="theme-color" content="#3366FF"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="https://sole-e-mare.com/favicons/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="57x57" href="https://sole-e-mare.com/favicons/apple-touch-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="https://sole-e-mare.com/favicons/apple-touch-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="https://sole-e-mare.com/favicons/apple-touch-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="https://sole-e-mare.com/favicons/apple-touch-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="https://sole-e-mare.com/favicons/apple-touch-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="https://sole-e-mare.com/favicons/apple-touch-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="https://sole-e-mare.com/favicons/apple-touch-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="https://sole-e-mare.com/favicons/apple-touch-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="https://sole-e-mare.com/favicons/apple-touch-icon-180x180.png"/>
        <link rel="apple-touch-icon" type="image/png" href="https://sole-e-mare.com/favicons/apple-touch-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="36x36" href="https://sole-e-mare.com/favicons/android-chrome-36x36.png"/>
        <link rel="icon" type="image/png" sizes="48x48" href="https://sole-e-mare.com/favicons/android-chrome-48x48.png"/>
        <link rel="icon" type="image/png" sizes="72x72" href="https://sole-e-mare.com/favicons/android-chrome-72x72.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="https://sole-e-mare.com/favicons/android-chrome-96x96.png"/>
        <link rel="icon" type="image/png" sizes="128x128" href="https://sole-e-mare.com/favicons/android-chrome-128x128.png"/>
        <link rel="icon" type="image/png" sizes="144x144" href="https://sole-e-mare.com/favicons/android-chrome-144x144.png"/>
        <link rel="icon" type="image/png" sizes="152x152" href="https://sole-e-mare.com/favicons/android-chrome-152x152.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="https://sole-e-mare.com/favicons/android-chrome-192x192.png"/>
        <link rel="icon" type="image/png" sizes="256x256" href="https://sole-e-mare.com/favicons/android-chrome-256x256.png"/>
        <link rel="icon" type="image/png" sizes="384x384" href="https://sole-e-mare.com/favicons/android-chrome-384x384.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="https://sole-e-mare.com/favicons/android-chrome-512x512.png"/>
        <link rel="icon" type="image/png" sizes="36x36" href="https://sole-e-mare.com/favicons/icon-36x36.png"/>
        <link rel="icon" type="image/png" sizes="48x48" href="https://sole-e-mare.com/favicons/icon-48x48.png"/>
        <link rel="icon" type="image/png" sizes="72x72" href="https://sole-e-mare.com/favicons/icon-72x72.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="https://sole-e-mare.com/favicons/icon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="128x128" href="https://sole-e-mare.com/favicons/icon-128x128.png"/>
        <link rel="icon" type="image/png" sizes="144x144" href="https://sole-e-mare.com/favicons/icon-144x144.png"/>
        <link rel="icon" type="image/png" sizes="152x152" href="https://sole-e-mare.com/favicons/icon-152x152.png"/>
        <link rel="icon" type="image/png" sizes="160x160" href="https://sole-e-mare.com/favicons/icon-160x160.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="https://sole-e-mare.com/favicons/icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="196x196" href="https://sole-e-mare.com/favicons/icon-196x196.png"/>
        <link rel="icon" type="image/png" sizes="256x256" href="https://sole-e-mare.com/favicons/icon-256x256.png"/>
        <link rel="icon" type="image/png" sizes="384x384" href="https://sole-e-mare.com/favicons/icon-384x384.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="https://sole-e-mare.com/favicons/icon-512x512.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="https://sole-e-mare.com/favicons/icon-16x16.png"/>
        <link rel="icon" type="image/png" sizes="24x24" href="https://sole-e-mare.com/favicons/icon-24x24.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="https://sole-e-mare.com/favicons/icon-32x32.png"/>
        <link rel="icon" type="image/png" href="https://sole-e-mare.com/favicons/icon-192x192.png"/>
        <link rel="manifest" href="https://sole-e-mare.com/favicons/manifest.json"/>

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });`,
              }}
            />
          </>
        )}
      </Head>
  )
}

export default HomeHead