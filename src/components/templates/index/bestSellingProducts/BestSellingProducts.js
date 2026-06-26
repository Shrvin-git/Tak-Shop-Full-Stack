"use client";

import Card from "@/components/modules/offerCard/OfferCard";
import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import ShowAll from "@/components/modules/showAll/ShowAll";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";

function BestSellingProducts({ product }) {
  const bestDiscounted = product
    .filter((p) => p.discountPrice != null && p.discountPrice < p.price)
    .sort((a, b) => {
      const discountA = ((a.price - a.discountPrice) / a.price) * 100;
      const discountB = ((b.price - b.discountPrice) / b.price) * 100;
      return discountB - discountA;
    })
    .slice(0, 6);

  return (
    <div data-aos="fade-left" className="best_selling_products">
      <div className="container">
        <SectionHeader
          title="محصولات با بیشترین تخفیف"
          desc="محصولاتی که بالاترین درصد تخفیف را در تک‌شاپ دارند"
        />

        <UniversalSlider
          data={bestDiscounted}
          renderComponent={Card}
          autoplay={false}
          loop={false}
          customBreakpoints={{
            300: { slidesPerView: 2, spaceBetween: 10 },
            500: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 15 },
            992: { slidesPerView: 5, spaceBetween: 20 },
          }}
        />

        {/* <BestSellingWrapper product={bestDiscounted} /> */}
        <ShowAll />
      </div>
    </div>
  );
}

export default BestSellingProducts;
