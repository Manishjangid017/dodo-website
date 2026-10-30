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
  metadataBase: new URL('https://dodoagrofoodindustry.com'),

  // ── Title ──────────────────────────────────────────────────────────────────
  title: {
    default: 'Dodo Agro Food Industry — Premium Export-Quality Red Chilli | Jodhpur, Rajasthan',
    template: '%s | Dodo Agro Food Industry',
  },

  // ── Description ───────────────────────────────────────────────────────────
  description:
    'Dodo Agro Food Industry supplies premium export-quality dried red chilli from Jodhpur, Rajasthan. Whole, stemless & flakes — trusted by food manufacturers, spice blenders, and global export buyers.',

  // ── Keywords ──────────────────────────────────────────────────────────────
  keywords: [
    'Dodo Agro Food Industry',
    'red chilli exporter India',
    'dried red chilli supplier',
    'stemless red chilli',
    'red chilli flakes wholesale',
    'export quality red chilli Rajasthan',
    'red chilli Jodhpur',
    'spice exporter India',
    'red chilli bulk supply',
    'food grade red chilli',
    'premium red chilli manufacturer',
    'RIICO industrial area Jodhpur',
    'Indian spice exporter',
    'whole dried red chilli',
  ],

  // ── Authors & Publisher ───────────────────────────────────────────────────
  authors: [{ name: 'Dodo Agro Food Industry' }],
  publisher: 'Dodo Agro Food Industry',
  creator: 'Dodo Agro Food Industry',

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dodoagrofoodindustry.com',
    siteName: 'Dodo Agro Food Industry',
    title: 'Dodo Agro Food Industry — Premium Export-Quality Red Chilli',
    description:
      'Premium dried red chilli sourced from Rajasthan. Whole, stemless & flakes — export-ready supply for global buyers and food manufacturers.',
    images: [
      {
        url: '/images/img-1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dodo Agro Food Industry — Premium Red Chilli from Jodhpur, Rajasthan',
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Dodo Agro Food Industry — Premium Export-Quality Red Chilli',
    description:
      'Premium dried red chilli sourced from Rajasthan. Whole, stemless & flakes — export-ready supply for global buyers and food manufacturers.',
    images: ['/images/img-1.jpeg'],
  },

  // ── Robots ────────────────────────────────────────────────────────────────
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

  // ── Canonical URL ─────────────────────────────────────────────────────────
  alternates: {
    canonical: 'https://dodoagrofoodindustry.com',
  },

  // ── Verification (add later when Google Search Console is set up) ─────────
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  // },

  // ── Category ──────────────────────────────────────────────────────────────
  category: 'Food & Spice Manufacturing',
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

        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Dodo Agro Food Industry',
              url: 'https://dodoagrofoodindustry.com',
              logo: 'https://dodoagrofoodindustry.com/logo.jpeg',
              description:
                'Premium export-quality dried red chilli supplier from Jodhpur, Rajasthan. Whole, stemless & flakes for food manufacturers and global export buyers.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'H1-230 Riico Industrial Area, Tinwari',
                addressLocality: 'Jodhpur',
                addressRegion: 'Rajasthan',
                addressCountry: 'IN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-8503001234',
                contactType: 'sales',
                email: 'dodoagrofoodindustry@gmail.com',
                availableLanguage: ['English', 'Hindi'],
              },
              sameAs: [],
            }),
          }}
        />
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
