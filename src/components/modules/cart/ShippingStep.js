"use client";

import allProvinces from "@/data/iran-provinces.json";
import { useMemo, useState } from "react";
import styles from "./shipping-step.module.css";
import InvoiceBox from "./InvoiceBox";

const provincesData = allProvinces.provinces;

export default function ShippingStep({
  step,
  setStep,
  formData,
  setFormData,
  totalPrice,
  discount,
  shipping,
  payable,
}) {
  const [selectedProvince, setSelectedProvince] = useState(
    formData.province || "",
  );

  const cityOptions = useMemo(() => {
    const province = provincesData.find(
      (item) => item.name === selectedProvince,
    );
    return province ? province.cities : [];
  }, [selectedProvince]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const provinceChangeHandler = (e) => {
    const value = e.target.value;
    setSelectedProvince(value);

    setFormData({
      ...formData,
      province: value,
      city: "", // با تغییر استان، شهر ریست شود
    });
  };

  const cityChangeHandler = (e) => {
    setFormData({
      ...formData,
      city: e.target.value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className={styles.wrapper}>

      <div className={styles["section-wrapper"]}>
        <div className={styles.section}>
          <div className={styles.fieldGroup}>
            <input
              name="name"
              placeholder="نام و نام خانوادگی *"
              value={formData.name || ""}
              onChange={changeHandler}
              className={styles.input}
            />

            <input
              name="phone"
              placeholder="شماره موبایل *"
              value={formData.phone || ""}
              onChange={changeHandler}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <input
              name="email"
              placeholder="ایمیل (اختیاری)"
              value={formData.email || ""}
              onChange={changeHandler}
              className={styles.input}
            />

            <input
              name="postalCode"
              placeholder="کد پستی"
              value={formData.postalCode || ""}
              onChange={changeHandler}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <select
              name="province"
              value={selectedProvince}
              onChange={provinceChangeHandler}
              className={styles.input}
            >
              <option value="">استان را انتخاب کنید *</option>
              {provincesData.map((province) => (
                <option key={province.name} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>

            <select
              name="city"
              value={formData.city || ""}
              onChange={cityChangeHandler}
              className={styles.input}
              disabled={!selectedProvince}
            >
              <option value="">شهر را انتخاب کنید *</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}></div>

          <div className={styles.fieldGroup}>
            <input
              name="plaque"
              placeholder="پلاک (اختیاری)"
              value={formData.plaque || ""}
              onChange={changeHandler}
              className={styles.input}
            />

            <input
              name="unit"
              placeholder="واحد (اختیاری)"
              value={formData.unit || ""}
              onChange={changeHandler}
              className={styles.input}
            />
          </div>

          <textarea
            name="address"
            placeholder="آدرس کامل *"
            value={formData.address || ""}
            onChange={changeHandler}
            className={styles.textarea}
            rows={4}
          />

        
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
    </div>
  );
}
