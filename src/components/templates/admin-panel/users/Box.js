import styles from "./Box.module.css";

function Box({ title, icon, value }) {
  return (
    <div className={styles["main-info-items"]}>
      <div className={styles["main-info-items-icon"]}>{icon}</div>
      <h2> {title} </h2>
      <div className={styles["main-info-bottom"]}>
        {value}
        <span> کاربر </span>
      </div>
    </div>
  );
}

export default Box;
