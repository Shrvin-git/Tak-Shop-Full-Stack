import Link from "next/link";
import styles from "@/styles/404.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.particles}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob2}></div>
      <div className={styles.circleDecoration}></div>

      <div className={styles.content}>
        <div className={styles.errorWrapper}>
          <h1 className={styles.glitch}>404</h1>
        </div>

        <h2 className={styles.title}>خطای دسترسی!</h2>
        <p className={styles.description}>
          متأسفانه صفحه‌ای که به دنبال آن هستید یافت نشد. احتمالاً آدرس را
          اشتباه وارد کرده‌اید یا این صفحه حذف شده است.
        </p>

        <Link href="/" className={styles.btn}>
          <span className={styles.btnText}>برگشت به خانه</span>
          <div className={styles.btnIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
