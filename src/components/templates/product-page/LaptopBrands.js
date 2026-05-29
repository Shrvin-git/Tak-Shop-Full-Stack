"use client";

import ShowAll from "@/components/modules/showAll/ShowAll";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";
import Card from "@/components/modules/products/Card";

function LaptopBrands({ item }) {
  return (
    <div className="laptop_brand">
      <div className="container">
        <UniversalSlider
          data={item}
          renderComponent={Card}
          loop={false}
          autoplay={false}
          customBreakpoints={{
            300: { slidesPerView: 2, spaceBetween: 10 },
            400: { slidesPerView: 2, spaceBetween: 10 },
            510: { slidesPerView: 3, spaceBetween: 10 },
            576: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            992: { slidesPerView: 6, spaceBetween: 20 },
          }}
        />
      </div>
    </div>
  );
}

export default LaptopBrands;
