/**
 * Deferred load of GTM and gtag (GA4) to reduce initial payload and improve LCP/FCP.
 * Scripts are injected after the page is idle (requestIdleCallback) or after load event.
 */

import { GA_ID, GTM_ID, pageview } from './gtag';

let loaded = false;

function injectGtag(): void {
  if (!GA_ID || typeof document === 'undefined') return;
  if (document.querySelector(`script[src*="gtag/js?id=${GA_ID}"]`)) return;

  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gtagScript);

  const configScript = document.createElement('script');
  configScript.textContent = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');`;
  document.head.appendChild(configScript);
}

function injectGTM(): void {
  if (!GTM_ID || typeof document === 'undefined') return;
  if (document.querySelector(`script[src*="gtm.js?id=${GTM_ID}"]`)) return;

  const script = document.createElement('script');
  script.textContent = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  iframe.title = 'Google Tag Manager';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
}

export function loadAnalytics(): void {
  if (loaded || (!GA_ID && !GTM_ID)) return;
  loaded = true;

  const run = (): void => {
    injectGtag();
    injectGTM();
    if (typeof window !== 'undefined' && window.location?.pathname) {
      pageview(window.location.pathname || '/');
    }
  };

  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(run, { timeout: 3500 });
  } else {
    if (document.readyState === 'complete') {
      setTimeout(run, 1);
    } else {
      window.addEventListener('load', () => setTimeout(run, 1));
    }
  }
}
