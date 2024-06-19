import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../components/css/comment.css";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Comment = ({ boardId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState({});
  const [showReplyForm, setShowReplyForm] = useState({});
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`/comment/${boardId}`);
        setComments(response.data);
      } catch (err) {
        setError("댓글을 불러오는 데 실패했습니다.");
      }
    };

    getComments();
  }, [newComment, newReply, comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("회원만 댓글을 작성할 수 있습니다.");
    } else if (newComment === "") {
      alert("내용을 입력해주세요!");
      return;
    }

    try {
      const response = await axios.post(
        "/comment/write",
        {
          boardId: boardId,
          content: newComment,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setComments([response.data.comment, ...comments]);
        setNewComment("");
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      alert("댓글을 작성하는 데 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleReplySubmit = async (commentId, e) => {
    e.preventDefault();
    if (!userId) {
      alert("회원만 댓글을 작성할 수 있습니다.");
    } else if (!newReply[commentId]) {
      alert("내용을 입력해주세요!");
      return;
    }

    try {
      const response = await axios.post(
        "/comment/write",
        {
          boardId: boardId,
          content: newReply[commentId],
          parentCommentId: commentId,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  replies: [response.data.comment, ...(comment.replies || [])],
                }
              : comment
          )
        );
        setNewReply({ ...newReply, [commentId]: "" });
        setShowReplyForm({ ...showReplyForm, [commentId]: false });
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      alert("대댓글을 작성하는 데 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDelete = async (commentId) => {
    const confirm = window.confirm("댓글을 삭제하시겠습니까?");

    if (confirm === true) {
      try {
        const response = await axios.post(`/comment/${commentId}`, {
          id: userId,
        });

        if (response.data.success) {
          alert("댓글 삭제가 완료되었습니다.");
          setComments(
            comments.map((comment) =>
              comment._id === commentId
                ? { ...comment, isDeleted: true }
                : comment
            )
          );
        } else {
          alert(response.data.msg);
        }
      } catch (err) {
        alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };
  return (
    <div className="comment-container">
      <CommentForm
        newComment={newComment}
        setNewComment={setNewComment}
        handleSubmit={handleSubmit}
      />
      <div className="comment-list">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            userId={userId}
            showReplyForm={showReplyForm}
            setShowReplyForm={setShowReplyForm}
            handleDelete={handleDelete}
            newReply={newReply}
            setNewReply={setNewReply}
            handleReplySubmit={handleReplySubmit}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
