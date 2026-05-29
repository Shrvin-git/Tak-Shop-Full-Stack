"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

import styles from "./ProductGalleryImages.module.css";

const ProductGalleryImages = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = product?.images || [
    "https://set-coffee.com/wp-content/uploads/2020/12/Gold-DG-700x700.jpg",
    "https://set-coffee.com/wp-content/uploads/2020/12/Gold-DG-700x700.jpg",
  ];

  return (
    <section style={{ width: "100%" }}>
      {/* اسلایدر اصلی */}
      <Swiper
        spaceBetween={10}
        navigation={false} // دکمه‌ها حذف شدند
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]} // Navigation از اینجا حذف شد
        className={styles["gallery-slider"]}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt="product" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* اسلایدر تصاویر کوچک */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]} // Navigation حذف شد
        className={styles["gallery-slider-2"]}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt="thumb" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductGalleryImages;
