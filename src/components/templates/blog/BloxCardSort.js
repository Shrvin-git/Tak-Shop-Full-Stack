"use client";
import { useState } from "react";
import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";
import BlogBox from "@/components/modules/blogs/BlogBox";
import ShowAll from "@/components/modules/showAll/ShowAll";
import styles from "./BloxCardSort.module.css";

function BloxCardSort({ articles }) {
  const [filter, setFilter] = useState("news");
  const filteredArticles = articles.filter(
    (article) => article.type === filter,
  );

  const categories = [
    { id: 1, title: "اخبار", value: "news" },
    { id: 2, title: "پیشنهادات", value: "suggestion" },
    { id: 3, title: "آموزش", value: "tutorial" },
  ];

  return (
    <section className="blog-category">
      <div className="section_header_container">
        <SectionHeader title={"دسته بندی"} desc={""} />

        <div
          className={`${styles["blog-category-wrapper"]} ${styles["blog-category--active"]}`}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setFilter(cat.value)} // با کلیک، فیلتر عوض میشه
              className={`${styles["blog-category-items"]} ${filter === cat.value ? styles["active"] : ""}`}
              style={{ cursor: "pointer" }}
            >
              {cat.title}
            </div>
          ))}
        </div>

        <div className="blow-container">
          {/* حالا به جای اون فایل شلوغ، از کامپوننت همه‌کاره استفاده می‌کنیم */}
          <UniversalSlider
            data={filteredArticles}
            renderComponent={BlogBox}
            // اگر خواستی تنظیمات Swiper رو همینجا عوض کنی:
            loop={filteredArticles.length > 1}
            autoplay={{ delay: 2500 }}
          />
          <ShowAll />
        </div>
      </div>
    </section>
  );
}

export default BloxCardSort;
