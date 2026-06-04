"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FiClock,
  FiFolder,
  FiHash,
  FiRefreshCw,
  FiSend,
  FiArrowLeft,
  FiCheckCircle, // برای آیکون بستن تیکت
} from "react-icons/fi";
import styles from "./TicketDetails.module.css";

export default function TicketDetails({ setIsPageActive, ticketId }) {
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyBody, setReplyBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const statusText = useMemo(
    () => ({
      open: "باز",
      closed: "بسته شده",
      answered: "پاسخ داده شده",
      pending: "در انتظار پاسخ ادمین",
    }),
    [],
  );

  const statusClass = useMemo(
    () => ({
      open: styles.open,
      closed: styles.closed,
      answered: styles.answered,
      pending: styles.pending,
    }),
    [],
  );

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("fa-IR");
  };

  const fetchTicketData = async () => {
    if (!ticketId) return;
    try {
      setLoading(true);
      const [ticketRes, messagesRes] = await Promise.all([
        fetch(`/api/ticket/${ticketId}`, { cache: "no-store" }),
        fetch(`/api/ticket/${ticketId}/messages`, { cache: "no-store" }),
      ]);

      const ticketJson = await ticketRes.json();
      const messagesJson = await messagesRes.json();

      if (ticketRes.ok) setTicket(ticketJson.ticket ?? ticketJson);
      if (messagesRes.ok) setMessages(messagesJson.messages || []);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketData();
  }, [ticketId]);

  const handleSubmitReply = async () => {
    const trimmedBody = replyBody.trim();
    if (!trimmedBody || submitting) return;

    try {
      setSubmitting(true);
      const res = await fetch(`/api/ticket/${ticketId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: trimmedBody }),
      });

      if (res.ok) {
        setReplyBody("");
        await fetchTicketData();
      }
    } catch (error) {
      alert("خطا در ارسال پاسخ ادمین");
    } finally {
      setSubmitting(false);
    }
  };

  // تابع جدید برای بستن تیکت توسط ادمین
  const handleCloseTicket = async () => {
    if (!confirm("آیا از بستن این تیکت اطمینان دارید؟")) return;
    try {
      const res = await fetch(`/api/ticket/${ticketId}`, {
        method: "PATCH",
      });
      if (res.ok) await fetchTicketData();
    } catch (error) {
      alert("خطا در بستن تیکت");
    }
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!ticket) return <p>تیکت یافت نشد.</p>;

  return (
    <section className={styles.ticketDetails}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>مدیریت تیکت: {ticket.title}</h2>
          <p className={styles.subtitle}>
            کاربر فرستنده: <strong>{ticket.user?.name || "نامشخص"}</strong>
          </p>
        </div>

        <div className={styles.headerActions}>
          {/* دکمه بستن تیکت که به نسخه ادمین اضافه شد */}
          {ticket.status !== "closed" && (
            <button
              onClick={handleCloseTicket}
              className={styles.backBtn}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                marginLeft: "10px",
              }}
            >
              بستن تیکت
              <FiCheckCircle />
            </button>
          )}
          <button onClick={() => setIsPageActive(1)} className={styles.backBtn}>
            بازگشت
            <FiArrowLeft />
          </button>
        </div>
      </div>

      <div className={styles.infoCard}>
        <div className={styles.infoItem}>
          <FiHash />
          <span>شناسه:</span>
          <strong>{ticket._id.slice(-6)}</strong>
        </div>
        <div className={styles.infoItem}>
          <FiFolder />
          <span>دپارتمان:</span>
          <strong>{ticket.department?.title || "-"}</strong>
        </div>
        <div className={styles.infoItem}>
          <FiClock />
          <span>ثبت:</span>
          <strong>
            {new Date(ticket.createdAt).toLocaleDateString("fa-IR")}
          </strong>
        </div>
        <div className={styles.infoItem}>
          <FiRefreshCw />
          <span>وضعیت:</span>
          <strong
            className={`${styles.status} ${statusClass[ticket.status] || ""}`}
          >
            {statusText[ticket.status] || ticket.status}
          </strong>
        </div>
      </div>

      <div className={styles.conversation}>
        {messages.map((msg) => {
          const isAdminMsg = msg.senderType === "admin";

          return (
            <div
              key={msg._id}
              className={`${styles.messageRow} ${
                isAdminMsg ? styles.userRow : styles.adminRow
              }`}
            >
              <div
                className={`${styles.messageBubble} ${
                  isAdminMsg ? styles.userBubble : styles.adminBubble
                }`}
              >
                <div className={styles.messageHeader}>
                  <strong>
                    {isAdminMsg ? "شما (پشتیبان)" : ticket.user?.name}
                  </strong>
                  <span>{formatDateTime(msg.createdAt)}</span>
                </div>
                <p className={styles.messageText}>{msg.body}</p>
              </div>
            </div>
          );
        })}

        {ticket.status === "closed" ? (
          <div className={styles.closedNotice}>
            این تیکت بسته شده و امکان ارسال پیام جدید وجود ندارد.
          </div>
        ) : (
          <div className={styles.replyInlineBox}>
            <label className={styles.replyLabel}>پاسخ مدیریت به کاربر</label>

            <textarea
              className={styles.textarea}
              placeholder="پاسخ خود را به عنوان پشتیبان بنویسید..."
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              disabled={submitting}
            />

            <div className={styles.replyActions}>
              <button
                className={styles.sendBtn}
                onClick={handleSubmitReply}
                disabled={submitting || !replyBody.trim()}
              >
                <FiSend />
                {submitting ? "در حال ارسال..." : "ارسال پاسخ ادمین"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
