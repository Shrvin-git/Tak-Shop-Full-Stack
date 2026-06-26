import BlogBox from "@/components/modules/blogs/BlogBox";
import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import ShowAll from "@/components/modules/showAll/ShowAll";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";

function BlogPosts({ articles }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-center"
      className="blog"
    >
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
          loop={false}
          autoplay={{ delay: 2500 }}
          customBreakpoints={{
            300: { slidesPerView: 2, spaceBetween: 10 },
            500: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 15 },
            992: { slidesPerView: 5, spaceBetween: 20 },
          }}
        />
        <ShowAll />
      </div>
    </div>
  );
}

export default BlogPosts;
