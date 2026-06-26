"use client";
import "@/components/modules/navbar/navbar.css";

import { FiChevronDown, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MobileSvg from "./mobile/MobileSvg";
import LaptopSvg from "./mobile/LaptopSvg";
import LaptopAccesorySvg from "./mobile/LaptopAccesorySvg";
import HeadsetSvg from "./mobile/HeadsetSvg";
import CameraSvg from "./mobile/CameraSvg";
import SmartWatch from "./mobile/SmartWatch";
import InternetSvg from "./mobile/InternetSvg";
import { useTheme } from "@/providers/ThemeProvider";
import Search from "./Search";

const IconMap = {
  MobileSvg,
  LaptopSvg,
  LaptopAccesorySvg,
  HeadsetSvg,
  CameraSvg,
  InternetSvg,
  SmartWatch,
};

function Navbar({ user }) {
  const [categories, setCategories] = useState([]);
  const { theme, toggleTheme } = useTheme();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileMenuCategory, setShowMobileMenuCategory] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  const [isShowMegaMenu, setIsShowMegaMenu] = useState("لپ تاپ");
  const activeMenu = categories.find((item) => item.title === isShowMegaMenu);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      setUserInfo(data.user);
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category");
      const data = await res.json();

      setCategories(data.allCategories);
    };

    fetchCategories();
  }, []);

  let brandList = [];
  let priceList = [];
  let performanceList = [];

  // --- اصلاح منطق استخراج ---
  if (activeMenu) {
    // 1. برند (تغییری نیاز ندارد)
    const brandFilter = activeMenu.filters?.find((f) => f.name === "brand");
    brandList = brandFilter ? brandFilter.options : [];

    // 2. قیمت (چون نوع آن range است، نباید options را مپ کنی)
    const priceFilter = activeMenu.filters?.find((f) => f.name === "price");
    // اینجا به جای مپ کردن، فقط اعلام کن که بازه قیمتی است یا مقادیرش را دستی مدیریت کن
    priceList = priceFilter ? ["فیلتر بازه قیمت"] : [];

    // 3. عملکرد (استخراج از attributeGroups)
    // پیدا کردن گروهی که نامش 'performance' است
    const performanceGroup = activeMenu.attributeGroups?.find(
      (g) => g.name === "performance",
    );
    performanceList = performanceGroup
      ? performanceGroup.attributes.map((a) => a.label)
      : [];
  }

  // if (!userInfo) return null;

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-wrapper">
          <div
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="toggle-menu"
          >
            {showMobileMenu ? (
              <span id="close">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1324_15850)">
                    <path
                      d="M27.3067 4.6829C25.822 3.19545 24.0583 2.01585 22.1166 1.21182C20.1749 0.40778 18.0936 -0.00486468 15.992 -0.0024307C7.15466 -0.0024307 -0.00933838 7.16157 -0.00933838 15.9989C-0.00933838 20.4176 1.78266 24.4189 4.67866 27.3149C6.16328 28.8024 7.92704 29.982 9.86872 30.786C11.8104 31.59 13.8918 32.0027 15.9933 32.0002C24.8307 32.0002 31.9947 24.8362 31.9947 15.9989C31.9947 11.5802 30.2027 7.5789 27.3067 4.6829ZM25.2507 25.2522C24.0358 26.4691 22.5927 27.4342 21.0042 28.0922C19.4156 28.7502 17.7128 29.0883 15.9933 29.0869C8.76266 29.0869 2.90133 23.2256 2.90133 15.9949C2.89998 14.2754 3.238 12.5726 3.89604 10.9841C4.55407 9.39549 5.51916 7.95242 6.736 6.73757C7.95069 5.5209 9.39354 4.55589 10.9819 3.89787C12.5702 3.23984 14.2728 2.90173 15.992 2.9029C23.2213 2.9029 29.0827 8.76424 29.0827 15.9936C29.0838 17.7128 28.7457 19.4154 28.0877 21.0037C27.4297 22.592 26.4647 24.0349 25.248 25.2496L25.2507 25.2522Z"
                      fill="#292929"
                    />
                    <path
                      d="M18.0493 16.0002L23.1893 10.8602C23.4429 10.5838 23.5799 10.2202 23.5717 9.84522C23.5636 9.47026 23.411 9.11292 23.1457 8.84781C22.8804 8.5827 22.523 8.43029 22.148 8.4224C21.773 8.41452 21.4095 8.55176 21.1333 8.80548L21.1347 8.80415L15.9947 13.9442L10.8547 8.80415C10.5783 8.55061 10.2147 8.4136 9.83972 8.42173C9.46476 8.42986 9.10743 8.5825 8.84232 8.84778C8.5772 9.11307 8.4248 9.4705 8.41691 9.84546C8.40902 10.2204 8.54627 10.584 8.79999 10.8602L8.79866 10.8588L13.9387 15.9988L8.79866 21.1388C8.65404 21.2715 8.53777 21.4321 8.45683 21.6109C8.3759 21.7897 8.33199 21.983 8.32773 22.1792C8.32348 22.3754 8.35897 22.5704 8.43208 22.7526C8.50519 22.9347 8.61439 23.1002 8.75312 23.239C8.89185 23.3778 9.05724 23.4871 9.23933 23.5603C9.42141 23.6336 9.61643 23.6692 9.81265 23.6651C10.0089 23.6609 10.2022 23.6171 10.3811 23.5363C10.5599 23.4555 10.7206 23.3393 10.8533 23.1948L10.8547 23.1935L15.9947 18.0535L21.1347 23.1935C21.2673 23.3381 21.4279 23.4544 21.6067 23.5353C21.7855 23.6162 21.9788 23.6602 22.175 23.6644C22.3712 23.6687 22.5663 23.6332 22.7484 23.5601C22.9306 23.487 23.096 23.3777 23.2348 23.239C23.3737 23.1003 23.483 22.9349 23.5562 22.7528C23.6294 22.5707 23.665 22.3757 23.6609 22.1795C23.6568 21.9833 23.613 21.7899 23.5322 21.6111C23.4514 21.4322 23.3352 21.2716 23.1907 21.1388L23.1893 21.1375L18.0493 16.0002Z"
                      fill="#292929"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1324_15850">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            ) : (
              <span id="open">
                <svg
                  width="28"
                  height="18"
                  viewBox="0 0 28 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00001 18C1.57501 18 1.21901 17.856 0.932005 17.568C0.645005 17.28 0.501005 16.924 0.500005 16.5C0.499005 16.076 0.643005 15.72 0.932005 15.432C1.22101 15.144 1.57701 15 2.00001 15H26C26.425 15 26.7815 15.144 27.0695 15.432C27.3575 15.72 27.501 16.076 27.5 16.5C27.499 16.924 27.355 17.2805 27.068 17.5695C26.781 17.8585 26.425 18.002 26 18H2.00001ZM2.00001 10.5C1.57501 10.5 1.21901 10.356 0.932005 10.068C0.645005 9.78 0.501005 9.424 0.500005 9C0.499005 8.576 0.643005 8.22 0.932005 7.932C1.22101 7.644 1.57701 7.5 2.00001 7.5H26C26.425 7.5 26.7815 7.644 27.0695 7.932C27.3575 8.22 27.501 8.576 27.5 9C27.499 9.424 27.355 9.7805 27.068 10.0695C26.781 10.3585 26.425 10.502 26 10.5H2.00001ZM2.00001 3C1.57501 3 1.21901 2.856 0.932005 2.568C0.645005 2.28 0.501005 1.924 0.500005 1.5C0.499005 1.076 0.643005 0.72 0.932005 0.432C1.22101 0.144 1.57701 0 2.00001 0H26C26.425 0 26.7815 0.144 27.0695 0.432C27.3575 0.72 27.501 1.076 27.5 1.5C27.499 1.924 27.355 2.2805 27.068 2.5695C26.781 2.8585 26.425 3.002 26 3H2.00001Z"
                    fill="#292929"
                  />
                </svg>
              </span>
            )}
          </div>

          <div
            className={`menu-mobile ${showMobileMenu ? "menu-mobile--open" : ""}`}
          >
            <ul className="list-items-mobile-wrapper">
              <li className="list-items">
                <Link href={"/"}>صفحه اصلی</Link>
              </li>
              <li id="list-items" className="list-items">
                <div
                  onClick={() =>
                    setShowMobileMenuCategory(!showMobileMenuCategory)
                  }
                  className="sss"
                >
                  دسته بندی کالاها
                  <FiChevronDown width={24} height={24} />
                </div>

                <div
                  className={
                    showMobileMenuCategory
                      ? "mega-menu-mobile--open"
                      : "mega-menu-mobile"
                  }
                >
                  {categories.map((items, index) => (
                    <div key={index} className="mega-meniu-mobile-items">
                      {items.brand}
                      <Link href={items.url ? `${items.url}` : "/"}>
                        {items.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </li>
              <li className="list-items">
                <Link href={"/blog"}>بلاگ پست</Link>
              </li>
              <li className="list-items">
                <Link href={"/offer"}>تخفیف</Link>
              </li>
              <li></li>
              <li className="list-items">
                <Link href={"/about-us"}>درباره ما</Link>
              </li>
              <li className="list-items">
                <Link href={"/contact-us"}>تماس با ما</Link>
              </li>
            </ul>
          </div>

          <div className="logo-site">
            <Link href={"/"}>
              <img src="/logo/Vector.png" alt="Tak Shop Logo" />
              <span>تک شاپ</span>
            </Link>
          </div>

          <div className="nav-bar__links-container">
            <ul className="nav-bar__links">
              <li>
                <Link href={"/"}>صفحه اصلی</Link>
              </li>
              <li id="category_items">
                <Link href={"./products-categories.html"}>
                  دسته بندی کالاها
                  <FiChevronDown width={24} height={24} />
                </Link>

                <div className="menu-container">
                  <ul className="menu-categories">
                    {categories.map((items) => {
                      const IconComponent = IconMap[items.icon];

                      return (
                        <li
                          key={items._id}
                          onMouseOver={() => setIsShowMegaMenu(items.title)}
                          className={
                            isShowMegaMenu === items.title ? "active" : ""
                          }
                        >
                          {IconComponent ? <IconComponent /> : null}
                          <Link href={`/categories/${items.slug}`}>
                            {items.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mega-content-wrapper">
                    {activeMenu && (
                      <>
                        <div className="mega-section">
                          <h4>دسته بندی بر اساس برند</h4>
                          <ul>
                            {brandList.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mega-section">
                          <h4>دسته بندی بر اساس قیمت</h4>
                          <ul>
                            {priceList.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mega-section">
                          <h4>دسته بندی بر اساس عملکرد</h4>
                          <ul>
                            {performanceList.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <Link href={"/blog"}>بلاگ پست</Link>
              </li>
              <li>
                <Link href={"/offer"}>تخفیف</Link>
              </li>
              <li>
                <Link href={"/about-us"}> درباره ما </Link>
              </li>
              <li>
                <Link href={"/contact-us"}>تماس با ما</Link>
              </li>
            </ul>
          </div>

          <div className="nav-bar__icons-container">
            <div className="search-icon" onClick={() => setIsSearchOpen(true)}>
              <FiSearch />
            </div>

            <Search
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />

            <div onClick={toggleTheme} className="change-them">
              {theme === "light" ? (
                <img className="dark_icon" src="/svgs/dark.svg" alt="" />
              ) : (
                <img className="light_icon" src="/svgs/mynaui_sun.svg" alt="" />
              )}
            </div>

            <div className="register-btn-wrapper">
              {user ? (
                userInfo?.role === "ADMIN" ? (
                  <div className="admin-switch">
                    <Link
                      className="admin-pill admin-pill--admin"
                      href="/p-admin"
                    >
                      <span className="admin-pill__text">پنل ادمین</span>
                    </Link>

                    <Link
                      className="admin-pill admin-pill--user"
                      href="/p-user"
                    >
                      <span className="admin-pill__text">پنل کاربر</span>
                    </Link>
                  </div>
                ) : (
                  <Link href="/p-user" className="user-icon">
                    <img className="pop" src={userInfo?.profileImage} alt="" />
                  </Link>
                )
              ) : (
                <Link className="user-profile" href="/login-register">
                  <span>ثبت نام / ورود</span>
                </Link>
              )}

              <Link className="cart" href={"/cart"}>
                <div className="cart-icon-wrapper">
                  <img className="pop" src="/svgs/cart.svg" alt="cart" />
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
