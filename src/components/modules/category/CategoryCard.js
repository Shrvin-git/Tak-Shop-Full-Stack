import Link from "next/link";
import styles from "./CategoryCard.module.css";

function CategoryCard({ categories }) {
  return (
    <>
      <Link
        className={styles.category_item}
        href={`/categories/${categories.slug}`}
      >
        <img src={categories.image} alt="" />
        <span>{categories.title}</span>
      </Link>
    </>
  );
}

export default CategoryCard;
