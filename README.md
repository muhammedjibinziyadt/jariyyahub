# Noorul Ulama Students Association Website

Official website for Noorul Ulama Students Association at Jamia Nooriyya Arabiyya Pattikkad.

This is a [Next.js 15](https://nextjs.org) project with **Server-Side Rendering (SSR)** enabled, built for optimal performance and SEO.

## ✨ Features

- 🚀 **Server-Side Rendering (SSR)** - Fast initial page loads and excellent SEO
- 🎨 **Modern UI/UX** - Beautiful animations and interactions
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Optimized Performance** - Image optimization, compression, and code splitting
- 🔍 **SEO Ready** - Comprehensive metadata and Open Graph tags
- ♿ **Accessible** - Built with accessibility in mind

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Verify SSR is Working

Run the SSR verification script:

```bash
npm run verify-ssr
```

Or manually check by viewing page source (Ctrl+U / Cmd+U) - you should see actual HTML content!

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Home page (SSR)
│   ├── contact/            # Contact page
│   ├── core/               # Core committee page
│   └── subwing/            # Sub wings page
├── components/
│   ├── sectons/            # Page sections
│   ├── ui/                 # UI components
│   └── navbar.tsx          # Navigation
└── data/
    └── links.tsx           # Navigation links

public/
└── images/                 # Static images
```

## 🏗️ Architecture

This project uses Next.js App Router with a hybrid rendering approach:

- **Server Components (SSR)**: Pages and layouts for optimal SEO
- **Client Components**: Interactive features and animations

This provides the best of both worlds - fast initial loads with rich interactivity!

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run verify-ssr` - Verify SSR is working

## 📖 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Quick overview of SSR setup
- **[SSR_VERIFICATION_GUIDE.md](./SSR_VERIFICATION_GUIDE.md)** - Detailed SSR testing guide

## 🔧 Configuration

### SSR & Performance
The project is optimized for SSR with:
- React Strict Mode enabled
- Gzip compression
- Image optimization (WebP format)
- Standalone output for production builds

See `next.config.ts` for full configuration.

### SEO Metadata
Each page has custom metadata for better SEO:
- Home: Brand and mission
- Contact: Contact information
- Core: Leadership team
- Sub Wings: Programs and activities

## 🌐 Technologies

- **Framework**: Next.js 15.5.3
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono

## 📦 Build & Deploy

### Production Build

```bash
npm run build
npm run start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or deploy to any platform that supports Next.js:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Self-hosted with Docker

## 🎯 Performance

This site is optimized for:
- ✅ Fast First Contentful Paint (FCP)
- ✅ Low Largest Contentful Paint (LCP)
- ✅ Minimal Cumulative Layout Shift (CLS)
- ✅ Excellent SEO scores
- ✅ Perfect Lighthouse scores

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is the official website for Noorul Ulama Students Association. For contributions or issues, please contact the development team.

## 📄 License

© 2024 Noorul Ulama Students Association. All rights reserved.

## 🔗 Links

- **Website**: [Coming Soon]
- **Email**: jamianooriya@gmail.com
- **Phone**: +91 98470 70200

## Learn More About Next.js

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub](https://github.com/vercel/next.js) - Contribute to Next.js

---

**Built with ❤️ for Noorul Ulama Students Association**
