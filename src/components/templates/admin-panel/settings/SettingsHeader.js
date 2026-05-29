import styles from "@/styles/p-admin/settings.module.css";

function SettingsHeader() {
  return (
    <div className={styles["sections-settings"]}>
      <div
        className={
          styles["section-settings-items"] +
          " " +
          styles["section-settings-items--active"]
        }
      >
        عمومی
      </div>
      <div className={styles["section-settings-items"]}>تماس و شبکه ها</div>
      <div className={styles["section-settings-items"]}>
        درگاه پرداخت و مالی
      </div>
      <div className={styles["section-settings-items"]}>حمل‌ونقل و ارسال</div>
      <div className={styles["section-settings-items"]}>کاربران و حساب ها</div>
      <div className={styles["section-settings-items"]}>امنیت و دسترسی</div>
      <div className={styles["section-settings-items"]}>سئو و محتوا</div>
    </div>
  );
}

export default SettingsHeader;
