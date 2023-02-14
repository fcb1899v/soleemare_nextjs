import '../styles/globals.css'
import 'swiper/css/bundle'
import type { AppProps } from 'next/app'
import { usePageView } from '../src/hooks/usePageView';

function MyApp({ Component, pageProps }: AppProps) {
  // Google Analytics の PV をカウントするイベント
  usePageView();
  
  return <Component {...pageProps} />;
}

export default MyApp;

