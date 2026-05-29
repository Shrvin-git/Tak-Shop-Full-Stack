"use client";
import { useState, useEffect } from "react";
import styles from "./payment-step.module.css";
import InvoiceBox from "./InvoiceBox";

const PAYMENT_METHODS = [
  {
    value: "online",
    label: "پرداخت آنلاین",
    desc: "پرداخت امن با درگاه بانکی",
    icon: "💳",
  },
  {
    value: "cod",
    label: "پرداخت در محل",
    desc: "هنگام تحویل سفارش پرداخت کنید",
    icon: "📦",
  },
  {
    value: "card",
    label: "کارت به کارت",
    desc: "واریز به شماره کارت فروشگاه",
    icon: "🏦",
  },
];

export default function PaymentStep({
  step,
  setStep,
  cart,
  totalPrice,
  discount,
  shipping,
  payable,
  formData,
  setOrderData,
}) {
  const [method, setMethod] = useState("online");

  // ✅ فقط وقتی step === 4 شد، سبد خرید پاک شود
  useEffect(() => {
    if (step === 4) {
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("storage"));
    }
  }, [step]);

  const submitOrder = async () => {
    const items = cart.map((item) => ({
      product: item.id,
      count: item.count,
    }));

    // نمایش لودینگ
    setStep("loading-payment");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          totalPrice,
          discount,
          shipping,
          payable,
          paymentMethod: method,
          shippingAddress: formData,
        }),
      });

      const data = await res.json();
      setOrderData(data.order);

      if (!res.ok) {
        setStep(3);
        return;
      }

      // فقط برو مرحله ۴ – خالی شدن سبد به‌صورت ایمن در useEffect هندل می‌شود
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      setStep(4);
    } catch (error) {
      console.error("Order Submission Error:", error);
      setStep(3);
    }
  };

  if (step === "loading-payment") {
    return (
      <div className={styles.loadingWrapper}>
        <p>⏳ در حال انجام پرداخت...</p>
        <p>لطفاً صبر کنید</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.step3_wrapper}>
          <div className={styles.left}>
            {/* انتخاب روش پرداخت */}
            <div className={styles.methods}>
              {PAYMENT_METHODS.map((item) => (
                <label
                  key={item.value}
                  className={`${styles.card} ${
                    method === item.value ? styles.active : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={item.value}
                    checked={method === item.value}
                    onChange={() => setMethod(item.value)}
                    className={styles.radioInput}
                  />
                  <span className={styles.iconBox}>{item.icon}</span>
                  <span className={styles.info}>
                    <span className={styles.label}>{item.label}</span>
                    <span className={styles.desc}>{item.desc}</span>
                  </span>
                  <span
                    className={`${styles.radio} ${
                      method === item.value ? styles.radioActive : ""
                    }`}
                  >
                    {method === item.value && (
                      <span className={styles.radioDot} />
                    )}
                  </span>
                </label>
              ))}
            </div>

            {/* خلاصه سفارش */}
            <div className={styles.summary}>
              <div className={styles.row}>
                <span className={styles.rowLabel}>مبلغ کل</span>
                <span className={styles.rowValue}>
                  {totalPrice.toLocaleString()} تومان
                </span>
              </div>
              {discount > 0 && (
                <div className={styles.row}>
                  <span className={styles.rowLabel}>تخفیف</span>
                  <span className={styles.discountValue}>
                    − {discount.toLocaleString()} تومان
                  </span>
                </div>
              )}
              <div className={styles.row}>
                <span className={styles.rowLabel}>هزینه ارسال</span>
                <span className={styles.rowValue}>
                  {shipping === 0
                    ? "رایگان"
                    : `${shipping.toLocaleString()} تومان`}
                </span>
              </div>
              <div className={`${styles.row} ${styles.totalRow}`}>
                <span className={styles.totalLabel}>مبلغ قابل پرداخت</span>
                <span className={styles.totalValue}>
                  {payable.toLocaleString()} تومان
                </span>
              </div>
            </div>
          </div>

          {/* فاکتور */}
          <InvoiceBox
            totalPrice={totalPrice}
            discount={discount}
            shipping={shipping}
            payable={payable}
            setStep={setStep}
            step={step}
            onConfirm={submitOrder}
          />
        </div>
      </div>
    </div>
  );
}
