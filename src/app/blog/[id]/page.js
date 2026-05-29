import { FaUser, FaClock, FaEye } from "react-icons/fa";
import styles from "@/styles/article.module.css";
import BlogBox from "@/components/modules/blogs/BlogBox";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";
import SectionHeader from "@/components/modules/sections-header/SectionHeader";

export default async function page() {
  //   const [article, setArticle] = useState(null);

  //   useEffect(() => {
  //     const fetchArticles = async () => {
  //       const res = await fetch("/api/article");
  //       const data = await res.json();

  //       setArticle(data.article);
  //     };

  //     fetchArticles();
  //   }, []);

  const res = await fetch("http://localhost:3000/api/article", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className={styles["article-page"]}>
      <div className={"container"}>
        <h1 className={styles["article-title"]}>
          بررسی کامل آیفون 16 و تغییرات مهم آن
        </h1>

        <p className={styles["article-excerpt"]}>
          در این مقاله به بررسی کامل آیفون 16 می‌پردازیم و تغییرات مهم آن نسبت
          به نسل‌های قبل را بررسی می‌کنیم.
        </p>

        <div className={styles["article-meta"]}>
          <span>
            <FaUser /> علی محمدی
          </span>

          <span>
            <FaClock /> 7 دقیقه مطالعه
          </span>

          <span>
            <FaEye /> 95 بازدید
          </span>

          <span className={styles["category"]}>بررسی</span>
        </div>

        <div className={styles["article-cover"]}>
          <img src="/images/articles/default.jpg" />
        </div>

        <div className={styles["article-layout"]}>
          <aside className={styles["toc"]}>
            <h3>فهرست مطالب</h3>

            <ul>
              <li>طراحی آیفون 16</li>
              <li>نمایشگر</li>
              <li>دوربین</li>
              <li>باتری</li>
              <li>جمع بندی</li>
            </ul>
          </aside>

          <article className={styles["article-content"]}>
            <p>
              آیفون 16 یکی از مورد انتظارترین گوشی‌های اپل است که با تغییرات
              مهمی در طراحی، پردازنده و دوربین معرفی شده است.
            </p>

            <h2>طراحی آیفون 16</h2>

            <p>
              اپل در طراحی آیفون 16 تغییرات کوچکی اما مهم ایجاد کرده است.
              لبه‌های دستگاه همچنان تخت هستند اما وزن دستگاه کاهش یافته است.
            </p>

            <blockquote className={styles.blockquote}>
              آیفون 16 یکی از قدرتمندترین گوشی‌های سال محسوب می‌شود.
            </blockquote>

            <h2>نمایشگر</h2>

            <p>نمایشگر این گوشی از نوع OLED بوده و نرخ نوسازی 120 هرتز دارد.</p>

            <ul>
              <li>نرخ نوسازی 120 هرتز</li>
              <li>روشنایی بالاتر</li>
              <li>مصرف انرژی کمتر</li>
            </ul>

            <h2>دوربین</h2>

            <p>
              اپل در آیفون 16 از سنسورهای جدید استفاده کرده که کیفیت عکاسی را
              بهبود می‌دهد.
            </p>

            <div className={styles["article-image"]}>
              <img src="/images/articles/default.jpg" />
            </div>

            <h2>جمع بندی</h2>

            <p>
              آیفون 16 با وجود تغییرات نه چندان زیاد، همچنان یکی از بهترین
              گوشی‌های بازار است.
            </p>

            <div className={styles["tags"]}>
              <span>#آیفون</span>
              <span>#اپل</span>
              <span>#بررسی گوشی</span>
            </div>
          </article>
        </div>

        <div className={styles["author-box"]}>
          <img src="/images/articles/default.jpg" />

          <div>
            <h4>علی محمدی</h4>
            <p>
              نویسنده حوزه تکنولوژی و گجت که علاقه زیادی به بررسی محصولات جدید
              دارد.
            </p>
          </div>
        </div>

        <div className="">
          <SectionHeader
            title="مقاله های پیشنهادی "
            desc="در این سکشن شما میتوانید اخبار و مقالات مناسب خودتان را مشاهده بکنید."
          />

          <UniversalSlider
            data={data.articles}
            renderComponent={BlogBox}
            // اگر خواستی تنظیمات Swiper رو همینجا عوض کنی:
            loop={false}
            autoplay={{ delay: 2500 }}
          />
        </div>
      </div>
    </div>
  );
}
