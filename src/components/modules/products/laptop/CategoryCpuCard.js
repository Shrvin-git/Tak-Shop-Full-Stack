import Link from "next/link";
import styles from "./CategoryCpuCard.module.css";

function CategoryCpuCard({ item }) {
  return (
    <Link
      href={`http://localhost:3000/products/laptops?cpuModel=${item.name}`}
      className={styles["category-by-cpu__items"]}
    >
      <div>
        <img src={`${item.img}`} alt="" className={styles.CPU_IMG} />
      </div>

      <span>{item.name}</span>
    </Link>
  );
}

export default CategoryCpuCard;
