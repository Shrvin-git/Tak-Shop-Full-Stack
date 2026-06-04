"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FiClock,
  FiFolder,
  FiHash,
  FiRefreshCw,
  FiSend,
  FiArrowLeft,
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
      pending: "در انتظار پاسخ",
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

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("fa-IR");
  };

  const getTicketData = (data) => {
    // برای سازگاری با هر دو ساختار احتمالی API
    return data?.ticket ?? data ?? null;
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

      if (ticketRes.ok) {
        setTicket(getTicketData(ticketJson));
      } else {
        setTicket(null);
      }

      if (messagesRes.ok) {
        setMessages(messagesJson.messages || []);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      setTicket(null);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  const handleSubmitReply = async () => {
    const trimmedBody = replyBody.trim();
    if (!trimmedBody || !ticketId || submitting) return;

    try {
      setSubmitting(true);

      // فعلاً آماده‌ی اتصال به API ارسال پاسخ
      const res = await fetch(`/api/ticket/${ticketId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: trimmedBody,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "خطا در ارسال پاسخ");
      }

      setReplyBody("");
      await fetchTicketData();
    } catch (error) {
      console.error("Error submitting reply:", error);
      alert(error.message || "ارسال پاسخ با خطا مواجه شد.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>در حال بارگذاری اطلاعات تیکت...</p>;
  }

  if (!ticket) {
    return <p>تیکتی یافت نشد.</p>;
  }

  return (
    <section className={styles.ticketDetails}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{ticket.title}</h2>
          <p className={styles.subtitle}>
            در این بخش می‌توانید روند پاسخ‌گویی و پیام‌های این تیکت را مشاهده
            کنید.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button onClick={() => setIsPageActive(1)} className={styles.backBtn}>
            بازگشت
            <FiArrowLeft />
          </button>
        </div>
      </div>

      <div className={styles.infoCard}>
        <div className={styles.infoItem}>
          <FiHash />
          <span>کد تیکت:</span>
          <strong>{ticket._id}</strong>
        </div>

        <div className={styles.infoItem}>
          <FiFolder />
          <span>دپارتمان:</span>
          <strong>{ticket.department?.title || "-"}</strong>
        </div>

        <div className={styles.infoItem}>
          <FiClock />
          <span>تاریخ ثبت:</span>
          <strong>{formatDate(ticket.createdAt)}</strong>
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
        {/* بخش تاریخچه پیام‌ها - همیشه رندر می‌شود */}
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isUser = msg.senderType === "user";
            return (
              <div
                key={msg._id}
                className={`${styles.messageRow} ${isUser ? styles.userRow : styles.adminRow}`}
              >
                <div
                  className={`${styles.messageBubble} ${isUser ? styles.userBubble : styles.adminBubble}`}
                >
                  <div className={styles.messageHeader}>
                    <strong>{isUser ? "شما" : "پشتیبانی"}</strong>
                    <span>{formatDateTime(msg.createdAt)}</span>
                  </div>
                  <p className={styles.messageText}>{msg.body}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>هنوز پیامی برای این تیکت ثبت نشده است.</p>
        )}

        {/* فقط بخش ارسال پیام شرطی است */}
        {ticket.status === "closed" ? (
          <div className={styles.closedNotice}>
            این تیکت بسته شده است و امکان ارسال پیام جدید وجود ندارد.
          </div>
        ) : (
          <div className={styles.replyInlineBox}>
            <label className={styles.replyLabel}>ارسال پاسخ جدید</label>
            <textarea
              className={styles.textarea}
              placeholder="پاسخ خود را اینجا بنویسید..."
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
                {submitting ? "در حال ارسال..." : "ارسال پاسخ"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
