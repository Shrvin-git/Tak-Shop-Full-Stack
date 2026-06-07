"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helper";
import styles from "./SignUp.module.css";
import {
  FaUser,
  FaUserTag,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 15,
  duration: Math.random() * 15 + 12,
  color: [
    "rgba(58,199,212,0.6)",
    "rgba(131,31,193,0.5)",
    "rgba(255,255,255,0.4)",
  ][i % 3],
}));

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  const levels = [
    { label: "", color: "transparent", width: "0%" },
    { label: "خیلی ضعیف", color: "#ff4f6d", width: "20%" },
    { label: "ضعیف", color: "#f9c349", width: "40%" },
    { label: "متوسط", color: "#f9c349", width: "60%" },
    { label: "قوی", color: "#4cd964", width: "80%" },
    { label: "عالی 💪", color: "#3ac7d4", width: "100%" },
  ];
  return levels[Math.min(score, 5)];
}

export default function SignUp({ showloginForm }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);

  const router = useRouter();
  const strength = getPasswordStrength(password);

  const shake = () => {
    setShakeCard(true);
    setTimeout(() => setShakeCard(false), 500);
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!/^[a-zA-Zآ-ی]{2,}$/.test(firstName.trim())) {
      shake();
      showSwal("خطا", "نام معتبر نیست (حداقل ۲ حرف)", "error", "باشه");
      return setLoading(false);
    }
    if (!/^[a-zA-Zآ-ی]{2,}$/.test(lastName.trim())) {
      shake();
      showSwal("خطا", "نام خانوادگی معتبر نیست", "error", "باشه");
      return setLoading(false);
    }
    if (!/^[a-zA-Z0-9_]{4,}$/.test(userName.trim())) {
      shake();
      showSwal(
        "خطا",
        "نام کاربری باید حداقل ۴ کاراکتر و فقط شامل حروف، اعداد یا _ باشد",
        "error",
        "باشه",
      );
      return setLoading(false);
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      shake();
      showSwal("خطا", "فرمت ایمیل معتبر نیست", "error", "باشه");
      return setLoading(false);
    }
    if (!/^09\d{9}$/.test(phone.trim())) {
      shake();
      showSwal(
        "خطا",
        "شماره موبایل معتبر نیست (باید ۱۱ رقمی و با ۰۹ شروع شود)",
        "error",
        "باشه",
      );
      return setLoading(false);
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          email,
          phone,
          password,
        }),
      });
      const data = await res.json();

      if (res.status === 400) {
        shake();
        showSwal("خطا", data.message, "error", "باشه");
      }
      if (res.status === 201) {
        showSwal(
          "موفق",
          "ثبت‌نام با موفقیت انجام شد",
          "success",
          "باشه",
          () => {
            router.push("/");
          },
        );
      }
    } catch {
      shake();
      showSwal("خطا", "مشکل در اتصال به سرور!", "error", "باشه");
    }

    setLoading(false);
  };

  return (
    <>
      <div className={styles["signup-root"]}>
        <div className={styles["bg-gradient"]} />
        <div className={styles["grid-overlay"]} />
        <div className={styles["orb"] + " " + styles["orb-1"]} />
        <div className={styles["orb"] + " " + styles["orb-2"]} />
        <div className={styles["orb"] + " " + styles["orb-3"]} />

        {particles.map((p) => (
          <div
            key={p.id}
            className={styles["particle"]}
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              background: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        <div
          className={`${styles["glass-card"]} ${
            shakeCard ? styles["error-shake"] : ""
          }`}
        >
          <div className={styles["top-ribbon"]} />

          <div className={styles["logo-area"]}>
            <div className={styles["logo-icon"]}>🛍️</div>
            <div className={styles["logo-name"]}>تک‌شاپ</div>
            <div className={styles["logo-sub"]}>ساخت حساب کاربری جدید</div>
          </div>

          <div className={styles["login-row"]}>
            قبلاً ثبت‌نام کرده‌اید؟
            <button className={styles["login-btn"]} onClick={showloginForm}>
              وارد شوید
            </button>
          </div>

          <form onSubmit={submitRegister}>
            <div className={styles["inputs-grid"]}>
              {/* نام */}
              <div className={styles["input-group"]}>
                <input
                  className={styles["input-field"]}
                  type="text"
                  placeholder="نام"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <span className={styles["field-icon"]}>
                  <FaUser />
                </span>
              </div>

              {/* نام خانوادگی */}
              <div className={styles["input-group"]}>
                <input
                  className={styles["input-field"]}
                  type="text"
                  placeholder="نام خانوادگی"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <span className={styles["field-icon"]}>
                  <FaUser />
                </span>{" "}
              </div>

              {/* نام کاربری */}
              <div className={styles["input-group"]}>
                <input
                  className={styles["input-field"]}
                  type="text"
                  placeholder="نام کاربری"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <span className={styles["field-icon"]}>
                  <FaUserTag />
                </span>{" "}
              </div>

              {/* ایمیل */}
              <div className={styles["input-group"]}>
                <input
                  className={styles["input-field"]}
                  type="email"
                  placeholder="ایمیل"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className={styles["field-icon"]}>
                  <FaEnvelope />
                </span>{" "}
              </div>

              {/* شماره تلفن */}
              <div className={styles["input-group"]}>
                <input
                  className={styles["input-field"] + " " + styles["ltr"]}
                  type="text"
                  placeholder="09xxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={11}
                />
                <span className={styles["field-icon"]}>
                  <FaPhoneAlt />
                </span>{" "}
              </div>

              {/* رمز عبور */}
              <div className={styles["input-group"]}>
                <input
                  className={styles["input-field"]}
                  type={showPass ? "text" : "password"}
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: "40px" }}
                />
                <span className={styles["field-icon"]}>
                  <FaLock />
                </span>{" "}
                <button
                  type="button"
                  className={styles["show-pass-btn"]}
                  onClick={() => setShowPass((v) => !v)}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* نوار قدرت رمز عبور */}
            {password.length > 0 && (
              <div className={styles["progress-wrap"]}>
                <div className={styles["progress-label"]}>
                  <span>قدرت رمز عبور</span>
                  <span style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
                <div className={styles["progress-bar"]}>
                  <div
                    className={styles["progress-fill"]}
                    style={{
                      width: strength.width,
                      background: strength.color,
                    }}
                  />
                </div>
              </div>
            )}

            <div className={styles["checkbox-row"]}>
              <input
                type="checkbox"
                className={styles["custom-check"]}
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                id={styles["terms"]}
              />
              <label htmlFor="terms">
                با <a href="#">قوانین و مقررات</a> این سایت موافقم
              </label>
            </div>

            <button
              className={styles["submit-btn"]}
              type="submit"
              disabled={loading}
            >
              <div className={styles["btn-shine"]} />
              {loading ? (
                <>
                  <span>در حال ثبت‌نام</span>
                  <span className={styles["spinner"]} />
                </>
              ) : (
                "ایجاد حساب کاربری"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
