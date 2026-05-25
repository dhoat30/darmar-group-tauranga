//import css file 
import './globals.scss'
import './tokens.css'
// Import slick css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
// import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter"
import ClientProvider from '@/Providers/ClientProvider';
import Script from 'next/script'

// fonts settings

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


export default function RootLayout({ children }) {

  const GTM_ID = process.env.GTM_ID;

  return (
    <html lang="en" >
      <head>
        <link rel="preconnect" href="https://cms.primemovers.co.nz" />
        <link rel="dns-prefetch" href="https://cms.primemovers.co.nz" />
        <link rel="preconnect" href="https://www.clickcease.com" />
        <link rel="dns-prefetch" href="https://www.clickcease.com" />
      </head>
      {GTM_ID && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s);j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `
          }}
        />
      )}
              <body className={`${plusJakartaSans.variable} ${inter.variable}`}>
                  {/* 3) GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} 
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
            loading='lazy'
          />
        </noscript>
        )}
        {/* <AppRouterCacheProvider> */}
      <ClientProvider>
          {children}
        </ClientProvider>
        {/* </AppRouterCacheProvider> */}
      </body>
    </html>
  )
}
