"use client";
import { useEffect } from "react";
import styles from "./order-complete.module.css";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClipboardList,
  FaBox,
} from "react-icons/fa";

export default function OrderComplete({ order }) {

  if (!order) return null;

  return (
    <div className={styles.wrapper}>
      {/* پیام موفقیت */}
      <div className={styles.successBox}>
        <FaCheckCircle className={styles.successIcon} />
        <h2>سفارش با موفقیت ثبت شد</h2>
        <p>از خرید شما متشکریم. جزئیات سفارش شما به شرح زیر است:</p>
      </div>

      <div className={styles.grid}>
        {/* ستون چپ */}
        <div className={styles.leftCol}>
          {/* خلاصه سفارش */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaClipboardList />
              <h3>خلاصه سفارش</h3>
            </div>

            <div className={styles.row}>
              <span>شماره سفارش:</span>
              <strong>#{order._id.slice(-6)}</strong>
            </div>

            <div className={styles.row}>
              <span>تاریخ ثبت:</span>
              <strong>
                {new Date(order.createdAt).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </div>

            <div>
              {order.items.map((item) => (
                <div key={item._id} className={styles.row}>
                  <span>
                    {item.product.title} (x{item.count})
                  </span>
                  <strong>{item.product.price.toLocaleString()} تومان</strong>
                </div>
              ))}
            </div>

            <div className={styles.row}>
              <span>مبلغ پرداختی نهایی:</span>
              <strong style={{ color: "var(--primary-color)" }}>
                {order.payable.toLocaleString()} تومان
              </strong>
            </div>

            <div className={styles.row}>
              <span>وضعیت پرداخت:</span>
              <strong className={styles.successText}>
                {order.status === "paid" ? "پرداخت موفق" : "در انتظار پرداخت"}
              </strong>
            </div>
          </div>

          {/* جزئیات پرداخت */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaMoneyBillWave />
              <h3>جزئیات پرداخت</h3>
            </div>

            <div className={styles.row}>
              <span>روش پرداخت:</span>
              <strong>
                {order.paymentMethod === "online"
                  ? "پرداخت آنلاین"
                  : order.paymentMethod}
              </strong>
            </div>
            <div className={styles.row}>
              <span>کد پیگیری دیتابیس:</span>
              <small>{order._id}</small>
            </div>
          </div>
        </div>

        {/* ستون راست */}
        <div className={styles.rightCol}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaMapMarkerAlt />
              <h3>آدرس و ارسال</h3>
            </div>

            <div className={styles.row}>
              <span>تحویل گیرنده:</span>
              <strong>
                {order.user.firstName} {order.user.lastName}
              </strong>
            </div>

            <div className={styles.row}>
              <span>شماره تماس:</span>
              <strong>{order.shippingAddress.phone}</strong>
            </div>

            <div className={styles.addressBox}>
              <span>آدرس:</span>
              <p>{order.shippingAddress.address}</p>
            </div>

            <div className={styles.row}>
              <span>کد پستی:</span>
              <strong>{order.shippingAddress.postalCode}</strong>
            </div>

            <div className={styles.row}>
              <span>هزینه ارسال:</span>
              <strong>{order.shipping.toLocaleString()} تومان</strong>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.actions}>
        <button
          className={styles.backBtn}
          onClick={() => (window.location.href = "/")}
        >
          بازگشت به فروشگاه
        </button>
      </div>
    </div>
  );
}
