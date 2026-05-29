"use client";

import Link from "next/link";
import AccordionBox from "@/components/modules/accordionBox/AccordionBox";
import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import ShowAll from "@/components/modules/showAll/ShowAll";
import styles from "./FAQ.module.css";
import { faqData } from "@/data/faqData";
import { useState } from "react";

function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].id);

  const activeQuestions =
    faqData.find((item) => item.id === activeCategory)?.questions || [];

  return (
    <div className="FAQ">
      <div className="container">
        <SectionHeader
          title={"سوالات متداول"}
          desc={
            "در این سکشن شما میتوانید سوالات متداول را به صورت دسته بندی شده مشاهده کنید"
          }
        />

        <div className={styles.faq_wrapper}>
          <div className={styles.faq_right}>
            <p className={styles.faq_right_desc}>
              در این سکشن شما میتوانید سوالات متداول را به صورت دسته بندی شده
              مشاهده بکنید. هدف ما این است که شما را به بهترین نحو راهنمایی
              کنیم.
            </p>

            <ul className={styles.faq_right_links}>
              {faqData.map((item) => (
                <li
                  key={item.id}
                  className={`${styles.faq_right_list} ${activeCategory === item.id ? styles.active : ""}`}
                  onClick={() => setActiveCategory(item.id)} // تغییر دسته با کلیک
                >
                  {item.title}
                </li>
              ))}
            </ul>

            <Link className={styles.call_support_box} href={"/"}>
              تماس با پشتیبانی
            </Link>
          </div>
          <div className={styles.faq_left}>
            <div className={styles.accordion}>
              {activeQuestions.map((qItem) => (
                <AccordionBox
                  key={qItem.id}
                  question={qItem.q}
                  answer={qItem.a}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
