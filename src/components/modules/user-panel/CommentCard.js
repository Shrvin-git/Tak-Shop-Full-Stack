import Link from "next/link";
import styles from "./CommentCard.module.css";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";

function CommentCard({ comments, user }) {
  if (!comments) return null;


  const showBodyComment = (body) => {
    showSwal(`${body}`, "", "", "حله");
  };

  const deleteComment = async (id) => {
    showSwal(
      "حذف کامنت ⚠️",
      "آیا از حذف کامنت خودتان اطمینان دارید؟",
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
              "کامنت با موفقیت پاک شد.",
              "success",
              "باشه",
              () => {
                window.location.reload();
                // router.refresh();
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
          <th>وضعیت</th>
          <th>امتیاز</th>
          <th className={styles["icon-column"]}>مشاهده</th>
          <th className={styles["icon-column"]}>حذف</th>
        </tr>
      </thead>
      <tbody className={styles["comments-tbody"]}>
        {comments.map((comment, index) => (
          <tr
            key={comment._id}
            className={comment.isAccept ? styles.accepted : styles.pending}
          >
            <td>{index + 1}</td>
            <td>
              <div className={styles["product-name"]}>
                <div className={styles["product-image"]}></div>
                {user.firstName} {user.lastName}
              </div>
            </td>
            <td>
              <Link
                href={`/products/${comment.product.category.slug}/${comment.product._id}`}
              >
                {comment.product?.title}
              </Link>
            </td>
            <td>{new Date(comment.createdAt).toLocaleDateString("fa-IR")}</td>{" "}
            <td>{comment.isAccept === true ? "تایید شده" : "تایید نشده"}</td>
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
              <div
                onClick={() => deleteComment(comment._id)}
                className={styles["delete-icone"]}
              >
                <img src="/icons/icon49.svg" alt="icon49" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CommentCard;
