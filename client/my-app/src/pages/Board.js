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

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>Board</h1>
        <Link to="/board/write">
          <button>Write</button>
        </Link>
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <div className="post-item" key={post._id}>
            <h2>
              <Link to={`/board/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p>작성자: {post.author}</p>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
