"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose, IoSearchOutline, IoTimeOutline } from "react-icons/io5";
import styles from "./Search.module.css";
import SearchResultItem from "./SearchResultItem";

const QUICK_TAGS = ["لپ‌تاپ", "گوشی", "هدفون", "apple", "ساعت هوشمند"];

const EMPTY_RESULTS = { products: [], articles: [], categories: [] };

export default function Search({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(EMPTY_RESULTS);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const debounceRef = useRef(null);

  // ── mount ──────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── قفل اسکرول صفحه هنگام باز بودن modal ─────────────
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    const timer = setTimeout(() => inputRef.current?.focus(), 100);

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      clearTimeout(timer);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // ── سرچ با debounce ────────────────────────────────────
  useEffect(() => {
    const value = query.trim();

    if (!value || value.length < 2) {
      setResults(EMPTY_RESULTS);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setResults({
          products: data.products ?? [],
          articles: data.articles ?? [],
          categories: data.categories ?? [],
        });
      } catch (err) {
        console.error("search error:", err);
        setResults(EMPTY_RESULTS);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // ── reset وقتی modal بسته میشه ─────────────────────────
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults(EMPTY_RESULTS);
    }
  }, [isOpen]);

  // ── جلوگیری از bubble شدن scroll به overlay ───────────
  const handleListWheel = (e) => {
    const el = listRef.current;
    if (!el) return;

    const atTop = el.scrollTop === 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
    e.stopPropagation();
  };

  const totalResults =
    results.products.length +
    results.articles.length +
    results.categories.length;

  const hasQuery = query.trim().length > 0;
  const hasResults = totalResults > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    window.location.href = `/search?q=${encodeURIComponent(value)}`;
    onClose();
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
    inputRef.current?.focus();
  };

  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!mounted || !isOpen) return null;

  // ── normalizer: داده خام DB رو به فرمت SearchResultItem تبدیل میکنه ──
  const normalize = {
    product: (p) => ({
      id: p._id,
      type: "product",
      title: p.title,
      subtitle: "محصول",
      image: p.images?.[0] ?? null,
      price: p.price,
      href: `/products/${p.category?.slug || p.category?._id || "unknown"}/${p._id}`,
    }),
    article: (a) => ({
      id: a._id,
      type: "article",
      title: a.title,
      subtitle: "مقاله",
      image: a.coverImage ?? null,
      href: `/blog/${a._id}`,
    }),
    category: (c) => ({
      id: c._id,
      type: "category",
      title: c.title,
      subtitle: "دسته‌بندی",
      image: c.image ?? null,
      href: `/categories/${c.slug}`,
    }),
  };

  const allItems = [
    ...results.products.map(normalize.product),
    ...results.articles.map(normalize.article),
    ...results.categories.map(normalize.category),
  ];

  const getMeFunc = () => {
    return true;
  };

  return createPortal(
    <div className={styles.overlay} onMouseDown={handleOverlayMouseDown}>
      <section
        className={styles.searchPanel}
        role="dialog"
        aria-modal="true"
        aria-label="جستجو در تک شاپ"
      >
        {/* هدر */}
        <div className={styles.topBar}>
          <div>
            <span className={styles.breadcrumb}>تک شاپ / جستجو</span>
            <h2 className={styles.title}>چی می‌خوای پیدا کنی؟</h2>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="بستن جستجو"
          >
            <IoClose />
          </button>
        </div>

        {/* اینپوت */}
        <form className={styles.searchBox} onSubmit={handleSubmit}>
          <IoSearchOutline className={styles.searchIcon} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="نام محصول، برند، مقاله یا دسته‌بندی..."
            className={styles.input}
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setQuery("")}
              aria-label="پاک کردن جستجو"
            >
              <IoClose />
            </button>
          )}
        </form>

        {/* پیشنهادات */}
        {!hasQuery && (
          <div className={styles.quickArea}>
            <div className={styles.sectionHeader}>
              <IoTimeOutline />
              <span>جستجوهای پیشنهادی</span>
            </div>
            <div className={styles.tags}>
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={styles.tag}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* نتایج */}
        {hasQuery && (
          <div className={styles.resultsArea}>
            <div className={styles.resultsHeader}>
              <span>نتایج جستجو</span>
              <small>{loading ? "..." : `${totalResults} مورد`}</small>
            </div>

            {loading ? (
              <div className={styles.loadingState}>
                <span className={styles.spinner} />
                در حال جستجو...
              </div>
            ) : hasResults ? (
              <div
                ref={listRef}
                className={styles.resultsList}
                onWheel={handleListWheel}
              >
                {allItems.map((item) => (
                  <SearchResultItem
                    key={`${item.type}-${item.id}`}
                    item={item}
                    onSelect={onClose}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <strong>نتیجه‌ای پیدا نشد</strong>
                <p>عبارت دیگری را امتحان کن یا از کلمات کوتاه‌تر استفاده کن.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>,
    document.body,
  );
}
