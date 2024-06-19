import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../pages/css/board.css";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [postsPerPage] = useState(15); // 페이지당 게시물 수
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 0;

  const userId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("/board/user", {
          withCredentials: true,
        });
        setPosts(response.data.data);
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

  const handleDelete = async (e, postId) => {
    e.preventDefault();

    console.log(postId);
    console.log(userId);
    const confirm = window.confirm("글을 삭제하시겠습니까?");

    if (confirm === true) {
      try {
        await axios.post(`/board/post/${postId}`, { id: userId });
        alert("삭제가 완료되었습니다.");
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (err) {
        console.log(err);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleEdit = async (e, postId) => {
    e.preventDefault();

    navigate(`/board/edit/${postId}`);
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h3>{userId}님, 안녕하세요!</h3>
      </div>
      <h4>내가 쓴 글</h4>
      <table className="board-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>댓글</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post._id}>
              <td>
                <Link to={`/board/post/${post._id}`}>{post.title}</Link>
              </td>

              <td>{formatDate(post.createdAt)}</td>
              <td>{post.viewCount}</td>
              <td>{post.commentCount}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={(e) => handleEdit(e, post._id)}
                >
                  ✍️
                </button>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={(e) => handleDelete(e, post._id)}
                >
                  ❌
                </button>
              </td>
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
