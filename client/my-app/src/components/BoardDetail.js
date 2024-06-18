import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import "../components/css/boarddetail.css";

const BoardDetail = () => {
  const { boardId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  //useEffect - boardId가 변경될 때마다 실행됨
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/board/post/${boardId}`);
        setPost(response.data.post); //성공하면 post 상태 Update
      } catch (err) {
        setError(err.message); //실패하면 Error
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

  return (
    <div className="board-detail">
      <h1>{post.title}</h1>
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
