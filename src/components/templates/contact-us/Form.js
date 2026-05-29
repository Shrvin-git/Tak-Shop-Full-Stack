"use client";

import { useState } from "react";
import styles from "./Form.module.css";
import { showSwal } from "@/utils/helper";

function Form() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitMessage = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();
    const trimmedOrderCode = orderCode.trim();
    const trimmedMessage = message.trim();

    // ✅ Validation
    if (trimmedFullName.length < 3) {
      showSwal("خطا", "نام معتیر وارد کنید", "error", "حله");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return setError("ایمیل معتبر نیست.");
    }

    const phoneRegex = /^09\d{9}$/; // موبایل ایران
    if (!phoneRegex.test(trimmedPhone)) {
      return setError("شماره تماس معتبر نیست.");
    }

    if (trimmedMessage.length < 5) {
      return setError("متن پیام خیلی کوتاه است.");
    }

    // ✅ orderCode اختیاری اما اگر وارد شد باید معتبر باشد
    if (trimmedOrderCode && trimmedOrderCode.length < 4) {
      return setError("کد سفارش معتبر نیست.");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: trimmedFullName,
          email: trimmedEmail,
          phone: trimmedPhone,
          orderCode: trimmedOrderCode || null,
          message: trimmedMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "خطا در ارسال پیام");
      }

      showSwal("موفق", "پیام شما با موفقیت ارسال شد", "success", "مرسی", () => {
        null;
      });

      // reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setOrderCode("");
      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["contact-us-left"]}>
      <h2 className={styles["contact-us-left-title"]}>
        <img src="/images/logo/lVector.png" alt="" />
        تک‌ شاپ
      </h2>

      <span className={styles.sss}>
        شما میتوانید سفارش خود را پیگیری کنید یا اینکه سوالی بپرسید
      </span>

      <form onSubmit={submitMessage}>
        <div className={styles["inpust-items"]}>
          <label htmlFor="name">نام و نام خانوادگی</label>
          <div className={styles.input_container}>
            <img src="/svgs/user-icon.svg" alt="" />
            <input
              id="name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="نام و نام خانوادگی خود را وارد کنید"
            />
          </div>
        </div>

        <div className={styles["inpust-items"]}>
          <label htmlFor="email">ایمیل</label>
          <div className={styles.input_container}>
            <img src="/svgs/gmail-icon.svg" alt="" />
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید"
            />
          </div>
        </div>

        <div className={styles["inpust-items"]}>
          <label htmlFor="phone">شماره تماس</label>
          <div className={styles.input_container}>
            <img src="/svgs/phon-number.svg" alt="" />
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره تماس خود را وارد کنید"
            />
          </div>
        </div>

        <div className={styles["inpust-items"]}>
          <label htmlFor="order-number">شماره سفارش (اختیاری)</label>
          <div className={styles.input_container}>
            <img src="/svgs/user-icon.svg" alt="" />
            <input
              id="order-number"
              type="text"
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value)}
              placeholder="شماره سفارش خود را در صورت وجود وارد کنید"
            />
          </div>
        </div>

        <div className={styles["input-text"]}>
          <label htmlFor="message">متن</label>
          <div
            className={`${styles.input_container} ${styles["input-textarea"]}`}
          >
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="متن خود را وارد کنید .."
            />
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button
          type="submit"
          className={styles["send-message"]}
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : "ارسال پیام"}
        </button>
      </form>
    </div>
  );
}

export default Form;
