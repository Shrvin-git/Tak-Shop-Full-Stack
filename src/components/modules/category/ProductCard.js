import Link from "next/link";
import styles from "./productCard.module.css";

function Card({ product }) {
  if (!product) return null;
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  const finalPrice = hasDiscount ? product.discountPrice : product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  return (
    <Link
      className={styles.link}
      href={`/products/${product.category.slug}/${product._id}`}
    >
      <div className={styles["discount_left_item"]}>
        <img
          src={"/images/default/default-laptop.png" || product.images?.[0]}
          alt={product.title}
        />

        <div className={styles["discount_left_item_info"]}>
          <span className={styles["discount_left_item_title"]}>
            {product.title}
          </span>

          <div className={styles["discount_left_item_rating"]}>
            <span className={styles["product_send_post"]}>
              <img src="/svgs/post.svg" alt="" />
              {product.stock > 0 ? "رایگان" : "ناموجود"}
            </span>

            <span className={styles["product_rating_count"]}>
              {product.score || 0}
              <img src="/svgs/product-rating.svg" alt="" />
            </span>
          </div>

          <div className={styles["product_org_price"]}>
            {hasDiscount && (
              <>
                <span className={styles["discount_range"]}>
                  %{discountPercent}
                </span>

                <span id="sss">
                  <del>{formatPrice(product.price)}</del> تومان
                </span>
              </>
            )}
          </div>

          <h3 className={styles["orginal_price"]}>
            {formatPrice(finalPrice)} تومان
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default Card;
