import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../pages/css/board.css";

const Board = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("/board/posts");
        setPosts(response.data.posts);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString).toLocaleDateString("ko-KR", options);
    const time = new Date(dateString).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${date} ${time}`;
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>Board</h1>
        <Link to="/board/write">
          <button>Write</button>
        </Link>
      </div>
      <table className="board-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>
                <Link to={`/board/post/${post._id}`}>{post.title}</Link>
              </td>
              <td>{post.author}</td>
              <td>{formatDate(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
