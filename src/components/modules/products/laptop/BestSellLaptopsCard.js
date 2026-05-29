import Link from "next/link";
import Brand from "../../svgs/Brand";
import CpuIcon from "../../svgs/CpuIcon";
import Display from "../../svgs/Display";
import GpuIcon from "../../svgs/GpuIcon";
import HardIcon from "../../svgs/HardIcon";
import RamIcon from "../../svgs/RamIcon";
import styles from "./BestSellLaptopsCard.module.css";

function BestSellLaptopsCard({
  _id,
  index,
  title,
  brand,
  attributes,
  category,
  varians,
  images,
  price,
  usage,
  discountPrice,
}) {
  const discountPercent = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const usages = [
    {
      title: "گیمینگ",
      slug: "gaming",
      type: "usage",
    },
    {
      title: "مهندسی",
      slug: "engineering",
      type: "usage",
    },
    {
      title: "دانشجویی",
      slug: "student",
      type: "usage",
    },
    {
      title: "تجاری",
      slug: "business",
      type: "usage",
    },
    {
      title: "اقتصادی",
      slug: "economic",
      type: "usage",
    },
    {
      title: "صنعتی",
      slug: "industrial",
      type: "usage",
    },
    {
      title: "روزمره",
      slug: "daily",
      type: "usage",
    },
  ];

  const finalPrice = discountPrice || price;

  const formatPrice = (value) => {
    return value?.toLocaleString("fa-IR");
  };

  // پیدا کردن usage های متناظر
  const matchedUsages = usages.filter((item) => usage?.includes(item.slug));

  return (
    <Link className={styles.link} href={`/products/${category.slug}/${_id}`}>
      <div className={styles["laptop_best_sell_items"]}>
        <div className={styles["laptop_best_sell_items_right"]}>
          <img
            src={"/images/default/default-laptop.png" || images?.[0]}
            alt={title}
          />
        </div>

        <div className={styles["laptop_best_sell_items_left"]}>
          <div className={styles["laptop_best_sell_items-header"]}>
            <span>{index + 1}</span>
            <h3> {title}</h3>
          </div>

          <div className={styles["laptop_best_sell_items-main"]}>
            <div className={styles["div1"]}>
              <div className={styles["mark"]}>
                <Brand />
                <span>{brand}</span>
              </div>

              <div className={styles["GPU-mark"]}>
                <GpuIcon />
                <span>{attributes?.[2]?.value}</span>
              </div>
            </div>

            <div className={styles["div1"]}>
              <div className={styles["display"]}>
                <Display />
                <span>{attributes?.[3]?.value} Inch</span>
              </div>

              <div className={styles["CPU-mark"]}>
                <CpuIcon />
                <span>{attributes?.[1]?.value}</span>
              </div>
            </div>

            <div className={styles["div1"]}>
              <div className={styles["RAM"]}>
                <RamIcon />
                <span>{varians?.[0]?.value} RAM</span>
              </div>

              <div className={styles["HDD"]}>
                <HardIcon />
                <span>256 GB SSD</span>
              </div>
            </div>
          </div>

          <div className={styles["laptop_best_sell_items-price"]}>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {matchedUsages.map((item) => (
                <div key={item.slug} className={styles["laptop-usage-label"]}>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>

            <div className={styles["laptop-price"]}>
              {discountPrice ? (
                <div className={styles["discount-wrapper"]}>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "red",
                      fontSize: "14px",
                      display: "block",
                    }}
                  >
                    {formatPrice(price)}

                    {discountPrice && (
                      <div className={styles["discount-percent"]}>
                        {discountPercent}٪
                      </div>
                    )}
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    {formatPrice(discountPrice)}
                  </span>
                  تومان
                </div>
              ) : (
                <>
                  <span>{formatPrice(finalPrice)}</span>
                  تومان
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BestSellLaptopsCard;
