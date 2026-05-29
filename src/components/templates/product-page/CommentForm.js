"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { showSwal } from "@/utils/helper";

function CommentForm() {
  const params = useParams();
  const productId = params?.productId;

  const [score, setScore] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setBody("");
    setName("");
    setEmail("");
    setScore(5);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!body.trim()) {
      showSwal("خطا", "متن نظر نمی‌تواند خالی باشد", "error", "باشه");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || "",
          body,
          score,
          product: productId,
          name,
          email,
        }),
      });

      if (res.ok) {
        showSwal("موفق", "کامنت با موفقیت ثبت شد", "success", "مرسی");
        resetForm();
      } else if (res.status === 401) {
        showSwal("خطا", "ابتدا وارد حساب کاربری شوید", "error", "باشه");
      } else {
        showSwal("خطا", "ثبت کامنت با خطا مواجه شد", "error", "باشه");
      }
    } catch (error) {
      showSwal("خطا", "مشکل در ارتباط با سرور", "error", "باشه");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["product-comments"]}>
      <div className={styles["comment-form-card"]}>
        <h3 className={styles["comment-form-title"]}>ثبت نظر</h3>

        <div className={styles.rate}>
          <p>امتیاز شما :</p>
          <div className={styles["rate-stars"]}>
            {[1, 2, 3, 4, 5].map((n) => (
              <IoMdStar
                key={n}
                onClick={() => setScore(n)}
                className={
                  n <= score ? styles["star-active"] : styles["star-inactive"]
                }
              />
            ))}
          </div>
        </div>

        <form className={styles["comment-form"]} onSubmit={submitHandler}>
          <div className={styles["comment-form__row"]}>
            <input
              type="text"
              placeholder="موضوع کامنت"
              className={styles["comment-form__input"]}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="email"
              placeholder="ایمیل شما"
              className={styles["comment-form__input"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <textarea
            className={styles["comment-form__textarea"]}
            placeholder="نظر خود را درباره این محصول بنویسید..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>

          <button
            className={styles["comment-form__btn"]}
            type="submit"
            disabled={loading}
          >
            {loading ? "در حال ارسال..." : "ارسال دیدگاه"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
