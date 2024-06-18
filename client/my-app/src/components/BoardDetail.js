import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import "../components/css/boarddetail.css";

const BoardDetail = () => {
  const { boardId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.auth.id);
  console.log(userId);

  const navigate = useNavigate();

  //useEffect - boardId가 변경될 때마다 실행됨
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/board/post/${boardId}`);
        setPost(response.data.post); //성공하면 post 상태 Update
      } catch (err) {
        alert("다시 시도해주세요."); //실패하면 Error
      }
    };

    getPost();
  }, [boardId]);

  if (error) {
    return <div className="board-detail error">Error: {error}</div>;
  }

  if (!post) {
    return <div className="board-detail loading">Loading...</div>;
  }

  const handleDelete = async () => {
    const confirm = window.confirm("글을 삭제하시겠습니까?");

    if (confirm === true) {
      await axios.post(`/board/post/${boardId}`, { id: userId });
      alert("삭제가 완료되었습니다.");
      navigate("/board");
    }
  };

  const handleBack = () => {
    navigate("/board");
  };
  // navigate("/board");

  return (
    <div className="board-detail">
      <div className="header">
        <h1>{post.title}</h1>
        {post.author === userId && (
          <button className="delete-button" onClick={handleDelete}>
            ✖️
          </button>
        )}
        <button className="back-button" onClick={handleBack}>
          🔙
        </button>
      </div>
      <p>{post.content}</p>
      <p className="author">Author: {post.author}</p>
      <p className="created-at">
        Posted on: {new Date(post.createdAt).toLocaleString()}
      </p>
      <Comment boardId={boardId}></Comment>
    </div>
  );
};

export default BoardDetail;
