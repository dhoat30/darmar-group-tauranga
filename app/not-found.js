import Link from "next/link";
import Header from "@/Components/UI/Header/Header";
import Footer from "@/Components/UI/Footer/Footer";
import styles from "./not-found.module.scss";

export const metadata = {
  title: "Page Not Found | Darmar Group",
  description: "The page you were looking for could not be found.",
};

const usefulLinks = [
  {
    href: "/services/commercial-cleaning",
    title: "Commercial cleaning",
    description: "Reliable cleaning tailored to your workplace.",
  },
  {
    href: "/services/maintenance-services",
    title: "Maintenance services",
    description: "Practical support to keep your property running well.",
  },
  {
    href: "/contact-us",
    title: "Contact our team",
    description: "Tell us what you need and we will point you the right way.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

function PageIllustration() {
  return (
    <div className={styles.illustration} aria-hidden="true">
      <span className={`${styles.sparkle} ${styles.sparkleOne}`}>+</span>
      <span className={`${styles.sparkle} ${styles.sparkleTwo}`}>+</span>
      <span className={`${styles.sparkle} ${styles.sparkleThree}`}>+</span>
      <svg viewBox="0 0 440 320">
        <path
          className={styles.backPage}
          d="M118 45h184l60 60v157c0 13-10 23-23 23H118c-13 0-23-10-23-23V68c0-13 10-23 23-23Z"
        />
        <path
          className={styles.frontPage}
          d="M101 68h184l60 60v157c0 13-10 23-23 23H101c-13 0-23-10-23-23V91c0-13 10-23 23-23Z"
        />
        <path className={styles.fold} d="M285 68v60h60" />
        <path className={styles.line} d="M130 178h164M130 211h116" />
        <circle className={styles.searchCircle} cx="213" cy="137" r="25" />
        <path className={styles.searchHandle} d="m232 156 22 22" />
      </svg>
      <span className={styles.errorCode}>404</span>
    </div>
  );
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Page not found</p>
            <h1>Looks like this page has moved on.</h1>
            <p className={styles.intro}>
              The link may be outdated or the page may have a new home. Let&apos;s
              get you back to the right place.
            </p>
            <div className={styles.actions}>
              <Link href="/" className={styles.primaryAction}>
                Back to homepage
                <ArrowIcon />
              </Link>
              <Link href="/get-free-quote" className={styles.secondaryAction}>
                Get a free quote
              </Link>
            </div>
          </div>
          <PageIllustration />
        </section>

        <section className={styles.linksSection} aria-labelledby="useful-links-title">
          <div className={styles.linksHeading}>
            <p className={styles.eyebrow}>Useful links</p>
            <h2 id="useful-links-title">Where would you like to go?</h2>
          </div>
          <div className={styles.linkGrid}>
            {usefulLinks.map((link) => (
              <Link href={link.href} className={styles.linkCard} key={link.href}>
                <span>
                  <strong>{link.title}</strong>
                  <small>{link.description}</small>
                </span>
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer showFooterCta={false} />
    </>
  );
}
