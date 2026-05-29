import Link from "next/link";
import styles from "./OfferCard.module.css";

// ! Dynamic Card
function Card({ item }) {
  if (!item) return null;

  const discountPercent =
    item?.price && item?.discountPrice
      ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
      : 0;

  const formatPrice = (price) => {
    return Number(price).toLocaleString("fa-IR");
  };

  return (
    <Link href={`/products/${item.category.slug}/${item._id}`}>
      <div className={styles["discount_left_item"]}>
        <div className={styles["product-cover"]}>
          <img
            src={item.images?.[33] || "/images/products/1.png"}
            alt={item.title}
          />
        </div>

        <div className={styles["discount_left_item_info"]}>
          <span className={styles["discount_left_item_title"]}>
            {item.title}
          </span>

          <div className={styles["discount_left_item_rating"]}>
            <span className={styles["product_send_post"]}>
              <img src="/svgs/post.svg" alt="ارسال" />
              رایگان
            </span>

            <span className={styles["product_rating_count"]}>
              {item.score}
              <img src="/svgs/product-rating.svg" alt="rating" />
            </span>
          </div>

          <div className={styles["product_org_price"]}>
            <span className={styles["discount_range"]}>{discountPercent}%</span>

            <span id={styles["sss"]}>
              <del>{formatPrice(item.price)}</del> تومان
            </span>
          </div>

          <h3 className={styles["orginal_price"]}>
            {formatPrice(item.discountPrice)} تومان
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default Card;

// !Static Card
// function Card() {
//   return (
//     <div className={styles["discount_left_item"]}>
//       <img src="/images/Offer/nothingphone.png" alt="" />
//       <div className={styles["discount_left_item_info"]}>
//         <span className={styles["discount_left_item_title"]}>
//           گوشی موبایل مدل Phone 2
//         </span>

//         <div className={styles["discount_left_item_rating"]}>
//           <span className={styles["product_send_post"]}>
//             <img src="/svgs/post.svg" alt="" />
//             رایگان
//           </span>

//           <span className={styles["product_rating_count"]}>
//             4.0
//             <img src="/svgs/product-rating.svg" alt="" />
//           </span>
//         </div>

//         <h3 className={styles["orginal_price"]}>31,200,000 تومان</h3>
//       </div>
//     </div>
//   );
// }

// export default Card;
