"use client";
import styles from "./address-modal.module.css";
import { useState } from "react";

export default function AddressModal({ close }) {
  const [form, setForm] = useState({
    name: "علی رضایی",
    phone: "09120000000",
    city: "تهران",
    address: "میدان ونک، خیابان ملاصدرا",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>ویرایش آدرس</h3>
          <button onClick={close}>✕</button>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label>نام و نام خانوادگی</label>
            <input name="name" value={form.name} onChange={changeHandler} />
          </div>

          <div className={styles.field}>
            <label>شماره موبایل</label>
            <input name="phone" value={form.phone} onChange={changeHandler} />
          </div>

          <div className={styles.field}>
            <label>شهر</label>
            <input name="city" value={form.city} onChange={changeHandler} />
          </div>

          <div className={styles.field}>
            <label>آدرس کامل</label>
            <textarea
              name="address"
              value={form.address}
              onChange={changeHandler}
              rows="3"
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={close}>
            انصراف
          </button>

          <button className={styles.save}>ذخیره آدرس</button>
        </div>
      </div>
    </div>
  );
}
