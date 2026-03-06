module.exports = {
  // Static export only for production build (enables API Routes in dev)
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  trailingSlash: true,
  reactStrictMode: true,

  // Expose env to client (variable names without NEXT_PUBLIC_ prefix, set in .env)
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN || '',
    SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN || '',
    SHOPIFY_SFOGLIATELLA_ID: process.env.SHOPIFY_SFOGLIATELLA_ID || '',
    INSTA_ID: process.env.INSTA_ID || '',
    INSTA_TOKEN: process.env.INSTA_TOKEN || '',
    GA_ID: process.env.GA_ID || '',
    GTM_ID: process.env.GTM_ID || '',
    GOOGLE_FORM: (
      process.env.GOOGLE_FORM ||
      process.env.NEXT_PUBLIC_GOOGLE_FORM ||
      ''
    ).trim(),
    RECAPTCHA_V2_SITE_KEY: (
      process.env.RECAPTCHA_V2_SITE_KEY ||
      process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY ||
      ''
    ).trim(),
  },

  images: {
    unoptimized: true,
  },

  // Next.js 16: satisfy Turbopack when only webpack is configured
  turbopack: {},

  webpack: (config) => {
    // Suppress punycode deprecation warning
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ },
      /the `punycode` module is deprecated/
    ];
    return config;
  },
}

