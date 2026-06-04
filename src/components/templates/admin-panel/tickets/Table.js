"use client";
import Link from "next/link";
import styles from "./Table.module.css";

function TicketTable({
  tickets,
  onDeleteTicket,
  onOpenTicketDetails,
  firstIndex,
}) {
  return (
    <div className={styles["product-table-wrapper"]}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>کاربر</th>
            <th>عنوان تیکت</th>
            <th>دپارتمان</th>
            <th>تاریخ ثبت</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id || index}>
              <td>{firstIndex + index + 1}</td>
              <td>{ticket.user.userName}</td>
              <td>
                <div className={styles["product-name"]}>
                  <Link
                    className={styles["product-link"]}
                    href={`/p-admin/tickets/${ticket._id}`}
                  >
                    {ticket.title}
                  </Link>
                </div>
              </td>
              <td>{ticket.department?.title || "-"}</td>
              <td>{new Date(ticket.createdAt).toLocaleDateString("fa-IR")}</td>
              <td>
                <span
                  className={`${styles["status"]} ${
                    ticket.status === "answered"
                      ? styles["active"]
                      : ticket.status === "closed"
                        ? styles["closed"]
                        : styles["inactive"]
                  }`}
                >
                  {ticket.status === "answered"
                    ? "پاسخ داده شده"
                    : ticket.status === "closed"
                      ? "بسته شده"
                      : "در انتظار"}
                </span>
              </td>
              <td>
                <div
                  onClick={() => onDeleteTicket(ticket._id)}
                  className={styles["delete-icon"]}
                >
                  <img src="/icons/icon32.svg" alt="حذف" />
                </div>
                <div
                  onClick={() => onOpenTicketDetails(ticket)}
                  className={styles["edit-icon"]}
                >
                  <img src="/icons/icon33.svg" alt="ویرایش" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable;
