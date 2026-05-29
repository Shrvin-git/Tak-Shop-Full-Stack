"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "@/styles/banner-swiper.css";

function Banner({img}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <div className="banner-section">
      <div className="container">
        <div className="hero-section-slider">
          <Swiper
            loop={true}
            autoplay={{ delay: 2000 }}
            modules={[Navigation, Pagination]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.params.pagination.el = paginationRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            className="hero-section-slider"
          >
            <SwiperSlide>
              <img src={img} alt="Slide" />
            </SwiperSlide>

            <SwiperSlide>
              <img src={img} alt="Slide" />
            </SwiperSlide>

            <SwiperSlide>
              <img src={img} alt="Slide" />
            </SwiperSlide>
          </Swiper>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom" ref={paginationRef}></div>

          {/* Custom Navigation */}
          <div className="swiper-nav-buttons">
            <div className="swiper-button-prev" ref={prevRef}>
              {/* سمت چپ ← */}
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                <path
                  d="M2.4 0.2L0.72 2L9.6 11L0.72 20L2.4 21.8L13.2 11L2.4 0.2Z"
                  fill="#831FC1"
                />
              </svg>
            </div>

            <div className="swiper-button-next" ref={nextRef}>
              {/* سمت راست → */}
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                <path
                  d="M11.6 0.2L13.28 2L4.4 11L13.28 20L11.6 21.8L0.8 11L11.6 0.2Z"
                  fill="#831FC1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
