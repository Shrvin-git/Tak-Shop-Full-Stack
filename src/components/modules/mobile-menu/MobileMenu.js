import Link from "next/link";

import styles from "./MobileMenu.module.css";


export default function MobileMenu() {
  return (
    <div className="menu-mobile-bottom">
      <div className="menu-mobile-items">
        <Link className="active" href={"/"}>
          <img src="./svgs/home.svg" />
          <span>خانه</span>
        </Link>
      </div>

      <div className="menu-mobile-items">
        <Link href={"/products"}>
          <img src="./svgs/category.svg" />
          <span>دسته بندی</span>
        </Link>
      </div>

      <div className="menu-mobile-items">
        <Link href={"/cart"}>
          <img src="./svgs/cart-mobile.svg" />
          <span>سبد خرید</span>
        </Link>
      </div>

      <div className="menu-mobile-items">
        <Link href={"/profile"}>
          <img src="./svgs/profile.svg" alt="" />
          <span>پروفایل</span>
        </Link>
        {/* <Link href={"sign-up.html"}>
          <span>
            <img src="./svgs/user-edit.svg" alt="" />
          </span>
          ورود یا ثبت نام
        </Link> */}
      </div>
    </div>
  );
}
