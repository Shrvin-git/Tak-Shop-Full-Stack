import TicketWrapper from "@/components/templates/user-panel/tickets/TicketWrapper";
import styles from "@/styles/p-user/gift-card.module.css";

import TicketModel from "@/models/Ticket";
import DepartmentModel from "@/models/Department";
import connectToDB from "../../../../configs/db";
import { authUser } from "@/utils/auth-server";

export default async function Page() {
  await connectToDB();

  const user = await authUser();

  const [tickets, departments] = await Promise.all([
    TicketModel.find({ user: user._id })
      .sort({ _id: -1 })
      .populate({ path: "department", select: "title isActive" })
      .populate({ path: "user", select: "firstName lastName" })
      .lean(),
    DepartmentModel.find({ isActive: true }).sort({ _id: -1 }).lean(),
  ]);


  return (
    <div
      id={styles["popular-product"]}
      className={`${styles["popular-products"]} ${styles["user-panel"]} ${styles["user-panel--active"]}`}
      style={{ display: "block" }}
    >
      <TicketWrapper
        tickets={JSON.parse(JSON.stringify(tickets))}
        departments={JSON.parse(JSON.stringify(departments))}
      />
    </div>
  );
}
