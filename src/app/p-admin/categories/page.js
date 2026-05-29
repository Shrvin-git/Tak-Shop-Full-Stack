"use client";

import ShowAll from "@/components/modules/showAll/ShowAll";
import Box from "@/components/templates/admin-panel/comments/Box";
import Table from "@/components/templates/admin-panel/comments/Table";
import styles from "@/styles/p-admin/category.module.css";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const router = useRouter();
  // فرم اصلی دسته‌بندی
  const [form, setForm] = useState({
    title: "",
    slug: "",
    icon: "",
    banner: "",
    parent: null,
    status: "active",
    description: "",
  });

  // ورودی‌های موقت attribute
  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [attributes, setAttributes] = useState([]);

  // هندلر عمومی برای همه اینپوت‌ها و سلکت‌ها
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addAttribute = (e) => {
    e.preventDefault();

    if (!attributeName.trim() || !attributeValue.trim()) return;

    setAttributes((prev) => [
      ...prev,
      { name: attributeName.trim(), label: attributeValue.trim() },
    ]);

    // خالی کردن اینپوت‌های attribute بعد از افزودن
    setAttributeName("");
    setAttributeValue("");

    // اگر خواستی ببینی:
    console.log("attributes =>", [
      ...attributes,
      { name: attributeName.trim(), label: attributeValue.trim() },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      attributes,
      filters: [],
    };

    const res = await fetch(`/api/category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.status === 201) {
      showSwal(
        "موفق",
        "دسته بندی با موفقیت ساخته شد",
        "success",
        "مرسی",
        () => {
          router.push("/p-admin/category");
        },
      );
    }
  };

  return (
    <div className={styles["admin-page"]}>
      <div className={styles["admin-page__content"]}>
        <div className={styles["admin-page__content"]}>
          <div className={styles["category-create"]}>
            <h2 className={styles["category-title"]}>ایجاد دسته‌بندی جدید</h2>

            <form className={styles["category-form"]} onSubmit={handleSubmit}>
              {/* Row 1: Title + Slug */}
              <div className={styles["row"]}>
                <div className={styles["form-group"]}>
                  <label>عنوان دسته</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="مثلاً پوشاک مردانه"
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label>اسلاگ (Slug)</label>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="مثلاً men-clothes"
                  />
                </div>
              </div>

              {/* Row 2: Icon + Image */}
              <div className={styles["row"]}>
                <div className={styles["form-group"]}>
                  <label>آیکون</label>
                  <input
                    name="icon"
                    value={form.icon}
                    onChange={handleChange}
                    placeholder="آدرس آیکون"
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label>تصویر بنر</label>
                  <input
                    name="banner"
                    value={form.banner}
                    onChange={handleChange}
                    placeholder="آدرس تصویر"
                  />
                </div>
              </div>

              {/* Row 3: Parent + Status */}
              <div className={styles["row"]}>
                <div className={styles["form-group"]}>
                  <label>دسته مادر</label>
                  <select
                    name="parent"
                    value={form.parent}
                    onChange={handleChange}
                  >
                    <option value="">بدون مادر</option>
                    {/* بعداً دسته‌های واقعی رو map می‌کنی */}
                  </select>
                </div>

                <div className={styles["form-group"]}>
                  <label>وضعیت</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="active">فعال</option>
                    <option value="draft">پیش‌نویس</option>
                  </select>
                </div>
              </div>

              {/* Description – Full width */}
              <div className={styles["form-group"]}>
                <label>توضیحات</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="توضیحات دسته..."
                ></textarea>
              </div>

              {/* ATTRIBUTES */}
              <div className={styles["section-box"]}>
                <h3 className={styles["section-title"]}>
                  خصوصیات (Attributes)
                </h3>

                <div className={styles["attribute-item"]}>
                  <input
                    value={attributeName}
                    onChange={(e) => setAttributeName(e.target.value)}
                    placeholder="name (مثل cpu)"
                  />
                  <input
                    value={attributeValue}
                    onChange={(e) => setAttributeValue(e.target.value)}
                    placeholder="label (مثل پردازنده)"
                  />

                  {/* نمایش لیست Attributeها (اختیاری ولی مفید) */}
                  {attributes.length > 0 && (
                    <ul className={styles["attribute-list"]}>
                      {attributes.map((attr, index) => (
                        <li key={index}>
                          <code>{attr.name}</code> - {attr.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  onClick={addAttribute}
                  type="button"
                  className={styles["add-btn"]}
                >
                  + افزودن خصوصیت
                </button>
              </div>

              {/* FILTERS */}
              <div className={styles["section-box"]}>
                <h3 className={styles["section-title"]}>فیلترها (Filters)</h3>

                <div className={styles["filter-item"]}>
                  <input placeholder="name (مثل brand)" />
                  <input placeholder="label (مثل برند)" />

                  <select>
                    <option value="select">Select</option>
                    <option value="range">Range</option>
                    <option value="checkbox">Checkbox</option>
                  </select>
                </div>

                <button type="button" className={styles["add-btn"]}>
                  + افزودن فیلتر
                </button>
              </div>

              <button type="submit" className={styles["submit-btn"]}>
                ذخیره دسته‌بندی
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
