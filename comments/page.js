import ShowAll from "@/components/modules/showAll/ShowAll";
import Box from "@/components/templates/admin-panel/comments/Box";
import Table from "@/components/templates/admin-panel/comments/Table";
import styles from '@/styles/p-admin/users.module.css'


function page() {
  return (
    <div className={styles["admin-page"]}>
      <div className={styles["admin-page__content"]}>
        {/* Info Section */}
        <div
          className={`${styles["admin-section"]} ${styles["admin-section--info"]}`}
        >
          <Box />
          <Box />
          <Box />
          <Box />
        </div>

        <div
          className={`${styles["admin-section"]} ${styles["admin-section--orders"]}`}
        >
          <h3>لیست آخرین کامنت ها</h3>

          <div className={styles["filter-bar"]}>
            <div className={styles["filter-bar__icon"]}>
              <img src="/icons/icon30.svg" alt="icon30" />
              <span>فیلتر بر اساس:</span>
            </div>

            <div className={styles["filter-bar__item"]}>
              <p>محصولات تازه</p>
              <img src="/icons/icon31.svg" alt="icon31" />
            </div>
          </div>

          <Table />
          <ShowAll />
        </div>
      </div>
    </div>
  );
}

export default page;
