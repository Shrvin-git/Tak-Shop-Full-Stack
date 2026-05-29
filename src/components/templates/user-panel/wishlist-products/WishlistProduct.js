import UserPanelHeader from "@/components/modules/user-panel/UserPanelHeader";
import WishListProductCard from "@/components/modules/user-panel/WishListProductCard";
import styles from "./WishlistProduct.module.css";

function WishlistProduct() {
  return (
    <div
      id={styles["popular-product"]}
      className={
        styles["popular-products"] +
        " " +
        styles["user-panel"] +
        " " +
        styles["user-panel--active"]
      }
      style={{ display: "block" }}
    >
      <UserPanelHeader
        title={"علاقه مندی"}
        desc={"در این بخش علاقه مندی های خودتون رو مشاهده میکنید"}
      />

      <div className={styles["popular-products-wrapper"]}>
        <WishListProductCard />
        <WishListProductCard />
        <WishListProductCard />
        <WishListProductCard />
        <WishListProductCard />
        <WishListProductCard />
      </div>
    </div>
  );
}

export default WishlistProduct;
