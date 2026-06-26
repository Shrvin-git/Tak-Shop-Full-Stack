import Banner from "@/components/templates/index/banner/BannerClient";
import FAQ from "@/components/templates/faq/FAQ";
import BestSellingProducts from "@/components/templates/index/bestSellingProducts/BestSellingProducts";
import BlogPosts from "@/components/templates/index/BlogPosts/BlogPosts";
import Category from "@/components/templates/index/category/Category";
import NewProducts from "@/components/templates/index/newProducts/NewProducts";
import Offer from "@/components/templates/index/offer/Offer";
import PopularBrands from "@/components/templates/index/popularBrands/PopularBrands";

import connectToDB from "../../configs/db";
import ProductModel from "@/models/Product";
import ArticleModel from "@/models/Article";
import CategoryModel from "@/models/Category";

export const dynamic = "force-dynamic";

export default async function Home() {
  await connectToDB();

  const allProducts = await ProductModel.find({}).populate("category").lean();
  const allArticles = await ArticleModel.find({}).lean();
  const allCategories = await CategoryModel.find({}).lean();

  return (
    <>
      <Banner img={"/images/index/HeroSection.png"} />
      <Category
        data-aos="zoom-in"
        category={JSON.parse(JSON.stringify(allCategories))}
      />
      <Offer product={JSON.parse(JSON.stringify(allProducts))} />
      <BestSellingProducts product={JSON.parse(JSON.stringify(allProducts))} />
      <PopularBrands />
      <NewProducts product={JSON.parse(JSON.stringify(allProducts))} />
      <Banner img={"/images/index/hero2.jpg"} />
      <BlogPosts articles={JSON.parse(JSON.stringify(allArticles))} />
      <FAQ />
    </>
  );
}
