import { categoryIcons } from "@/utils/categoryIcons";
import styles from "./tabs.module.css";
import { useState } from "react";

function Tabs({ product }) {
  if (!product) return null;

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className={styles["product-info"]}>
      <div className={styles["product-info-header"]}>
        <div className={styles["section_active"]}>مشخصات فنی</div>
        <div>پرسش و پاسخ</div>
        <div>تصاویر و ویدیوها</div>
      </div>

      <div className={styles["all-details-wrapper"]}>
        <div
          className={styles[isDetailsOpen ? "all-details-open" : "all-details"]}
        >
          {product.category.attributeGroups.map((group) => {
            const Icon = categoryIcons[group.icon];

            return (
              <div className={styles["product-specs"]} key={group.name}>
                <div className={styles["product-specs__header"]}>
                  <span className={styles["product-specs__icon"]}>
                    {Icon && <Icon />}
                  </span>

                  <span className={styles["product-specs__title"]}>
                    {group.title}
                  </span>
                </div>

                <div className={styles["products-specs-rows"]}>
                  {group.attributes.map((attr) => {
                    const value =
                      product.attributes.find((a) => a.name === attr.name)
                        ?.value || "نامشخص";

                    return (
                      <div
                        className={styles["product-specs__row"]}
                        key={attr.name}
                      >
                        <div className={styles["product-specs__label"]}>
                          {attr.label}
                        </div>

                        <div className={styles["product-specs__value"]}>
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <span
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          class={styles["toggle-btn"]}
          id="toggleDesc"
        >
          {isDetailsOpen ? " نمایش جزییات بیشتر" : " نمایش جزییات کمتر"}
        </span>
      </div>
    </div>
  );
}

export default Tabs;
