import styles from "@/styles/p-admin/settings.module.css";

function DisplayOptions() {
  return (
    <div className={styles["store-display-setting"]}>
      <span className={styles["title"]}>تنظیمات نمایش فروشگاه:</span>

      <div className={styles["ddd"]}>
        <div
          className={
            styles["default-setting-card"] + " " + styles["advanced-setting"]
          }
        >
          <span className={styles["default-setting-input-name"]}>
            نحوه نمایش محصولات
          </span>

          <div className="">
            <select name="" id="">
              <option value="">لیستی</option>
              <option value="">ردیفی</option>
            </select>

            <i>
              <img src="/icons/icon77.svg" alt="icon77" />
            </i>
          </div>
        </div>

        <div
          className={
            styles["default-setting-card"] + " " + styles["advanced-setting"]
          }
        >
          <span className={styles["default-setting-input-name"]}>
            تعداد محصولات در هر صفحه
          </span>

          <div className="">
            <select name="" id="">
              <option value="">5</option>
              <option value="">10</option>
              <option value="">15</option>
              <option value="">20</option>
              <option value="">25</option>
            </select>

            <i>
              <img src="/icons/icon78.svg" alt="icon78" />
            </i>
          </div>
        </div>
      </div>

      <div className={styles["store-display-readio-container"]}>
        <div className={styles["store-display-readio"]}>
          <span>فعال‌سازی فیلتر پیشرفته</span>

          <label className={styles["toggle-switch"]}>
            <input type="checkbox" />
            <span className={styles["slider"]}></span>
          </label>
        </div>

        <div className={styles["store-display-readio"]}>
          <span> نمایش تعداد موجودی </span>

          <label className={styles["toggle-switch"]}>
            <input type="checkbox" />
            <span className={styles["slider"]}></span>
          </label>
        </div>

        <div className={styles["store-display-readio"]}>
          <span> نمایش محصولات ناموجود </span>

          <label className={styles["toggle-switch"]}>
            <input type="checkbox" />
            <span className={styles["slider"]}></span>
          </label>
        </div>

        <div className={styles["store-display-readio"]}>
          <span> نمایش تحفیف </span>

          <label className={styles["toggle-switch"]}>
            <input type="checkbox" />
            <span className={styles["slider"]}></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default DisplayOptions;
