"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import Card from "@/components/modules/offerCard/OfferCard";

function OfferSwiperWrapper({ product }) {
  return (
    <div className="offer-swiper-wrapper">
      {/* دکمه‌های ناوبری */}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>

      <Swiper
        className="best-sell-slider"
        loop={true}
        modules={[Autoplay, Navigation]}
        navigation={true}
        breakpoints={{
          300: { slidesPerView: 2, spaceBetween: 10 },
          400: { slidesPerView: 2, spaceBetween: 10 },
          510: { slidesPerView: 3, spaceBetween: 10 },
          576: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          992: { slidesPerView: 4, spaceBetween: 10 },
          1200: { slidesPerView: 5, spaceBetween: 25 },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {product.map((item) => (
          <SwiperSlide key={item._id}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default OfferSwiperWrapper;
