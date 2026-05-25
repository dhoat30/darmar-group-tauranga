import React from "react";
import styles from "./HeroSection.module.scss";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Link from "next/link";
import HeroUSPBox from "@/Components/UI/USP/HeroUSPBox";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Container from "@mui/material/Container";
import HeroUSP from "@/Components/UI/USP/HeroUSP";
export default function HeroSection({
  subtitle,
  title,
  description,
  cta,
  uspData,
  graphicType,
  graphicData,
}) {
  const ctaLinks = Array.isArray(cta) ? cta : cta ? [{ link: cta }] : [];
  const quoteCta = ctaLinks[0]?.link;
  const phoneCta = ctaLinks[1]?.link;

  let graphic;
  console.log("graphicData in HeroSection:", graphicType);
  if (graphicType === "image") {
    graphic = (
      <div
        className="image-wrapper border-radius-12"
        style={{ paddingBottom: "100%" }}
      >
        <Image
          src={graphicData.sizes.large}
          alt={graphicData.alt || title}
          fill
          className={`${styles.image}`}
          loading="lazy"
        />
      </div>
    );
  }

  if (graphicType === "youtube_video") {
    graphic = (
      <Video
        videoID={graphicData.youtube_id}
        placeholderImage={graphicData.placeholder_image}
        priority={true}
      />
    );
  }
  return (
    <section className={styles.section}>
      <Container maxWidth="xl" className={`${styles.container} grid gap-40 align-center`}>
        <div className={`${styles.contentWrapper}`}>
          <Typography variant="h6" component="div" className={`${styles.subtitle} eyebrow-text`} >
            {subtitle}
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className={`heading-1  ${styles.title} mt-8`}
          />
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={`heading-5  mt-24 ${styles.description}`}
          />
          {(quoteCta || phoneCta) && (
            <div className={`${styles.ctaWrapper} flex gap-8 align-center mt-24 flex-wrap`}>
              {quoteCta && (
                <Button
                  component={Link}
                  href={quoteCta.url}
                  target={quoteCta.target || undefined}
               
                  variant="contained"
                  disableElevation
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  {quoteCta.title}
                </Button>
              )}

              {phoneCta && (
                <Button
                  component={Link}
                  href={phoneCta.url}
                  target={phoneCta.target || undefined}
                  className={styles.phoneButton}
                  variant="outlined"
                  disableElevation
                  size="large"
                  startIcon={<LocalPhoneOutlinedIcon />}
                >
                  {phoneCta.title}
                </Button>
              )}
            </div>
          )}

          <HeroUSP data={uspData} className="mt-16" />

        </div>
        <div className={`${styles.graphicWrapper} `}>{graphic}</div>

      </Container>
    </section>
  );
}
