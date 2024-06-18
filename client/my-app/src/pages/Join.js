import React, { useState } from "react";
import axios from "axios";
import "../pages/css/join.css";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const Join = () => {
  const [id, setId] = useState("");
  const [password, setPw] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력값 검증
    if (!id.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const userData = {
      id,
      password,
    };

    try {
      const response = await axios.post("/users/join", userData);

      if (response.data.success) {
        alert("회원가입 성공");
        window.location.href = "/login";
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log("error during signup: ", err);
    }
  };

  return (
    <div className="auth-container">
      <h1>SignUp</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>PW</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
