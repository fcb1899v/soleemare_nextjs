module.exports = {
  // Static export only for production build (enables API Routes in dev)
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  trailingSlash: true,
  reactStrictMode: true,

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

