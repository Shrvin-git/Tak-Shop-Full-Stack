import styles from "./InvoiceBox.module.css";

function InvoiceBox({
  totalPrice,
  discount,
  shipping,
  payable,
  setStep,
  step,
  onConfirm,
}) {
  const handleClick = () => {
    if (step === 3 && onConfirm) {
      onConfirm(); // اجرای submitOrder
    } else {
      setStep(step + 1); // ادامه فرایند خرید
    }
  };

  return (
    <div className={styles["cart-left"]}>
      <p>قیمت کالاها: {totalPrice.toLocaleString("fa-IR")} تومان</p>
      <p>تخفیف: {discount.toLocaleString("fa-IR")} تومان</p>
      <p>ارسال: {shipping.toLocaleString("fa-IR")} تومان</p>

      <h3>قابل پرداخت: {payable.toLocaleString("fa-IR")} تومان</h3>

      <button onClick={handleClick} className={styles.confirm}>
        {step === 3 ? "تایید و پرداخت" : " ادامه فرایند خرید"}
      </button>
    </div>
  );
}

export default InvoiceBox;
