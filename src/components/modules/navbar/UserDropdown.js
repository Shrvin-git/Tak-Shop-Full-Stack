import Link from "next/link";
import styles from "./UserDropdown.module.css";

export default function UserDropdown({ role }) {
  return (
    <div className={styles.dropdown}>
      <ul className={styles.userMenu}>
        <li>
          <Link href="/p-user">پروفایل کاربری</Link>
        </li>
        <li>
          <Link href="/p-user/orders">سفارش‌های من</Link>
        </li>
        <li>
          <Link href="/p-user/favorites">علاقه‌مندی‌ها</Link>
        </li>
        <li>
          <Link href="/p-user/settings">تنظیمات</Link>
        </li>
        <li className={styles.logout}>خروج از حساب</li>
      </ul>

      {role === "ADMIN" && (
        <>
          <div className={styles.divider} />
          <ul className={`${styles.userMenu} ${styles.adminMenu}`}>
            <li>
              <Link href="/p-admin">ورود به پنل ادمین</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
