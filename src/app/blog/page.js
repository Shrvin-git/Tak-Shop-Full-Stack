import BlogNav from "@/components/modules/blog/BlogNav";
import BloxCardSort from "@/components/templates/blog/BloxCardSort";
import MostViewed from "@/components/templates/blog/MostViewed";
import BlogPosts from "@/components/templates/index/BlogPosts/BlogPosts";
import styles from "@/styles/blog.module.css";
import RecommendedArticles from "@/components/templates/blog/RecommendedArticles";
import ArticleModel from "@/models/Article"; 
import connectToDB from "../../../configs/db";

async function page() {
  await connectToDB();

  const articles = await ArticleModel.find({}).lean();


  return (
    <div className={styles.main}>
      <div className="container">
        <BlogNav articles={articles} />
        <BlogPosts articles={articles} />
        <BloxCardSort articles={articles} />
        <MostViewed articles={articles} />
        <RecommendedArticles articles={articles} />
      </div>
    </div>
  );
}

export default page;
