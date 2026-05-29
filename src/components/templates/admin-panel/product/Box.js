import styles from "./Box.module.css";

function Box({ title, icon, value, onClick }) {
  const clickable = typeof onClick === "function";

  return (
    <div
      className={`${styles["main-info-items"]} ${clickable ? styles.clickable : ""}`}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!clickable) return;
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      style={clickable ? { cursor: "pointer" } : undefined}
    >
      <div className={styles["main-info-items-icon"]}>{icon}</div>
      <h2>{title}</h2>

      {value !== undefined && (
        <div className={styles["main-info-bottom"]}>
          {value}
          <span> کالا های موجود </span>
        </div>
      )}
    </div>
  );
}

export default Box;
