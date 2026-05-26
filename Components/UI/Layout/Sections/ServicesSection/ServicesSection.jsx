import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styles from "./ServicesSection.module.scss";

function getSuitedTo(card) {
  const suitedTo =
    card.suited_to ||
    card.suitedTo ||
    card.best_for ||
    card.suitable_for ||
    card.subtitle ||
    "";

  if (Array.isArray(suitedTo)) {
    return suitedTo
      .map((item) => item.value || item.label || item.title || "")
      .filter(Boolean)
      .join(" · ");
  }

  if (typeof suitedTo === "object") {
    return suitedTo.value || suitedTo.label || suitedTo.title || "";
  }

  return suitedTo;
}

export default function ServicesSection({ title, subtitle, description, cards, eyebrowText }) {
  if (!cards) return null;

  return (
    <section id="our-services" className={styles.section}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.titleGrid}>
          <div className={styles.titleWrapper}>
            {eyebrowText && (
              <Typography variant="subtitle1" component="p" className={"eyebrow-text"}>
                {eyebrowText}
              </Typography>
            )}
            {title && (
              <Typography variant="h2" component="h2" className={styles.title} color="var(--light-primary)" >
                {title}
              </Typography>
            )}
          </div>

          {description && (
            <div
              className={"heading-6"}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        <div className={styles.cardsGrid}>
          {cards.map((card, index) => {
            const suitedTo = getSuitedTo(card);

            return (
              <article className={styles.card} key={index}>
                {card.image && (
                  <div className={styles.imageWrapper}>
                    <Image
                      src={card.image.sizes?.large || card.image.url}
                      alt={card.image.alt || card.title}
                      fill
                      className={styles.image}
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div className={styles.contentWrapper}>
                  {card.title && (
                    <Typography variant="h6" component="h3" className={styles.cardTitle} color="var(--light-primary)" >
                      {card.title}
                    </Typography>
                  )}

                  {card.description && (
                    <div
                      className={"body1"}
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    />
                  )}

                  {suitedTo && (
                    <div className={styles.suitedWrapper}>
                      <Typography variant="subtitle2" component="p" className={`${styles.suitedLabel} mb-4`} >
                        Suited to
                      </Typography>
                      <Typography variant="body2" component="p" className={styles.suitedValue}>
                        {suitedTo}
                      </Typography>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
