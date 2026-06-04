"use client";

import { useEffect, useState } from "react";

import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import BestSell from "@/components/templates/product/index/BestSell";
import Banner from "@/components/templates/index/banner/Banner";
import LaptopBrands from "@/components/templates/product-page/LaptopBrands";
import CpuCardSwiperWrapper from "@/components/templates/swiperWrapper/product/CpuCardSwiperWrapper";
import BlogPosts from "@/components/templates/index/BlogPosts/BlogPosts";
import FAQ from "@/components/templates/faq/FAQ";
import CategoryPriceCard from "@/components/modules/products/laptop/CategoryPriceCard";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";
import CategoryCpuCard from "@/components/modules/products/laptop/CategoryCpuCard";

export default function LaptopCategory() {
  // ------------------------------
  // STATES
  // ------------------------------
  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  // ------------------------------
  // PRICE RANGE DATA (STATIC)
  // ------------------------------
  const priceRanges = [
    {
      label: "۱۰ تا ۲۵ میلیون تومان",
      min: 10000000,
      max: 25000000,
      img: "/images/category-price/1.png",
    },
    {
      label: "۲۵ تا ۳۵ میلیون تومان",
      min: 25000000,
      max: 35000000,
      img: "/images/category-price/2.png",
    },
    {
      label: "۳۵ تا ۵۰ میلیون تومان",
      min: 35000000,
      max: 50000000,
      img: "/images/category-price/3.png",
    },
    {
      label: "۵۰ تا ۶۰ میلیون تومان",
      min: 50000000,
      max: 60000000,
      img: "/images/category-price/4.png",
    },
    {
      label: "۶۰ تا ۷۰ میلیون تومان",
      min: 60000000,
      max: 70000000,
      img: "/images/category-price/5.png",
    },
    {
      label: "بالای ۷۰ میلیون تومان",
      min: 70000000,
      max: 999999999,
      img: "/images/category-price/6.png",
    },
  ];

  const cpuRanges = [
    { title: "Celeron", name: "celeron", img: "/images/CPU/celeron.png" },
    { title: "Core i3", name: "corei3", img: "/images/CPU/i3.png" },
    { title: "Core i5", name: "corei5", img: "/images/CPU/i5.png" },
    { title: "Core i7", name: "corei7", img: "/images/CPU/i7.png" },
    { title: "Core i9", name: "corei9", img: "/images/CPU/i9.png" },
    { title: "Ryzen", name: "ryzen", img: "/images/CPU/ryzen.png" },
  ];

  // ------------------------------
  // FETCH DATA ON CLIENT
  // ------------------------------
  useEffect(() => {
    const LAPTOP_CATEGORY_ID = "6a07f379f809ebbfbc562b4a";

    async function loadData() {
      try {
        const articleRes = await fetch("/api/article");
        const articleData = await articleRes.json();
        setArticles(articleData.articles || []);

        const productRes = await fetch(
          `/api/product?category=${LAPTOP_CATEGORY_ID}`,
        );
        const productData = await productRes.json();

        setProducts(productData.allProduct || []);

        // best selling
        const best = productData.allProduct
          ?.filter((p) => p.status === "active")
          ?.sort((a, b) => b.sold - a.sold)
          ?.slice(0, 4);

        setBestSellingProducts(best);
      } catch (error) {
        console.log("Error loading data:", error);
      }
    }

    loadData();
  }, []);

  // ------------------------------
  // STATIC BRANDS & USAGES
  // ------------------------------

  const usages = [
    {
      title: "گیمینگ",
      slug: "gaming",
      image: "/images/usage/gaming.png",
      type: "usage",
    },
    {
      title: "مهندسی",
      slug: "engineering",
      image: "/images/usage/engineering.png",
      type: "usage",
    },
    {
      title: "دانشجویی",
      slug: "student",
      image: "/images/usage/student.png",
      type: "usage",
    },
    {
      title: "تجاری",
      slug: "business",
      image: "/images/usage/business.png",
      type: "usage",
    },
    {
      title: "اقتصادی",
      slug: "economic",
      image: "/images/usage/economic.png",
      type: "usage",
    },
    {
      title: "صنعتی",
      slug: "industrial",
      image: "/images/usage/industrial.png",
      type: "usage",
    },
  ];

  const brand = [
    {
      title: "ایسر",
      slug: "acer",
      image: "/images/Laptop Brand/acer.png",
      type: "brand",
    },
    {
      title: "ایسوس",
      slug: "asus",
      image: "/images/Laptop Brand/asus.png",
      type: "brand",
    },
    {
      title: "ام اس آی",
      slug: "msi",
      image: "/images/Laptop Brand/MSI.png",
      type: "brand",
    },
    {
      title: "اچ پی",
      slug: "hp",
      image: "/images/Laptop Brand/HP.png",
      type: "brand",
    },
    {
      title: "اپل",
      slug: "apple",
      image: "/images/Laptop Brand/Apple.png",
      type: "brand",
    },
    {
      title: "لنوو",
      slug: "lenovo",
      image: "/images/Laptop Brand/Lenovo.png",
      type: "brand",
    },
  ];

  // ------------------------------
  // JSX RETURN
  // ------------------------------
  return (
    <div className="main">
      <Banner img={"/images/index/hero2.jpg"} />

      <div className="laptop_brand">
        <div className="container">
          <SectionHeader
            title="برند های لبتاب"
            desc="در اینبخش میتوانید لبتاب هارا بر اساس برند مورد نظر جستجو کنید"
          />
          <LaptopBrands item={brand} />
        </div>
      </div>

      <div className="new-prudct">
        <div className="container">
          <SectionHeader
            title="بر اساس کاربرد"
            desc="در اینبخش میتوانید لبتاب هارا بر اساس کاربردشان جستجو کنید"
          />
          <LaptopBrands item={usages} />
        </div>
      </div>

      <div className="laptop_best_sell">
        <div className="container">
          <SectionHeader
            title="پر فروش ترین محصولات"
            desc="پر فروش ترین‌های هفته گذشته"
          />
          <BestSell products={bestSellingProducts} />
        </div>
      </div>

      <div className="category-by-cpu">
        <div className="container">
          <SectionHeader
            title="دسته بندی بر اساس پردازنده"
            desc="بر اساس پردازنده لپ‌تاب مخصوص خود را پیدا کنید"
          />
          <UniversalSlider
            data={cpuRanges}
            renderComponent={CategoryCpuCard}
            autoplay={false}
            loop={false}
            customBreakpoints={{
              300: { slidesPerView: 2, spaceBetween: 10 },
              400: { slidesPerView: 2, spaceBetween: 10 },
              510: { slidesPerView: 3, spaceBetween: 10 },
              576: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 15 },
              992: { slidesPerView: 6, spaceBetween: 20 },
            }}
          />
          {/* <CpuCardSwiperWrapper /> */}
        </div>
      </div>

      <Banner img={"/images/index/hero.jpg"} />

      <div className="category-by-price">
        <div className="container">
          <SectionHeader
            title="دسته بندی بر اساس قیمت"
            desc="بر اساس قیمت لپ‌تاپ مورد نظر خود را پیدا کنید"
          />

          <UniversalSlider
            data={priceRanges}
            renderComponent={CategoryPriceCard}
            autoplay={false}
            loop={false}
            customBreakpoints={{
              300: { slidesPerView: 2, spaceBetween: 10 },
              400: { slidesPerView: 2, spaceBetween: 10 },
              510: { slidesPerView: 3, spaceBetween: 10 },
              576: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 15 },
              992: { slidesPerView: 6, spaceBetween: 20 },
            }}
          />
        </div>
      </div>

      <BlogPosts articles={articles} />
      <FAQ />
    </div>
  );
}
