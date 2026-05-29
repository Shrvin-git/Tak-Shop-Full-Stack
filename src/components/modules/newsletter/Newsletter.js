import styles from "./Newsletter.module.css";

function Newsletter() {
  return (
    <div className={styles["newsletter-container"]}>
      <div className="container">
        <div className={styles["newsletter-wrapper"]}>
          <div className={styles["newsletter-right"]}>
            <h2>خبرنامه</h2>
            <p>ایمیلتو توی باکس جلویی برام بنویس تا از اخبار جا نمونی!</p>
          </div>

          <div className={styles["newsletter-left"]}>
            <form action="#" className={styles["newsletter-form"]}>
              <input
                type="email"
                className={styles["newsletter-input"]}
                placeholder="لطفا ایمیل خود را وارد کنید..."
              />
              <button type="submit" className={styles["newsletter-button"]}>
                ثبت ایمیل
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
