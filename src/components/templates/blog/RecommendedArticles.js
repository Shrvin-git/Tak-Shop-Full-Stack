import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import BlogCategorySwiper from "../swiperWrapper/BlogCategorySwiper";
import ShowAll from "@/components/modules/showAll/ShowAll";
import styles from "./RecommendedArticles.module.css";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";
import BlogBox from "@/components/modules/blogs/BlogBox";

function BloxCardSort({ articles }) {
  const lastArticles = articles.slice(0, 10);
  return (
    <section className="blog-category">
      <div className="section_header_container">
        <SectionHeader
          title={"مطالب پیشنهادی برای شما"}
          desc={
            "در این سکشن شما میتوانید مطالبی را که وبسایت ما بر اساس شناخت شما پیشنهاد کرده را مشاهده بکنید."
          }
        />

        <div className="blow-container">
          <UniversalSlider
            data={lastArticles}
            renderComponent={BlogBox}
            // اگر خواستی تنظیمات Swiper رو همینجا عوض کنی:
            loop={lastArticles.length > 1}
            autoplay={{ delay: 2500 }}
          />
          <ShowAll />
        </div>
      </div>
    </section>
  );
}

export default BloxCardSort;
