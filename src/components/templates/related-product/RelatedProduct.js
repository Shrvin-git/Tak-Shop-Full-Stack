"use client";
import { useEffect, useState } from "react";
import Card from "@/components/modules/products/Card";
import SectionHeader from "@/components/modules/sections-header/SectionHeader";
import UniversalSlider from "@/components/modules/UniversalSlider/UniversalSlider";
import NewProductBox from "@/components/modules/products/NewProductBox";

function RelatedProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/product`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.allProduct || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // نمایش وضعیت لودینگ یا در صورت نبود محصول، جلوگیری از رندر
  if (loading)
    return <div style={{ textAlign: "center" }}>در حال بارگذاری...</div>;
  if (!products || products.length === 0) return null;

  return (
    <section style={{ marginBottom: "4rem" }}>
      <SectionHeader
        title="محصولات مرتبط"
        desc="در این سکشن شما می‌توانید محصولات پرفروش تک‌شاپ را در طول هفته گذشته مشاهده کنید"
      />

      <UniversalSlider
        data={products.slice(0, 9)}
        renderComponent={NewProductBox}
        loop={products.length > 1}
        autoplay={false}
      />
    </section>
  );
}

export default RelatedProduct;
