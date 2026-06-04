"use client";
import { showSwal } from "@/utils/helper";
import styles from "./Table.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Table({ comments }) {
  if (!comments) return null;


  const showBodyComment = (body) => {
    showSwal(`${body}`, "", "", "حله");
  };

  const acceptComment = async (commentID) => {
    const res = await fetch("/api/comment/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      showSwal(
        "موفق",
        "کامنت مورد نظر با موفقیت تایید شد",
        "success",
        "مرسی",
        () => {
          window.location.reload();
        },
      );
    }
  };

  const rejectComment = async (commentID) => {
    const res = await fetch("/api/comment/reject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      showSwal(
        "موفق",
        "کامنت مورد نظر با موفقیت رد شد",
        "success",
        "مرسی",
        () => {
          window.location.reload();
        },
      );
    }
  };

  const deleteComment = async (id) => {
    showSwal(
      "حذف تیکت ⚠️",
      "آیا از حذف این کامنت اطمینان دارید؟",
      "warning",
      "بله حذف کن",
      async () => {
        try {
          const res = await fetch(`/api/comment/${id}`, {
            method: "DELETE",
          });

          if (res.status === 200) {
            showSwal(
              "حذف شد! ✅",
              "کامنت مورد نظر با موفقیت پاک شد.",
              "success",
              "باشه",
              () => {
                window.location.reload();
              },
            );
          } else {
            const data = await res.json();
            showSwal("خطا", data.message || "مشکلی پیش اومد.", "error");
          }
        } catch (err) {
          showSwal("خطای شبکه", "اتصال برقرار نشد.", "error");
        }
      },
      "لغو",
      () => {
        showSwal("لغو شد", "عملیات حذف انجام نشد", "info");
      },
    );
  };

  return (
    <table className={styles["comments-table"]}>
      <thead>
        <tr>
          <th>#</th>
          <th>نام کاربر</th>
          <th> محصول </th>
          <th>تاریخ ثبت</th>
          <th>امتیاز</th>
          <th className={styles["icon-column"]}>مشاهده</th>
          <th className={styles["icon-column"]}>پاسخ</th>
          <th className={styles["icon-column"]}>تایید</th>
          <th className={styles["icon-column"]}>رد</th>
          <th className={styles["icon-column"]}>حذف</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((comment, index) => (
          <tr
            key={comment._id}
            className={
              comment.isAccept === true
                ? styles.accepted
                : comment.isAccept === false
                  ? styles.pending
                  : styles.rejected
            }
          >
            <td>{index + 1}</td>
            <td>
              <div className={styles["product-name"]}>
                <div className={styles["product-image"]}></div>یاسین محمدی
              </div>
            </td>
            <td>
              <Link href={`/products/${comment.product._id}`}>
                {comment.product?.title}
              </Link>
            </td>
            <td>{new Date(comment.createdAt).toLocaleDateString("fa-IR")}</td>{" "}
            <td>{comment.score} </td>
            <td>
              <div
                onClick={() => showBodyComment(comment.body)}
                className={styles["show-comments-btn"]}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9999 16.3299C9.60992 16.3299 7.66992 14.3899 7.66992 11.9999C7.66992 9.60992 9.60992 7.66992 11.9999 7.66992C14.3899 7.66992 16.3299 9.60992 16.3299 11.9999C16.3299 14.3899 14.3899 16.3299 11.9999 16.3299ZM11.9999 9.16992C10.4399 9.16992 9.16992 10.4399 9.16992 11.9999C9.16992 13.5599 10.4399 14.8299 11.9999 14.8299C13.5599 14.8299 14.8299 13.5599 14.8299 11.9999C14.8299 10.4399 13.5599 9.16992 11.9999 9.16992Z"
                    fill="#831fc1"
                  ></path>
                  <path
                    d="M12.0001 21.02C8.24008 21.02 4.69008 18.82 2.25008 15C1.19008 13.35 1.19008 10.66 2.25008 8.99998C4.70008 5.17998 8.25008 2.97998 12.0001 2.97998C15.7501 2.97998 19.3001 5.17998 21.7401 8.99998C22.8001 10.65 22.8001 13.34 21.7401 15C19.3001 18.82 15.7501 21.02 12.0001 21.02ZM12.0001 4.47998C8.77008 4.47998 5.68008 6.41998 3.52008 9.80998C2.77008 10.98 2.77008 13.02 3.52008 14.19C5.68008 17.58 8.77008 19.52 12.0001 19.52C15.2301 19.52 18.3201 17.58 20.4801 14.19C21.2301 13.02 21.2301 10.98 20.4801 9.80998C18.3201 6.41998 15.2301 4.47998 12.0001 4.47998Z"
                    fill="#831fc1"
                  ></path>
                </svg>
              </div>
            </td>
            <td>
              <div className={styles["reply-comment-btn"]}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56"
                    stroke="#831FC1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </td>
            <td>
              <div
                onClick={() => acceptComment(comment._id)}
                className={styles["accept-comments-btn"]}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.81 16.95C10.62 16.95 10.43 16.88 10.28 16.73L8.78 15.23C8.49 14.94 8.49 14.46 8.78 14.17C9.07 13.88 9.55 13.88 9.84 14.17L10.81 15.14L14.28 11.67C14.57 11.38 15.05 11.38 15.34 11.67C15.63 11.96 15.63 12.44 15.34 12.73L11.34 16.73C11.2 16.88 11 16.95 10.81 16.95Z"
                    fill="#39AE3D"
                  ></path>
                  <path
                    d="M14 6.75H10C9.04 6.75 7.25 6.75 7.25 4C7.25 1.25 9.04 1.25 10 1.25H14C14.96 1.25 16.75 1.25 16.75 4C16.75 4.96 16.75 6.75 14 6.75ZM10 2.75C9.01 2.75 8.75 2.75 8.75 4C8.75 5.25 9.01 5.25 10 5.25H14C15.25 5.25 15.25 4.99 15.25 4C15.25 2.75 14.99 2.75 14 2.75H10Z"
                    fill="#39AE3D"
                  ></path>
                  <path
                    d="M15 22.75H9C3.38 22.75 2.25 20.17 2.25 16V9.99999C2.25 5.43999 3.9 3.48999 7.96 3.27999C8.37 3.25999 8.73 3.56999 8.75 3.98999C8.77 4.40999 8.45 4.74999 8.04 4.76999C5.2 4.92999 3.75 5.77999 3.75 9.99999V16C3.75 19.7 4.48 21.25 9 21.25H15C19.52 21.25 20.25 19.7 20.25 16V9.99999C20.25 5.77999 18.8 4.92999 15.96 4.76999C15.55 4.74999 15.23 4.38999 15.25 3.97999C15.27 3.56999 15.62 3.24999 16.04 3.26999C20.1 3.48999 21.75 5.43999 21.75 9.98999V15.99C21.75 20.17 20.62 22.75 15 22.75Z"
                    fill="#39AE3D"
                  ></path>
                </svg>
              </div>
            </td>
            <td>
              <div
                onClick={() => rejectComment(comment._id)}
                className={styles["delete-icone"]}
              >
                <img src="/icons/icon49.svg" alt="icon49" />
              </div>
            </td>
            <td>
              <img
                onClick={() => deleteComment(comment._id)}
                className={styles["delete-icone"]}
                src="/icons/icon49.svg"
                alt="icon49"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

