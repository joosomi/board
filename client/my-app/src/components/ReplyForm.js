import React from "react";

const ReplyForm = ({ commentId, newReply, setNewReply, handleReplySubmit }) => (
  <form
    className="reply-form"
    onSubmit={(e) => handleReplySubmit(commentId, e)}
  >
    <div className="reply-form-container">
      <textarea
        className="reply-txt"
        placeholder="대댓글을 입력하세요"
        value={newReply[commentId] || ""}
        onChange={(e) =>
          setNewReply({ ...newReply, [commentId]: e.target.value })
        }
      />
      <button className="reply-sbt-btn" type="submit">
        ✅
      </button>
    </div>
  </form>
);

export default ReplyForm;
