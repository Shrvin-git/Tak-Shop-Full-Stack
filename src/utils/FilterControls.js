"use client";

import styles from "@/styles/FilterBar.module.css"; // مسیر را مطابق پروژه‌ات تنظیم کن

function FilterControls({
  iconSrc = "/icons/icon30.svg",
  label = "فیلتر بر اساس:",
  options,
  value,
  onChange,
}) {
  return (
    <div className={styles["filter-bar"]}>
      <div className={styles["filter-bar__icon"]}>
        <img src={iconSrc} alt="filter icon" />
        <span>{label}</span>
      </div>

      <div className={styles["filter-bar__item"]}>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterControls;
