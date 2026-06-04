import {
  FiEye,
  FiTrash2,
  FiCheckCircle,
  FiPlus,
  FiFolder,
  FiClock,
  FiRefreshCw,
  FiMessageSquare,
} from "react-icons/fi";

import styles from "./ticket.module.css";

const statusText = {
  open: "باز",
  closed: "بسته شده",
  answered: "پاسخ داده شده",
  pending: "در انتظار پاسخ",
};

const statusClass = {
  open: styles.open,
  closed: styles.closed,
  answered: styles.answered,
  pending: styles.pending,
};

export default function TicketsPage({
  tickets,
  setIsPageActive,
  setSelectedTicketId,
}) {
  return (
    <section className={styles["tickets-page"]}>
      <div className={styles["tickets-header"]}>
        <button
          onClick={() => setIsPageActive(2)}
          className={styles["new-ticket-btn"]}
        >
          <FiPlus />
          ثبت تیکت جدید
        </button>
      </div>

      <div className={styles["tickets-wrapper"]}>
        {tickets.map((ticket) => (
          <div className={styles["ticket-card"]} key={ticket._id}>
            <div className={styles["ticket-content"]}>
              <div className={styles["ticket-top"]}>
                <div className={styles["ticket-title"]}>
                  <span className={styles["ticket-bullet"]}>•</span>
                  <h3>{ticket.title}</h3>
                </div>

                <button
                  onClick={() => {
                    setSelectedTicketId(ticket._id);
                    setIsPageActive(3);
                  }}
                  className={styles["details-btn"]}
                >
                  <FiEye />
                  مشاهده جزئیات
                </button>
              </div>

              <div className={styles["ticket-meta"]}>
                <div className={styles["ticket-meta-item"]}>
                  <FiFolder />
                  <span>شماره تیکت:</span>
                  <strong>{ticket._id}</strong>
                </div>

                <div className={styles["ticket-meta-item"]}>
                  <FiMessageSquare />
                  <span>دپارتمان:</span>
                  <strong>{ticket.department?.title}</strong>
                </div>

                <div className={styles["ticket-meta-item"]}>
                  <FiClock />
                  <span>تاریخ ثبت:</span>
                  <strong>
                    {new Date(ticket.createdAt).toLocaleDateString("fa-IR")}
                  </strong>
                </div>

                <div className={styles["ticket-meta-item"]}>
                  <FiRefreshCw />
                  <span>وضعیت:</span>

                  <strong
                    className={`${styles.status} ${statusClass[ticket.status]}`}
                  >
                    {statusText[ticket.status]}
                  </strong>
                </div>
              </div>
            </div>

            {/* <div className={styles["ticket-actions"]}>
              <button>
                <FiCheckCircle />
              </button>

              <button className={styles["danger"]}>
                <FiTrash2 />
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
}
