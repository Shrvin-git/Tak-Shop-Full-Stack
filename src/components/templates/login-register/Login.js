"use client";

import { useState } from "react";
import styles from "./Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";

export default function Login({
  onSubmit,
  onForgotPassword,
  onGoogleLogin,
  onPhoneLogin,
  showRegisterForm,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    // اعتبارسنجی سمج در فرانت
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return showSwal("خطا", "ایمیل و رمز عبور الزامی است.", "error", "باشه");
    }

    if (!trimmedEmail.includes("@") || trimmedEmail.length < 5) {
      return showSwal("خطا", "فرمت ایمیل نامعتبر است.", "error", "باشه");
    }

    if (trimmedPassword.length < 6) {
      return showSwal(
        "خطا",
        "رمز عبور باید حداقل ۶ کاراکتر باشد.",
        "error",
        "باشه",
      );
    }

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await res.json();

      // موفقیت
      if (res.status === 200) {
        setEmail("");
        setPassword("");

        return showSwal("موفق", "با موفقیت وارد شدید.", "success", "باشه", () =>
          router.push("/"),
        );
      }

      // خطاهای دریافتی از بک‌اند
      return showSwal(
        "خطا",
        data.message || "ورود ناموفق بود. دوباره تلاش کنید.",
        "error",
        "باشه",
      );
    } catch (err) {
      console.error("LOGIN_REQUEST_ERROR:", err);

      return showSwal(
        "خطا",
        "مشکلی در ارتباط با سرور به وجود آمد. لطفاً دوباره تلاش کنید.",
        "error",
        "باشه",
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.overlay} ${shake ? styles.shake : ""}`}>
        <div className={styles["logo-name"]}>تک‌شاپ</div>
        <div className={styles.loginNumber}>
          ورود <span></span>
        </div>

        <div className={styles["login-row"]}>
          هیچ اکانتی ندارید؟
          <button className={styles["login-btn"]} onClick={showRegisterForm}>
            ثبت نام کنید
          </button>
        </div>

        <form onSubmit={loginUser}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <button
              type="button"
              className={styles["eye"]}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className={styles.signInBtn} disabled={loading}>
            {loading ? "در حال ورود..." : "ورود"}
          </button>

          <div className={styles.actions}>
            <label className={styles.remember}>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              مرا به خاطر بسپار
            </label>

            <button
              type="button"
              className={styles.forgot}
              onClick={onForgotPassword}
            >
              فراموشی رمز عبور
            </button>
          </div>

          <div className={styles.divider}>
            <span />
            <p>یا ورود با</p>
            <span />
          </div>

          <div className={styles.socials}>
            <button type="button" onClick={onGoogleLogin}>
              گوگل
            </button>

            <button type="button" onClick={onPhoneLogin}>
              تلفن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
