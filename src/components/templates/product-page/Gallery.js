import ProductGalleryImages from "@/components/modules/products/ProductGalleryImages";
import styles from "./Gallery.module.css";
import { showSwal } from "@/utils/helper";
import { useEffect, useState } from "react";

function Gallery({ product }) {
  if (!product) return null;

  const [isWhis, setIsWhis] = useState(false); // آیا این محصول لایک شده؟
  const [whis, setWhis] = useState([]); // لیست کامل علاقه‌مندی‌ها

  // ارسال درخواست افزودن/حذف
  const addToWishList = async () => {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: product._id }),
    });

    const result = await res.json();

    if (res.status === 200) {
      showSwal("موفق", "محصول از علاقه‌مندی حذف شد", "success", "باشه");
      setIsWhis(false);
    }

    if (res.status === 201) {
      showSwal("موفق", "محصول به علاقه‌مندی اضافه شد", "success", "باشه");
      setIsWhis(true);
    }
  };

  // گرفتن لیست علاقه‌مندی‌های کاربر
  useEffect(() => {
    const fetchWishLists = async () => {
      const res = await fetch("/api/wishlist");
      const data = await res.json();

      setWhis(data); // کل آرایه علاقه‌مندی‌ها
    };

    fetchWishLists();
  }, []);

  // بررسی آیا محصول فعلی در لیست whis هست
  useEffect(() => {
    if (whis.length > 0) {
      const found = whis.some((item) => item.product._id === product._id);
      setIsWhis(found);
    }
  }, [whis, product._id]);

  return (
    <div className={styles["product-header_right"]}>
      <ProductGalleryImages product={product} />
      {/* <div className={styles["product-header_right--activ"]}>
        <img src="/images/product-image/product-image2.png" alt="" />
      </div>

      <div className={styles["product-images-wrapper"]}>
        <div className={styles["product-images"]}>
          <img src="/images/product-image/product-image2.png" alt="" />
          <div className={styles["product-images-blur"]}></div>
        </div>

        <div className={styles["product-images"]}>
          <img src="/images/product-image/product-image3.png" alt="" />
          <div className={styles["product-images-blur"]}></div>
        </div>

        <div className={styles["product-images"]}>
          <img src="/images/product-image/product-image4.png" alt="" />
          <div className={styles["product-images-blur"]}></div>
        </div>

        <div className={styles["product-images"]}>
          <img src="/images/product-image/product-image5.png" alt="" />
          <div className={styles["product-images-blur"]}></div>
        </div>
      </div> */}

      <div className={styles["product-header_right_footer"]}>
        <div className={styles["svg-product"]}>
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.325 22.7888L6.66667 29.9563V33.8338H35V35.5005H5.83333C5.61232 35.5005 5.40036 35.4127 5.24408 35.2564C5.0878 35.1001 5 34.8881 5 34.6671V6.3338H6.66667V27.2671L11.1083 21.6413C10.9369 21.3064 10.8433 20.9372 10.8345 20.5612C10.8256 20.1851 10.9017 19.8119 11.0571 19.4694C11.2125 19.1268 11.4432 18.8237 11.7321 18.5827C12.0209 18.3417 12.3604 18.169 12.7252 18.0775C13.0901 17.9859 13.4709 17.9778 13.8393 18.0539C14.2077 18.13 14.5541 18.2882 14.8529 18.5167C15.1516 18.7453 15.395 19.0384 15.5647 19.374C15.7345 19.7097 15.8263 20.0794 15.8333 20.4555L21.3608 22.2971C21.6868 21.8774 22.1381 21.5727 22.6492 21.4273C23.1603 21.282 23.7045 21.3035 24.2025 21.4888L29.5175 15.1113C29.2161 14.6043 29.1037 14.0072 29.2001 13.4253C29.2965 12.8435 29.5954 12.3145 30.0441 11.9318C30.4928 11.549 31.0624 11.3373 31.6522 11.3339C32.2419 11.3305 32.8139 11.5357 33.2669 11.9133C33.72 12.2909 34.025 12.8164 34.128 13.3971C34.2311 13.9778 34.1255 14.5762 33.83 15.0866C33.5344 15.597 33.068 15.9864 32.5131 16.1862C31.9581 16.3859 31.3505 16.383 30.7975 16.178L25.4825 22.5563C25.678 22.8855 25.7952 23.2551 25.8252 23.6367C25.8552 24.0184 25.7972 24.4018 25.6556 24.7575C25.514 25.1131 25.2926 25.4315 25.0085 25.6881C24.7244 25.9447 24.3851 26.1326 24.0169 26.2373C23.6487 26.3421 23.2614 26.3608 22.8848 26.2922C22.5081 26.2236 22.1523 26.0694 21.8447 25.8415C21.5371 25.6136 21.286 25.3182 21.1106 24.9779C20.9352 24.6376 20.8404 24.2616 20.8333 23.8788L15.3058 22.0371C14.9641 22.4771 14.4851 22.7901 13.9449 22.9264C13.4047 23.0626 12.8345 23.0142 12.325 22.7888Z"
              fill="#292929"
            ></path>
          </svg>
        </div>
        <div className={styles["svg-product"]}>
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.333 17.1672V27.1672M19.9997 20.5005V27.1672M26.6663 13.8339V27.1672"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M31.6667 7.16718H8.33333C6.49238 7.16718 5 8.65956 5 10.5005V30.5005C5 32.3415 6.49238 33.8338 8.33333 33.8338H31.6667C33.5076 33.8338 35 32.3415 35 30.5005V10.5005C35 8.65956 33.5076 7.16718 31.6667 7.16718Z"
              stroke="black"
              strokeWidth="2"
            ></path>
          </svg>
        </div>
        <div className={styles["svg-product"]}>
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 37.1671C28.6111 37.1671 27.4306 36.681 26.4583 35.7088C25.4861 34.7366 25 33.556 25 32.1671C25 31.9727 25.0139 31.771 25.0417 31.5621C25.0694 31.3532 25.1111 31.166 25.1667 31.0005L13.4167 24.1671C12.9444 24.5838 12.4167 24.9105 11.8333 25.1471C11.25 25.3838 10.6389 25.5016 10 25.5005C8.61111 25.5005 7.43056 25.0144 6.45833 24.0421C5.48611 23.0699 5 21.8894 5 20.5005C5 19.1116 5.48611 17.931 6.45833 16.9588C7.43056 15.9866 8.61111 15.5005 10 15.5005C10.6389 15.5005 11.25 15.6188 11.8333 15.8555C12.4167 16.0921 12.9444 16.4182 13.4167 16.8338L25.1667 10.0005C25.1111 9.8338 25.0694 9.64658 25.0417 9.4388C25.0139 9.23102 25 9.02936 25 8.8338C25 7.44491 25.4861 6.26436 26.4583 5.29213C27.4306 4.31991 28.6111 3.8338 30 3.8338C31.3889 3.8338 32.5694 4.31991 33.5417 5.29213C34.5139 6.26436 35 7.44491 35 8.8338C35 10.2227 34.5139 11.4032 33.5417 12.3755C32.5694 13.3477 31.3889 13.8338 30 13.8338C29.3611 13.8338 28.75 13.716 28.1667 13.4805C27.5833 13.2449 27.0556 12.9182 26.5833 12.5005L14.8333 19.3338C14.8889 19.5005 14.9306 19.6882 14.9583 19.8971C14.9861 20.106 15 20.3071 15 20.5005C15 20.6949 14.9861 20.8966 14.9583 21.1055C14.9306 21.3144 14.8889 21.5016 14.8333 21.6671L26.5833 28.5005C27.0556 28.0838 27.5833 27.7577 28.1667 27.5221C28.75 27.2866 29.3611 27.1682 30 27.1671C31.3889 27.1671 32.5694 27.6532 33.5417 28.6255C34.5139 29.5977 35 30.7782 35 32.1671C35 33.556 34.5139 34.7366 33.5417 35.7088C32.5694 36.681 31.3889 37.1671 30 37.1671Z"
              fill="#292929"
            ></path>
          </svg>
        </div>
        {/* دکمه علاقه‌مندی */}
        <div
          onClick={addToWishList}
          className={`${styles["svg-product"]} ${styles["popular-products-btn"]}`}
        >
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isWhis ? styles["like-product"] : ""}
          >
            <path
              d="M32.5002 21.4538L20.0002 33.8338L7.50018 21.4538C6.67569 20.6515 6.02625 19.6872 5.59276 18.6215C5.15926 17.5559 4.95111 16.4121 4.98141 15.262C5.0117 14.112 5.27978 12.9807 5.76877 11.9394C6.25776 10.898 6.95707 9.96923 7.82265 9.21144C8.68824 8.45365 9.70135 7.88329 10.7982 7.53628C11.895 7.18927 13.0519 7.07312 14.1958 7.19515C15.3397 7.31718 16.446 7.67474 17.445 8.24532C18.4439 8.8159 19.3139 9.58714 20.0002 10.5105C20.6894 9.59385 21.5604 8.82935 22.5587 8.26482C23.5569 7.70029 24.661 7.34789 25.8017 7.22968C26.9425 7.11146 28.0953 7.22997 29.1881 7.5778C30.281 7.92562 31.2902 8.49527 32.1528 9.25108C33.0153 10.0069 33.7126 10.9326 34.2009 11.9703C34.6892 13.008 34.9581 14.1353 34.9907 15.2817C35.0233 16.428 34.8189 17.5688 34.3904 18.6326C33.9619 19.6963 33.3184 20.6602 32.5002 21.4638"
              stroke="none"
              strokeWidth="3"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
