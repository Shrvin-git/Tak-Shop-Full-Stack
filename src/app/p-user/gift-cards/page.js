import UserPanelHeader from "@/components/modules/user-panel/UserPanelHeader";
import styles from "@/styles/p-user/gift-card.module.css";

function page() {
  return (
    <div
      id={styles["popular-product"]}
      className={`${styles["popular-products"]} ${styles["user-panel"]} ${styles["user-panel--active"]}`}
      style={{ display: "block" }}
    >
      <UserPanelHeader
        title={"کارت هدیه"}
        desc={"در این بخش کارت های هدیه حودتان را مشاهده میکنید"}
      />

      <div class={styles["user-gift-cart-wrapper"]}>
        <div class="">
          <img src="/images/User-Panel/Frame 26087599.png" alt="" />
        </div>
        <p>
          کارت هدیه‌ای به شما داده شده است؟ <br />
          در بخش زیر میتوانید آن را اضافه کنید
        </p>
        <button class={styles["add-gift-cart"]}>اضافه کردن کارت هدیه</button>
      </div>
    </div>
  );
}

export default page;
