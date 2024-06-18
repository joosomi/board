import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../components/css/comment.css";

const Comment = ({ boardId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.auth.id);
  // console.log(userId);

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
  }, [boardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newComment === "") {
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

  /*댓글 삭제*/
  const handleDelete = async (commentId) => {
    const confirm = window.confirm("댓글을 삭제하시겠습니까?");

    console.log(commentId);
    console.log(userId);

    if (confirm === true) {
      await axios.post(`/comment/${commentId}`, {
        id: userId,
      });

      alert("댓글 삭제가 완료되었습니다.");
    }
  };

  return (
    <div className="comment-container">
      <h4>댓글</h4>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div class="btn-form">
          {" "}
          <button type="submit">댓글 작성</button>
        </div>
      </form>
      <div className="comment-list">
        {comments.map((comment) => (
          <div className="comment-item" key={comment._id}>
            <p className="comment-author">작성자: {comment.author}</p>
            <p>{comment.content}</p>
            <p className="comment-date">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
            {comment.author === userId && (
              <button onClick={() => handleDelete(comment._id)}>✖️</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
