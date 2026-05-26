const { siteUrl } = require('./next-sitemap.config');

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === "production" ? "https://darmargroup.co.nz" : "http://localhost:3000");
    const siteName = "Darmar Group"

// bundle analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfigp} */
const nextConfig = {

    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
       
     
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cms.darmargroup.co.nz',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'gurpreetd16.sg-host.com',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**'
        }
        
    ],
    },
    env: {
        url: "https://gurpreetd16.sg-host.com",
        siteUrl: baseUrl,
        siteName: siteName,
    },
}

module.exports = withBundleAnalyzer(nextConfig)

