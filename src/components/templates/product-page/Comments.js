"use client";

import Comment from "@/components/modules/comment/Comment";
import CommentForm from "./CommentForm";
import styles from "./comments.module.css";

function Comments({ comments = [] }) {
  const hasComments = comments.length > 0;

  return (
    <div className={styles["comment-section-wrapper"]}>
      <section id="target-section" className={styles.comments}>
        <h4>نظرات کاربران</h4>

        <div className={styles["commnets-wrapper"]}>
          {hasComments ? (
            comments
              .filter((comment) => comment.isAccept)
              .map((comment) => <Comment key={comment._id} {...comment} />)
          ) : (
            <p className={styles.empty}>هنوز نظری ثبت نشده است</p>
          )}
        </div>
      </section>

      <div className={styles.commnet_form}>
        <CommentForm />
      </div>
    </div>
  );
}

export default Comments;
