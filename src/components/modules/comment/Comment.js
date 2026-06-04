import { useState } from "react";
import DisLikeIcon from "../svgs/DisLikeIcon";
import LikeIcon from "../svgs/LikeIcon";
import styles from "./comment.module.css";

function Comment({
  _id,
  title,
  score,
  body,
  user, // اطلاعات نویسنده کامنت
  createdAt,
  likes: initialLikes, // تغییر نام برای استفاده در state
  dislikes: initialDislikes,
}) {

  const [likesCount, setLikesCount] = useState(initialLikes.length);
  const [dislikesCount, setDislikesCount] = useState(initialDislikes.length);

  // بررسی اینکه کاربر فعلی قبلا چه واکنشی داشته
  const [userAction, setUserAction] = useState(() => {
    if (initialLikes.includes(user._id)) return "LIKE";
    if (initialDislikes.includes(user._id)) return "DIS_LIKE";
    return null;
  });

  const handleAction = async (type) => {
    // ۲. ذخیره وضعیت قبلی برای Rollback در صورت خطا
    const prevAction = userAction;
    const prevLikes = likesCount;
    const prevDislikes = dislikesCount;

    // ۳. آپدیت آنی UI (Optimistic Update)
    if (type === "LIKE") {
      if (userAction === "LIKE") {
        setLikesCount((prev) => prev - 1);
        setUserAction(null);
      } else {
        setLikesCount((prev) => prev + 1);
        if (userAction === "DIS_LIKE") setDislikesCount((prev) => prev - 1);
        setUserAction("LIKE");
      }
    } else {
      if (userAction === "DIS_LIKE") {
        setDislikesCount((prev) => prev - 1);
        setUserAction(null);
      } else {
        setDislikesCount((prev) => prev + 1);
        if (userAction === "LIKE") setLikesCount((prev) => prev - 1);
        setUserAction("DIS_LIKE");
      }
    }

    // ۴. ارسال به سرور
    try {
      const res = await fetch(`/api/comment/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: type }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }
    } catch (error) {
      // ۵. برگشت به عقب در صورت خطا
      setLikesCount(prevLikes);
      setDislikesCount(prevDislikes);
      setUserAction(prevAction);
      alert("مشکلی در ثبت پیش آمد");
    }
  };

  function getTime(createdAt) {
    const now = new Date();
    const commentTime = new Date(createdAt);
    const diffMs = now - commentTime;

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    // اگر زیر یک دقیقه بود
    if (diffSeconds < 60) {
      return `${diffSeconds} ثانیه پیش`;
    }

    // اگر زیر یک ساعت بود
    if (diffMinutes < 60) {
      return `${diffMinutes} دقیقه پیش`;
    }

    // اگر زیر ۲۴ ساعت بود
    if (diffHours < 24) {
      return `${diffHours} ساعت پیش`;
    }

    // بیشتر از ۲۴ ساعت -> تاریخ شمسی
    return commentTime.toLocaleDateString("fa-IR");
  }
  const date = getTime(createdAt);
  return (
    <div className={styles["review-box"]}>
      <div className={styles["review-header"]}>
        <div className={styles["reviewer-info"]}>
          <div className={styles["avatar"]}>
            <img src={user?.profileImage} alt="" />
          </div>
          <div className={styles["reviewer-details"]}>
            <span className={styles["reviewer-name"]}>
              {user.firstName} {user.lastName}
            </span>
            <span className={styles["badge"]}>خریدار</span>
          </div>
        </div>
        <div className={styles["review-meta"]}>
          <span className={styles["review-date"]}>
            {date}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_438_20020)">
                <path
                  d="M5.673 0C5.85865 0 6.0367 0.0737498 6.16797 0.205025C6.29925 0.336301 6.373 0.514348 6.373 0.7V2.009H13.89V0.709C13.89 0.523348 13.9637 0.345301 14.095 0.214025C14.2263 0.0827498 14.4043 0.009 14.59 0.009C14.7757 0.009 14.9537 0.0827498 15.085 0.214025C15.2162 0.345301 15.29 0.523348 15.29 0.709V2.009H18C18.5303 2.009 19.0388 2.21958 19.4139 2.59443C19.7889 2.96929 19.9997 3.47774 20 4.008V18.001C19.9997 18.5313 19.7889 19.0397 19.4139 19.4146C19.0388 19.7894 18.5303 20 18 20H2C1.46974 20 0.961184 19.7894 0.58614 19.4146C0.211096 19.0397 0.00026513 18.5313 0 18.001L0 4.008C0.00026513 3.47774 0.211096 2.96929 0.58614 2.59443C0.961184 2.21958 1.46974 2.009 2 2.009H4.973V0.699C4.97327 0.513522 5.04713 0.335731 5.17838 0.204672C5.30963 0.0736123 5.48752 -1.89263e-07 5.673 0ZM1.4 7.742V18.001C1.4 18.0798 1.41552 18.1578 1.44567 18.2306C1.47583 18.3034 1.52002 18.3695 1.57574 18.4253C1.63145 18.481 1.69759 18.5252 1.77039 18.5553C1.84319 18.5855 1.92121 18.601 2 18.601H18C18.0788 18.601 18.1568 18.5855 18.2296 18.5553C18.3024 18.5252 18.3685 18.481 18.4243 18.4253C18.48 18.3695 18.5242 18.3034 18.5543 18.2306C18.5845 18.1578 18.6 18.0798 18.6 18.001V7.756L1.4 7.742ZM6.667 14.619V16.285H5V14.619H6.667ZM10.833 14.619V16.285H9.167V14.619H10.833ZM15 14.619V16.285H13.333V14.619H15ZM6.667 10.642V12.308H5V10.642H6.667ZM10.833 10.642V12.308H9.167V10.642H10.833ZM15 10.642V12.308H13.333V10.642H15ZM4.973 3.408H2C1.92121 3.408 1.84319 3.42352 1.77039 3.45367C1.69759 3.48382 1.63145 3.52802 1.57574 3.58374C1.52002 3.63945 1.47583 3.70559 1.44567 3.77839C1.41552 3.85119 1.4 3.92921 1.4 4.008V6.343L18.6 6.357V4.008C18.6 3.92921 18.5845 3.85119 18.5543 3.77839C18.5242 3.70559 18.48 3.63945 18.4243 3.58374C18.3685 3.52802 18.3024 3.48382 18.2296 3.45367C18.1568 3.42352 18.0788 3.408 18 3.408H15.29V4.337C15.29 4.52265 15.2162 4.7007 15.085 4.83197C14.9537 4.96325 14.7757 5.037 14.59 5.037C14.4043 5.037 14.2263 4.96325 14.095 4.83197C13.9637 4.7007 13.89 4.52265 13.89 4.337V3.408H6.373V4.328C6.373 4.51365 6.29925 4.6917 6.16797 4.82297C6.0367 4.95425 5.85865 5.028 5.673 5.028C5.48735 5.028 5.3093 4.95425 5.17803 4.82297C5.04675 4.6917 4.973 4.51365 4.973 4.328V3.408Z"
                  fill="#737373"
                ></path>
              </g>
              <defs>
                <clipPath id={styles["clip0_438_20020"]}>
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </span>
          <span className={styles["review-rating"]}>
            {score}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8607 9.364C15.3674 8.45333 15.6207 8 15.9994 8C16.3781 8 16.6314 8.45333 17.1381 9.364L17.2687 9.59867C17.4127 9.85733 17.4847 9.98533 17.5967 10.0707C17.7101 10.156 17.8501 10.188 18.1301 10.2507L18.3834 10.3093C19.3674 10.532 19.8594 10.6427 19.9767 11.0187C20.0941 11.3947 19.7581 11.788 19.0874 12.572L18.9141 12.7747C18.7234 12.9973 18.6274 13.108 18.5847 13.2467C18.5421 13.3853 18.5567 13.5333 18.5847 13.8307L18.6114 14.1013C18.7127 15.148 18.7634 15.672 18.4581 15.904C18.1514 16.136 17.6901 15.924 16.7687 15.5L16.5314 15.3907C16.2687 15.2707 16.1381 15.2107 15.9994 15.2107C15.8607 15.2107 15.7301 15.2707 15.4674 15.3907L15.2301 15.5C14.3087 15.9253 13.8474 16.136 13.5407 15.904C13.2341 15.672 13.2861 15.148 13.3874 14.1013L13.4141 13.8307C13.4421 13.5333 13.4567 13.3853 13.4141 13.2467C13.3714 13.108 13.2754 12.9973 13.0847 12.7747L12.9114 12.572C12.2407 11.788 11.9047 11.396 12.0221 11.0187C12.1394 10.6427 12.6314 10.532 13.6154 10.3093L13.8687 10.2507C14.1487 10.188 14.2887 10.1573 14.4021 10.0707C14.5141 9.98533 14.5861 9.85733 14.7301 9.59867L14.8607 9.364Z"
                stroke="#EFC003"
                strokeWidth="1.5"
              ></path>
              <path
                d="M25.3327 12.0001C25.3327 13.2258 25.0913 14.4394 24.6222 15.5718C24.1532 16.7042 23.4657 17.7331 22.599 18.5997C21.7323 19.4664 20.7034 20.1539 19.5711 20.623C18.4387 21.092 17.225 21.3334 15.9993 21.3334C14.7737 21.3334 13.56 21.092 12.4276 20.623C11.2953 20.1539 10.2664 19.4664 9.39969 18.5997C8.53301 17.7331 7.84552 16.7042 7.37647 15.5718C6.90743 14.4394 6.66602 13.2258 6.66602 12.0001C6.66602 9.52473 7.64935 7.15076 9.39969 5.40042C11.15 3.65008 13.524 2.66675 15.9993 2.66675C18.4747 2.66675 20.8487 3.65008 22.599 5.40042C24.3494 7.15076 25.3327 9.52473 25.3327 12.0001Z"
                stroke="#EFC003"
                strokeWidth="1.5"
              ></path>
              <path
                d="M7.27445 16L3.98912 19.4013C3.26912 20.1467 2.90912 20.52 2.78379 20.836C2.49979 21.5547 2.74379 22.3533 3.36112 22.732C3.63312 22.8973 4.12245 22.9493 5.10112 23.0533C5.65445 23.112 5.93045 23.14 6.16112 23.2293C6.41916 23.3291 6.6524 23.4838 6.84465 23.6827C7.0369 23.8817 7.18356 24.12 7.27445 24.3813C7.35979 24.6213 7.38779 24.9067 7.44512 25.48C7.54379 26.4933 7.59445 27 7.75445 27.28C8.11979 27.92 8.89179 28.1707 9.58512 27.8773C9.89179 27.7493 10.2518 27.3773 10.9718 26.6307L15.9998 21.424L21.0278 26.6307C21.7478 27.3773 22.1078 27.7493 22.4145 27.8773C23.1078 28.1707 23.8798 27.92 24.2451 27.28C24.4051 27 24.4545 26.4933 24.5545 25.48C24.6118 24.9067 24.6398 24.6213 24.7251 24.3813C24.9171 23.8453 25.3198 23.428 25.8385 23.2293C26.0691 23.14 26.3451 23.112 26.8985 23.0533C27.8771 22.9493 28.3665 22.8973 28.6385 22.732C29.2558 22.3533 29.4998 21.5547 29.2158 20.836C29.0905 20.52 28.7305 20.1467 28.0105 19.4013L24.7251 16"
                stroke="#EFC003"
                strokeWidth="1.5"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div className={styles["review-content"]}>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
      <div className={styles["review-actions"]}>
        <div
          onClick={() => handleAction("LIKE")}
          className={`${styles["action"]} ${styles["positive"]} ${userAction === "LIKE" ? styles["active"] : ""}`}
        >
          <span>{likesCount}</span>
          <LikeIcon />
        </div>

        <div
          onClick={() => handleAction("DIS_LIKE")}
          className={`${styles["action"]} ${styles["negative"]} ${userAction === "DIS_LIKE" ? styles["active"] : ""}`}
        >
          <span>{dislikesCount}</span>
          <DisLikeIcon />
        </div>
      </div>
    </div>
  );
}

export default Comment;
