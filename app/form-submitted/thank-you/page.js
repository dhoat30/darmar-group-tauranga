export const revalidate = 2592000; // applies to both page and metadata

import Header from '@/Components/UI/Header/Header';
import ThankYou from '@/Components/UI/ThankYou/ThankYou';
import Script from 'next/script';

export const metadata = {
    metadataBase: new URL('https://bestnzmovers.co.nz'),
    title: 'Thank You',
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: false,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default async function Page() {
    return (
        <>
            <Script
                id="clickcease-conversion-tracking"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.ccConVal = 0;
                        var script = document.createElement("script");
                        script.async = true;
                        script.type = "text/javascript";
                        script.src = "https://www.clickcease.com/monitor/cccontrack.js";
                        document.head.appendChild(script);
                    `,
                }}
            />
            <noscript
                dangerouslySetInnerHTML={{
                    __html: '<a href="https://www.clickcease.com" rel="nofollow"><img src="https://monitor.clickcease.com/conversions/conversions.aspx?value=0" alt="ClickCease"/></a>',
                }}
            />
            <Header />
            <main>
                <ThankYou />
            </main>
        </>

    )
}
