"use client";
import { useEffect, useState } from "react";
import styles from "@/components/templates/user-panel/orders/orders.module.css";
import UserPanelHeader from "@/components/modules/user-panel/UserPanelHeader";
import OrderFilter from "@/components/templates/user-panel/orders/OrderFilter";
import OrderCard from "@/components/templates/user-panel/orders/OrderCard";

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUserInfo(data.user);
        }
      } catch (err) {
        console.error("User fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!userInfo?._id) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders/${userInfo._id}`);
        const data = await res.json();
        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (err) {
        console.error("Orders fetch error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo]);

  if (loading) return <div>در حال بارگذاری...</div>;

  return (
    <div className={styles["user-order"]} style={{ display: "block" }}>
      <div className={styles["user-panel-header"]}>
        <UserPanelHeader title="سفارش ها" desc="سفارش های خود را مشاهده کنید" />
      </div>

      {orders?.length > 0 ? (
        <div className={styles["user-otder-wrapper"]}>
          <div className={styles["user-otder-header"]}>
            <h1>سفارش ها</h1>

            <OrderFilter active={activeTab} onChange={setActiveTab} />
          </div>

          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <div class={styles.empty}>
          <span>لیست علاقه مندی ها خالیست</span>
        </div>
      )}
    </div>
  );
}

// ! Backup
{
  /* <div className={styles["user-otder-wrapper"]}>
  <div className={styles["user-otder-header"]}>
    <h1>سفارش ها</h1>

    <OrderFilter active={activeTab} onChange={setActiveTab} />
  </div>

  {orders?.length > 0 ? (
    orders.map((order) => <OrderCard key={order._id} order={order} />)
  ) : (
    <div class={styles.empty}>
      <span>لیست علاقه مندی ها خالیست</span>
    </div>
  )}
</div>; */
}
