"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileMenu() {
  const [userInfo, setUserInfo] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.user) {
          setUserInfo(data.user);
        }
      } catch (err) {}
    };

    getUser();
  }, []);

  return (
    <div className="menu-mobile-bottom">
      <div className="menu-mobile-items">
        <Link className="active" href="/">
          <img src="/svgs/home.svg" alt="" />
          <span>خانه</span>
        </Link>
      </div>

      <div className="menu-mobile-items">
        <Link href="/products">
          <img src="/svgs/category.svg" alt="" />
          <span>دسته بندی</span>
        </Link>
      </div>

      <div className="menu-mobile-items">
        <Link href="/cart">
          <img src="/svgs/cart-mobile.svg" alt="" />
          <span>سبد خرید</span>
        </Link>
      </div>

      <div className="menu-mobile-items">
        {!userInfo ? (
          <Link href="/login-register">
            <img src="/svgs/user-edit.svg" alt="" />
            <span>ورود</span>
          </Link>
        ) : (
          <>
            <div
              className="mobile-profile"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            >
              <div className="mobile-profile-image">
                <img src={userInfo.profileImage} alt="" />
              </div>

              <span>پروفایل</span>
            </div>

            {showProfileMenu && (
              <div className="mobile-profile-menu">
                {userInfo.role === "ADMIN" ? (
                  <>
                    <Link
                      href="/p-admin"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      🛠 پنل ادمین
                    </Link>

                    <Link
                      href="/p-user"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      👤 پنل کاربر
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/p-user"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    👤 پنل کاربر
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
