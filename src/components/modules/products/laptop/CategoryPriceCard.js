import Link from "next/link";
import styles from "./CategoryCpuCard.module.css";

function CategoryPriceCard({ item }) {
  return (
    <Link
      href={`/products/laptops?minPrice=${item.min}&maxPrice=${item.max}`}
    >
      <div className={styles["category-by-cpu__items"]}>
        <img src={item.img} alt="" className={styles.CPU_IMG} />
      </div>
    </Link>
  );
}

export default CategoryPriceCard;
