"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import BlogBox from "@/components/modules/blogs/BlogBox";

function BlogCategorySwiper() {
  return (
    <Swiper
      className="discount_slider"
      loop={true}
      freeMode={true}
      modules={[Autoplay]}
      breakpoints={{
        300: { slidesPerView: 2, spaceBetween: 10 },
        400: { slidesPerView: 2, spaceBetween: 10 },
        510: { slidesPerView: 3, spaceBetween: 10 },
        576: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 15 },
        992: { slidesPerView: 4, spaceBetween: 10 },
        1200: { slidesPerView: 5, spaceBetween: 35 },
      }}
      //   autoplay={{
      //     delay: 2000,
      //     disableOnInteraction: false,
      //   }}
    >
      <SwiperSlide>
        <BlogBox />
      </SwiperSlide>

      <SwiperSlide>
        <BlogBox />
      </SwiperSlide>

      <SwiperSlide>
        <BlogBox />
      </SwiperSlide>

      <SwiperSlide>
        <BlogBox />
      </SwiperSlide>

      <SwiperSlide>
        <BlogBox />
      </SwiperSlide>

      <SwiperSlide>
        <BlogBox />
      </SwiperSlide>

      <SwiperSlide>
        <BlogBox />
      </SwiperSlide>
    </Swiper>
  );
}

export default BlogCategorySwiper;
