"use client";

import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import styles from "./EmptyCart.module.css";

export default function EmptyCart() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconBox}>
        <HiOutlineShoppingCart />
      </div>

      <h3>سبد خرید شما خالی است!</h3>

      <p>
        هنوز هیچ محصولی به سبد خرید اضافه نکرده‌اید. برای مشاهده محصولات روی
        دکمه زیر کلیک کنید.
      </p>

      <Link href="/" className={styles.btn}>
        مشاهده محصولات
      </Link>
    </div>
  );
}
