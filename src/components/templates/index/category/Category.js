"use client";

import CategoryCard from "@/components/modules/category/CategoryCard";
import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";

function Category({ category }) {
  return (
    <div className="container">
      <SectionHeader
        title={"دسته بندی محصولات ما"}
        desc={
          "در این سکشن شما میتوانید محصولات ما را به صورت دسته بندی مشاهده کنید و در صورت تمایل به صفحه مورد نظر بروید"
        }
      />
      <UniversalSlider
        data={category}
        renderComponent={CategoryCard}
        autoplay={false}
        loop={false}
        customBreakpoints={{
          300: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 6 },
          992: { slidesPerView: 7 },
        }}
      />
    </div>
  );
}

export default Category;
