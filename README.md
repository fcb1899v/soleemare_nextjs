# Sole e Mare - Sun and Sea

Official website for Sole e Mare, a handmade Italian dessert shop that uses seasonal citrus fruits from our own farm.

## Project Overview

This project is a Next.js-based website that integrates with the predecessor `web-sole-e-mare` repository. It's built as a sales site for the traditional Italian Neapolitan pastry 'Sfogliatella', which uses premium lemons from our own farm.

### Key Features

- **Responsive Design**: Compatible with mobile, tablet, and desktop
- **Shopify Integration**: Product sales functionality with Shopify Storefront API
- **Social Media Integration**: Instagram, Twitter, TikTok, and other social media platforms
- **Contact Form**: Customer inquiry reception with Google Forms integration
- **Firebase Hosting**: Static site deployment with Firebase Hosting

### Technology Stack

- **Framework**: Next.js 16.x
- **Language**: TypeScript 5.x
- **Styling**: Material-UI (MUI) 7.x
- **Hosting**: Firebase Hosting (static export)
- **E-commerce**: Shopify Storefront API (@shopify/storefront-api-client)
- **Animation**: Swiper 12.x
- **Social Media**: Instagram Graph API, Twitter Timeline

## Development Environment Setup

### Prerequisites

- Node.js v22.x (see `.nvmrc`; CI uses Node 22)
- npm or yarn
- Firebase CLI (for deployment)

### Installation

```bash
# Install dependencies (Node 22 recommended; run `nvm use` if using nvm)
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local file to add required configuration

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Environment Variables

The following environment variables are required:

#### Shopify Configuration
- **NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN**: Your Shopify store domain
- **NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN**: Shopify Storefront API access token
- **NEXT_PUBLIC_SHOPIFY_SFOGLIATELLA_ID**: Product ID

#### Social Media (Instagram)
- **NEXT_PUBLIC_INSTA_ID**: Instagram user ID (required for static export)
- **NEXT_PUBLIC_INSTA_TOKEN**: Facebook Graph API access token (required for static export)
- **INSTA_ID** / **INSTA_TOKEN**: Same values, server-only; optional, used by `/api/instagram` in dev

#### Google Analytics
- **NEXT_PUBLIC_GA_ID**: Google Analytics measurement ID

#### Google Forms
- **NEXT_PUBLIC_GOOGLE_FORM**: Google Form ID for contact form

#### Optional (when using API routes in dev)
- **SENDGRID_API_KEY**: SendGrid API key (server-only; for `/api/sendgrid`)

#### How to obtain Shopify API tokens

1. Log in to Shopify admin
2. **Settings** → **Apps and sales channels** → **Develop apps** (or **Apps** → **Develop apps**), then create an app
3. Enable **Storefront API** (or **Sales channel** API) and copy the access token
4. Set the token in `.env.local`

Please refer to the `env.example` file for details.

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Static export (for Firebase Hosting)
npm run export

# Deploy to Firebase
npm run deploy
```

## Project Structure

```
soleemare-webpage/
├── components/          # React components
│   ├── Common/         # Header, Footer, Head, ErrorBoundary, etc.
│   ├── Home/           # Home page sections (Top, Product, Feature, SNS, Shopify, etc.)
│   ├── Inquiry/        # Contact form
│   └── PrivacyPolicy/  # Privacy policy content
├── pages/               # Next.js pages and API routes
│   └── api/             # API routes (instagram, sendgrid)
├── hooks/               # React hooks (usePageView, useLayout)
├── utils/               # Constants and utilities (gtag, HomeConstant, InquiryConstant, PolicyConstant)
├── public/              # Static assets (images, fonts, favicons)
├── styles/              # Global CSS (globals.css)
├── env.example          # Example environment variables (copy to .env.local)
├── next.config.js
├── tsconfig.json
└── firebase.json        # Firebase Hosting config
```

## Deployment

This project is deployed using Firebase Hosting with static export.

### Build Process

The project uses Next.js static export for Firebase Hosting:

1. `npm run export` - Builds static files in `out/` directory
2. `npm run deploy` - Deploys to Firebase Hosting

### GitHub Actions

Automatic deployment to Firebase Hosting runs on push to `main` (see `.github/workflows/firebase-hosting-merge.yml`). Node 22 is used in CI.

### Manual Deployment

```bash
# Build and deploy
npm run deploy
```

## Features in Detail

### Shopify Integration
- Product display with images and descriptions
- Quantity selection and pricing
- Checkout process integration
- Real-time inventory status

### Social Media Integration
- Instagram feed display (Graph API; fallback to client fetch when using static export)
- Twitter timeline embedding
- TikTok section (implemented but commented out in `HomeInfo`; uncomment to enable)
- SNS navigation links

### Contact Form
- Google Forms integration
- Form validation
- Success/error message handling

### Responsive Design
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Optimized images for different screen sizes

## License

This project is a private project.

## Author

2022–2026 Nakajima Masao

---

## Integration History

This project has been integrated with the predecessor `web-sole-e-mare` repository and rebuilt as a modern Next.js-based website with enhanced features and improved performance.
