"use client";

import styles from "./filtering.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Filtering({ categoryName }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [CategoryData, setCategoryData] = useState(null);
  const [openAccordions, setOpenAccordions] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category");
      const data = await res.json();

      const matched = data.allCategories.find(
        (item) => item.slug === categoryName,
      );

      setCategoryData(matched);
    };

    fetchCategories();
  }, [categoryName]);

  if (!CategoryData) {
    return <div>در حال بارگذاری فیلترها...</div>;
  }

  // ----------------------------
  // normalize values for URL
  // ----------------------------
  const normalizeValue = (value) => {
    return String(value)
      .toLowerCase()
      .replace(/gb/gi, "")
      .replace(/tb/gi, "")
      .replace(/ssd/gi, "")
      .replace(/hdd/gi, "")
      .replace(/inch/gi, "")
      .replace(/inches/gi, "")
      .replace(/اینچ/g, "")
      .replace(/\s+/g, "")
      .trim();
  };

  // ----------------------------
  // accordion
  // ----------------------------
  const toggleAccordion = (name) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // ----------------------------
  // update URL
  // ----------------------------
  const updateQuery = (name, rawValue, type) => {
    const value = normalizeValue(rawValue);

    const params = new URLSearchParams(searchParams.toString());

    if (type === "checkbox") {
      const existing = params.getAll(name);

      if (existing.includes(value)) {
        const filtered = existing.filter((v) => v !== value);

        params.delete(name);

        filtered.forEach((v) => {
          params.append(name, v);
        });
      } else {
        params.append(name, value);
      }
    } else {
      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
    }

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  // ----------------------------
  // render filters
  // ----------------------------
  const renderFilterContent = (filter) => {
    // CHECKBOX
    if (filter.type === "checkbox") {
      const selected = searchParams.getAll(filter.name);

      return (
        <ul className={styles["accordion-items-ul"]}>
          {filter.options?.map((option, idx) => {
            const normalizedOption = normalizeValue(option);

            return (
              <li key={idx}>
                <label>
                  <input
                    type="checkbox"
                    checked={selected.includes(normalizedOption)}
                    onChange={() =>
                      updateQuery(filter.name, option, "checkbox")
                    }
                  />

                  {option}
                </label>
              </li>
            );
          })}
        </ul>
      );
    }

    // SELECT
    if (filter.type === "select") {
      const selected = searchParams.get(filter.name) || "";

      return (
        <div className={styles["select-wrapper"]}>
          <select
            className={styles["custom-select"]}
            value={selected}
            onChange={(e) => updateQuery(filter.name, e.target.value, "select")}
          >
            <option value="">انتخاب کنید</option>

            {filter.options?.map((option, idx) => {
              const normalizedOption = normalizeValue(option);

              return (
                <option key={idx} value={normalizedOption}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

    // RANGE
    if (filter.type === "range") {
      const selected = searchParams.get(filter.name) || 0;

      return (
        <input
          type="range"
          min={filter.min ?? 0}
          max={filter.max ?? 200000000}
          step={filter.step ?? 1000000}
          value={selected}
          onChange={(e) => updateQuery(filter.name, e.target.value, "range")}
        />
      );
    }

    return null;
  };

  return (
    <div className={styles["products-filter"]}>
      {CategoryData.filters?.map((filter) => (
        <div key={filter.name} className={styles["accordion-item"]}>
          <button
            type="button"
            className={styles["accordion-toggle"]}
            onClick={() => toggleAccordion(filter.name)}
          >
            <span className={styles["accordion_title"]}>{filter.label}</span>

            <svg
              className={`${styles["arrow"]} ${
                openAccordions[filter.name] ? styles["open"] : ""
              }`}
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M22 7.5L12 17.5L2 7.5"
                stroke="#370D51"
                strokeWidth="3"
              />
            </svg>
          </button>

          {openAccordions[filter.name] && (
            <div
              className={`${styles["accordion-panel"]} ${
                openAccordions[filter.name] ? styles["open"] : ""
              }`}
            >
              {renderFilterContent(filter)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Filtering;

// "use client";

// import Link from "next/link";
// import styles from "./filtering.module.css";
// import { useEffect, useState } from "react";

// function Filtering() {
//   const [category, setCategory] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const res = await fetch("/api/category");
//       const data = await res.json();

//       setCategory(data.allCategories);
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <div className={styles["products-filter"]}>
//       <div className={styles["accordion-item"]}>
//         <button className={styles["accordion-toggle"]}>
//           <span className={styles["accordion_title"]}>برند</span>
//           <svg
//             className={styles["arrow"]}
//             width="24"
//             height="25"
//             viewBox="0 0 24 25"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M22 7.5L12 17.5L2 7.5"
//               stroke="#370D51"
//               strokeWidth="3"
//             ></path>
//           </svg>
//         </button>
//         <div className={styles["accordion-panel"]}>
//           <ul className={styles["accordion-items-ul"]}>
//             <li>
//               <Link href={"#"}> اپل </Link>
//               <span className={styles["brand-products-count"]}>(1600)</span>
//             </li>
//             <li>
//               <Link href={"#"}> ایسوس </Link>
//               <span className={styles["brand-products-count"]}>(1200)</span>
//             </li>
//             <li>
//               <Link href={"#"}> لنوو </Link>
//               <span className={styles["brand-products-count"]}>(596)</span>
//             </li>
//             <li>
//               <Link href={"#"}>اچ پی</Link>
//               <span className={styles["brand-products-count"]}>(156)</span>
//             </li>
//             <li>
//               <Link href={"#"}>ایسر</Link>
//               <span className={styles["brand-products-count"]}>(763)</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className={styles["accordion-item"]}>
//         <button className={styles["accordion-toggle"]}>
//           <span className={styles["accordion_title"]}>اندازه صفحه نمایش</span>
//           <svg
//             className={styles["arrow"]}
//             width="24"
//             height="25"
//             viewBox="0 0 24 25"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M22 7.5L12 17.5L2 7.5"
//               stroke="#370D51"
//               strokeWidth="3"
//             ></path>
//           </svg>
//         </button>
//         <div className={styles["accordion-panel"]}>
//           <ul className={styles["accordion-items-ul"]}>
//             <li>
//               <Link href={"#"}> 10 اینچ </Link>
//             </li>
//             <li>
//               <Link href={"#"}> 11 اینچ </Link>
//             </li>
//             <li>
//               <Link href={"#"}> 12 اینچ </Link>
//             </li>
//             <li>
//               <Link href={"#"}> 15.6 اینچ </Link>
//             </li>
//             <li>
//               <Link href={"#"}> 17 اینچ </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className={styles["accordion-item"]}>
//         <button className={styles["accordion-toggle"]}>
//           <span className={styles["accordion_title"]}>محدوده قیمت</span>
//           <svg
//             className={styles["arrow"]}
//             width="24"
//             height="25"
//             viewBox="0 0 24 25"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M22 7.5L12 17.5L2 7.5"
//               stroke="#370D51"
//               strokeWidth="3"
//             ></path>
//           </svg>
//         </button>
//         <div className={styles["accordion-panel"]}>
//           <ul className={styles["accordion-items-ul"]}>
//             <li>
//               <Link href={"#"}> اپل </Link>
//               <span className={styles["brand-products-count"]}>(1600)</span>
//             </li>
//             <li>
//               <Link href={"#"}> ایسوس </Link>
//               <span className={styles["brand-products-count"]}>(1200)</span>
//             </li>
//             <li>
//               <Link href={"#"}> لنوو </Link>
//               <span className={styles["brand-products-count"]}>(596)</span>
//             </li>
//             <li>
//               <Link href={"#"}>اچ پی</Link>
//               <span className={styles["brand-products-count"]}>(156)</span>
//             </li>
//             <li>
//               <Link href={"#"}>ایسر</Link>
//               <span className={styles["brand-products-count"]}>(763)</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className={styles["accordion-item"]}>
//         <button className={styles["accordion-toggle"]}>
//           <span className={styles["accordion_title"]}>مقدار حافظه RAM</span>
//           <svg
//             className={styles["arrow"]}
//             width="24"
//             height="25"
//             viewBox="0 0 24 25"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M22 7.5L12 17.5L2 7.5"
//               stroke="#370D51"
//               strokeWidth="3"
//             ></path>
//           </svg>
//         </button>
//         <div className={styles["accordion-panel"]}>
//           <ul className={styles["accordion-items-ul"]}>
//             <li>
//               <Link href={"#"}> gb 2 </Link>
//             </li>
//             <li>
//               <Link href={"#"}> gb 4 </Link>
//             </li>
//             <li>
//               <Link href={"#"}> gb 6 </Link>
//             </li>
//             <li>
//               <Link href={"#"}> gb 8 </Link>
//             </li>
//             <li>
//               <Link href={"#"}> gb 16 </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className={styles["accordion-item"]}>
//         <button className={styles["accordion-toggle"]}>
//           <span className={styles["accordion_title"]}>سازنده پردازنده</span>
//           <svg
//             className={styles["arrow"]}
//             width="24"
//             height="25"
//             viewBox="0 0 24 25"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M22 7.5L12 17.5L2 7.5"
//               stroke="#370D51"
//               strokeWidth="3"
//             ></path>
//           </svg>
//         </button>
//         <div className={styles["accordion-panel"]}>
//           <ul className={styles["accordion-items-ul"]}>
//             <li>
//               <Link href={"#"}> Intel </Link>
//             </li>
//             <li>
//               <Link href={"#"}> Ryzen </Link>
//             </li>
//             <li>
//               <Link href={"#"}> Celeron </Link>
//             </li>
//             <li>
//               <Link href={"#"}> Apple </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className={styles["accordion-item"]}>
//         <button className={styles["accordion-toggle"]}>
//           <span className={styles["accordion_title"]}>طبقه بندی</span>
//           <svg
//             className={styles["arrow"]}
//             width="24"
//             height="25"
//             viewBox="0 0 24 25"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M22 7.5L12 17.5L2 7.5"
//               stroke="#370D51"
//               strokeWidth="3"
//             ></path>
//           </svg>
//         </button>
//         <div className={styles["accordion-panel"]}>
//           <ul className={styles["accordion-items-ul"]}>
//             <li>
//               <Link href={"#"}> کاربری عمومی </Link>
//             </li>
//             <li>
//               <Link href={"#"}> دانشجویی </Link>
//             </li>
//             <li>
//               <Link href={"#"}> گیمینگ </Link>
//             </li>
//             <li>
//               <Link href={"#"}> اقتصادی </Link>
//             </li>
//             <li>
//               <Link href={"#"}> طراحی </Link>
//             </li>
//             <li>
//               <Link href={"#"}> تجاری </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className={styles["accordion-item"]}>
//         <button className={styles["accordion-toggle"]}>
//           <span className={styles["accordion_title"]}>مقداری حافظه هارد</span>
//           <svg
//             className={styles["arrow"]}
//             width="24"
//             height="25"
//             viewBox="0 0 24 25"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M22 7.5L12 17.5L2 7.5"
//               stroke="#370D51"
//               strokeWidth="3"
//             ></path>
//           </svg>
//         </button>
//         <div className={styles["accordion-panel"]}>
//           <ul className={styles["accordion-items-ul"]}>
//             <li>
//               <Link href={"#"}> gb 128 </Link>{" "}
//             </li>
//             <li>
//               <Link href={"#"}> gb 256 </Link>{" "}
//             </li>
//             <li>
//               <Link href={"#"}> gb 512 </Link>
//             </li>
//             <li>
//               <Link href={"#"}> TB 1 </Link>
//             </li>
//             <li>
//               <Link href={"#"}> TB 2 </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className={styles["switch-filters"]}>
//         <span>صفحه نمایش لمسی</span>
//         <label className={styles["toggle-switch"]}>
//           <input type="checkbox" />
//           <span className={styles["slider"]}></span>
//         </label>
//       </div>

//       <div className={styles["switch-filters"]}>
//         <span>صفحه نمایش مات</span>
//         <label className={styles["toggle-switch"]}>
//           <input type="checkbox" />
//           <span className={styles["slider"]}></span>
//         </label>
//       </div>

//       <div className={styles["switch-filters"]}>
//         <span> تبلت شو </span>
//         <label className={styles["toggle-switch"]}>
//           <input type="checkbox" />
//           <span className={styles["slider"]}></span>
//         </label>
//       </div>

//       <div className={styles["switch-filters"]}>
//         <span>کارکرده</span>
//         <label className={styles["toggle-switch"]}>
//           <input type="checkbox" />
//           <span className={styles["slider"]}></span>
//         </label>
//       </div>
//     </div>
//   );
// }

// export default Filtering;
