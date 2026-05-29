import styles from "./UserPanelHeader.module.css";

function UserPanelHeader({ title, desc }) {
  return (
    <div className={styles["user-panel-header"]}>
      <div className={styles["user-panel-header-right"]}>
        <h2 className={styles["user-panel-header-title"]}>{title}</h2>
        <p className={styles["user-panel-header-desc"]}>{desc}</p>
      </div>

      {/* <div className="flash-back">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.3552 28.23C14.0702 28.23 13.7852 28.125 13.5602 27.9L4.45516 18.795C4.02016 18.36 4.02016 17.64 4.45516 17.205L13.5602 8.1C13.9952 7.665 14.7152 7.665 15.1502 8.1C15.5852 8.535 15.5852 9.255 15.1502 9.69L6.84016 18L15.1502 26.31C15.5852 26.745 15.5852 27.465 15.1502 27.9C14.9402 28.125 14.6402 28.23 14.3552 28.23Z"
            fill="#1D1D1D"
          ></path>
          <path
            d="M30.7499 19.125H5.50488C4.88988 19.125 4.37988 18.615 4.37988 18C4.37988 17.385 4.88988 16.875 5.50488 16.875H30.7499C31.3649 16.875 31.8749 17.385 31.8749 18C31.8749 18.615 31.3649 19.125 30.7499 19.125Z"
            fill="#1D1D1D"
          ></path>
        </svg>
      </div> */}
    </div>
  );
}

export default UserPanelHeader;
