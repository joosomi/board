import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPw] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      id,
      password,
    };

    try {
      const response = await axios.post("/users/login", userData);

      if (response.data.loginSuccess) {
        sessionStorage.setItem("x_auth", response.data.token);
        alert("로그인 성공");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log("error during login: ", err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            ></input>
          </div>
          <div>
            <label>PW</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPw(e.target.value)}
            ></input>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
