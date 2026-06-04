import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import { services, commercialLinks, informationLinks } from "./FooterLinks";
import ContactInfo from "./ContactInfo";
import FooterCta from "../CTA/FooterCta";
import styles from "./Footer.module.scss";
import SocialWrapper from "./SocialWrapper";

const footerBodySx = {
  color: "rgba(255, 255, 255, 0.72)",
  letterSpacing: 0,
};

const footerHeadingSx = {
  mb: 1.75,
  color: "#fff",
  letterSpacing: 0,
  textTransform: "none",
};

const footerMetaSx = {
  color: "rgba(255, 255, 255, 0.78)",
  fontSize: "0.95rem",
  lineHeight: 1.45,
  letterSpacing: 0,
};

export default function Footer({
  footerCtaData,
  showFooterCta = true,
  certifications,
  contactInfo,
  socialData,
  heroUspData,
}) {
  const legalLinks = informationLinks.filter((link) =>
    ["Privacy policy", "Terms and conditions"].includes(link.label),
  );
  const quickLinks = informationLinks.filter(
    (link) => !legalLinks.some((legalLink) => legalLink.url === link.url),
  );

  return (
    <>
      {showFooterCta && footerCtaData && (
        <FooterCta
          title={footerCtaData.title}
          description={footerCtaData.description}
          ctaArray={footerCtaData.cta}
        />
      )}

      <div className={`${styles.footerSection}`}>
        <Container maxWidth="xl" className={styles.container}>
          <div className={styles.footerWrapper}>
            <div className={styles.brandColumn}>
              <Link href="/" className={styles.brandLink}>
                <Typography variant="h4" component="span" sx={{ color: "#fff" }}>
                  Darmar Group
                </Typography>
              </Link>
              <Typography
                variant="body1"
                component="p"
                color="var(--dark-on-surface-variant)"
                className="mt-16"
              >
                Reliable commercial cleaning and maintenance services in Tauranga,
                tailored to the needs of your site, schedule, and day-to-day operations.
              </Typography>

              {(heroUspData?.text_usp?.length > 0 || heroUspData?.image_usp?.length > 0) && (
                <div className={`${styles.heroUspWrapper}  flex gap-8 align-center flex-wrap`}>
                  {heroUspData?.text_usp?.length > 0 && (
                    <div className={styles.textUspList}>
                      {heroUspData.text_usp.map((item, index) => (
                        <Typography
                          key={index}
                          variant="subtitle2"
                          component="div"
                       
                        >
                          {item.icon?.url && (
                            <Image
                              src={item.icon.url}
                              alt=""
                              width={18}
                              height={18}
                              className={styles.textUspIcon}
                            />
                          )}
                          <span>{item.value}</span>
                        </Typography>
                      ))}
                    </div>
                  )}

                  {heroUspData?.image_usp?.length > 0 && (
                    <div className={`${styles.imageUspList} flex gap-8 align-center flex-wrap mt-16 mb-16` }>
                      {heroUspData.image_usp.map((item, index) => (
                        item.image?.url && (
                          <Image
                            key={index}
                            src={item.image.url}
                            alt={item.image.alt || "Certification"}
                            width={item.image.width/3}
                            height={item.image.height/3}
                         
                          />
                        )
                      ))}
                    </div>
                  )}
                </div>
              )}

              {socialData && socialData.length > 0 && (
                <SocialWrapper socialData={socialData} />
              )}

              {certifications && (
                <div className="certification-wrapper">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginBottom: "8px" }}
                  >
                    Certifications
                  </Typography>
                  <div className="certification-logos flex flex-wrap gap-8 align-center">
                    {certifications.cards.map((item, index) => {
                      return (
                        <Image
                          key={index}
                          src={item.certification_image.url}
                          alt={item.alt ? item.alt : "certification"}
                          width={item.certification_image.width}
                          height={item.certification_image.height}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.linksContainer}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={footerHeadingSx}
              >
                Services
              </Typography>
              <ul className={styles.menuList}>
                {services.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link href={link.url} className={`${styles.link} body2 pb-8 inline-block`}>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {commercialLinks && commercialLinks.length > 0 && (
              <div className={styles.linksContainer}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={footerHeadingSx}
                >
                  Commercial
                </Typography>
                <ul className={styles.menuList}>
                  {commercialLinks.map((link, index) => {
                    return (
                      <li key={index}>
                        <Link
                          href={link.url}
                          className={`${styles.link} body2 pb-8 inline-block`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className={styles.linksContainer}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={footerHeadingSx}
              >
                Quick Links
              </Typography>
              <ul className={styles.menuList}>
                {quickLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link href={link.url} className={`${styles.link} body2 pb-8 inline-block`}>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.contactWrapper}>
              {contactInfo && contactInfo.info && (
                <div className="contact-section">
                  <ContactInfo contactInfo={contactInfo} />
                </div>
              )}
            </div>
          </div>

          <div className={styles.bottomBar}>
            <Typography variant="body1" component="span" sx={footerMetaSx}>
              © {new Date().getFullYear()} Darmar Group. All rights reserved.
            </Typography>

            <a href="https://webduel.co.nz" rel="nofollow" target="_blank" className={styles.creditLink}>
              <Typography variant="body1" component="span" sx={footerMetaSx}>
                Designed & Developed by <span className={styles.webduelLabel}>web<strong className={styles.duel}>duel</strong></span>
              </Typography>
            </a>

            <div className={styles.legalLinks}>
              {legalLinks.map((link) => (
                <Link key={link.url} href={link.url} className={styles.bottomLink}>
                  <Typography variant="body1" component="span" sx={footerMetaSx}>
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
