import '../styles/globals.css'
import 'swiper/css/bundle'
import type { AppProps } from 'next/app'
import { usePageView } from '../src/hooks/usePageView';

function MyApp({ Component, pageProps }: AppProps) {
  // Google Analytics の PV をカウントするイベント
  usePageView();
  return <>
    {process.env.NEXT_PUBLIC_GA_ID && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });`,
        }}/>
      </>
    )}
    <Component {...pageProps} />
  </>
}

export default MyApp;

