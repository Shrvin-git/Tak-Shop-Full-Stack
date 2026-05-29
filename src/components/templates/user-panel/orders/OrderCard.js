import Link from "next/link";
import styles from "./orders.module.css";

function toShamsiParts(date) {
  const parts = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
    day: "numeric",
    month: "long",
  }).formatToParts(date);

  return {
    day: parts.find((p) => p.type === "day").value,
    month: parts.find((p) => p.type === "month").value,
  };
}

export default function OrderCard({ order }) {
  if (!order) return null;

  const orderDate = new Date(order.createdAt).toLocaleDateString("fa-IR");
  const code = order._id.slice(-6);

  const start = new Date(order.createdAt);
  start.setDate(start.getDate() + 3);

  const end = new Date(order.createdAt);
  end.setDate(end.getDate() + 6);

  const startDate = toShamsiParts(start);
  const endDate = toShamsiParts(end);

  // ۲. تولید کد مرسوله (اگر نبود، یک کد تصادفی شیک تولید کن)
  const trackingCode =
    order.trackingCode || `TS-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className={styles["salmon"]}>
      {/* =============== ORDER MAIN (HEADER + INFO) ================= */}
      <div className={styles["user-otder-main"]}>
        <div className={styles["user-otder-main-header"]}>
          <h1>اطلاعات سفارش</h1>
          <span>
            <svg width="14" height="23" viewBox="0 0 14 23" fill="none">
              <path
                d="M11.6012 22.3L13.2812 20.5L4.40125 11.5L13.2813 2.49999L11.6012 0.699989L0.80125 11.5L11.6012 22.3Z"
                fill="#787878"
              ></path>
            </svg>
          </span>
        </div>

        <div className={styles["user-order-info-container"]}>
          <div className={styles["user-order-info-items"]}>
            <h3>تاریخ سفارش:</h3>
            <span>{orderDate}</span>
          </div>

          <div className={styles["user-order-info-items"]}>
            <h3>کد سفارش:</h3>
            <span>{code}</span>
          </div>

          <div className={styles["user-order-info-items"]}>
            <h3>فروشگاه:</h3>
            <span>تک شاپ</span>
          </div>

          <div className={styles["user-order-info-items"]}>
            <h3>مبلغ کلی:</h3>
            <span>{order.payable.toLocaleString("fa-IR")} تومان</span>
          </div>

          <div className={styles["user-order-info-items"]}>
            <h3>آدرس مقصد:</h3>
            <span>{order.shippingAddress.address}</span>
          </div>

          <div className={styles["user-order-info-items"]}>
            <h3>کد مرسوله:</h3>
            <span>{trackingCode}</span>
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS / PROGRESS BAR ================= */}
      <div className={styles["user-order-level"]}>
        <div className={styles.delivery_wrapper}>
          <div className="">زمان تقریبی تحویل:</div>

          <div className={styles.SSS}>
            <span className={styles.delivery}>
              <span className={styles.day}>{startDate.day}</span>
              <span className={styles.month}>{startDate.month}</span>
            </span>
            الی
            <span className={styles.delivery}>
              <span className={styles.day}>{endDate.day}</span>
              <span className={styles.month}>{endDate.month}</span>
            </span>
          </div>
        </div>

        {/* ********** YOUR REQUIRED ORIGINAL PROGRESS BLOCK ********** */}
        <div
          className={`${styles["user-order-level-line"]} ${styles[order.status]}`}
        >
          <div className={styles["user-order-level-line-top"]}>
            <h4>
              {order.status === "processing"
                ? "مرحله پردازش"
                : order.status === "delivering"
                  ? "در حال ارسال"
                  : order.status === "delivered"
                    ? "تحویل داده شد"
                    : "در انتظار پرداخت"}
            </h4>

            <span>
              {order.status === "delivered"
                ? "مرسوله تحویل داده شد"
                : order.status === "delivering"
                  ? "مرسوله ارسال شده است"
                  : order.status === "processing"
                    ? "در حال پردازش سفارش"
                    : "پرداخت نشده"}
            </span>
          </div>

          <div className={styles["user-order-level-line-bottom"]}>
            <span
              style={{
                width:
                  order.status === "delivered"
                    ? "100%"
                    : order.status === "delivering"
                      ? "70%"
                      : order.status === "processing"
                        ? "40%"
                        : "10%",
              }}
            ></span>
          </div>
        </div>

        {/* *********************************************************** */}
      </div>

      {/* ================= PRODUCT IMAGES + LINKS ================== */}
      <div className={styles["all-orders-images"]}>
        {order.items.map((item, index) => {
          const product = item.product;
          const slug = product.category?.slug || "unknown";
          const link = `/products/${slug}/${product._id}`;

          return (
            <Link href={link} key={index} className={styles["products-image"]}>
              <img src={product.images[0]} alt={product.name} />

              <p className={styles["product-title"]}>{product.title}</p>

              {/* تعداد محصول */}
              <span className={styles["product-count"]}>× {item.count}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ! Backup
// import styles from "./orders.module.css";

// export default function OrderCard({ order }) {
//   console.log(order.items[0].product.images[0]);
//   if (!order) return null;

//   // استخراج داده‌ها با مدیریت حالت‌های خالی
//   const orderDate = order.createdAt
//     ? new Date(order.createdAt).toLocaleDateString("fa-IR")
//     : "نامشخص";

//   const orderCode = order._id ? order._id.slice(-6) : "---";
//   const totalItems =
//     order.items?.reduce((sum, item) => sum + (item.count || 0), 0) || 0;
//   const address = order.shippingAddress?.address || "آدرس ثبت نشده";

//   return (
//     <div className={styles["salmon"]}>
//       <div className={styles["user-otder-main"]}>
//         <div className={styles["user-otder-main-header"]}>
//           <h1>اطلاعات سفارش</h1>
//         </div>

//         <div className={styles["user-order-info-container"]}>
//           <div className={styles["user-order-info-items"]}>
//             <h3>تاریخ سفارش:</h3>
//             <span>{orderDate}</span>
//           </div>
//           <div className={styles["user-order-info-items"]}>
//             <h3>کد سفارش:</h3>
//             <span>#{orderCode}</span>
//           </div>
//           <div className={styles["user-order-info-items"]}>
//             <h3>مبلغ پرداختی:</h3>
//             <span>{order.payable?.toLocaleString("fa-IR") || 0} تومان</span>
//           </div>
//           <div className={styles["user-order-info-items"]}>
//             <h3>وضعیت:</h3>
//             <span>
//               {order.status === "pending-payment"
//                 ? "در انتظار پرداخت"
//                 : order.status}
//             </span>
//           </div>
//           <div className={styles["user-order-info-items"]}>
//             <h3>تعداد محصولات:</h3>
//             <span>{totalItems} عدد</span>
//           </div>
//           <div className={styles["user-order-info-items"]}>
//             <h3>آدرس مقصد:</h3>
//             <span>{address}</span>
//           </div>
//         </div>
//       </div>

//       <div className={styles["user-order-level"]}>
//         <div className={styles["products-deliverd"]}>
//           <h3>محصولات سفارش داده شده</h3>
//           <div className={styles["all-orders-images"]}>
//             {order.items?.map((item, index) => (
//               <div key={index} className={styles["products-image"]}>
//                 {/* در اینجا باید آدرس تصویر محصول از دیتابیس بیاید */}
//                 <img src={order.items[0].product.images[0]} alt="product" />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={styles["user-order-level-line"]}>
//           <div className={styles["user-order-level-line-bottom"]}>
//             {/* نوار پیشرفت: می‌توانید بر اساس وضعیت، عرض (width) را تغییر دهید */}
//             <span
//               style={{ width: order.status === "delivered" ? "100%" : "30%" }}
//             ></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
