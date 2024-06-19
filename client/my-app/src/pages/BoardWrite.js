import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../pages/css/boardwrite.css";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const BoardWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cookies] = useCookies(["x_auth"]); // useCookies 훅 사용

  const navigate = useNavigate();

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
      const response = await axios.post(
        "/board/write",
        {
          title,
          content,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      if (response.data.success) {
        alert("글 작성이 완료되었습니다.");
        navigate("/board"); // 글 작성 후 게시판 페이지로 이동
      } else {
        alert("글 작성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("글 작성 중 오류가 발생했습니다:", error);
      alert("글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    navigate("/board"); // 취소 버튼 클릭 시 게시판 페이지로 이동
  };

  return (
    <form onSubmit={handleSubmit} id="board-write-form">
      <h3>글 작성</h3>
      <div>
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
      </div>
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
      <button type="submit" className="submit-button">
        작성
      </button>
      <button type="button" className="cancel-button" onClick={handleCancel}>
        취소
      </button>
    </form>
  );
};

export default BoardWrite;
