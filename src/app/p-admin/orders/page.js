"use client";

import { useState, useEffect } from "react";
import Table from "@/components/templates/admin-panel/index/Table";
import styles from "@/styles/p-admin/dashboard.module.css";
import FilterControls from "@/utils/FilterControls";
import Pagination from "@/components/shared/Pagination";

function DashboardOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;

  // واکشی داده‌ها از API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // تنظیمات فیلتر
  const filterOptions = [
    { value: "all", title: "همه سفارش‌ها" },
    { value: "paid", title: "پرداخت شده" },
    { value: "processing", title: "در انتظار پرداخت" },
    { value: "cancelled", title: "لغو شده" },
  ];

  const filterLogic = {
    all: (orders) => orders,
    paid: (orders) => orders.filter((o) => o.status === "paid"),
    processing: (orders) => orders.filter((o) => o.status === "processing"),
    cancelled: (orders) => orders.filter((o) => o.status === "cancelled"),
  };

  const filteredOrders = filterLogic[filter]
    ? filterLogic[filter](orders)
    : orders;

  const paginatedOrders = filteredOrders.slice(firstIndex, lastIndex);

  return (
    <div className={styles["admin-page"]}>
      <div className={styles["admin-page__content"]}>
        <div
          className={`${styles["admin-section"]} ${styles["admin-section--orders"]}`}
        >
          <h3>لیست تمام سفارشات</h3>

          <FilterControls
            options={filterOptions}
            value={filter}
            onChange={setFilter}
          />

          {/* نمایش وضعیت بارگذاری یا جدول سفارشات */}
          {loading ? (
            <div className={styles.loading}>در حال دریافت اطلاعات...</div>
          ) : (
            <>
              <Table orders={paginatedOrders} />

              <div className={styles.pagination_wrapper}>
                <Pagination
                  totalItems={orders}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardOrders;
