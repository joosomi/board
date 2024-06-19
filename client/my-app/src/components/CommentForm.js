import React from "react";

const CommentForm = ({ newComment, setNewComment, handleSubmit }) => (
  <form className="comment-form" onSubmit={handleSubmit}>
    <textarea
      placeholder="댓글을 입력하세요"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <div className="btn-form">
      <button type="submit">댓글 작성</button>
    </div>
  </form>
);

export default CommentForm;
