"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import OfferCard from "@/components/modules/offerCard/OfferCard";

function OfferSwiperWrapper({ product }) {
  return (
    <Swiper
      className="discount_slider"
      loop={true}
      modules={[Autoplay]}
      breakpoints={{
        300: { slidesPerView: 2, spaceBetween: 10 },
        400: { slidesPerView: 2, spaceBetween: 10 },
        510: { slidesPerView: 3, spaceBetween: 10 },
        576: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 15 },
        992: { slidesPerView: 4, spaceBetween: 10 },
        1200: { slidesPerView: 5, spaceBetween: 10 },
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
      {product.map((item) => (
        <SwiperSlide key={item._id}>
          <OfferCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default OfferSwiperWrapper;
