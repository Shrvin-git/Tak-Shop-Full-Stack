"use client";

import NewProductBox from "@/components/modules/products/NewProductBox";
import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import ShowAll from "@/components/modules/showAll/ShowAll";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";

function NewProducts({ product }) {
  const productsArray = Array.isArray(product) ? product : [];

  const lastProducts = productsArray.slice(-6);
  return (
    <div data-aos="zoom-in-down" className="new_product">
      <div className="container">
        <SectionHeader
          title={"محصولات تازه"}
          desc={
            "در این سکشن شما میتوانید محصولاتی را که جدیدا به سایت اضافه شده اند را مشاهده بکنید"
          }
        />

        <UniversalSlider
          data={lastProducts}
          renderComponent={NewProductBox}
          loop={lastProducts.length > 50}
          autoplay={false}
        />

        <ShowAll />
      </div>
    </div>
  );
}

export default NewProducts;
