import Link from "next/link";
import styles from "./NewProductBox.module.css";

function NewProductBox({ data }) {
  return (
    <Link href={`/products/${data.category.slug}/${data._id}`}>
      <div className={styles["selling_products_item"]}>
        <img
          className={styles["best_product_img"]}
          src={data?.img || "/images/bset-sell-laptops/item3.png"}
          alt={data?.title || ""}
        />

        <span
          className={
            styles["discount_left_item_title"] + " " + styles["best-sell-title"]
          }
        >
          {data?.title}
        </span>

        <div
          id={styles["info"]}
          className={styles["discount_left_item_rating"]}
        >
          <span className={styles["product_send_post"]}>
            <img src="/svgs/post.svg" alt="" />
            رایگان
          </span>

          <span className={styles["product_rating_count"]}>
            {data?.score || 0}
            <img src="/svgs/product-rating.svg" alt="" />
          </span>
        </div>

        <h3 className={styles["orginal_price"]}>
          {data?.price?.toLocaleString()} تومان
        </h3>
      </div>
    </Link>
  );
}

export default NewProductBox;
