import { useState } from "react";
import styles from "./Login.module.css";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";

function Login({ showRegisterForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/product/api/auth/signin`, {
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
    <div className={styles["sign_in_wrapper"]}>
      <div className={styles["website_logo"]}>
        <img src="./images/logo/lVector.png" alt="" />
        تک شاپ
      </div>

      <div className={styles["signup-login"]}>
        <span class="">
          <span>
            حساب کاربری ندارید؟
            <button
              className={styles["signUp"] + " " + styles["active"]}
              onClick={showRegisterForm}
            >
              {" "}
              ثبت نام کنید
            </button>
          </span>
        </span>
      </div>

      <form className={styles["form_sign_up"]} onSubmit={loginUser}>
        <div
          className={styles["login-inputs"] + " " + styles["email-or-username"]}
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="نام کاربری یا ایمیل "
            id={styles["email"]}
          />
        </div>
        <div className={styles["login-inputs"] + " " + styles["password"]}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            id={styles["password"]}
          />
        </div>

        <div className={styles["motto-site"]}>
          <input type="checkbox" name="" id="" />
          با <a href="#">قوانین و مقررات</a> این سایت موافقت میکنم
        </div>

        <button className={styles["sent_info"]} type="submit">
          ورود
        </button>
      </form>
    </div>
  );
}

export default Login;
