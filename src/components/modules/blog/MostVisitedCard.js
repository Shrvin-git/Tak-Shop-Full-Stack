import Link from "next/link";
import styles from "./MostVisitedCard.module.css";

function MostVisitedCard({ article }) {
  const articleTypes = {
    news: "اخبار",
    review: "بررسی",
    suggestion: "پیشنهاد",
    guide: "راهنما",
    comparison: "مقایسه",
    tutorial: "آموزش",
    analysis: "تحلیل",
  };

  const typeLabel = articleTypes[article.type] || "سایر";

  return (
    <div className={styles["most-visited-blog-item"]}>
      <div className={styles["most-visited-blog-right"]}>
        <img
          src={article.coverImage || "./images/most-visited/most-visited2.jpg"}
          alt={article.title}
        />
      </div>

      <div className={styles["most-visited-blog-left"]}>
        <h2 className={styles["most-visited-title"]}>{article.title}</h2>
        <p className={styles["most-visited-desc"]}>
          {article.excerpt || article.content}
        </p>

        <div className={styles["article-details-wrapper"]}>
          <span className={styles["most-visited-date"]}>
            {article.publishedAt || "۲ تیر ماه ۱۴۰۴"}
          </span>

          <span
            className={
              styles["most-visited-view"] + " " + styles["most-visited-date"]
            }
          >
            {article.views} بازدید
          </span>

          <span
            className={
              styles["most-visited-author"] + " " + styles["most-visited-date"]
            }
          >
            {article.author.firstName} {article.author.lastName}
          </span>
        </div>
        <div className={styles["most-visited-footer"]}>
          <span className={styles["blog-category-label"]}>{typeLabel}</span>

          <Link href={`/blog/${article.slug}`} className={styles["more-link"]}>
            ادامه مطلب
            <svg
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.39953 15.2L8.51953 14L2.59953 7.99995L8.51953 1.99995L7.39953 0.799951L0.199532 7.99995L7.39953 15.2Z"
                fill="#831FC1"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MostVisitedCard;
