import styles from "./sortProduct.module.css";

function SortProduct() {
  return (
    <div className={styles["all-products-sort"]}>
      <h3>مرتب سازی: </h3>

      <div className={styles["sort-items"]}>
        <span>پرفروش‌ترین</span>
        <span>پربازدیدترین</span>
        <span>جدیدترین</span>
        <span>گرانترین</span>
        <span>ارزانترین</span>
        <span>منتخب</span>
        <span>امتیاز کاربران</span>
        <span>مرتبط</span>
      </div>
    </div>
  );
}

export default SortProduct;
