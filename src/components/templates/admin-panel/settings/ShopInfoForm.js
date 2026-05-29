import styles from "@/styles/p-admin/settings.module.css";

function ShopInfoForm() {
  return (
    <div className={styles["main-setting-shop-form"]}>
      <span className={styles["title"]}>اطلاعات کلی فروشگاه</span>

      <div className={styles["main-setting-inputs-container"]}>
        <div className={styles["main-setting-inputs"]}>
          <span className={styles["name-input"]}> نام فروشگاه </span>

          <div className={styles["inputs"]}>
            <input type="text" name="" id="" />
            <i>
              <img src="/icons/icon68.svg" alt="icon68" />
            </i>
          </div>
        </div>

        <div className={styles["main-setting-inputs"]}>
          <span className={styles["name-input"]}> ایمیل فروشگاه</span>

          <div className={styles["inputs"]}>
            <input type="text" name="" id="" />
            <i>
              <img src="/icons/icon69.svg" alt="icon69" />
            </i>
          </div>
        </div>

        <div className={styles["main-setting-inputs"]}>
          <span className={styles["name-input"]}>شماره تماس</span>

          <div className={styles["inputs"]}>
            <input type="text" name="" id="" />
            <i>
              <img src="/icons/icon70.svg" alt="icon70" />
            </i>
          </div>
        </div>

        <div className={styles["main-setting-inputs"]}>
          <span className={styles["name-input"]}> آدرس </span>

          <div className={styles["inputs"]}>
            <input type="text" name="" id="" />
            <i>
              <img src="/icons/icon71.svg" alt="icon71" />
            </i>
          </div>
        </div>

        <div className={styles["main-setting-inputs"]}>
          <span className={styles["name-input"]}> کد پستی</span>

          <div className={styles["inputs"]}>
            <input type="text" name="" id="" />
            <i>
              <img src="/icons/icon72.svg" alt="icon72" />
            </i>
          </div>
        </div>

        <div className={styles["main-setting-inputs"]}>
          <span className={styles["name-input"]}> لوگوی فروشگاه </span>

          <div className={styles["inputs"]}>
            <input type="text" name="" id="" />
            <i>
              <img src="/icons/icon73.svg" alt="icon73" />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopInfoForm;
