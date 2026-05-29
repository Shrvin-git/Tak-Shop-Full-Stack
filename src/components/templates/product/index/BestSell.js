import BestSellLaptopsCard from "@/components/modules/products/laptop/BestSellLaptopsCard";
import styles from "./BestSell.module.css";

function BestSell({ products }) {
  return (
    <div className={styles.laptop_best_sell_wrapper}>
      {products.map((product, index) => (
        <BestSellLaptopsCard key={product._id} {...product} index={index}/>
      ))}
    </div>
  );
}

export default BestSell;
