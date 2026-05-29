import styles from "@/styles/p-admin/settings.module.css";

function RegionalSettings() {
  return (
    <div className={styles["default-setting-shop"]}>
      <span className={styles["title"]}>تنظیمات پیش‌فرض سایت</span>

      <div className={styles["default-setting-form"]}>
        <div className={styles["default-setting-card"]}>
          <span className={styles["default-setting-input-name"]}>زبان</span>

          <div className="">
            <select name="" id="">
              <option value="">FA</option>
              <option value="">EN</option>
            </select>

            <i>
              <img src="/icons/icon74.svg" alt="icon74" />
            </i>
          </div>
        </div>

        <div className={styles["default-setting-card"]}>
          <span className={styles["default-setting-input-name"]}>رنگ </span>

          <div className="">
            <select name="" id="">
              <option value="">لایت</option>
              <option value="">دارک</option>
            </select>

            <i>
              <img src="/icons/icon75.svg" alt="icon75" />
            </i>
          </div>
        </div>

        <div className={styles["default-setting-card"]}>
          <span className={styles["default-setting-input-name"]}>
            واحد پول فروشگاه
          </span>

          <div className="">
            <select name="" id="">
              <option value="">تومان</option>
              <option value="">دلار</option>
              <option value="">دینار</option>
            </select>

            <i>
              <img src="/icons/icon76.svg" alt="icon76" />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegionalSettings;
