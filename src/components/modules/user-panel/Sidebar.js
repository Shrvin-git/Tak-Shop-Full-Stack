"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { showSwal } from "@/utils/helper";
import { useContext, useEffect, useState } from "react";
import { ProfileImageContext } from "@/context/ProfileImageContext";
import { usePathname, useRouter } from "next/navigation";
import ChangeProfileIcon from "../svgs/ChangeProfileIcon";

function SideBar() {
  const { setSelectedImage } = useContext(ProfileImageContext);
  const [user, setUser] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await fetch(`/api/auth/me`);
      const data = await res.json();

      setUser(data.user);
    };

    fetchUserInfo();
  }, []);

  const router = useRouter();

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  const logOut = () => {
    showSwal(
      "خروج از حساب",
      "مطمعنی میخوای ازحساب کاربریت خارج بشی",
      "warning",
      "آره",
      async () => {
        const res = await fetch("/api/auth/signout", { method: "POST" });

        if (res.status === 201) {
          showSwal("موفق", "با موفقیت خارج شدید.", "success", "باشه");
          router.push("/login-register");
        } else {
          const data = await res.json();
          showSwal("خطا", data.message || "مشکلی پیش اومد.", "error");
        }
      },
      "لغو",
      () => {
        null;
      },
    );
  };

  if (!user) return null;

  return (
    <section
      className={
        styles["profile-sidebar"] + " " + styles["profile-sidebar--toggle"]
      }
    >
      <div className={styles["profile-sidebar_header"]}>
        <div className={styles["profile-sidebar-top"]}>
          <div className={styles["avatar-wrapper"]}>
            <div className={styles["profile-sidebar_header-img"]}>
              <img src={user.profileImage} alt="" />
            </div>
            <input
              type="file"
              id="profile-image"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />

            <label htmlFor="profile-image">
              <ChangeProfileIcon className={styles.change_profile} />
            </label>
          </div>
        </div>
      </div>

      <div className={styles["profile-sidebar-items-wrapper"]}>
        <Link
          href={"/p-user"}
          data-section="main-info"
          className={
            styles["profile-sidebar-item"] +
            " " +
            (lastSegment === "p-user" ? styles["item-active"] : "")
          }
        >
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.1584 28.8333C26.1584 24.0307 20.8038 20.1267 16.0011 20.1267C11.1984 20.1267 5.84375 24.0307 5.84375 28.8333M16.0011 15.7747C17.5404 15.7747 19.0167 15.1632 20.1051 14.0747C21.1936 12.9862 21.8051 11.51 21.8051 9.97066C21.8051 8.43134 21.1936 6.95507 20.1051 5.86661C19.0167 4.77815 17.5404 4.16666 16.0011 4.16666C14.4618 4.16666 12.9855 4.77815 11.897 5.86661C10.8086 6.95507 10.1971 8.43134 10.1971 9.97066C10.1971 11.51 10.8086 12.9862 11.897 14.0747C12.9855 15.1632 14.4618 15.7747 16.0011 15.7747Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>

          <span>اطلاعات فردی</span>
        </Link>
        <Link
          href={"/p-user/notifications"}
          data-section="message"
          className={
            styles["profile-sidebar-item"] +
            " " +
            (lastSegment === "notifications" ? styles["item-active"] : "")
          }
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M4 8.5C4 6.37827 4.84285 4.34344 6.34315 2.84315C7.84344 1.34285 9.87827 0.5 12 0.5C14.1217 0.5 16.1566 1.34285 17.6569 2.84315C19.1571 4.34344 20 6.37827 20 8.5V13.197L22 16.197V20.5H16.389C16.1615 21.4937 15.6036 22.3808 14.8064 23.0162C14.0091 23.6515 13.0199 23.9975 12.0005 23.9975C10.9811 23.9975 9.99185 23.6515 9.19465 23.0162C8.39744 22.3808 7.83946 21.4937 7.612 20.5H2V16.197L4 13.197V8.5ZM9.708 20.5C9.90238 20.9462 10.2228 21.326 10.6299 21.5928C11.0371 21.8595 11.5133 22.0016 12 22.0016C12.4867 22.0016 12.9629 21.8595 13.3701 21.5928C13.7772 21.326 14.0976 20.9462 14.292 20.5H9.708ZM12 2.5C10.4087 2.5 8.88258 3.13214 7.75736 4.25736C6.63214 5.38258 6 6.9087 6 8.5V13.803L4 16.803V18.5H20V16.803L18 13.803V8.5C18 6.9087 17.3679 5.38258 16.2426 4.25736C15.1174 3.13214 13.5913 2.5 12 2.5Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id={styles["clip0"]}>
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0 0.5)"
                ></rect>
              </clipPath>
            </defs>
          </svg>

          <span>پیغام ها </span>
        </Link>
        <Link
          href={"/p-user/wishlists"}
          data-section="popular-product"
          className={
            styles["profile-sidebar-item"] +
            " " +
            (lastSegment === "wishlists" ? styles["item-active"] : "")
          }
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1 19.05L12 19.15L11.89 19.05C7.14 14.74 4 11.89 4 9C4 7 5.5 5.5 7.5 5.5C9.04 5.5 10.54 6.5 11.07 7.86H12.93C13.46 6.5 14.96 5.5 16.5 5.5C18.5 5.5 20 7 20 9C20 11.89 16.86 14.74 12.1 19.05ZM16.5 3.5C14.76 3.5 13.09 4.31 12 5.58C10.91 4.31 9.24 3.5 7.5 3.5C4.42 3.5 2 5.91 2 9C2 12.77 5.4 15.86 10.55 20.53L12 21.85L13.45 20.53C18.6 15.86 22 12.77 22 9C22 5.91 19.58 3.5 16.5 3.5Z"
              fill="currentColor"
            ></path>
          </svg>

          <span> کالاهای محبوب شما</span>
        </Link>
        <Link
          href={"/p-user/comments"}
          data-section="comments"
          className={
            styles["profile-sidebar-item"] +
            " " +
            (lastSegment === "comments" ? styles["item-active"] : "")
          }
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.5C13.78 21.5 15.5201 20.9722 17.0001 19.9832C18.4802 18.9943 19.6337 17.5887 20.3149 15.9442C20.9961 14.2996 21.1743 12.49 20.8271 10.7442C20.4798 8.99836 19.6226 7.39472 18.364 6.13604C17.1053 4.87737 15.5016 4.0202 13.7558 3.67294C12.01 3.32567 10.2004 3.5039 8.55585 4.18509C6.91131 4.86628 5.50571 6.01983 4.51677 7.49987C3.52784 8.97991 3 10.72 3 12.5C3 13.988 3.36 15.39 4 16.627L3 21.5L7.873 20.5C9.109 21.139 10.513 21.5 12 21.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>

          <span>کامنت های شما</span>
        </Link>
        <Link
          href={"/p-user/orders"}
          data-section="user-order"
          className={
            styles["profile-sidebar-item"] +
            " " +
            (lastSegment === "orders" ? styles["item-active"] : "")
          }
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 8L17 10M17 10L16.5 10.25L12 12.5M17 10V13.5M17 10L7.5 5M12 12.5L3 8M12 12.5V22M15.578 3.882L17.578 4.932C19.729 6.061 20.805 6.625 21.403 7.64C22 8.654 22 9.917 22 12.442V12.559C22 15.083 22 16.346 21.403 17.36C20.805 18.375 19.729 18.94 17.578 20.069L15.578 21.118C13.822 22.039 12.944 22.5 12 22.5C11.056 22.5 10.178 22.04 8.422 21.118L6.422 20.068C4.271 18.939 3.195 18.375 2.597 17.36C2 16.346 2 15.083 2 12.56V12.443C2 9.918 2 8.655 2.597 7.641C3.195 6.626 4.271 6.061 6.422 4.933L8.422 3.883C10.178 2.961 11.056 2.5 12 2.5C12.944 2.5 13.822 2.96 15.578 3.882Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </svg>

          <span>سفارش های شما</span>
        </Link>
        <Link
          href={"/p-user/gift-cards"}
          data-section="gift-cart"
          className={
            styles["profile-sidebar-item"] +
            " " +
            (lastSegment === "gift-cards" ? styles["item-active"] : "")
          }
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 11.5V15.5C4 18.8 4 20.45 5.025 21.475C6.05 22.5 7.7 22.5 11 22.5H13C16.3 22.5 17.95 22.5 18.975 21.475C20 20.45 20 18.8 20 15.5V11.5M12 6.357C12 5.33406 11.5936 4.35302 10.8703 3.62969C10.147 2.90636 9.16594 2.5 8.143 2.5H7.786C6.8 2.5 6 3.299 6 4.286C6 5.13841 6.33862 5.9559 6.94136 6.55864C7.5441 7.16138 8.36159 7.5 9.214 7.5H12M12 6.357V7.5M12 6.357C12 5.33406 12.4064 4.35302 13.1297 3.62969C13.853 2.90636 14.8341 2.5 15.857 2.5H16.214C17.2 2.5 18 3.299 18 4.286C18 4.70807 17.9169 5.126 17.7553 5.51594C17.5938 5.90588 17.3571 6.26019 17.0586 6.55864C16.7602 6.85709 16.4059 7.09383 16.0159 7.25535C15.626 7.41687 15.2081 7.5 14.786 7.5H12M12 11.5V22.5M3 9.5C3 8.752 3 8.378 3.201 8.1C3.34356 7.90899 3.53253 7.75754 3.75 7.66C4.098 7.5 4.565 7.5 5.5 7.5H18.5C19.435 7.5 19.902 7.5 20.25 7.66C20.478 7.766 20.667 7.918 20.799 8.1C21 8.378 21 8.752 21 9.5C21 10.248 21 10.621 20.799 10.9C20.6564 11.091 20.4675 11.2425 20.25 11.34C19.902 11.5 19.435 11.5 18.5 11.5H5.5C4.565 11.5 4.098 11.5 3.75 11.34C3.53253 11.2425 3.34356 11.091 3.201 10.9C3 10.621 3 10.248 3 9.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>

          <span>کارت های هدیه</span>
        </Link>

        <div onClick={logOut} className={styles["profile-sidebar-item"]}>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 21.5C4.45 21.5 3.97933 21.3043 3.588 20.913C3.19667 20.5217 3.00067 20.0507 3 19.5V5.5C3 4.95 3.196 4.47933 3.588 4.088C3.98 3.69667 4.45067 3.50067 5 3.5H11C11.2833 3.5 11.521 3.596 11.713 3.788C11.905 3.98 12.0007 4.21733 12 4.5C11.9993 4.78267 11.9033 5.02033 11.712 5.213C11.5207 5.40567 11.2833 5.50133 11 5.5H5V19.5H11C11.2833 19.5 11.521 19.596 11.713 19.788C11.905 19.98 12.0007 20.2173 12 20.5C11.9993 20.7827 11.9033 21.0203 11.712 21.213C11.5207 21.4057 11.2833 21.5013 11 21.5H5ZM17.175 13.5H10C9.71667 13.5 9.47933 13.404 9.288 13.212C9.09667 13.02 9.00067 12.7827 9 12.5C8.99933 12.2173 9.09533 11.98 9.288 11.788C9.48067 11.596 9.718 11.5 10 11.5H17.175L15.3 9.625C15.1167 9.44167 15.025 9.21667 15.025 8.95C15.025 8.68333 15.1167 8.45 15.3 8.25C15.4833 8.05 15.7167 7.94567 16 7.937C16.2833 7.92833 16.525 8.02433 16.725 8.225L20.3 11.8C20.5 12 20.6 12.2333 20.6 12.5C20.6 12.7667 20.5 13 20.3 13.2L16.725 16.775C16.525 16.975 16.2877 17.071 16.013 17.063C15.7383 17.055 15.5007 16.9507 15.3 16.75C15.1167 16.55 15.0293 16.3127 15.038 16.038C15.0467 15.7633 15.1423 15.534 15.325 15.35L17.175 13.5Z"
              fill="#DF0F0F"
            ></path>
          </svg>

          <span> خروج از حساب کاربری</span>
        </div>
      </div>
    </section>
  );
}

export default SideBar;
