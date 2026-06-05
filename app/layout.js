//import css file 
import './globals.scss'
import './tokens.css'
// Import slick css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
// import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter"
import ClientProvider from '@/Providers/ClientProvider';

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
  return (
    <html lang="en" >
      <head>
        <link rel="preconnect" href="https://cms.darmargroup.co.nz" />
        <link rel="dns-prefetch" href="https://cms.darmargroup.co.nz" />
      </head>
              <body className={`${plusJakartaSans.variable} ${inter.variable}`}>
        {/* <AppRouterCacheProvider> */}
      <ClientProvider>
          {children}
        </ClientProvider>
        {/* </AppRouterCacheProvider> */}
      </body>
    </html>
  )
}
