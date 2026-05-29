"use client";

import EmptyCart from "@/components/modules/cart/EmptyCart";
import OrderComplete from "@/components/modules/cart/OrderComplete";
import PaymentStep from "@/components/modules/cart/PaymentStep";
import ShippingStep from "@/components/modules/cart/ShippingStep";
import Stepper from "@/components/modules/stepper/Stepper";
import RelatedProduct from "@/components/templates/related-product/RelatedProduct";
import CartOverview from "@/components/modules/cart/CartOverview";
import styles from "@/styles/Cart.module.css";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [orderData, setOrderData] = useState(null);
  const shipping = 50000;

  useEffect(() => {
    const read = () => setCart(JSON.parse(localStorage.getItem("cart")) || []);
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);

  const itemsCount = useMemo(
    () => cart.reduce((sum, i) => sum + (i.count || 0), 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, i) => sum + (i.price || 0) * (i.count || 0), 0),
    [cart],
  );

  const payable = useMemo(
    () => Math.max(totalPrice - discount + shipping, 0),
    [totalPrice, discount],
  );

  const persist = (next) => {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const inc = (id) =>
    persist(cart.map((i) => (i.id === id ? { ...i, count: i.count + 1 } : i)));

  const dec = (id) =>
    persist(
      cart.map((i) =>
        i.id === id ? { ...i, count: Math.max(i.count - 1, 1) } : i,
      ),
    );

  const remove = (id) => persist(cart.filter((i) => i.id !== id));

  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles["cart-section-wrapper"]}>
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              {/* <Stepper step={step} setStep={setStep} /> */}

              {step === 1 && (
                <CartOverview
                  step={step}
                  setStep={setStep}
                  cart={cart}
                  inc={inc}
                  dec={dec}
                  remove={remove}
                  itemsCount={itemsCount}
                  totalPrice={totalPrice}
                  discount={discount}
                  shipping={shipping}
                  payable={payable}
                />
              )}

              {step === 2 && (
                <ShippingStep
                  step={step}
                  setStep={setStep}
                  formData={formData}
                  setFormData={setFormData}
                  totalPrice={totalPrice}
                  discount={discount}
                  shipping={shipping}
                  payable={payable}
                />
              )}

              {step === 3 && (
                <PaymentStep
                  step={step}
                  setStep={setStep}
                  cart={cart}
                  totalPrice={totalPrice}
                  discount={discount}
                  shipping={shipping}
                  payable={payable}
                  formData={formData}
                  setOrderData={setOrderData}
                />
              )}

              {step === 4 && <OrderComplete order={orderData} />}

              <RelatedProduct />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
