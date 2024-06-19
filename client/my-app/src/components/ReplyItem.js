import React, { useState } from "react";
import ReplyForm from "./ReplyForm";
import axios from "axios";

const ReplyItem = ({
  reply,
  userId,
  handleDelete,
  showReplyForm,
  setShowReplyForm,
  newReply,
  setNewReply,
  handleReplySubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);

  const handleEditSubmit = async () => {
    if (!editedContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.put(
        `/comment/${reply._id}`,
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
        // 여기서 reply 내용을 업데이트하는 로직이 필요합니다.
      } else {
        // 오류 처리
        console.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
          {isEditing ? (
            <div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button onClick={handleEditSubmit}>저장</button>
              <button onClick={() => setIsEditing(false)}>취소</button>
            </div>
          ) : (
            <>
              <p>{reply.content}</p>
              <p className="reply-author">by. {reply.author}</p>
              <div className="reply-meta">
                <p className="reply-date">
                  {new Date(reply.createdAt).toLocaleString()}
                </p>
                {reply.author === userId && (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => setIsEditing(true)}
                    >
                      ✍️
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(reply._id, true)}
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
                      [reply._id]: !showReplyForm[reply._id],
                    })
                  }
                >
                  {showReplyForm[reply._id] ? "↩️" : "↪️"}
                </button>
              </div>
            </>
          )}
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
};

export default ReplyItem;
