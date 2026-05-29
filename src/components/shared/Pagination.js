"use client";
import styles from "./pagination.module.css";

// اضافه کردن onPageChange برای اطلاع دادن به والد
function Pagination({ totalItems, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems.length / pageSize);

  // if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.pagination__btn}
      >
        قبلی
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
        <button
          key={item}
          onClick={() => onPageChange(item)}
          className={`${styles.pagination__btn} ${currentPage === item ? styles["pagination__btn--active"] : ""}`}
        >
          {item}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.pagination__btn}
      >
        بعدی
      </button>
    </div>
  );
}

export default Pagination;
