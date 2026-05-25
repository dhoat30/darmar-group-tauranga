import Image from "next/image";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./ServiceCardsTwoColumn.module.scss";
import Button from "@mui/material/Button";

export default function ServiceCardsTwoColumn({ title, cards }) {
  if (!cards || cards.length === 0) return null;

  return (
    <section className={styles.section}>
      <Container maxWidth="xl" className={styles.container}>
        {title && (
          <Typography variant="h2" component="h2" color={"var(--light-primary)"} className={styles.title}>
            {title}
          </Typography>
        )}

        <div className={`${styles.cardsGrid} mt-56`}>
          {cards.map((card, index) => (
            <article className={styles.card} key={index}>
              {card.image && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={card.image.sizes?.large || card.image.url}
                    alt={card.image.alt || card.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
              )}

              <div className={styles.contentWrapper}>
                {card.title && (
                  <Typography variant="h5" component="h3" className={styles.cardTitle}>
                    {card.title}
                  </Typography>
                )}

                {card.chips && card.chips.length > 0 && (
                  <div className={`${styles.chipsWrapper}  mt-8`}>
                    {card.chips.map((chip, chipIndex) => (
                      <Chip
                        key={chipIndex}
                        label={chip.label}
                        size="large"
                        className={styles.chip}
                      
                      />
                    ))}
                  </div>
                )}

                {card.description && (
                  <div
                    className={`${styles.description} heading-6 mt-8 mb-8`}
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  />
                )}

                {card.link && (
                  <Link
                    href={card.link.url}
                    target={card.link.target || undefined}
                    className={`${styles.link} `}
                  >
                    <Button variant="text" endIcon={<ArrowForwardIcon />} className={styles.linkButton}>
                      {card.link.title}
                    </Button>
                  </Link>

                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
