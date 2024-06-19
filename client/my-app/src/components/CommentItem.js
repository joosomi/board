import React from "react";
import ReplyItem from "./ReplyItem";
import ReplyForm from "./ReplyForm";

const CommentItem = ({
  comment,
  userId,
  showReplyForm,
  setShowReplyForm,
  handleDelete,
  newReply,
  setNewReply,
  handleReplySubmit,
}) => {
  return (
    <div className="comment-item" key={comment._id}>
      {comment.isDeleted ? (
        <>
          <p className="deleted-comment">삭제된 댓글입니다.</p>
          <div className="reply-list">
            {comment.replies &&
              comment.replies.map((reply) => (
                <ReplyItem
                  key={reply._id}
                  reply={reply}
                  userId={userId}
                  handleDelete={handleDelete}
                  showReplyForm={showReplyForm}
                  setShowReplyForm={setShowReplyForm}
                  newReply={newReply}
                  setNewReply={setNewReply}
                  handleReplySubmit={handleReplySubmit}
                />
              ))}
          </div>
        </>
      ) : (
        <>
          <p>{comment.content}</p>
          <p className="comment-author">by. {comment.author}</p>
          <div className="comment-meta">
            <p className="comment-date">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
            {comment.author === userId && (
              <button
                className="delete-btn"
                onClick={() => handleDelete(comment._id)}
              >
                ❌
              </button>
            )}
            <button
              className="reply-btn"
              onClick={() =>
                setShowReplyForm({
                  ...showReplyForm,
                  [comment._id]: !showReplyForm[comment._id],
                })
              }
            >
              {showReplyForm[comment._id] ? "↩️" : "↪️"}
            </button>
          </div>
          {showReplyForm[comment._id] && (
            <ReplyForm
              commentId={comment._id}
              newReply={newReply}
              setNewReply={setNewReply}
              handleReplySubmit={handleReplySubmit}
            />
          )}
          <div className="reply-list">
            {comment.replies &&
              comment.replies.map((reply) => (
                <ReplyItem
                  key={reply._id}
                  reply={reply}
                  userId={userId}
                  handleDelete={handleDelete}
                  showReplyForm={showReplyForm}
                  setShowReplyForm={setShowReplyForm}
                  newReply={newReply}
                  setNewReply={setNewReply}
                  handleReplySubmit={handleReplySubmit}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentItem;
