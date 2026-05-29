import Card from "@/components/modules/category/ProductCard";
import SortProduct from "@/components/modules/products/SortProduct";
import Filtering from "@/components/templates/filtering/Filtering";
import styles from "@/styles/category/category.module.css";

export default async function Page({ params, searchParams }) {
  const { categorySlug } = params;

  const res = await fetch("http://localhost:3000/api/product", {
    cache: "no-store",
  });

  const data = await res.json();

  let products = data.allProduct;

  // فقط محصولات این دسته‌بندی
  let filteredProducts = products.filter(
    (product) => product.category?.slug === categorySlug,
  );

  // ----------------------------
  // SMART NORMALIZER
  // ----------------------------
  const normalize = (value) => {
    if (value == null) return "";

    return String(value)
      .toLowerCase()
      .replace(/gb/gi, "")
      .replace(/tb/gi, "")
      .replace(/ssd/gi, "")
      .replace(/hdd/gi, "")
      .replace(/inch/gi, "")
      .replace(/inches/gi, "")
      .replace(/اینچ/g, "")
      .replace(/\s+/g, "")
      .trim();
  };

  // ----------------------------
  // PRICE RANGE FILTER
  // ----------------------------
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : null;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : null;

  if (minPrice || maxPrice) {
    filteredProducts = filteredProducts.filter((product) => {
      const price = Number(product.price);

      // اگر قیمت وجود نداشت، حذفش کن
      if (!price || isNaN(price)) return false;

      // منطق تطابق عددی
      if (minPrice && price < minPrice) return false;
      if (maxPrice && price > maxPrice) return false;

      return true;
    });
  }

  // ----------------------------
  // SMART DYNAMIC FILTERING
  // ----------------------------
  Object.entries(searchParams).forEach(([key, value]) => {
    // جلوگیری از خراب کردن فیلتر قیمت
    if (key === "minPrice" || key === "maxPrice") return;

    const values = Array.isArray(value) ? value : [value];

    filteredProducts = filteredProducts.filter((product) => {
      let productValue = product[key];

      // attribute → value
      if (!productValue && product.attributes) {
        const attr = product.attributes.find((a) => a.name === key);
        if (attr) productValue = attr.value;
      }

      // variant → value
      if (!productValue && product.variants) {
        const variant = product.variants.find((v) => v.name === key);
        if (variant) productValue = variant.value;
      }

      if (!productValue) return false;

      // آرایه‌ها
      if (Array.isArray(productValue)) {
        return values.some((v) =>
          productValue.some((p) => normalize(p).includes(normalize(v))),
        );
      }

      // مقدار ساده
      return values.some((v) => normalize(productValue).includes(normalize(v)));
    });
  });

  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles["all-labtop-wrapper"]}>
          <Filtering categoryName={categorySlug} />

          <div className={styles["all-products-left"]}>
            <SortProduct />

            <div className={styles["all-products-left-wrapper"]}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))
              ) : (
                <p>محصولی یافت نشد</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
