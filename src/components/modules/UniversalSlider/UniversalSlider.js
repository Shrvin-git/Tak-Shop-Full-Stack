"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * @param {Array} data - لیست داده‌هایی که قراره نمایش داده بشن (مثلا آرایه محصولات یا بلاگ‌ها)
 * @param {Component} renderComponent - کامپوننتی که قراره هر آیتم رو رندر کنه (مثلا BlogBox)
 * @param {Object} customBreakpoints - (اختیاری) اگر بخوای تعداد اسلایدها در رزولوشن‌های مختلف فرق کنه
 * @param {Object} swiperProps - (اختیاری) تنظیمات اضافی Swiper مثل loop یا autoplay
 */
const UniversalSlider = ({
  data = [],
  renderComponent: ItemComponent,
  customBreakpoints,
  ...swiperProps
}) => {
  // تنظیمات پیش‌فرض برای ریسپانسیو (اگر از بیرون چیزی نیاد، این اعمال می‌شه)
  const defaultBreakpoints = {
    300: { slidesPerView: 2, spaceBetween: 10 },
    400: { slidesPerView: 2, spaceBetween: 10 },
    510: { slidesPerView: 3, spaceBetween: 10 },
    576: { slidesPerView: 2, spaceBetween: 10 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 15 },
    992: { slidesPerView: 4, spaceBetween: 10 },
    1200: { slidesPerView: 5, spaceBetween: 20 },
  };

  return (
    <div className="universal-slider-wrapper">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        breakpoints={customBreakpoints || defaultBreakpoints}
        loop={data.length > 1}
        autoplay={
          data.length > 1 ? { delay: 3000, disableOnInteraction: false } : false
        }
        {...swiperProps}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={item?._id || index}>
            {/* اینجا دیتا رو به صورت داینامیک به کامپوننت کارت می‌فرستیم */}
            <ItemComponent
              categories={item}
              data={item}
              article={item}
              item={item}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UniversalSlider;
