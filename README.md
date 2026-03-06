# Sole e Mare - Sun and Sea

Official website for Sole e Mare, a handmade Italian dessert shop that uses seasonal citrus fruits from our own farm.

## Project Overview

This project is a Next.js-based website that integrates with the predecessor `web-sole-e-mare` repository. It's built as a sales site for the traditional Italian Neapolitan pastry 'Sfogliatella', which uses premium lemons from our own farm.

### Key Features

- **Responsive Design**: Compatible with mobile, tablet, and desktop
- **Shopify Integration**: Product sales functionality with Shopify Storefront API
- **Social Media Integration**: Instagram, Twitter, TikTok, and other social media platforms
- **Contact Form**: Customer inquiry reception with Google Forms integration (optional reCAPTCHA v2)
- **Analytics**: Google Analytics 4 (GA4) and Google Tag Manager (GTM); page views and custom events, including SPA route changes via dataLayer
- **Privacy Policy**: In-app privacy policy aligned with contact form, GA4/GTM, reCAPTCHA, and Shopify
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
- **SHOPIFY_STORE_DOMAIN**: Your Shopify store domain
- **SHOPIFY_ACCESS_TOKEN**: Shopify Storefront API access token
- **SHOPIFY_SFOGLIATELLA_ID**: Product ID

#### Social Media (Instagram)
- **INSTA_ID**: Instagram user ID (required for static export)
- **INSTA_TOKEN**: Facebook Graph API access token (required for static export)

#### Google Analytics / GTM
- **GA_ID**: GA4 measurement ID (default: `G-YDLSD40144`). Injected in `_document` `<head>` (gtag.js) per Google’s instructions.
- **GTM_ID**: Google Tag Manager container ID (default: `GTM-W4LC27CK`). Injected in `_document` (script in `<head>`, noscript in `<body>`).
- Page views are sent via gtag and, when GTM is set, also pushed to `dataLayer` so GTM can fire tags on SPA route changes (e.g. `/inquiry/`, `/privacypolicy/`).

**Unifying GA4**: This project uses GA4 measurement ID **G-YDLSD40144** in code. If Firebase is linked to a different GA4 property, you can consolidate by linking Firebase to the GA4 property that has G-YDLSD40144.

##### Linking Firebase to G-YDLSD40144

1. Open your project in the [Firebase Console](https://console.firebase.google.com/).
2. Go to **Project settings** (gear) → **Integrations**.
3. In the **Google Analytics** card, check which GA4 property is currently linked.
4. To switch to the property that has **G-YDLSD40144**:
   - Unlink the current GA4 property, then use **Link** and choose “Link existing Google Analytics 4 property”, and select the property that contains G-YDLSD40144.  
   **Note:** After changing the link, Firebase data is sent only to the new property. Historical data in the previous property will no longer be visible from Firebase. Export from GA4 first if you need to keep it.

#### Google Forms
- **GOOGLE_FORM**: Google Form ID for the contact form submission.

#### reCAPTCHA v2 (optional)
- **RECAPTCHA_V2_SITE_KEY**: Site key for the "I'm not a robot" checkbox on the contact form. Get keys at [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin).
- **RECAPTCHA_V2_SECRET_KEY**: For server-side verification (not used in the current client-only implementation).
- **Setup**: Set `RECAPTCHA_V2_SITE_KEY=your_site_key` in `.env`, then restart the dev server (`npm run dev`).

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

# Build for production (webpack; production build does static export)
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Run unit tests (Vitest)
npm run test
npm run test:watch   # watch mode for development

# Static export for Firebase Hosting
# Runs "next build"; in production (NODE_ENV=production) outputs static files to out/
# Use this for deployment (e.g. npm run deploy runs export then firebase deploy)
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
├── utils/               # Constants and utilities (commonConstant, homeConstant, inquiryConstant, PolicyConstant, gtag, emailValidation)
├── docs/                # Documentation and sample scripts (e.g. FormSubmitAutoReply.gs for Forms auto-reply)
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

1. `npm run export` - Runs `next build`; in production mode outputs static files to the `out/` directory
2. `npm run deploy` - Runs `npm run export` then deploys `out/` to Firebase Hosting

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
- Google Forms integration (formResponse POST)
- reCAPTCHA v2 (optional)
- Form validation and success/error messages
- **Auto-reply email**: You can send automatic reply emails by setting an Apps Script "On form submit" trigger on the spreadsheet linked to the form. See the sample script in `docs/FormSubmitAutoReply.gs`.

### Responsive Design
- Breakpoints: SP when `width < 600px`, PC when `width > 1024px` (defined in `utils/commonConstant.ts`; use `getBreakpointFlags(width)` in components).
- Layout updates on window resize and device orientation change (`useWindowSize` and `orientationchange` listener).
- Mobile-first, touch-friendly.

**Note:** Static export uses `images.unoptimized: true` in Next.js, so image optimization is not applied at build time. Pre-optimize assets (e.g. WebP, appropriate dimensions) in `public/` as needed.

## License

This project is a private project.

## Author

2022–2026 Nakajima Masao

---

## Integration History

This project has been integrated with the predecessor `web-sole-e-mare` repository and rebuilt as a modern Next.js-based website with enhanced features and improved performance.
