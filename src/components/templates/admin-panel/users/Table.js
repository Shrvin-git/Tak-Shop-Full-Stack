"use client";
import { FaUserSlash } from "react-icons/fa";
import styles from "././Table.module.css";
import { showSwal } from "@/utils/helper";

function Table({ user }) {
  const deleteUser = (id) => {
    showSwal(
      "آیا مطمئنی؟",
      "حذف کاربر غیرقابل بازگشت است!",
      "warning",
      "آره حذفش کن",
      async () => {
        const res = await fetch(`/api/user/${id}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          showSwal("موفق", "کاربر با موفقیت حذف شد", "success", "حله", () => {
            window.location.reload();
          });
        } else {
          showSwal("خطا", "مشکلی در حذف کاربر پیش آمد", "error");
        }
      },
      "نه بیخیالش",
      () => {
        showSwal("😏", " حذفش نکردم!", "info");
      },
    );
  };

  const banUser = async (phone, email) => {
    showSwal(
      "هشدار ⚠️",
      "آیا از بن کردن این کاربر اطمینان کامل دارید؟ !",
      "warning",
      "بله، بن کن!",
      async () => {
        try {
          const res = await fetch(`/api/user/ban`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone, email }),
          });

          if (res.ok) {
            showSwal(
              "بن موفقیت‌آمیز ✅",
              "کاربر مورد نظر با موفقیت بن شد.",
              "success",
              "مرسی",
              () => {
                location.reload();
              },
              null,
              null,
            );
          } else {
            const errorData = await res.json();
            showSwal(
              "خطا در حذف 😥",
              errorData.message || "خطایی در بن کردن کاربر رخ داده است.",
              "error",
              "باشه",
              null,
              null,
            );
          }
        } catch (err) {
          showSwal(
            "خطای شبکه 🌐",
            "ارتباط با سرور قطع شد. لطفاً دوباره امتحان کنید.",
            "error",
          );
        }
      },
      "انصراف میدم!",
      () => {
        showSwal(
          "عملیات لغو شد",
          "حذف کاربر لغو شد.",
          "info",
          "اوکی",
          null,
          null,
        );
      },
    );
  };

  return (
    <div className={styles["table-products-information"]}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>نام کاربر</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
            <th>وضعیت</th>
            <th>نقش</th>
            <th>بن</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {user.map((items, index) => (
            <tr key={items._id}>
              <td>{index + 1}</td>
              <td>
                <div className={styles["product-name"]}>
                  <div className={styles["product-image"]}>
                    <img src={items?.profileImage} alt="" />
                  </div>
                  {items.firstName} {items.lastName}
                </div>
              </td>
              <td> {items.phone} </td>
              <td> {items.email} </td>
              <td>
                <span
                  className={
                    styles["status"] +
                    " " +
                    styles[items.isBan === true ? "inactive" : "active"]
                  }
                >
                  {items.isBan === true ? "مسدود" : "فعال"}
                </span>
              </td>
              <td>{items.role === "ADMIN" ? "مدیر" : "کاربر"}</td>
              <td onClick={() => banUser(items.phone, items.email)}>
                <FaUserSlash />
              </td>
              <td>
                <div
                  onClick={() => deleteUser(items._id)}
                  className={styles["delete-icon"]}
                >
                  <img src="/icons/icon49.svg" alt="icon49" />
                </div>
                <div className={styles["edit-icon"]}>
                  <img src="/icons/icon50.svg" alt="icon50" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
