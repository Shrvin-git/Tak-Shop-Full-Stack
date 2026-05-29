import dynamic from "next/dynamic";

// ایمپورت کامپوننت لپتاپ اختصاصی
const LaptopCategory = dynamic(
  () => import("@/components/templates/categories/LaptopCategory")
);

// ایمپورت صفحه عمومی محصولات (همان component که در مسیر products/... هست)
import CategoryPage from "@/app/products/[categorySlug]/page";

export default function Page({ params, searchParams }) {
  const { categorySlug } = params;

  // اگر لپتاپ بود → کامپوننت مخصوص خودش
  if (categorySlug === "laptops") {
    return <LaptopCategory />;
  }

  // سایر دسته‌ها → همان صفحه عمومی محصولات از مسیر products/[categorySlug]/
  return <CategoryPage params={params} searchParams={searchParams} />;
}
