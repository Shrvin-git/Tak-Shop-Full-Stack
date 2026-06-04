"use client";

import { FiSend, FiMessageSquare, FiArrowLeft } from "react-icons/fi";
import styles from "./SendTicket.module.css";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helper";

export default function SendTicket({ departments = [], setIsPageActive }) {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState(""); // باید string ObjectId باشد
  const [priority, setPriority] = useState("1"); // string برای select
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!department && departments.length) {
      setDepartment(String(departments[0]._id));
    }
  }, [departments, department]);

  const sendTicket = async () => {
    try {
      const res = await fetch("/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          department,
          priority: Number(priority),
          body,
        }),
      });

      if (!res.ok) {
        showSwal("خطا", "خطا در ارسال تیکت", "warning", "باشه");
      }

      setTitle("");
      setBody("");
      setDepartment(departments[0]?._id ? String(departments[0]._id) : "");
      setPriority("1");

      showSwal("موفق", "تیکت با موفقیت ارسال شد", "success", "مرسی", () => {
        setIsPageActive(1);
        window.location.reload();
      });
    } catch (error) {
      console.error("sendTicket error:", error.message);
      alert(error.message);
    }
  };

  return (
    <section className={styles["tickets"]}>
      <div className={styles["tickets__header"]}>
        <div className={styles["tickets__badge"]}>
          <FiMessageSquare />
          <span>پشتیبانی آنلاین</span>
        </div>

        <button onClick={() => setIsPageActive(1)} className={styles.backBtn}>
          بازگشت
          <FiArrowLeft />
        </button>
      </div>

      <div className={styles["tickets__card"]}>
        <div className={styles["tickets__row"]}>
          <div className={styles["tickets__field"]}>
            <label>موضوع تیکت</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="مثلا مشکل در پرداخت سفارش"
            />
          </div>

          <div className={styles["tickets__field"]}>
            <label>دپارتمان</label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={!departments.length}
            >
              {!departments.length ? (
                <option value="">دپارتمانی وجود ندارد</option>
              ) : null}

              {departments.map((dep) => (
                <option key={String(dep._id)} value={String(dep._id)}>
                  {dep.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles["tickets__field"]}>
          <label>اولویت</label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="1">عادی</option>
            <option value="2">مهم</option>
            <option value="3">فوری</option>
          </select>
        </div>

        <div className={styles["tickets__field"]}>
          <label>متن پیام</label>

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="8"
            placeholder="متن تیکت خود را وارد کنید..."
          />
        </div>

        <button onClick={sendTicket} className={styles["tickets__submit"]}>
          <FiSend />
          <span>ارسال تیکت</span>
        </button>
      </div>
    </section>
  );
}
