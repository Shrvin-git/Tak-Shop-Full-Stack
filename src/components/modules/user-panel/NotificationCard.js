import styles from "./NotificationCard.module.css";

function NotificationCard({ title, message, read }) {
  return (
    <div
      className={`
    ${styles["notif-items"]} 
    ${read ? styles["notif-read"] : styles["notif-unread"]}
  `}
    >
      <div className={styles["notif-items-header"]}>
        <div className={styles["notif-header-icon"]}>
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1455_5234)">
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M14.9416 5H13.5016L3.60156 1V17L13.5016 13H14.9416C16.1345 13 17.1016 11.9255 17.1016 10.6V7.4C17.1016 6.07452 16.1345 5 14.9416 5Z"
                stroke="#EAEAEA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M3.60156 6C1.46823 6.25 0.901562 7.25 0.901562 9C0.901562 10.75 1.46823 11.75 3.60156 12V6Z"
                stroke="#EAEAEA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M13.5 12V6"
                stroke="#EAEAEA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M13.5014 19L14.9414 13"
                stroke="#EAEAEA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
            <defs>
              <clipPath id={styles["clip0_1455_5234"]}>
                <rect
                  width="18"
                  height="20"
                  fill="white"
                  transform="matrix(-1 0 0 1 18 0)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </div>

        <span>{title}</span>
      </div>
      <div className={styles.notif}>
        <div className={styles["notif-items-main"]}>
          <p>{message}</p>
        </div>
        <div className={styles["notif-items-footer"]}>
          <div className={styles["notif-date"]}>14 بهمن</div>
          <div className={styles["notif-category"]}>اخبار</div>
          <div className={styles["notif-link"]}>
            مشاهده بیشتر
            <svg
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.39953 15.2L8.51953 14L2.59953 8.00001L8.51953 2.00001L7.39953 0.800012L0.199532 8.00001L7.39953 15.2Z"
                fill="#831FC1"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
