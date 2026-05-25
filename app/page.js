export const revalidate = 2592000; // applies to both page and metadata

import Header from "@/Components/UI/Header/Header";
import {
  getSinglePostData,
  getOptions,
  getHubspotContacts,
} from "@/utils/fetchData";
import Footer from "@/Components/UI/Footer/Footer";
import Layout from "@/Components/UI/Layout/Layout";
import reviewsData from "@/data/google-reviews.json";

//run to get reviews GOOGLE_PLACE_ID="ChIJzwMvbrByAGERbQ9N2-JlDfg" SERPAPI_API_KEY="bcc06d6e7ad003a94e56f47ae6467cdba75de324e5c92957b10e479e5edbe38b" npm run sync:reviews
export async function generateMetadata(props, parent) {
  // read route params

  // fetch data
  const data = await getSinglePostData("home", "wp-json/wp/v2/pages");

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  if (Array.isArray(data) && data.length > 0) {
    const seoData = data[0].yoast_head_json;
    return {
      title: seoData?.title,
      description: seoData?.description,
      metadataBase: new URL(process.env.siteUrl),
      openGraph: {
        title: seoData?.title,
        description: seoData?.description,
        url: process.env.siteUrl,
        siteName: process.env.siteName,
        images: [
          {
            url: seoData?.og_image && seoData?.og_image[0]?.url,
            width: 800,
            height: 600,
          },
          {
            url: seoData?.og_image && seoData?.og_image[0].url,
            width: 1800,
            height: 1600,
          },
        ],
        type: "website",
      },
    };
  }
}

export default async function Home() {
  const data = await getSinglePostData("home", "wp-json/wp/v2/pages");
  const options = await getOptions();
  console.log("options ", options);
  // const googleReviews = await getGoogleReviews()
  if (!Array.isArray(data) || data.length === 0) return null;
  const sections = data[0]?.acf?.sections;
  const reviewerPics = options?.review_section_?.reviewer_pics;

  return (
    <>
      <Header />
      <main>
        <Layout
          googleReviewsData={reviewsData}
          uspTable={options.usp_table}
          sections={sections}
          ductCleaning={options["12a_duct_cleaning"]}
          uspData={options.usp}
          statsData={options.status}
          locationsCovered={options.locations_covered}
          hoursCalculatorData={options.hours_calculator}
          servicesData={options.services}
          reviewerPics={reviewerPics}
        />

        {/* <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} /> */}
      </main>
      <Footer
        showFooterCta={false}
        className="mt-32"
        footerCtaData={options.footer_cta}
        contactInfo={options.contact_info}
        socialData={options.social_links}
      />
    </>
  );
}
