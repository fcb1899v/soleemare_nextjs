module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/'},
      '/inquiry': { page: '/inquiry'},
      '/privacypolicy': { page: '/privacypolicy'},
    }
  },
  reactStrictMode: true,
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Shopify-Access-Token" },
          { key: "Access-Control-Allow-Credentials", value: "true" }
        ]
      },
    ]
  },
}

