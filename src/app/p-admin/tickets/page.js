"use client";

import { useEffect, useState, useMemo } from "react";
import Pagination from "@/components/shared/Pagination";
import Box from "@/components/templates/admin-panel/tickets/Box";
import Table from "@/components/templates/admin-panel/tickets/Table";
import styles from "@/styles/p-admin/tickets.module.css";
import { FiList, FiAlertCircle, FiCheckCircle, FiLock } from "react-icons/fi";
import TicketDetails from "@/components/templates/admin-panel/tickets/TicketDetails";
import { showSwal } from "@/utils/helper";

function Page() {
  const [isTicketDetailsOpen, setIsTicketDetailsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;

  const handleOpenTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    setIsTicketDetailsOpen(true);
    console.log(isTicketDetailsOpen);
    console.log(selectedTicket);
  };

  const refreshTickets = async () => {
    try {
      const res = await fetch("/api/ticket");
      const data = await res.json();

      setTickets(Array.isArray(data) ? data : data.tickets || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    refreshTickets();
  }, []);

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    switch (filter) {
      case "pending":
        result = tickets.filter((t) => t.status === "pending");
        break;
      case "answered":
        result = tickets.filter((t) => t.status === "answered");
        break;
      case "closed":
        result = tickets.filter((t) => t.status === "closed");
        break;
      case "all":
      default:
        result = tickets;
    }

    return result;
  }, [filter, tickets]);

  // -------------------------
  //         Stats (آمار)
  // -------------------------
  const stats = useMemo(() => {
    return {
      total: tickets.length,
      pending: tickets.filter((t) => t.status === "pending").length,
      answered: tickets.filter((t) => t.status === "answered").length,
      closed: tickets.filter((t) => t.status === "closed").length,
    };
  }, [tickets]);

  const paginatedTickets = filteredTickets.slice(firstIndex, lastIndex);

  const handleDeleteTicket = async (id) => {
    showSwal(
      "هشدار",
      "آیا از حذف این تیکت اطمینان دارید؟",
      "warning",
      "آره",
      async () => {
        const res = await fetch(`/api/ticket/${id}`, { method: "DELETE" });

        if (res.status === 200) {
          showSwal("موفق", "تیکت با موفقیت حذف شد", "success", "مرسی", () => {
            window.location.reload();
          });
        } else {
          const data = await res.json();
          showSwal("خطا", data.message || "مشکلی پیش اومد.", "error");
        }
      },
      "لغو",
      () => {
        null;
      },
    );
  };

  return (
    <div className={styles["admin-page"]}>
      <div className={styles["admin-page__content"]}>
        {/* Info Section (باکس های آماری) */}
        <div className={styles["main-info"]}>
          <Box
            title={"کل تیکت‌ها"}
            icon={<FiList />}
            value={stats.total}
            valueLabel={"تیکت"}
          />
          <Box
            title={"در انتظار پاسخ"}
            icon={<FiAlertCircle />}
            value={stats.pending}
            valueLabel={"تیکت"}
          />
          <Box
            title={"پاسخ داده شده"}
            icon={<FiCheckCircle />}
            value={stats.answered}
            valueLabel={"تیکت"}
          />
          <Box
            title={"تیکت‌های بسته"}
            icon={<FiLock />}
            value={stats.closed}
            valueLabel={"تیکت"}
          />
        </div>

        {/* Table Section */}
        <div className={styles["product-table"]}>
          <span className={styles["product-table-header"]}>جدول تیکت ها</span>

          <div className={styles["filter-bar"]}>
            <div className={styles["filter-bar__icon"]}>
              <img src="/icons/icon30.svg" alt="filter" />
              <span>فیلتر بر اساس وضعیت:</span>
            </div>

            <div className={styles["filter-bar__item"]}>
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">همه تیکت‌ها</option>
                <option value="pending">در انتظار پاسخ</option>
                <option value="answered">پاسخ داده شده</option>
                <option value="closed">بسته شده</option>
              </select>
            </div>
          </div>

          <div className={styles["table-products-information"]}>
            <Table
              firstIndex={firstIndex}
              tickets={paginatedTickets}
              onDeleteTicket={handleDeleteTicket}
              onOpenTicketDetails={handleOpenTicketDetails}
            />

            <div className={styles.pagination_wrapper}>
              <Pagination
                totalItems={filteredTickets}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* مودال تیکت - خارج از محتوای اصلی رندر می‌شود */}
      {isTicketDetailsOpen && selectedTicket && (
        <div
          className={styles.modal_overlay}
          onClick={() => setIsTicketDetailsOpen(false)} // کلیک روی فضای خالی مودال را می‌بندد
        >
          <div
            className={styles.modal_content}
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن موقع کلیک داخل مودال
          >
            <TicketDetails
              ticketId={selectedTicket._id}
              setIsPageActive={() => setIsTicketDetailsOpen(false)}
              refreshTickets={refreshTickets} // اگر نیاز به آپدیت وضعیت تیکت بعد از پاسخ دارید
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
