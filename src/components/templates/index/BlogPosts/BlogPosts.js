import BlogBox from "@/components/modules/blogs/BlogBox";
import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import ShowAll from "@/components/modules/showAll/ShowAll";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";

function BlogPosts({ articles }) {
  return (
    <div className="blog">
      <div className="container">
        <SectionHeader
          title={"مقالات"}
          desc={
            "در این سکشن شما میتوانید اخبار و مقالات تک شاپ را مشاهده بکنید"
          }
        />

        <UniversalSlider
          data={articles}
          renderComponent={BlogBox}
          // اگر خواستی تنظیمات Swiper رو همینجا عوض کنی:
          loop={false}
          autoplay={{ delay: 2500 }}
        />
        <ShowAll />
      </div>
    </div>
  );
}

export default BlogPosts;
