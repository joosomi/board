import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../pages/css/board.css";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [postsPerPage] = useState(15); // 페이지당 게시물 수
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 0;

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

  // 현재 페이지에 표시할 게시물 계산
  const offset = currentPage * postsPerPage;
  const currentPosts = posts.slice(offset, offset + postsPerPage);

  const handlePageClick = ({ selected }) => {
    setSearchParams({ page: selected });
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
            <th>조회수</th>
            <th>댓글 수</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post._id}>
              <td>
                <Link to={`/board/post/${post._id}`}>{post.title}</Link>
              </td>
              <td>{post.author}</td>
              <td>{formatDate(post.createdAt)}</td>
              <td>{post.viewCount}</td>
              <td>{post.commentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(posts.length / postsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          initialPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Board;
