import CommentCard from "@/components/modules/user-panel/CommentCard";
import UserPanelHeader from "@/components/modules/user-panel/UserPanelHeader";
import styles from "./Comment.module.css";

function Comment() {
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
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </div>
    </div>
  );
}

export default Comment;
