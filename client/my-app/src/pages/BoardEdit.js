import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../pages/css/boardwrite.css";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const BoardEdit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/board/post/${id}`);
        // console.log(response);
        setTitle(response.data.post.title);
        setContent(response.data.post.content);
      } catch (error) {
        console.error("Error fetching the post data", error);
        setErrorMessage("게시글을 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchData();
  }, []);

  //글 수정하기
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력값 검증
    if (!title.trim()) {
      alert("글 제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("글 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.put(
        `/board/edit/${id}`,
        { title, content },
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate(`/board/post/${id}`);
      } else {
        setErrorMessage(response.data.msg);
      }
    } catch (error) {
      console.error("Error updating the post", error);
      setErrorMessage("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} id="board-write-form">
      <div className="write-container">
        <label htmlFor="title">
          <h3>Title:</h3>
        </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          placeholder="글 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <div>
          <label htmlFor="content">
            <h3>Contents:</h3>
          </label>
          <br />
          <textarea
            id="content"
            name="content"
            placeholder="글 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
      <div className="button-container">
        <button type="submit" className="submit-button">
          작성
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          취소
        </button>
      </div>
    </form>
  );
};

export default BoardEdit;
