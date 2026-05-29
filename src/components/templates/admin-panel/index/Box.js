"use client";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./Box.module.css";

function Box({ title, value, percent, description, isActive }) {
  // اگر percent ارسال نشده باشد (undefined باشد)، نمودار نمایش داده نمی‌شود
  const showChart = percent !== undefined && percent !== null;

  const data = [{ value: percent }, { value: 100 - percent }];

  return (
    <div
      className={`${styles["dashboard-card-elem"]} ${isActive ? styles.box_active : ""}`}
    >
      <div className={styles["item-top"]}>
        <span className={`${isActive ? styles.box_active_title : ""}`}>
          {title}
        </span>
        <span>
          <img src="./icons/icon14.svg" alt="icon14" />
        </span>
      </div>

      <div className={styles["card-chhart"]}>
        <div className={styles["lol"]}>
          <h4 className={`${isActive ? styles.box_active_title : ""}`}>
            {value}
          </h4>
          <p className={`${isActive ? styles.box_active_title : ""}`}>
            {description}
          </p>
        </div>

        {/* شرط برای نمایش نمودار */}
        {showChart && (
          <div className={styles["today-order"]}>
            <PieChart width={93} height={93}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={40}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="#831fc1" />
                <Cell fill="#e0e0e0" />
              </Pie>
            </PieChart>
            <div className={styles["today-order-num"]}>{percent}%</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Box;
