"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/p-admin/Article.module.css";

const Editor = dynamic(
  () => import("@/components/templates/admin-panel/article/Editor"),
  {
    ssr: false,
    loading: () => <p className="text-center p-4">در حال بارگذاری ادیتور...</p>,
  },
);

export default function AddArticlePage() {
  const [title, setTitle] = useState("");
  const [articleData, setArticleData] = useState({ blocks: [] });

  const handleSaveArticle = async () => {
    if (!title) {
      alert("لطفاً عنوان مقاله را وارد کنید");
      return;
    }

    const payload = { title, content: articleData };

    try {
      const response = await fetch("/api/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("مقاله با موفقیت ذخیره شد!");
        setTitle("");
      } else {
        alert("خطا در ذخیره مقاله");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("خطایی رخ داد");
    }
  };

  return (
    <div className={styles["admin-page"]}>
      <div className={styles["admin-page__content"]}>
        <h1 className={styles.title}>افزودن مقاله جدید</h1>

        {/* فیلد عنوان */}
        <div className={styles.formGroup}>
          <label className={styles.label}>عنوان مقاله</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            placeholder="عنوان مقاله را اینجا بنویسید..."
          />
        </div>

        {/* بخش ادیتور */}
        <div className={styles.formGroup}>
          <label className={styles.label}>محتوای مقاله</label>
          <div className={styles.editorContainer}>
            <Editor
              data={articleData}
              onChange={(data) => setArticleData(data)}
            />
          </div>
        </div>

        {/* دکمه عملیاتی */}
        <div className={styles.buttonContainer}>
          <button onClick={handleSaveArticle} className={styles.saveButton}>
            انتشار مقاله
          </button>
        </div>
      </div>
    </div>
  );
}
