/**
 * Deferred load of GTM and gtag (GA4) to reduce initial payload and unused-JS impact.
 * Scripts load only after first user interaction (scroll/click/touch) or after 5s,
 * so they are not part of the initial critical path.
 */

import { GA_ID, GTM_ID, pageview } from './gtag';

let loaded = false;
const DEFER_MS = 5000;

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

function run(): void {
  if (loaded || (!GA_ID && !GTM_ID)) return;
  loaded = true;
  injectGtag();
  injectGTM();
  if (typeof window !== 'undefined' && window.location?.pathname) {
    pageview(window.location.pathname || '/');
  }
}

export function loadAnalytics(): void {
  if (loaded || (!GA_ID && !GTM_ID)) return;

  // Load on first interaction (scroll, click, touch, key) or after DEFER_MS
  const schedule = (): void => {
    if (loaded) return;
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(run, { timeout: 500 });
    } else {
      setTimeout(run, 0);
    }
  };

  const one = (): void => {
    window.removeEventListener('scroll', one);
    window.removeEventListener('click', one);
    window.removeEventListener('touchstart', one);
    window.removeEventListener('keydown', one);
    schedule();
  };

  window.addEventListener('scroll', one, { once: true });
  window.addEventListener('click', one, { once: true });
  window.addEventListener('touchstart', one, { once: true });
  window.addEventListener('keydown', one, { once: true });
  setTimeout(schedule, DEFER_MS);
}
