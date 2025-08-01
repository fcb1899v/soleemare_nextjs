# Sole e Mare - Sun and Sea

Official website for Sole e Mare, a handmade Italian dessert shop that uses seasonal citrus fruits from our own farm.

## Project Overview

This project is a Next.js-based website that integrates with the predecessor `web-sole-e-mare` repository. It's built as a sales site for the traditional Italian Neapolitan pastry 'Sfogliatella', which uses premium lemons from our own farm.

### Key Features

- **Responsive Design**: Compatible with mobile, tablet, and desktop
- **Shopify Integration**: Product sales functionality with Shopify Buy SDK
- **Social Media Integration**: Instagram, Twitter, TikTok, and other social media platforms
- **Contact Form**: Customer inquiry reception with Google Forms integration
- **Email Service**: SendGrid integration for automated email responses
- **Firebase Hosting**: Static site deployment with Firebase Hosting

### Technology Stack

- **Framework**: Next.js 15.4.5
- **Language**: TypeScript 5.9.2
- **Styling**: Material-UI (MUI) 7.2.0
- **Hosting**: Firebase Hosting (static export)
- **E-commerce**: Shopify Buy SDK 3.0.7
- **Animation**: Swiper 11.2.10
- **Email**: SendGrid 8.1.5
- **Social Media**: Instagram Graph API, Twitter Timeline

## Development Environment Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Firebase CLI (for deployment)

### Installation

```bash
# Install dependencies
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

#### Social Media APIs
- **NEXT_PUBLIC_INSTA_ID**: Instagram user ID
- **NEXT_PUBLIC_INSTA_TOKEN**: Facebook Graph API access token

#### Email Service
- **NEXT_PUBLIC_SENDGRID_APIKEY**: SendGrid API key

#### Google Analytics
- **NEXT_PUBLIC_GA_ID**: Google Analytics measurement ID

#### Google Forms
- **NEXT_PUBLIC_GOOGLE_FORM**: Google Form ID for contact form

#### How to obtain Shopify API tokens:

1. Log in to Shopify admin panel
2. Apps > Private apps > Create new app
3. Enable Storefront API permissions
4. Copy the access token and set it in `.env.local`

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
│   ├── Common/         # Common components (Header, Footer, etc.)
│   ├── Home/           # Home page components
│   ├── Inquiry/        # Contact page components
│   └── PrivacyPolicy/  # Privacy policy page components
├── pages/              # Next.js pages and API routes
│   └── api/            # API endpoints (CORS, SendGrid, etc.)
├── public/             # Static files (images, fonts, etc.)
├── styles/             # Global styles (globals.css)
├── utils/              # Utility functions and constants
├── src/                # Source code
│   └── hooks/          # Custom React hooks
├── lib/                # Library configurations (gtag.ts)
└── firebase.json       # Firebase hosting configuration
```

## Deployment

This project is deployed using Firebase Hosting with static export.

### Build Process

The project uses Next.js static export for Firebase Hosting:

1. `npm run export` - Builds static files in `out/` directory
2. `npm run deploy` - Deploys to Firebase Hosting

### GitHub Actions

Automatic deployment to Firebase Hosting occurs when pushing to the main branch.

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
- Instagram feed display with Graph API
- Twitter timeline embedding
- TikTok creator profile embedding
- SNS navigation links

### Contact Form
- Google Forms integration
- Form validation
- Automated email responses via SendGrid
- Success/error message handling

### Responsive Design
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Optimized images for different screen sizes

## License

This project is a private project.

## Author

2022 Nakajima Masao

---

## Integration History

This project has been integrated with the predecessor `web-sole-e-mare` repository and rebuilt as a modern Next.js-based website with enhanced features and improved performance.
