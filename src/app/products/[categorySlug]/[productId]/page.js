"use client";

import Comments from "@/components/templates/product-page/Comments";
import Details from "@/components/templates/product-page/Details";
import Gallery from "@/components/templates/product-page/Gallery";
import Introduction from "@/components/templates/product-page/Introduction";
import Tabs from "@/components/templates/product-page/Tabs";
import RelatedProduct from "@/components/templates/related-product/RelatedProduct";
import styles from "@/styles/product.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // 👈 اضافه کن

function Page() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const id = params.productId;

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const res = await fetch(`/api/product/${id}`);
      const data = await res.json();
      setProduct(data.product);
    };

    fetchProduct();
  }, [id]);

  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles["product-header"]}>
          <Gallery product={product} />
          <Details product={product} />
        </div>

        <Tabs product={product} />
        <Introduction product={product} />
        <RelatedProduct product={product} />
        <Comments comments={product?.comments || []} />
      </div>
    </div>
  );
}

export default Page;
