"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import BeforeAfter from "../BeforeAfterSlider/BeforeAfter";
import styles from "./GallerySection.module.scss";

function hasImage(image) {
  return Boolean(image && image.url);
}

function getImageSrc(image) {
  return image?.sizes?.large || image?.url;
}

function normalizeImage(image) {
  if (!hasImage(image)) return null;

  return {
    ...image,
    url: getImageSrc(image),
  };
}

function getTag(item) {
  const tag = item.tag;

  if (!tag) return { value: "all", label: "All" };
  if (typeof tag === "string") return { value: tag, label: tag };

  return {
    value: tag.value || tag.label || "all",
    label: tag.label || tag.value || "All",
  };
}

function GalleryItem({ item, priority }) {
  const beforeImage = normalizeImage(item.before_image || item.beforeImage);
  const afterImage = normalizeImage(item.image || item.after_image || item.afterImage);
  const singleImage = afterImage || beforeImage;

  if (!singleImage) return null;

  return (
    <article className={`${styles.item} mt-40`}>
      {beforeImage && afterImage ? (
        <BeforeAfter
          showTitle={false}
          data={{
            beforeImage,
            afterImage,
          }}
        />
      ) : (
        <div
          className={styles.imageWrapper}
          style={{
            paddingBottom: `${(singleImage.height / singleImage.width) * 100}%`,
          }}
        >
          <Image
            src={singleImage.url}
            alt={singleImage.alt || singleImage.title || "Gallery image"}
            fill
            priority={priority}
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className={styles.image}
          />
        </div>
      )}
    </article>
  );
}

export default function GallerySection({ title, description, items }) {
  const galleryItems = Array.isArray(items) ? items : [];
  const [activeTag, setActiveTag] = useState("all");

  const tags = useMemo(() => {
    const tagMap = new Map();

    galleryItems.forEach((item) => {
      const tag = getTag(item);
      tagMap.set(tag.value, tag.label);
    });

    const visibleTags = Array.from(tagMap, ([value, label]) => ({ value, label }))
      .filter((tag) => tag.value && tag.value !== "all");

    return visibleTags.length > 0
      ? [{ value: "all", label: "All" }, ...visibleTags]
      : [];
  }, [galleryItems]);

  const visibleItems = useMemo(() => {
    if (activeTag === "all") return galleryItems;

    return galleryItems.filter((item) => getTag(item).value === activeTag);
  }, [activeTag, galleryItems]);

  if (galleryItems.length === 0) return null;

  return (
    <section className={styles.section}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.header}>
          <div>
            <Typography variant="subtitle1" component="p" className="eyebrow-text">
              Our Work
            </Typography>
            {title && (
              <Typography variant="h1" component="h1" className={styles.title}>
                {title}
              </Typography>
            )}
          </div>

          {description && (
            <div
              className={`${styles.description} heading-5`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {tags.length > 0 && (
          <div className={styles.filters}>
            {tags.map((tag) => (
              <Chip
                key={tag.value}
                label={tag.label}
                clickable
                color={activeTag === tag.value ? "primary" : "default"}
                variant={activeTag === tag.value ? "filled" : "outlined"}
                onClick={() => setActiveTag(tag.value)}
                className={styles.filterChip}
              />
            ))}
          </div>
        )}

        <div className={styles.masonry}>
          {visibleItems.map((item, index) => (
            <GalleryItem
              key={item.image?.ID || item.before_image?.ID || index}
              item={item}
              priority={index < 4}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
