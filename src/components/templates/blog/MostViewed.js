import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import styles from "./MostViewed.module.css";
import MostVisitedCard from "@/components/modules/blog/MostVisitedCard";

function MostViewed({ articles = [] }) {
  const mostViewed = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  return (
    <section className={styles["most-visited-blog"]}>
      <SectionHeader
        title="پربازدیدترین ها"
        desc="در این سکشن شما میتوانید اخبار و مقالات پربازدید یکماه گذشته رو مشاهده بکنید."
      />

      <div className={styles["most-visited-blog-wrapper"]}>
        {mostViewed.map((article) => (
          <MostVisitedCard key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default MostViewed;
