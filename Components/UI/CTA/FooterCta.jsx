import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import styles from "./FooterCTA.module.scss";

export default function FooterCta({ title, description, ctaArray }) {
  return (
    <section className={styles.section}>
      <Container maxWidth="lg">
        <div className={styles.wrapper}>
          <div className={styles.contentWrapper}>
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="var(--dark-on-surface)"
              className={styles.title}
            >
              {title}
            </Typography>

            {description && (
              <div
                className={`${styles.description} heading-5 mt-16`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            <div className={`${styles.buttonWrapper} flex align-center justify-center gap-8 flex-wrap mt-24`}>
              {ctaArray &&
                ctaArray.map((cta, index) => {
                  const ctaLink = cta.link;
                  const isPhone = ctaLink.url?.startsWith("tel:");

                  return (
                    <Button
                      key={index}
                      component={Link}
                      href={ctaLink.url}
                      target={ctaLink.target || undefined}
                      size="large"
                      variant={isPhone ? "outlined" : "contained"}
                      className={isPhone ? styles.phoneButton : styles.quoteButton}
                      startIcon={isPhone ? <LocalPhoneOutlinedIcon /> : undefined}
                      endIcon={!isPhone ? <ArrowForwardIcon /> : undefined}
                    >
                      {ctaLink.title}
                    </Button>
                  );
                })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
