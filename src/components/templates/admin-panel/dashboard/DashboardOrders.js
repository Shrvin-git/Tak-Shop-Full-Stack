"use client";

import ShowAll from "@/components/modules/showAll/ShowAll";
import Box from "@/components/templates/admin-panel/index/Box";
import ChartBox from "@/components/templates/admin-panel/index/ChartBox";
import Table from "@/components/templates/admin-panel/index/Table";
import styles from "@/styles/p-admin/dashboard.module.css";
import FilterControls from "@/utils/FilterControls";
import { useState } from "react";

function DashboardOrders({ users, products, initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);

  // ۱. محاسبات کاربران فعال
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => !user.isBan).length;
  const activeUsersPercent =
    totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

  // ۲. محاسبات فروش روزانه
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // تمام سفارش‌های امروز (صرف‌نظر از وضعیت)
  const ordersToday = orders.filter(
    (order) => new Date(order.createdAt) >= today,
  );

  // سفارش‌های پرداخت شده امروز
  const paidOrdersToday = ordersToday.filter(
    (order) => order.status === "paid",
  );

  // مجموع مبلغ پرداخت شده‌ها
  const dailySales = paidOrdersToday.reduce(
    (sum, order) => sum + order.payable,
    0,
  );

  // محاسبه درصد موفقیت سفارش‌های امروز
  const dailySalesPercent =
    ordersToday.length > 0
      ? Math.round((paidOrdersToday.length / ordersToday.length) * 100)
      : 0;

  // ۳. محاسبات تعداد سفارش‌های Paid نسبت به کل
  const totalOrdersCount = orders.length;
  const paidOrders = orders.filter((order) => order.status === "paid").length;
  const paidOrdersPercent =
    totalOrdersCount > 0
      ? Math.round((paidOrders / totalOrdersCount) * 100)
      : 0;

  // ۴. محاسبات کالاهای موجود (Stock > 0)
  const totalProductsCount = products.length;
  const availableProducts = products.filter((p) => p.stock > 0);
  const availableProductsPercent =
    totalProductsCount > 0
      ? Math.round((availableProducts.length / totalProductsCount) * 100)
      : 0;

  return (
    <div className={styles["admin-page__content"]}>
      <div
        className={`${styles["admin-section"]} ${styles["admin-section--info"]}`}
      >
        {/* فروش روزانه: بدون percent پاس داده شده تا نمودار رندر نشود */}
        <Box
          title="فروش روزانه"
          value={dailySales.toLocaleString()}
          percent={dailySalesPercent} // ارسال درصد برای نمایش نمودار
          description="تومان (سفارش‌های امروز)"
        />

        {/* سفارش‌های پرداخت شده */}
        <Box
          title="سفارش‌های پرداخت شده"
          value={paidOrders}
          percent={paidOrdersPercent}
          description="از کل سفارش‌ها"
        />

        {/* کالاهای موجود */}
        <Box
          title="کالاهای موجود"
          value={availableProducts.length}
          percent={availableProductsPercent}
          description="محصولات فعال"
        />

        {/* کاربران فعال */}
        <Box
          title="کاربران فعال"
          value={activeUsers}
          percent={activeUsersPercent}
          description="کاربران ثبت‌نامی"
        />
      </div>

      <div className={styles["dashboard-grid"]}>
        <ChartBox />
        <ChartBox />
        <ChartBox />
      </div>

      {/* Last Orders */}
      <div
        className={`${styles["admin-section"]} ${styles["admin-section--orders"]}`}
      >
        <h3>لیست آخرین سفارش‌ها</h3>

        <Table orders={orders} />
        <ShowAll href={`/p-admin/orders`} />
      </div>
    </div>
  );
}

export default DashboardOrders;
