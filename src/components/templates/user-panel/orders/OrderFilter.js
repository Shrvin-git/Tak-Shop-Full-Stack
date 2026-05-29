import styles from "./orders.module.css";

export default function OrderFilter({ active, onChange }) {
  return (
    <div className={styles["user-otder-header-bottom"]}>
      {["جاری", "تحویل داده شده", "مرجوع شده"].map((label, index) => (
        <div
          key={index}
          className={`${styles["order-modes"]} ${active === index ? styles["order-modes--active"] : ""}`}
          onClick={() => onChange(index)}
        >
          {label}
          <span
            className={`${styles["order-moodes-counter"]} ${active === index ? styles["active"] : ""}`}
          >
            {index === 0 ? 1 : index === 1 ? 16 : 6}
          </span>
        </div>
      ))}
    </div>
  );
}
