"use client";

import Portal from "@/components/common/Portal";
import AllProducts from "@/components/modules/svgs/AllProducts";
import CategoryProducts from "@/components/modules/svgs/CategoryProducts";
import EndProducts from "@/components/modules/svgs/EndProducts";
import NewProduct from "@/components/modules/svgs/NewProduct";
import Pagination from "@/components/shared/Pagination";
import AddProductForm from "@/components/templates/admin-panel/product/AddProductForm";
import Box from "@/components/templates/admin-panel/product/Box";
import Table from "@/components/templates/admin-panel/product/Table";
import styles from "@/styles/p-admin/product.module.css";
import { useEffect, useState, useMemo } from "react";

function Page() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;

  const refreshProducts = async () => {
    const res = await fetch("/api/product");
    const data = await res.json();

    setProducts(Array.isArray(data.allProduct) ? data.allProduct : []);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleAddClick = () => {
    setMode("create");
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setMode("update");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // -------------------------
  //       Dynamic Filter
  // -------------------------
  const filteredProducts = useMemo(() => {
    let result = products;

    switch (filter) {
      case "active":
        result = products.filter((p) => p.status === "active");
        break;

      case "inactive":
        result = products.filter((p) => p.status === "inactive");
        break;

      case "outOfStock":
        result = products.filter((p) => p.stock === 0);
        break;

      case "categorized":
        result = products.filter((p) => p.category && p.category !== "");
        break;

      case "all":
        return products;

      default:
        return products;
    }

    return result;
  }, [filter, products]);

  // -------------------------
  // Stats
  // -------------------------
  const totalProducts = products.length;
  const outOfStockProducts = products.filter((p) => p.stock === 0).length;
  const categorizedProducts = products.filter((p) => p.category).length;
  const activeProducts = products.filter((p) => p.status === "active").length;

  const paginatedProducts = filteredProducts.slice(firstIndex, lastIndex);

  return (
    <div className={styles["admin-page"]}>
      <div className={styles["admin-page__content"]}>
        {/* Info Section */}
        <div className={styles["main-info"]}>
          <Box
            title={"تعداد محصولات موجود"}
            icon={<AllProducts />}
            value={totalProducts}
          />
          <Box
            title={"تعداد محصولات تمام شده"}
            icon={<EndProducts />}
            value={outOfStockProducts}
          />
          <Box
            title={"محصولات دسته بندی شده"}
            icon={<CategoryProducts />}
            value={categorizedProducts}
          />
          <Box
            title={"افزودن محصول جدید"}
            icon={<NewProduct />}
            onClick={handleAddClick}
          />
        </div>

        {/* Table */}
        <div className={styles["product-table"]}>
          <span className={styles["product-table-header"]}>جدول محصولات</span>

          <div className={styles["filter-bar"]}>
            <div className={styles["filter-bar__icon"]}>
              <img src="/icons/icon30.svg" alt="icon30" />
              <span>فیلتر بر اساس:</span>
            </div>

            <div className={styles["filter-bar__item"]}>
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">۵ محصول آخر</option>
                <option value="active">محصولات فعال</option>
                <option value="inactive">محصولات غیرفعال</option>
                <option value="outOfStock">ناموجود</option>
                <option value="categorized">دارای دسته‌بندی</option>
              </select>
            </div>
          </div>

          <div className={styles["table-products-information"]}>
            <Table
              firstIndex={firstIndex}
              products={paginatedProducts}
              onEditProduct={handleEditProduct}
            />

            <div className={styles.pagination_wrapper}>
              <Pagination
                totalItems={filteredProducts}
                pageSize={10}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>

          {modalOpen && (
            <Portal>
              <div
                className={styles.modalOverlay}
                onClick={() => setModalOpen(false)}
              >
                <div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <AddProductForm
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    mode={mode}
                    selectedProduct={selectedProduct}
                    onSuccess={refreshProducts}
                  />
                </div>
              </div>
            </Portal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
