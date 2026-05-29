"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SignUp.module.css";
import { showSwal } from "@/utils/helper";
import { redirect } from "next/dist/server/api-utils";

function SignUp({ showloginForm }) {
  // -------------------------------
  // States for inputs (controlled)
  // -------------------------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // Submit Handler
  // -------------------------------

  const router = useRouter();

  const submitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ---------------------------
    // CLIENT VALIDATION
    // ---------------------------

    // First Name
    if (!/^[a-zA-Zآ-ی]{2,}$/.test(firstName.trim())) {
      showSwal("خطا", "نام معتبر نیست (حداقل ۲ حرف)", "error", "باشه");
      return setLoading(false);
    }

    // Last Name
    if (!/^[a-zA-Zآ-ی]{2,}$/.test(lastName.trim())) {
      showSwal("خطا", "نام خانوادگی معتبر نیست", "error", "باشه");
      return setLoading(false);
    }

    // Username
    if (!/^[a-zA-Z0-9_]{4,}$/.test(userName.trim())) {
      showSwal(
        "خطا",
        "نام کاربری باید حداقل ۴ کاراکتر و فقط شامل حروف، اعداد یا _ باشد",
        "error",
        "باشه",
      );
      return setLoading(false);
    }

    // Email
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      showSwal("خطا", "فرمت ایمیل معتبر نیست", "error", "باشه");
      return setLoading(false);
    }

    // Phone
    if (!/^09\d{9}$/.test(phone.trim())) {
      showSwal(
        "خطا",
        "شماره موبایل معتبر نیست (باید 11 رقمی و با 09 شروع شود)",
        "error",
        "باشه",
      );
      return setLoading(false);
    }

    // ---------------------------
    // API CALL
    // ---------------------------

    const newUser = {
      firstName,
      lastName,
      userName,
      email,
      phone,
      password,
    };

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.status === 400) {
        showSwal("خطا", data.message, "error", "باشه");
      }

      if (res.status === 201) {
        showSwal(
          "موفق",
          "ثبت نام با موفقیت انجام شد",
          "success",
          "باشه",
          () => {
            // ریدایرکت صحیح در Client Component
            router.push("/");
          },
        );
      }
    } catch (error) {
      showSwal("خطا", "مشکل در اتصال به سرور!", "error", "باشه");
    }

    setLoading(false);
  };

  return (
    <div className={styles["sign_up_form"]}>
      <div className={styles["website_logo"]}>
        <img src="./images/logo/lVector.png" alt="" />
        تک شاپ
      </div>

      <div className={styles["signup-login"]}>
        <span>
          قبلا ثبت نام کرده اید؟
          <button
            onClick={showloginForm}
            className={styles["signUp"] + " " + styles["active"]}
          >
            وارد شوید
          </button>
        </span>
      </div>

      {/* FORM */}
      <form className={styles["form_sign_up"]} onSubmit={submitRegister}>
        <div className={styles["form-inputs-grid"]}>
          <input
            className={styles["form-input"]}
            type="text"
            placeholder="نام"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className={styles["form-input"]}
            type="text"
            placeholder="نام خانوادگی"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            className={styles["form-input"]}
            type="text"
            placeholder="نام کاربری"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            className={styles["form-input"]}
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className={`${styles["form-input"]} ${styles["input-ltr"]}`}
            type="text"
            placeholder="شماره تلفن"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className={styles["form-input"]}
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles["motto-site"]}>
          <input type="checkbox" id="terms_checkbox" />
          <label htmlFor="terms_checkbox">
            با <a href="#">قوانین و مقررات</a> این سایت موافقم
          </label>
        </div>

        <button
          className={styles["sent_info"]}
          type="submit"
          disabled={loading}
        >
          {loading ? "در حال ثبت نام..." : "ثبت نام"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
