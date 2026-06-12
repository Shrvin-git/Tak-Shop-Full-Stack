"use client";

import Link from "next/link";
import {
  IoDocumentTextOutline,
  IoGridOutline,
  IoPricetagOutline,
  IoCubeOutline,
  IoArrowBackOutline,
} from "react-icons/io5";
import styles from "./SearchResultItem.module.css";

const TYPE_CONFIG = {
  product: { label: "محصول", Icon: IoCubeOutline },
  article: { label: "مقاله", Icon: IoDocumentTextOutline },
  category: { label: "دسته‌بندی", Icon: IoGridOutline },
  brand: { label: "برند", Icon: IoPricetagOutline },
};

const DEFAULT_CONFIG = { label: "نتیجه", Icon: IoCubeOutline };

export default function SearchResultItem({ item, onSelect }) {
  const { label, Icon } = TYPE_CONFIG[item.type] ?? DEFAULT_CONFIG;

  const formattedPrice = item.price
    ? typeof item.price === "number"
      ? `${item.price.toLocaleString("fa-IR")} تومان`
      : item.price
    : null;

  const handleClick = () => {
    onSelect?.();
  };

  return (
    <Link href={item.href} className={styles.item} onClick={handleClick}>
      {/* تصویر یا آیکون */}
      <div className={`${styles.media} ${styles[item.type] ?? ""}`}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <Icon className={styles.fallbackIcon} aria-hidden="true" />
        )}
      </div>

      {/* محتوا */}
      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span
            className={`${styles.badge} ${styles[`badge_${item.type}`] ?? ""}`}
          >
            {label}
          </span>
          {formattedPrice && (
            <span className={styles.price}>{formattedPrice}</span>
          )}
        </div>

        <h3 className={styles.title}>{item.title}</h3>

        {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
      </div>

      {/* فلش */}
      <div className={styles.arrow} aria-hidden="true">
        <IoArrowBackOutline />
      </div>
    </Link>
  );
}
