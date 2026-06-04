import styles from "@/styles/loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.loader}>
          {/* حلقه‌های متداخل */}
          <div className={`${styles.circle} ${styles.outer}`}></div>
          <div className={`${styles.circle} ${styles.inner}`}></div>
          <div className={`${styles.circle} ${styles.center}`}></div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.brand}>TAK SHOP</h2>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
