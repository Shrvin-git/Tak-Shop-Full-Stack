import Card from "@/components/modules/category/ProductCard";
import SortProduct from "@/components/modules/products/SortProduct";
import Filtering from "@/components/templates/filtering/Filtering";
import styles from "@/styles/category/category.module.css";

function page() {
  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles["all-labtop-wrapper"]}>
          <Filtering />
          <div className={styles["all-products-left"]}>
            <SortProduct />
            <div className={styles["all-products-left-wrapper"]}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
