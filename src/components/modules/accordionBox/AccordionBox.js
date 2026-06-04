"use client";

import { useState } from "react";
import styles from "./AccordionBox.module.css";


// 
// background: var(--input-form-v1);
function AccordionBox({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles["accordion-item"]}>
      {/* اضافه کردن کلاس open به دکمه در صورت باز بودن */}
      <button
        className={`${styles["accordion-toggle"]}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles["accordion_title"]}>{question}</span>
        {/* اضافه کردن کلاس open به آیکون برای چرخش */}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <svg
            width="30"
            height="18"
            viewBox="0 0 30 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.3333 1.83325L15 15.1666L1.66665 1.83325"
              stroke="#370D51"
              strokeWidth="3"
            ></path>
          </svg>
        </span>
      </button>

      {/* اضافه کردن کلاس open به پنل برای انیمیشن باز شدن */}
      <div
        className={`${styles["accordion-panel"]} ${isOpen ? styles.open : ""}`}
      >
        <p className={styles.acordion_faq}>{answer}</p>
      </div>
    </div>
  );
}

export default AccordionBox;
