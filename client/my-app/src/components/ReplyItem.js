import React from "react";
import ReplyForm from "./ReplyForm";

const ReplyItem = ({
  reply,
  userId,
  handleDelete,
  showReplyForm,
  setShowReplyForm,
  newReply,
  setNewReply,
  handleReplySubmit,
}) => (
  <div className="reply-item" key={reply._id}>
    {reply.isDeleted ? (
      <>
        <p className="deleted-reply">삭제된 답글입니다.</p>
        <div className="reply-list">
          {reply.replies &&
            reply.replies.map((nestedReply) => (
              <ReplyItem
                key={nestedReply._id}
                reply={nestedReply}
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
        <p>{reply.content}</p>
        <p className="reply-author">by. {reply.author}</p>
        <p className="reply-date">
          {new Date(reply.createdAt).toLocaleString()}
        </p>
        {reply.author === userId && (
          <button
            className="delete-btn"
            onClick={() => handleDelete(reply._id, true)}
          >
            ❌
          </button>
        )}
        <button
          className="reply-btn"
          onClick={() =>
            setShowReplyForm({
              ...showReplyForm,
              [reply._id]: !showReplyForm[reply._id],
            })
          }
        >
          {showReplyForm[reply._id] ? "↩️" : "↪️"}
        </button>
        {showReplyForm[reply._id] && (
          <ReplyForm
            commentId={reply._id}
            newReply={newReply}
            setNewReply={setNewReply}
            handleReplySubmit={handleReplySubmit}
          />
        )}
        <div className="reply-list">
          {reply.replies &&
            reply.replies.map((nestedReply) => (
              <ReplyItem
                key={nestedReply._id}
                reply={nestedReply}
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

export default ReplyItem;
