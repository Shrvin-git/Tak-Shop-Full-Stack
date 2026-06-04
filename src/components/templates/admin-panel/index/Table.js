"use client";
import Link from "next/link";
import styles from "./Table.module.css";

const statusConfig = {
  cart: { label: "سبد خرید", icon: "/icons/cart.svg" },
  "pending-payment": { label: "در انتظار پرداخت", icon: "/icons/pending.svg" },
  paid: { label: "پرداخت شده", icon: "/icons/icon24.svg" },
  processing: { label: "در حال پردازش", icon: "/icons/icon20.svg" },
  shipped: { label: "ارسال شده", icon: "/icons/shipped.svg" },
  delivered: { label: "تحویل داده شده", icon: "/icons/delivered.svg" },
  cancelled: { label: "لغو شده", icon: "/icons/icon23.svg" },
};

function Table({ orders }) {
  const formatPrice = (price) => price?.toLocaleString("fa-IR") + " تومان";

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <table className={styles["admin-table"]}>
      <thead className={styles["admin-table__head"]}>
        <tr className={styles["admin-table__row"]}>
          <th className={styles["admin-table__cell"]}>#</th>
          <th className={styles["admin-table__cell"]}>نام کاربر</th>
          <th className={styles["admin-table__cell"]}>زمان ثبت سفارش</th>
          <th className={styles["admin-table__cell"]}>محصولات</th>
          <th className={styles["admin-table__cell"]}>وضعیت</th>
          <th className={styles["admin-table__cell"]}>مبلغ</th>
        </tr>
      </thead>

      <tbody className={styles["admin-table__body"]}>
        {orders.slice(0, 5).map((order, index) => (
          <tr key={order._id} className={styles["admin-table__row"]}>
            <td className={styles["admin-table__cell"]}>{index + 1}</td>
            <td className={styles["admin-table__cell"]}>
              {order.user.firstName} {order.user.lastName}
            </td>
            <td className={styles["admin-table__cell"]}>
              {formatDate(order.createdAt)}
            </td>
            <td className={styles["admin-table__cell"]}>
              {order.items.length > 2 ? (
                <details className={styles["product-dropdown"]}>
                  <summary className={styles["product-summary"]}>
                    {order.items[0].product.title} و {order.items.length - 1}{" "}
                    محصول دیگر
                  </summary>
                  <div className={styles["product-list-expanded"]}>
                    {order.items.map((item) => (
                      <div key={item._id} className={styles["product-item"]}>
                        <Link
                          href={`/products/${item.product.category.slug}/${item.product._id}`}
                        >
                          {item.product.title} ({item.count} عدد)
                        </Link>
                      </div>
                    ))}
                  </div>
                </details>
              ) : (
                // اگر کمتر از 2 محصول بود، به صورت ساده نمایش بده
                order.items.map((item) => (
                  <div key={item._id} className={styles["product-item"]}>
                    <Link
                      href={`/products/${item.product.category.slug}/${item.product._id}`}
                    >
                      {item.product.title} ({item.count} عدد)
                    </Link>
                  </div>
                ))
              )}
            </td>

            <td className={styles["admin-table__cell"]}>
              {/* استخراج تنظیمات بر اساس وضعیت فعلی */}
              {(() => {
                const config = statusConfig[order.status] || {
                  label: order.status,
                  icon: "./icons/default.svg",
                };

                return (
                  <span
                    className={`${styles.status} ${styles[`status--${order.status}`]}`}
                  >
                    <img src={config.icon} alt={config.label} />
                    {config.label}
                  </span>
                );
              })()}
            </td>
            <td
              className={`${styles["admin-table__cell"]} ${styles["admin-table__cell--price"]}`}
            >
              {formatPrice(order.payable)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

// ! Order Tabel =======================================================
// <table className={styles["order-table"]}>
//   <thead className={styles.table_header}>
//     <tr>
//       <th className={styles["column-id"]}>#</th>
//       <th className={styles["column-user"]}>نام کاربر</th>
//       <th className={styles["column-date"]}>زمان ثبت سفارش</th>
//       <th className={styles["column-product"]}>کالای سفارش داده شده</th>
//       <th className={styles["column-status"]}>وضعیت سفارش</th>
//       <th className={styles["column-price"]}>مبلغ</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>1</td>
//       <td>یاسین محمدی</td>
//       <td>1404/04/05</td>
//       <td>دسته بازی تسکو مدل TG-115</td>
//       <td>
//         <span
//           className={
//             styles["column-status"] + " " + styles["status-processing"]
//           }
//         >
//           <img src="./icons/icon20.svg" alt="icon20" />
//           در حال پردازش{" "}
//         </span>
//       </td>
//       <td className={styles["column-price"]}>1.440.000 تومان</td>
//     </tr>
//     <tr>
//       <td>2</td>
//       <td>میلاد قاسمیانی</td>
//       <td>1404/04/05</td>
//       <td>هدفون مدل K–55</td>
//       <td>
//         <span
//           className={
//             styles["column-status"] + " " + styles["status-processing"]
//           }
//         >
//           <img src="./icons/icon21.svg" alt="icon21" />
//           در حال پردازش{" "}
//         </span>
//       </td>
//       <td className={styles["column-price"]}>540.000 تومان</td>
//     </tr>
//     <tr>
//       <td>3</td>
//       <td>زهرا حسن‌زاده</td>
//       <td>1404/04/05</td>
//       <td>قاب گوشی موبایل آیفون 11 نرمال</td>
//       <td>
//         <span
//           className={styles["column-status"] + " " + styles["status-done"]}
//         >
//           <img src="./icons/icon22.svg" alt="icon22" />
//           ثبت شده{" "}
//         </span>
//       </td>
//       <td className={styles["column-price"]}>280.000 تومان</td>
//     </tr>
//     <tr>
//       <td>4</td>
//       <td>کسری زمانی</td>
//       <td>1404/04/05</td>
//       <td>گوشی موبایل شیائومی مدل Redmi note 14</td>
//       <td>
//         <span
//           className={
//             styles["column-status"] + " " + styles["status-failed"]
//           }
//         >
//           <img src="./icons/icon23.svg" alt="icon23" />
//           ثبت نشده{" "}
//         </span>
//       </td>
//       <td className={styles["column-price"]}>16.490.000 تومان</td>
//     </tr>
//     <tr>
//       <td>5</td>
//       <td>آرش صالحیان</td>
//       <td>1404/04/04</td>
//       <td>ماوس گیمینگ</td>
//       <td>
//         <span
//           className={styles["column-status"] + " " + styles["status-done"]}
//         >
//           <img src="./icons/icon24.svg" alt="icon24" />
//           ثبت شده{" "}
//         </span>
//       </td>
//       <td className={styles["column-price"]}>2.990.000 تومان</td>
//     </tr>
//   </tbody>
// </table>
