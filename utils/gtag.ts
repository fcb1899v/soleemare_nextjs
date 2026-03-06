/** GA4 測定 ID（next-soleemare）。.env の GA_ID で上書き可能。 */
export const GA_ID = process.env.GA_ID || 'G-YDLSD40144';
export const GTM_ID = process.env.GTM_ID || 'GTM-W4LC27CK';

const isAnalyticsEnabled = () => !!GA_ID || !!GTM_ID;

// Track page views: gtag for GA4, and dataLayer for GTM (so GTM can fire tags on SPA navigation)
export const pageview = (url: string) => {
  if (!isAnalyticsEnabled()) return;
  if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('config', GA_ID, { page_path: url });
  }
  // Push to dataLayer so GTM sees the page view (fixes "タグ付けなし" on /inquiry/, /privacypolicy/, etc.)
  if (GTM_ID) {
    const w = window as unknown as { dataLayer: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'page_view', page_path: url });
  }
};

// Fire GA event: gtag for GA4, and dataLayer for GTM
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}): void => {
  if (!isAnalyticsEnabled()) return;
  if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
  if (GTM_ID) {
    const w = window as unknown as { dataLayer: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: action,
      event_category: category,
      event_label: label,
      value,
    });
  }
};
