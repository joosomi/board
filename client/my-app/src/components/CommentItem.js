import React, { useState } from "react";
import ReplyItem from "./ReplyItem";
import ReplyForm from "./ReplyForm";
import axios from "axios";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEditSubmit = async () => {
    if (!editedContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    console.log(comment);
    try {
      const response = await axios.put(
        `/comment/${comment._id}`,
        {
          content: editedContent,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // 성공적으로 수정된 경우 상태를 업데이트합니다.
        setIsEditing(false);
        // 여기서 comment 내용을 업데이트하는 로직이 필요합니다.
      } else {
        // 오류 처리
        console.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          {isEditing ? (
            <div>
              <textarea
                className="edit-txt"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button className="edit-btn" onClick={handleEditSubmit}>
                ✍️
              </button>
              <button class="back-btn" onClick={() => setIsEditing(false)}>
                ⏪
              </button>
            </div>
          ) : (
            <>
              <p>{comment.content}</p>
              <p className="comment-author">by. {comment.author}</p>
              <div className="comment-meta">
                <p className="comment-date">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                {comment.author === userId && (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => setIsEditing(true)}
                    >
                      ✍️
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(comment._id)}
                    >
                      ❌
                    </button>
                  </>
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
            </>
          )}
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
