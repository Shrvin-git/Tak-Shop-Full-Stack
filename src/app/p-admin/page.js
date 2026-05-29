import DashboardOrders from "@/components/templates/admin-panel/dashboard/DashboardOrders";
import styles from "@/styles/p-admin/dashboard.module.css";
import { authUser } from "@/utils/auth-server";
import { redirect } from "next/navigation";
import connectToDB from "../../../configs/db";
import OrderModel from "@/models/Order";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";

async function Page() {
  await connectToDB();

  const [users, products, orders] = await Promise.all([
    UserModel.find({}).lean(),
    ProductModel.find({}).lean(),
    OrderModel.find({})
      .populate("user", "firstName lastName phone email")
      .populate("items.product")
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  const user = await authUser();
  if (user.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div className={styles["admin-page"]}>
      <DashboardOrders
        users={users}
        products={products}
        initialOrders={orders}
      />
    </div>
  );
}

export default Page;
