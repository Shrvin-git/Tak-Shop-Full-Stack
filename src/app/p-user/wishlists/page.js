"use client";

import UserPanelHeader from "@/components/modules/user-panel/UserPanelHeader";
import WishListProductCard from "@/components/modules/user-panel/WishListProductCard";
import styles from "@/styles/p-user/WishlistProduct.module.css";
import { useEffect, useState } from "react";

function Page() {
  const [wishlists, setWishLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const res = await fetch("/api/wishlist");

        if (!res.ok) throw new Error("خطا در دریافت علاقه‌مندی‌ها");

        const data = await res.json();

        setWishLists(data); // کل لیست
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlists();
  }, []);

  return (
    <div
      id={styles["popular-product"]}
      className={`${styles["popular-products"]} ${styles["user-panel"]} ${styles["user-panel--active"]}`}
      style={{ display: "block" }}
    >
      <UserPanelHeader
        title={"علاقه مندی"}
        desc={"در این بخش علاقه مندی های خودتون رو مشاهده میکنید"}
      />

      <div className={styles["popular-products-wrapper"]}>
        {loading ? (
          <span>در حال بارگذاری...</span>
        ) : wishlists.length > 0 ? (
          wishlists.map((item) => (
            <WishListProductCard
              key={item._id}
              favoriteId={item._id}
              {...item.product}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <span>لیست علاقه مندی ها خالیست</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
