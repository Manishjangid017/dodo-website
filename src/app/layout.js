import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

// ─── SEO & Open Graph metadata ────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL('https://dodospices.com'), // [Placeholder — update with real domain]
  title: {
    default: 'Dodo Spices — Premium Export-Quality Red Chilli',
    template: '%s | Dodo Spices',
  },
  description:
    'Premium export-quality dried red chilli sourced from India\'s finest growing regions. Whole, stemless, and flakes — for food manufacturers, spice blenders, and export buyers.',
  keywords: [
    'red chilli', 'dried red chilli', 'stemless red chilli', 'red chilli flakes',
    'export quality red chilli', 'India red chilli supplier', 'spice exporter India',
    'red chilli wholesale', 'food grade red chilli', 'premium red chilli',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dodospices.com',
    siteName: 'Dodo Spices',
    title: 'Dodo Spices — Premium Export-Quality Red Chilli',
    description: 'Sourced from India\'s finest growing regions. Consistent quality. Export-ready supply.',
    images: [
      {
        url: '/images/img-1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dodo Spices — Premium Red Chilli',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dodo Spices — Premium Export-Quality Red Chilli',
    description: 'Sourced from India\'s finest growing regions. Consistent quality. Export-ready supply.',
    images: ['/images/img-1.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://dodospices.com',
  },
};

// ─── Viewport export (Next.js 13+) ───────────────────────────────────────────
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0c09',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <head>
        {/* Preconnect to Google Fonts CDN used by globals.css @import */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif' }}
      >
        <Header />

        {children}
        <Footer />
      </body>
    </html>
  );
}
