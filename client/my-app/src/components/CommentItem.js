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

// // CommentItem.js
// import React from "react";

// const CommentItem = ({
//   comment,
//   userId,
//   showReplyForm,
//   setShowReplyForm,
//   handleDelete,
//   newReply,
//   setNewReply,
//   handleReplySubmit,
// }) => {
//   const { _id, content, isDeleted, replies } = comment;

//   return (
//     <div className="comment-item">
//       {isDeleted ? (
//         <p className="deleted-comment">삭제된 댓글입니다.</p>
//       ) : (
//         <>
//           <div className="comment-content">
//             <p>{content}</p>
//             {comment.author === userId && (
//               <button className="delete-btn" onClick={() => handleDelete(_id)}>
//                 ❌ 삭제
//               </button>
//             )}
//           </div>
//           <div className="comment-actions">
//             <button
//               className="reply-toggle-btn"
//               onClick={() =>
//                 setShowReplyForm({
//                   ...showReplyForm,
//                   [_id]: !showReplyForm[_id],
//                 })
//               }
//             >
//               {showReplyForm[_id] ? "취소" : "답글 달기"}
//             </button>
//           </div>
//           {showReplyForm[_id] && (
//             <form
//               className="reply-form"
//               onSubmit={(e) => handleReplySubmit(_id, e)}
//             >
//               <input
//                 type="text"
//                 value={newReply[_id] || ""}
//                 onChange={(e) =>
//                   setNewReply({ ...newReply, [_id]: e.target.value })
//                 }
//                 placeholder="답글을 입력하세요"
//               />
//               <button type="submit" className="submit-reply-btn">
//                 ✅ 제출
//               </button>
//             </form>
//           )}
//           {replies && replies.length > 0 && (
//             <div className="replies">
//               {replies.map((reply) => (
//                 <CommentItem
//                   key={reply._id}
//                   comment={reply}
//                   userId={userId}
//                   showReplyForm={showReplyForm}
//                   setShowReplyForm={setShowReplyForm}
//                   handleDelete={handleDelete}
//                   newReply={newReply}
//                   setNewReply={setNewReply}
//                   handleReplySubmit={handleReplySubmit}
//                 />
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default CommentItem;
