import BrandBox from "@/components/modules/brandBox/BrandBox";
import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import ShowAll from "@/components/modules/showAll/ShowAll";
import styles from "./PopularBrands.module.css";

function PopularBrands() {
  return (
    <div className="brands">
      <div className="container">
        <SectionHeader
          title={"برند های محبوب"}
          desc={
            "در این سکشن شما میتوانید برند های محبوب را که بیشترین فروش را دارن مشاهده بکنید"
          }
        />

        <div className={styles.branding_wrapper}>
          <BrandBox img={"./images/brand/Huawei.png"} />
          <BrandBox img={"./images/brand/X.Vision.png"} />
          <BrandBox img={"./images/brand/samsung.png"} />
          <BrandBox img={"./images/brand/HP.png"} />
          <BrandBox img={"./images/brand/Apple.png"} />
          <BrandBox img={"./images/brand/TSCO.png"} />
          <BrandBox img={"./images/brand/Canon.png"} />
          <BrandBox img={"./images/brand/xiaomi.png"} />
        </div>

        <ShowAll />
      </div>
    </div>
  );
}

export default PopularBrands;
