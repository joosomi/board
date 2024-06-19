import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user_login } from "../store/authSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import "../pages/css/join.css";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPw] = useState("");
  // const [cookies, setCookie] = useCookies(["x_authㄴ"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userId = useSelector((state) => state.auth.id);
  // console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      id,
      password,
    };

    try {
      const response = await axios.post("/users/login", userData, {
        withCredentials: true,
      });

      if (response.data.loginSuccess) {
        alert("로그인 성공");
        // 로그인 성공 시 Redux 스토어에 로그인 상태 저장
        sessionStorage.setItem("userId", id);
        // dispatch(user_login(id));
        navigate("/board"); // 리덕스 저장 후 게시판으로 redirect
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log("error during login: ", err);
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
