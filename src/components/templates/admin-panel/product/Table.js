"use client";
import Link from "next/link";
import styles from "./Table.module.css";

function Table({ products, onEditProduct, firstIndex }) {
  // فقط ۵ محصول آخر
  // const latestProducts = products.slice(-5);

  return (
    <div className={styles["product-table-wrapper"]}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>نام محصول</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>وضعیت</th>
            <th>دسته</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id || index}>
              <td>{firstIndex + index + 1}</td>
              <td>
                <div className={styles["product-name"]}>
                  <Link
                    className={styles["product-link"]}
                    href={`/products/${product.category.slug}/${product._id}`}
                  >
                    <div className={styles["product-image"]}></div>
                    {product.title}
                  </Link>
                </div>
              </td>
              <td>{product.stock} عدد</td>
              <td>{product.price.toLocaleString()} تومان</td>
              <td>
                <span
                  className={`${styles["status"]} ${
                    product.status === "active"
                      ? styles["active"]
                      : styles["inactive"]
                  }`}
                >
                  {product.status === "active" ? "فعال" : "غیرفعال"}
                </span>
              </td>
              <td>{product.category?.title || "-"}</td>
              <td>
                <div className={styles["delete-icone"]}>
                  <img src="/icons/icon32.svg" alt="حذف" />
                </div>
                <div
                  onClick={() => onEditProduct(product)}
                  className={styles["edit-icon"]}
                >
                  <img src="/icons/icon33.svg" alt="ویرایش" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
