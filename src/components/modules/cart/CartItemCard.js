"use client";

import styles from "./CartItemCard.module.css";

function CartItemCard({ item, onInc, onDec, onRemove }) {
  return (
    <div className={styles["products-item"]}>
      <div className={styles["products-item-right"]}>
        <img src={item.img} alt={item.title} />
      </div>

      <div className={styles["products-item-left"]}>
        <h4>{item.name}</h4>

        <div className={styles["ssss"]}>
          <div className={`${styles["product-count-in"]} ${styles["mogodi"]}`}>
            فقط {item.stock || 0} عدد در انبار باقی مانده
          </div>
        </div>

        <div className={styles["product-cart-footer"]}>
          <div className={styles["product-price"]}>
            <div className={styles["products-org-price"]}>
              <span>{Number(item.price).toLocaleString("fa-IR")}</span>

              <p>تومان</p>
            </div>
          </div>

          <div className={styles["product-count"]}>
            <div className={styles["product-count-number-wrapper"]}>
              <svg
                className={styles["plus"]}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onInc}
                role="button"
                tabIndex={0}
              >
                <path
                  d="M13 7.99799H8V12.998C8 13.2632 7.89464 13.5176 7.70711 13.7051C7.51957 13.8926 7.26522 13.998 7 13.998C6.73478 13.998 6.48043 13.8926 6.29289 13.7051C6.10536 13.5176 6 13.2632 6 12.998V7.99799H1C0.734784 7.99799 0.48043 7.89263 0.292893 7.70509C0.105357 7.51756 0 7.2632 0 6.99799C0 6.73277 0.105357 6.47842 0.292893 6.29088C0.48043 6.10334 0.734784 5.99799 1 5.99799H6V0.997986C6 0.732769 6.10536 0.478415 6.29289 0.290879C6.48043 0.103342 6.73478 -0.00201416 7 -0.00201416C7.26522 -0.00201416 7.51957 0.103342 7.70711 0.290879C7.89464 0.478415 8 0.732769 8 0.997986V5.99799H13C13.2652 5.99799 13.5196 6.10334 13.7071 6.29088C13.8946 6.47842 14 6.73277 14 6.99799C14 7.2632 13.8946 7.51756 13.7071 7.70509C13.5196 7.89263 13.2652 7.99799 13 7.99799Z"
                  fill="#2A2A2A"
                ></path>
              </svg>

              <span className={styles["product-count-number"]}>
                {item?.count ?? 1}
              </span>

              <svg
                className={styles["plus"]}
                width="14"
                height="2"
                viewBox="0 0 14 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onDec}
                role="button"
                tabIndex={0}
              >
                <path
                  d="M13 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H13C13.2652 0 13.5196 0.105357 13.7071 0.292893C13.8946 0.48043 14 0.734784 14 1C14 1.26522 13.8946 1.51957 13.7071 1.70711C13.5196 1.89464 13.2652 2 13 2Z"
                  fill="#737373"
                ></path>
              </svg>
            </div>

            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onRemove}
              role="button"
              tabIndex={0}
            >
              <path
                d="M15 7L14.16 15.398C14.033 16.671 13.97 17.307 13.68 17.788C13.4257 18.2114 13.0516 18.55 12.605 18.761C12.098 19 11.46 19 10.18 19H7.82C6.541 19 5.902 19 5.395 18.76C4.94805 18.5491 4.57361 18.2106 4.319 17.787C4.031 17.307 3.967 16.671 3.839 15.398L3 7M10.5 13.5V8.5M7.5 13.5V8.5M1.5 4.5H6.115M6.115 4.5L6.501 1.828C6.613 1.342 7.017 1 7.481 1H10.519C10.983 1 11.386 1.342 11.499 1.828L11.885 4.5M6.115 4.5H11.885M11.885 4.5H16.5"
                stroke="#FF4545"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
