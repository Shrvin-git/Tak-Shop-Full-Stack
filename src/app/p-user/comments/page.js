"use client";

import CommentCard from "@/components/modules/user-panel/CommentCard";
import UserPanelHeader from "@/components/modules/user-panel/UserPanelHeader";
import styles from "@/styles/p-user/Comment.module.css";
import { useEffect, useState } from "react";

function page() {
  const [user, setUser] = useState([]);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    const userAuth = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      setUser(data.user);
    };

    userAuth();
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const loadUserComments = async () => {
      const res = await fetch(`/api/comment/${user._id}`);
      const data = await res.json();
      setUserComments(data.comments || []);
    };

    loadUserComments();
  }, [user?._id]);

  return (
    <div
      id={styles["comments"]}
      className={
        styles["user-comments"] +
        " " +
        styles["user-panel"] +
        " " +
        styles["user-panel--active"]
      }
      style={{ display: "block" }}
    >
      <UserPanelHeader
        title={"کامنت های شما"}
        desc={"در این بخش میتونید کامنت های خودتون رو مشاهده کنید"}
      />

      <div className={styles["user-comments-wrapper"]}>
        {userComments.length <= 0 ? (
          <div class="WishlistProduct-module__NZpkyG__popular-products-wrapper">
            <div class="WishlistProduct-module__NZpkyG__empty">
              <span>هنوز هیچ کامنتی ثبت نکرده اید</span>
            </div>
          </div>
        ) : (
          <CommentCard comments={userComments} user={user} />
        )}
      </div>
    </div>
  );
}

export default page;
