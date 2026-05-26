import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BeforeAfter from "../../../BeforeAfterSlider/BeforeAfter";
import styles from "./RowSection.module.scss";
import CustomAccordion from "@/Components/UI/Accordion/CustomAccordion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
export default function RowSection({
  title,
  eyebrowText,
  description,
  imageAlignment,
  image,
  cta,
  items,
  showBeforeAfterImages,
  beforeImage,
  afterImage,
  accordionData, 
  backgroundColor, 
  fontColor
}) {
  const imgPadding = (image.height / image.width) * 100;
  const contentAlignment = imageAlignment === "left" ? "2 / 3" : "1 / 2";
   const ctaLinks = Array.isArray(cta) ? cta : cta ? [{ link: cta }] : [];
  const quoteCta = ctaLinks[0]?.link;
  const phoneCta = ctaLinks[1]?.link;
  return (
    <section className={`${styles.section}`} id="services" style={{background: backgroundColor ? backgroundColor : null}}>
      <Container maxWidth="xl">
        <div className={`${styles.wrapper}`}>
          <div
            className={`${styles.contentWrapper} `}
            style={{ gridColumn: contentAlignment }}
          >
            <Typography variant="h6" component="div" className={`eyebrow-text `} >
              {eyebrowText}
            </Typography>
            <Typography variant="h2" component="h2" className={`${styles.title}`} color="var(--light-primary)" >
              {title}
            </Typography>

            <div
              className={`${styles.description} ${fontColor ? "dark-body1" : null  } body1 mb-16 mt-16`}
              dangerouslySetInnerHTML={{ __html: description }}
              style={{color: "white !important"}}
            />
          <div className={`${styles.itemsWrapper} `}>
            {items && items?.length > 0 &&
              items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bullet-point flex align-center gap-8 mt-4 mb-4"
                  >
                    <CheckCircleIcon
                      sx={{ color: "var(--light-primary)" }}
                    />
                    <Typography
                      variant="subtitle1"
                      component="span"
                      color="var(--light-primary)"
                      className="medium"
                    >
                      {item.item}
                    </Typography>
                  </div>
                );
              })}
              </div> 
      <CustomAccordion qaData = {accordionData}  /> 
        

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
          </div>

          {/* image wrapper */}
          {showBeforeAfterImages ? (
            <div className={`${styles.imageContainer}`}>
              <BeforeAfter
                showTitle={false}
                data={{ beforeImage, afterImage }}
              />
            </div>
          ) : (
            <div
              className={`${styles.imageWrapper} image-wrapper`}
              style={{ paddingBottom: `${imgPadding}%` }}
            >
              {image && 
               <Image
               src={image.url}
               alt={image.alt}
               fill
               sizes="(max-width: 1100px) 100vw, 50vw"
             />
              }
             
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}


