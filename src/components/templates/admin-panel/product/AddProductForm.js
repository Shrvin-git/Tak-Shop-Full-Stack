import styles from "./AddProductForm.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helper";

import React, { useEffect, useState } from "react";

const initialFormState = {
  title: "",
  slug: "",
  brand: "",
  price: "",
  discountPrice: "",
  stock: "",
  sku: "",
  shortDescription: "",
  description: "",
  status: "draft",
  isFeatured: false,
};

const initialDimensionsState = {
  length: "",
  width: "",
  height: "",
  weight: "",
};

const initialVariantState = {
  sku: "",
  price: "",
  stock: "",
  attributes: [],
};

function AddProductForm({
  isOpen,
  onClose,
  mode = "create",
  selectedProduct = null,
  onSuccess,
}) {
  const [form, setForm] = useState(initialFormState);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dynamicAttributes, setDynamicAttributes] = useState({});
  const [images, setImages] = useState([]);
  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [variant, setVariant] = useState(initialVariantState);
  const [variants, setVariants] = useState([]);
  const [dimensions, setDimensions] = useState(initialDimensionsState);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const isEditMode = mode === "update";

  const resetForm = () => {
    setForm(initialFormState);
    setSelectedCategory("");
    setDynamicAttributes({});
    setImages([]);
    setAttributeName("");
    setAttributeValue("");
    setAttributes([]);
    setVariant(initialVariantState);
    setVariants([]);
    setDimensions(initialDimensionsState);
    setTagInput("");
    setTags([]);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setVariant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAttributeAdd = () => {
    if (!attributeName.trim() || !attributeValue.trim()) return;

    setAttributes((prev) => [
      ...prev,
      { name: attributeName.trim(), value: attributeValue.trim() },
    ]);

    setAttributeName("");
    setAttributeValue("");
  };

  const handleAttributeRemove = (index) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = tagInput.trim();
      if (!value) return;
      if (tags.includes(value)) return;

      setTags((prev) => [...prev, value]);
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
  };

  const buildPayload = () => {
    const dynamicAttrsArray = Object.entries(dynamicAttributes).map(
      ([name, value]) => ({
        name,
        value,
      }),
    );

    return {
      ...form,
      category: selectedCategory || null,
      attributes: [...attributes, ...dynamicAttrsArray],
      variants,
      variant,
      dimensions,
      tags,
      images,
      isFeatured: !!form.isFeatured,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = buildPayload();

      const formData = new FormData();

      // فیلدهای ساده
      Object.keys(payload).forEach((key) => {
        if (
          key !== "images" &&
          key !== "attributes" &&
          key !== "variants" &&
          key !== "variant" &&
          key !== "dimensions" &&
          key !== "tags"
        ) {
          formData.append(key, payload[key]);
        }
      });

      // آبجکت‌ها و آرایه‌ها
      formData.append("attributes", JSON.stringify(payload.attributes));
      formData.append("variants", JSON.stringify(variants));
      formData.append("variant", JSON.stringify(payload.variant || {}));
      formData.append("dimensions", JSON.stringify(dimensions));
      formData.append("tags", JSON.stringify(tags));

      // ✅ چند عکس
      images.forEach((file) => {
        formData.append("images", file);
      });

      const url =
        isEditMode && selectedProduct?._id
          ? `/api/product/${selectedProduct._id}`
          : "/api/product";

      const method = isEditMode && selectedProduct?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData, // ❗ بدون Content-Type
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || "خطا در ذخیره محصول");
      }

      const result = await res.json();

      if (onSuccess) onSuccess(result);

      resetForm();
      onClose?.();
    } catch (error) {
      console.error("Submit error:", error);
      alert(error.message || "خطای نامشخص در ثبت محصول");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedCategory) {
      setDynamicAttributes({});
      return;
    }

    const selectedCat = categories.find((cat) => cat._id === selectedCategory);

    if (!selectedCat?.attributeGroups) return;

    const initialDynamicAttrs = {};

    selectedCat.attributeGroups.forEach((group) => {
      group.attributes.forEach((attr) => {
        initialDynamicAttrs[attr.name] = "";
      });
    });

    setDynamicAttributes(initialDynamicAttrs);
  }, [selectedCategory, categories]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setCategories(data.allCategories || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!isEditMode || !selectedProduct) return;

    setForm({
      title: selectedProduct.title || "",
      slug: selectedProduct.slug || "",
      brand: selectedProduct.brand || "",
      price: selectedProduct.price || "",
      discountPrice: selectedProduct.discountPrice || "",
      stock: selectedProduct.stock || "",
      sku: selectedProduct.sku || "",
      shortDescription: selectedProduct.shortDescription || "",
      description: selectedProduct.description || "",
      status: selectedProduct.status || "draft",
      isFeatured: selectedProduct.isFeatured || false,
    });

    const categoryId =
      typeof selectedProduct.category === "object"
        ? selectedProduct.category._id
        : selectedProduct.category;

    setSelectedCategory(categoryId || "");

    setAttributes(selectedProduct.attributes || []);

    const dynAttrs = {};
    selectedProduct.attributes?.forEach((attr) => {
      dynAttrs[attr.name] = attr.value;
    });
    setDynamicAttributes(dynAttrs);

    setDimensions(selectedProduct.dimensions || initialDimensionsState);
    setTags(selectedProduct.tags || []);
    setVariants(selectedProduct.variants || []);
    setVariant(selectedProduct.variant || initialVariantState);
  }, [selectedProduct, isEditMode]);

  if (!isOpen) return null;

  return (
    <div className={styles["overlay"]}>
      <div className={styles["modalContent"]}>
        <div className={styles["modalHeader"]}>
          <h2>{isEditMode ? "ویرایش محصول" : "افزودن محصول جدید"}</h2>
          <button
            type="button"
            onClick={onClose}
            className={styles["closeBtn"]}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles["productForm"]}>
          <div className={styles["formGrid"]}>
            <div className={styles["formGroup"]}>
              <label>عنوان محصول</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles["formGroup"]}>
              <label>اسلاگ</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles["formGroup"]}>
              <label>برند</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles["formGroup"]}>
              <label>قیمت</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles["formGroup"]}>
              <label>قیمت تخفیف</label>
              <input
                type="number"
                name="discountPrice"
                value={form.discountPrice}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles["formGroup"]}>
              <label>موجودی</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles["formGroup"]}>
              <label>SKU</label>
              <input
                type="text"
                name="sku"
                value={form.sku}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles["formGroup"]}>
              <label>وضعیت</label>
              <select
                name="status"
                value={form.status}
                onChange={handleInputChange}
              >
                <option value="draft">پیش‌نویس</option>
                <option value="published">منتشر شده</option>
                <option value="archived">بایگانی</option>
              </select>
            </div>

            <div
              className={styles["formGroup"] + " " + styles["checkboxGroup"]}
            >
              <label>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleInputChange}
                />
                محصول ویژه
              </label>
            </div>
          </div>

          <div className={styles["formGroup"] + " " + styles["fullWidth"]}>
            <label>توضیح کوتاه</label>
            <textarea
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles["formGroup"] + " " + styles["fullWidth"]}>
            <label>توضیحات</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles["section"]}>
            <h3>دسته‌بندی</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name ||
                    cat.title ||
                    cat.label ||
                    cat.categoryName ||
                    "(بدون نام)"}
                </option>
              ))}
            </select>

            {Object.keys(dynamicAttributes).length > 0 && (
              <div className={styles["section"]}>
                {selectedCategory && (
                  <div className={styles["section"]}>
                    <h3>ویژگی‌های محصول</h3>

                    {categories
                      .find((cat) => cat._id === selectedCategory)
                      ?.attributeGroups?.map((group) => (
                        <div
                          key={group.name}
                          className={styles["attributeGroup"]}
                        >
                          <h4 className={styles["attr-header"]}>
                            {group.title}
                          </h4>

                          {group.attributes.map((attr) => (
                            <div
                              key={attr.name}
                              className={styles["formGroup"]}
                            >
                              <label>{attr.label}</label>

                              <input
                                type="text"
                                value={dynamicAttributes[attr.name] || ""}
                                onChange={(e) =>
                                  setDynamicAttributes((prev) => ({
                                    ...prev,
                                    [attr.name]: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles["section"]}>
            <h3>ویژگی‌ها</h3>
            <div className={styles["inlineRow"]}>
              <input
                type="text"
                placeholder="نام ویژگی"
                value={attributeName}
                onChange={(e) => setAttributeName(e.target.value)}
              />
              <input
                type="text"
                placeholder="مقدار ویژگی"
                value={attributeValue}
                onChange={(e) => setAttributeValue(e.target.value)}
              />
              <button type="button" onClick={handleAttributeAdd}>
                افزودن
              </button>
            </div>

            <ul>
              {attributes.map((attr, index) => (
                <li key={index}>
                  {attr.name}: {attr.value}
                  <button
                    type="button"
                    onClick={() => handleAttributeRemove(index)}
                  >
                    حذف
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles["section"]}>
            <h3>ابعاد</h3>
            <div className={styles["formGrid"]}>
              <input
                type="text"
                name="length"
                placeholder="طول"
                value={dimensions.length}
                onChange={handleDimensionChange}
              />
              <input
                type="text"
                name="width"
                placeholder="عرض"
                value={dimensions.width}
                onChange={handleDimensionChange}
              />
              <input
                type="text"
                name="height"
                placeholder="ارتفاع"
                value={dimensions.height}
                onChange={handleDimensionChange}
              />
              <input
                type="text"
                name="weight"
                placeholder="وزن"
                value={dimensions.weight}
                onChange={handleDimensionChange}
              />
            </div>
          </div>

          <div className={styles["section"]}>
            <h3>تگ‌ها</h3>
            <input
              type="text"
              placeholder="تگ را وارد کنید و Enter بزنید"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagAdd}
            />
            <div className={styles["tagList"]}>
              {tags.map((tag) => (
                <span key={tag} className={styles["tagItem"]}>
                  {tag}
                  <button type="button" onClick={() => handleTagRemove(tag)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={styles["section"]}>
            <h3>تصاویر</h3>
            <input type="file" multiple onChange={handleImageChange} />
          </div>

          <div className={styles["section"]}>
            <h3>واریانت</h3>
            <div className={styles["formGrid"]}>
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={variant.sku}
                onChange={handleVariantChange}
              />
              <input
                type="number"
                name="price"
                placeholder="قیمت"
                value={variant.price}
                onChange={handleVariantChange}
              />
              <input
                type="number"
                name="stock"
                placeholder="موجودی"
                value={variant.stock}
                onChange={handleVariantChange}
              />
            </div>
          </div>

          <div className={styles["actions"]}>
            <button type="button" onClick={onClose} disabled={loading}>
              انصراف
            </button>
            <button type="submit" disabled={loading}>
              {loading
                ? "در حال ذخیره..."
                : isEditMode
                  ? "ثبت تغییرات"
                  : "افزودن محصول"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;

// import styles from "./AddProductForm.module.css";
// import { useRouter } from "next/navigation";
// import { showSwal } from "@/utils/helper";

// import React, { useEffect, useState } from "react";

// const initialFormState = {
//   title: "",
//   slug: "",
//   brand: "",
//   price: "",
//   discountPrice: "",
//   stock: "",
//   sku: "",
//   shortDescription: "",
//   description: "",
//   status: "draft",
//   isFeatured: false,
// };

// const initialDimensionsState = {
//   length: "",
//   width: "",
//   height: "",
//   weight: "",
// };

// const initialVariantState = {
//   sku: "",
//   price: "",
//   stock: "",
//   attributes: [],
// };

// function AddProductForm({
//   isOpen,
//   onClose,
//   mode = "create",
//   selectedProduct = null,
//   onSuccess,
// }) {
//   const [form, setForm] = useState(initialFormState);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [dynamicAttributes, setDynamicAttributes] = useState({});
//   const [images, setImages] = useState([]);
//   const [attributeName, setAttributeName] = useState("");
//   const [attributeValue, setAttributeValue] = useState("");
//   const [attributes, setAttributes] = useState([]);
//   const [variant, setVariant] = useState(initialVariantState);
//   const [variants, setVariants] = useState([]);
//   const [dimensions, setDimensions] = useState(initialDimensionsState);
//   const [tagInput, setTagInput] = useState("");
//   const [tags, setTags] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const isEditMode = mode === "update";

//   const resetForm = () => {
//     setForm(initialFormState);
//     setSelectedCategory("");
//     setDynamicAttributes({});
//     setImages([]);
//     setAttributeName("");
//     setAttributeValue("");
//     setAttributes([]);
//     setVariant(initialVariantState);
//     setVariants([]);
//     setDimensions(initialDimensionsState);
//     setTagInput("");
//     setTags([]);
//     setLoading(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleDimensionChange = (e) => {
//     const { name, value } = e.target;
//     setDimensions((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleVariantChange = (e) => {
//     const { name, value } = e.target;
//     setVariant((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAttributeAdd = () => {
//     if (!attributeName.trim() || !attributeValue.trim()) return;

//     setAttributes((prev) => [
//       ...prev,
//       { name: attributeName.trim(), value: attributeValue.trim() },
//     ]);

//     setAttributeName("");
//     setAttributeValue("");
//   };

//   const handleAttributeRemove = (index) => {
//     setAttributes((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleTagAdd = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const value = tagInput.trim();
//       if (!value) return;
//       if (tags.includes(value)) return;

//       setTags((prev) => [...prev, value]);
//       setTagInput("");
//     }
//   };

//   const handleTagRemove = (tagToRemove) => {
//     setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files || []);
//     setImages(files);
//   };

//   const buildPayload = () => {
//     const dynamicAttrsArray = Object.entries(dynamicAttributes).map(
//       ([name, value]) => ({
//         name,
//         value,
//       }),
//     );

//     return {
//       ...form,
//       category: selectedCategory || null,
//       attributes: [...attributes, ...dynamicAttrsArray],
//       variants,
//       variant,
//       dimensions,
//       tags,
//       images,
//       isFeatured: !!form.isFeatured,
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const payload = buildPayload();

//       const formData = new FormData();

//       // فیلدهای ساده
//       Object.keys(payload).forEach((key) => {
//         if (
//           key !== "images" &&
//           key !== "attributes" &&
//           key !== "variants" &&
//           key !== "variant" &&
//           key !== "dimensions" &&
//           key !== "tags"
//         ) {
//           formData.append(key, payload[key]);
//         }
//       });

//       // آبجکت‌ها و آرایه‌ها
//       formData.append("attributes", JSON.stringify(payload.attributes));
//       formData.append("variants", JSON.stringify(variants));
//       formData.append("variant", JSON.stringify(payload.variant || {}));
//       formData.append("dimensions", JSON.stringify(dimensions));
//       formData.append("tags", JSON.stringify(tags));

//       // ✅ چند عکس
//       images.forEach((file) => {
//         formData.append("images", file);
//       });

//       const url =
//         isEditMode && selectedProduct?._id
//           ? `/api/product/${selectedProduct._id}`
//           : "/api/product";

//       const method = isEditMode && selectedProduct?._id ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         body: formData, // ❗ بدون Content-Type
//       });

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         throw new Error(errorData?.message || "خطا در ذخیره محصول");
//       }

//       const result = await res.json();

//       if (onSuccess) onSuccess(result);

//       resetForm();
//       onClose?.();
//     } catch (error) {
//       console.error("Submit error:", error);
//       alert(error.message || "خطای نامشخص در ثبت محصول");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!selectedCategory) {
//       setDynamicAttributes({});
//       return;
//     }

//     const selectedCat = categories.find((cat) => cat._id === selectedCategory);

//     if (!selectedCat || !selectedCat.attributes) return;

//     const initialDynamicAttrs = {};

//     selectedCat.attributes.forEach((attr) => {
//       initialDynamicAttrs[attr.name] = "";
//     });

//     setDynamicAttributes(initialDynamicAttrs);
//   }, [selectedCategory, categories]);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/category");
//         const data = await res.json();
//         setCategories(data.allCategories || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     loadCategories();
//   }, []);

// useEffect(() => {
//   if (!isEditMode || !selectedProduct) return;

//   setForm({
//     title: selectedProduct.title || "",
//     slug: selectedProduct.slug || "",
//     brand: selectedProduct.brand || "",
//     price: selectedProduct.price || "",
//     discountPrice: selectedProduct.discountPrice || "",
//     stock: selectedProduct.stock || "",
//     sku: selectedProduct.sku || "",
//     shortDescription: selectedProduct.shortDescription || "",
//     description: selectedProduct.description || "",
//     status: selectedProduct.status || "draft",
//     isFeatured: selectedProduct.isFeatured || false,
//   });

//   const categoryId =
//     typeof selectedProduct.category === "object"
//       ? selectedProduct.category._id
//       : selectedProduct.category;

//   setSelectedCategory(categoryId || "");

//   setAttributes(selectedProduct.attributes || []);

//   const dynAttrs = {};
//   selectedProduct.attributes?.forEach((attr) => {
//     dynAttrs[attr.name] = attr.value;
//   });
//   setDynamicAttributes(dynAttrs);

//   setDimensions(selectedProduct.dimensions || initialDimensionsState);
//   setTags(selectedProduct.tags || []);
//   setVariants(selectedProduct.variants || []);
//   setVariant(selectedProduct.variant || initialVariantState);

// }, [selectedProduct, isEditMode]);

//   if (!isOpen) return null;

//   return (
//     <div className={styles["overlay"]}>
//       <div className={styles["modalContent"]}>
//         <div className={styles["modalHeader"]}>
//           <h2>{isEditMode ? "ویرایش محصول" : "افزودن محصول جدید"}</h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className={styles["closeBtn"]}
//           >
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className={styles["productForm"]}>
//           <div className={styles["formGrid"]}>
//             <div className={styles["formGroup"]}>
//               <label>عنوان محصول</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={form.title}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className={styles["formGroup"]}>
//               <label>اسلاگ</label>
//               <input
//                 type="text"
//                 name="slug"
//                 value={form.slug}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className={styles["formGroup"]}>
//               <label>برند</label>
//               <input
//                 type="text"
//                 name="brand"
//                 value={form.brand}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className={styles["formGroup"]}>
//               <label>قیمت</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={form.price}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className={styles["formGroup"]}>
//               <label>قیمت تخفیف</label>
//               <input
//                 type="number"
//                 name="discountPrice"
//                 value={form.discountPrice}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className={styles["formGroup"]}>
//               <label>موجودی</label>
//               <input
//                 type="number"
//                 name="stock"
//                 value={form.stock}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className={styles["formGroup"]}>
//               <label>SKU</label>
//               <input
//                 type="text"
//                 name="sku"
//                 value={form.sku}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className={styles["formGroup"]}>
//               <label>وضعیت</label>
//               <select
//                 name="status"
//                 value={form.status}
//                 onChange={handleInputChange}
//               >
//                 <option value="draft">پیش‌نویس</option>
//                 <option value="published">منتشر شده</option>
//                 <option value="archived">بایگانی</option>
//               </select>
//             </div>

//             <div
//               className={styles["formGroup"] + " " + styles["checkboxGroup"]}
//             >
//               <label>
//                 <input
//                   type="checkbox"
//                   name="isFeatured"
//                   checked={form.isFeatured}
//                   onChange={handleInputChange}
//                 />
//                 محصول ویژه
//               </label>
//             </div>
//           </div>

//           <div className={styles["formGroup"] + " " + styles["fullWidth"]}>
//             <label>توضیح کوتاه</label>
//             <textarea
//               name="shortDescription"
//               value={form.shortDescription}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className={styles["formGroup"] + " " + styles["fullWidth"]}>
//             <label>توضیحات</label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className={styles["section"]}>
//             <h3>دسته‌بندی</h3>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               <option value="">انتخاب دسته‌بندی</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name ||
//                     cat.title ||
//                     cat.label ||
//                     cat.categoryName ||
//                     "(بدون نام)"}
//                 </option>
//               ))}
//             </select>

//             {Object.keys(dynamicAttributes).length > 0 && (
//               <div className={styles["section"]}>
//                 <h3>ویژگی‌های اختصاصی دسته‌بندی</h3>

//                 {Object.entries(dynamicAttributes).map(([key, value]) => {
//                   const categoryObj = categories.find(
//                     (cat) => cat._id === selectedCategory,
//                   );

//                   const attrMeta = categoryObj?.attributes?.find(
//                     (a) => a.name === key,
//                   );

//                   return (
//                     <div key={key} className={styles["formGroup"]}>
//                       <label>{attrMeta?.label || key}</label>
//                       <input
//                         type="text"
//                         value={value}
//                         onChange={(e) =>
//                           setDynamicAttributes((prev) => ({
//                             ...prev,
//                             [key]: e.target.value,
//                           }))
//                         }
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           <div className={styles["section"]}>
//             <h3>ویژگی‌ها</h3>
//             <div className={styles["inlineRow"]}>
//               <input
//                 type="text"
//                 placeholder="نام ویژگی"
//                 value={attributeName}
//                 onChange={(e) => setAttributeName(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="مقدار ویژگی"
//                 value={attributeValue}
//                 onChange={(e) => setAttributeValue(e.target.value)}
//               />
//               <button type="button" onClick={handleAttributeAdd}>
//                 افزودن
//               </button>
//             </div>

//             <ul>
//               {attributes.map((attr, index) => (
//                 <li key={index}>
//                   {attr.name}: {attr.value}
//                   <button
//                     type="button"
//                     onClick={() => handleAttributeRemove(index)}
//                   >
//                     حذف
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className={styles["section"]}>
//             <h3>ابعاد</h3>
//             <div className={styles["formGrid"]}>
//               <input
//                 type="text"
//                 name="length"
//                 placeholder="طول"
//                 value={dimensions.length}
//                 onChange={handleDimensionChange}
//               />
//               <input
//                 type="text"
//                 name="width"
//                 placeholder="عرض"
//                 value={dimensions.width}
//                 onChange={handleDimensionChange}
//               />
//               <input
//                 type="text"
//                 name="height"
//                 placeholder="ارتفاع"
//                 value={dimensions.height}
//                 onChange={handleDimensionChange}
//               />
//               <input
//                 type="text"
//                 name="weight"
//                 placeholder="وزن"
//                 value={dimensions.weight}
//                 onChange={handleDimensionChange}
//               />
//             </div>
//           </div>

//           <div className={styles["section"]}>
//             <h3>تگ‌ها</h3>
//             <input
//               type="text"
//               placeholder="تگ را وارد کنید و Enter بزنید"
//               value={tagInput}
//               onChange={(e) => setTagInput(e.target.value)}
//               onKeyDown={handleTagAdd}
//             />
//             <div className={styles["tagList"]}>
//               {tags.map((tag) => (
//                 <span key={tag} className={styles["tagItem"]}>
//                   {tag}
//                   <button type="button" onClick={() => handleTagRemove(tag)}>
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className={styles["section"]}>
//             <h3>تصاویر</h3>
//             <input type="file" multiple onChange={handleImageChange} />
//           </div>

//           <div className={styles["section"]}>
//             <h3>واریانت</h3>
//             <div className={styles["formGrid"]}>
//               <input
//                 type="text"
//                 name="sku"
//                 placeholder="SKU"
//                 value={variant.sku}
//                 onChange={handleVariantChange}
//               />
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="قیمت"
//                 value={variant.price}
//                 onChange={handleVariantChange}
//               />
//               <input
//                 type="number"
//                 name="stock"
//                 placeholder="موجودی"
//                 value={variant.stock}
//                 onChange={handleVariantChange}
//               />
//             </div>
//           </div>

//           <div className={styles["actions"]}>
//             <button type="button" onClick={onClose} disabled={loading}>
//               انصراف
//             </button>
//             <button type="submit" disabled={loading}>
//               {loading
//                 ? "در حال ذخیره..."
//                 : isEditMode
//                   ? "ثبت تغییرات"
//                   : "افزودن محصول"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddProductForm;
