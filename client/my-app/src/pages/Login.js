import React, { useState } from "react";
import axios from "axios";
import "../pages/css/join.css";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPw] = useState("");
  // const [cookies, setCookie] = useCookies(["x_authㄴ"]);

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
        window.location.href = "/board";
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log("error during login: ", err);
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
