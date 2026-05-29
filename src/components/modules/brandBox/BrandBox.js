import styles from "./BrandBox.module.css";

function BrandBox({img}) {
  return (
    <div className={styles.brand_img}>
      <img src={img} alt="" />
    </div>
  );
}

export default BrandBox;
