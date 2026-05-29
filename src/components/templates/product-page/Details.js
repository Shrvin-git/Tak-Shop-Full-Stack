"use client";

import Link from "next/link";
import styles from "./Details.module.css";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { categoryIcons } from "@/utils/categoryIcons";
import AcceotedShop from "@/components/modules/svgs/AcceotedShop";
import CompariosnIcon from "@/components/modules/svgs/CompariosnIcon";
import RatingIcon from "@/components/modules/svgs/RatingIcon";
import ArrowLeft from "@/components/modules/svgs/ArrowLeft";

function Details({ product }) {
  if (!product) return null;

  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    if (product?.comments?.length) {
      const total = product.comments.reduce(
        (sum, c) => sum + (c.score || 0),
        0,
      );
      setAvgScore(total / product.comments.length);
    } else {
      setAvgScore(0);
    }
  }, [product.comments]);

  const router = useRouter();
  const [count, setCount] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const scrollToSectionWithOffset = (id, offset = 0) => {
    if (typeof window === "undefined") return; // مطمئن شو تو سمت کلاینت اجرا میشه

    const element = document.getElementById(id);
    if (!element) return;

    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product._id);
    if (existingItem) {
      setInCart(true);
      setCartCount(existingItem.count);
    } else {
      setInCart(false);
      setCartCount(0);
    }
  }, [product._id]);

  // تخفیف عددی محصول
  const discountAmount = product.discountPrice || 0;

  // قیمت اصلی
  const originalPrice = product.price;

  // قیمت بعد از تخفیف
  const finalPrice = originalPrice - discountAmount;

  // درصد تخفیف
  const discountPercent =
    originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.id === product._id);

    if (existingItem) {
      existingItem.count += count;
    } else {
      cart.push({
        id: product._id,
        name: product.title,
        price: product.price,
        img: product.images[0],
        stock: product.stock,
        count,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    showSwal(
      "موفق",
      "محصول با موفقیت به سبد خرید اضافه شد",
      "success",
      "فهمیدم",
      () => {
        window.location.reload();
      },
    );
  };

  const increaseCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product._id);
    if (existingItem) {
      existingItem.count++;
      setCartCount(existingItem.count);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const decreaseCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product._id);
    if (existingItem) {
      if (existingItem.count > 1) {
        existingItem.count--;
        setCartCount(existingItem.count);
      } else {
        // حذف آیتم از سبد
        const newCart = cart.filter((i) => i.id !== product._id);
        setInCart(false);
        setCartCount(0);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
        showSwal("حذف شد", "محصول از سبد خرید حذف شد", "success", "باشه");
        return;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  return (
    <div className={styles["product-header_left"]}>
      <div className={styles["product-title"]}>
        <h1>{product.title}</h1>
        <span>{product.title}</span>
      </div>

      <div className={styles["products_main"]}>
        <div
          className={
            styles["products_main-divs"] + " " + styles["products_main_colors"]
          }
        >
          <h3>رنگ:</h3>

          <div className={styles["color-box"]}>
            <span className={styles["color-box_black"]}>
              <span className={styles["color-curl"]}></span>
              مشکی
            </span>
            <span className={styles["color-box_white"]}>
              <span className={styles["color-curl"]}></span>
              سفید
            </span>
            <span className={styles["color-box_gray"]}>
              <span className={styles["color-curl"]}></span>
              خاکستری
            </span>
          </div>
        </div>

        <div className={styles["pop"]}>
          <div
            className={
              styles["products_main-divs"] +
              " " +
              styles["products_main_comments"]
            }
          >
            <h3>نظرات کاربران: </h3>
            <span>{product.comments.length} کامنت برای این محصول </span>
            <Link
              onClick={() => scrollToSectionWithOffset("target-section", 120)}
              href={"#"}
            >
              نظرات کاربران
              <ArrowLeft />
            </Link>
          </div>
          <div
            className={
              styles["products_main-divs"] +
              " " +
              styles["products_main_rating"]
            }
          >
            <h3>امتیاز کاربران: </h3>
            <div>
              <span className={styles["count-user-comments"]}>
                {product.comments.length} کاربر
              </span>

              <div className={styles["product-cunt-rating"]}>
                {avgScore}
                <RatingIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["product-footer"]}>
        <div className={styles["product-footer-right"]}>
          <h4>مشخصات تکمیلی محصول</h4>

          <div className={styles["product-footer-right-item-wrapper"]}>
            {product.category.highlights.map((item) => {
              const Icon = categoryIcons[item.icon];

              const attr = product.attributes.find(
                (a) => a.name === item.attribute,
              );

              return (
                <div className={styles["product-footer-right-items"]}>
                  {Icon && <Icon />}
                  <span>{item.label}</span>
                  <h4 className={styles["brand-product"]}>
                    {attr?.value ?? "-"}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles["product-footer-left"]}>
          <h3>قیمت محصول</h3>
          <p>این قیمت توسط فروشگاه تک‌شاپ تعیین شده است!</p>
          <div className={styles["price-box"]}>
            {discountAmount > 0 && (
              <div className={styles["discount-wrapper"]}>
                <span className={styles["old-price"]}>
                  {originalPrice.toLocaleString()} تومان
                </span>

                <span className={styles["discount-percent"]}>
                  %{discountPercent}
                </span>
              </div>
            )}

            <div className={styles["final-price"]}>
              {finalPrice.toLocaleString()}
              <span>تومان</span>
            </div>
          </div>

          <div className={styles["guarantee"]}>
            <div>
              <AcceotedShop />

              <span>گارانتی ۱۸ ماهه آرتین</span>
            </div>

            <div id={styles["ssss"]}>
              {product.stock === 0
                ? ""
                : ` فقط ${product.stock} عدد در انبار باقی مانده`}
            </div>
          </div>
          {product.stock === 0 ? (
            <div className={styles["out-of-stock"]}>در انبار موجود نیست</div>
          ) : !inCart ? (
            <div onClick={addToCart} className={styles["add-to-cart-btn"]}>
              اضافه کردن به سبد خرید
            </div>
          ) : (
            <div className={styles["cart-qty-controller"]}>
              <button onClick={decreaseCount} className={styles["qty-btn"]}>
                −
              </button>
              <span className={styles["qty-count"]}>{cartCount}</span>
              <button onClick={increaseCount} className={styles["qty-btn"]}>
                +
              </button>
            </div>
          )}

          <div className={styles["comparison"]}>
            <CompariosnIcon />
            مقایسه
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
