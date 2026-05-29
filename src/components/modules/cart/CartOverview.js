import CartItemCard from "./CartItemCard";
import styles from "./CartOverview.module.css";
import InvoiceBox from "./InvoiceBox";

function CartOverview({
  cart,
  inc,
  dec,
  remove,
  itemsCount,
  totalPrice,
  discount,
  shipping,
  step,
  setStep,
  payable,
}) {
  return (
    <div className={styles["cart-wrapper"]}>
      <div className={styles["cart-right"]}>
        {cart.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onInc={() => inc(item.id)}
            onDec={() => dec(item.id)}
            onRemove={() => remove(item.id)}
          />
        ))}
      </div>

     
      <InvoiceBox
        totalPrice={totalPrice}
        discount={discount}
        shipping={shipping}
        payable={payable}
        setStep={setStep}
        step={step}
      />
    </div>
  );
}

export default CartOverview;
