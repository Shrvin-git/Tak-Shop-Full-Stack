import UserPanelHeader from "@/components/modules/user-panel/UserPanelHeader";
import styles from "./orders.module.css";

function Orders() {
  return (
    <div
      id={styles["user-order"]}
      className={
        styles["user-order"] +
        " " +
        styles["user-panel"] +
        " " +
        styles["user-panel--active"]
      }
      style={{ display: "block" }}
    >
      <div className={styles["user-panel-header"]}>
        <UserPanelHeader
          title={"سفارش ها"}
          desc={" در این بخش شما میتوانید سفارش های خود را مشاهده کنید "}
        />

        {/* <div className={styles["flash-back"]}>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.3552 28.23C14.0702 28.23 13.7852 28.125 13.5602 27.9L4.45516 18.795C4.02016 18.36 4.02016 17.64 4.45516 17.205L13.5602 8.1C13.9952 7.665 14.7152 7.665 15.1502 8.1C15.5852 8.535 15.5852 9.255 15.1502 9.69L6.84016 18L15.1502 26.31C15.5852 26.745 15.5852 27.465 15.1502 27.9C14.9402 28.125 14.6402 28.23 14.3552 28.23Z"
              fill="#1D1D1D"
            ></path>
            <path
              d="M30.7499 19.125H5.50488C4.88988 19.125 4.37988 18.615 4.37988 18C4.37988 17.385 4.88988 16.875 5.50488 16.875H30.7499C31.3649 16.875 31.8749 17.385 31.8749 18C31.8749 18.615 31.3649 19.125 30.7499 19.125Z"
              fill="#1D1D1D"
            ></path>
          </svg>
        </div> */}
      </div>

      <div className={styles["user-otder-wrapper"]}>
        <div className={styles["user-otder-header"]}>
          <div className={styles["user-otder-header-top"]}>
            <h1>سفارش ها</h1>
            <span>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8927 17.42L19.9727 20.5M19.0837 12.081C19.0837 16.268 15.7007 19.662 11.5287 19.662C7.35566 19.662 3.97266 16.268 3.97266 12.082C3.97266 7.893 7.35566 4.5 11.5277 4.5C15.7007 4.5 19.0837 7.894 19.0837 12.081Z"
                  stroke="#2A2A2A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
          </div>

          <div className={styles["user-otder-header-bottom"]}>
            <div
              className={
                styles["order-modes"] +
                " " +
                styles["current"] +
                " " +
                styles["order-modes--active"]
              }
            >
              جاری
              <span
                className={
                  styles["order-moodes-counter"] + " " + styles["active"]
                }
              >
                1
              </span>
            </div>
            <div className={styles["order-modes"] + " " + styles["delivered"]}>
              تحویل داده شده
              <span className={styles["order-moodes-counter"]}>16</span>
            </div>
            <div className={styles["order-modes"] + " " + styles["canceled"]}>
              مرجوع شده
              <span className={styles["order-moodes-counter"]}>6</span>
            </div>
          </div>
        </div>

        <div className={styles["salmon"]}>
          <div className={styles["user-otder-main"]}>
            <div className={styles["user-otder-main-header"]}>
              <h1>1 اطلاعات سفارش</h1>
              <span>
                <svg
                  width="14"
                  height="23"
                  viewBox="0 0 14 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6012 22.3L13.2812 20.5L4.40125 11.5L13.2813 2.49999L11.6012 0.699989L0.80125 11.5L11.6012 22.3Z"
                    fill="#787878"
                  ></path>
                </svg>
              </span>
            </div>

            <div className={styles["user-order-info-container"]}>
              <div className={styles["user-order-info-items"]}>
                <h3>تاریخ سفارش:</h3>
                <span> 16 بهمن </span>
              </div>

              <div className={styles["user-order-info-items"]}>
                <h3>کد سفارش:</h3>
                <span> 659134328</span>
              </div>

              <div className={styles["user-order-info-items"]}>
                <h3>فروشگاه:</h3>
                <span> تک شاپ</span>
              </div>

              <div className={styles["user-order-info-items"]}>
                <h3>مبلغ کلی:</h3>
                <span> 56,650,000 تومان</span>
              </div>

              <div className={styles["user-order-info-items"]}>
                <h3>آدرس مقصد:</h3>
                <span> آذربایجان غربی، سردشت، خیابان حلبجه</span>
              </div>

              <div className={styles["user-order-info-items"]}>
                <h3>کد مرسوله برای پیگیری:</h3>
                <span> 2648956327398 </span>
              </div>
            </div>
          </div>

          <div className={styles["user-order-level"]}>
            <div className={styles["products-deliverd"]}>
              <h3>محصولات سفارش داده شده</h3>
              <h4>
                زمان تقریبی تحویل:
                <span>شنبه 20 بهمن</span>
              </h4>
            </div>

            <div className={styles["user-order-level-line"]}>
              <div className={styles["user-order-level-line-top"]}>
                <h4>مرحله پردازش</h4>
                <span>مرسوله ارسال شده است</span>
              </div>

              <div className={styles["user-order-level-line-bottom"]}>
                <span></span>
              </div>
            </div>
          </div>

          <div className={styles["all-orders-images"]}>
            <div className={styles["products-image"]}>
              <img src="./images/cart-img.png" alt="" />
            </div>
            <div className={styles["products-image"]}>
              <img src="./images/cart-img2.png" alt="" />
            </div>
            <div className={styles["products-image"]}>
              <img src="./images/cart-img3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
