//import css file
import './globals.scss'
import './tokens.css'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import ClientProvider from '@/Providers/ClientProvider';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-prompt',
  weight: ['400', '500', '600', '700', '800'],
  preload: true
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true
})

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Darmar Group',
  url: 'https://darmargroup.co.nz',
  logo: {
    '@type': 'ImageObject',
    url: 'https://darmargroup.co.nz/logo.png',
  },
  sameAs: [
    'https://www.facebook.com/darmargroup',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-NZ" >
      <head>
        <link rel="preconnect" href="https://cms.darmargroup.co.nz" />
        <link rel="dns-prefetch" href="https://cms.darmargroup.co.nz" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} ${inter.variable}`}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}
