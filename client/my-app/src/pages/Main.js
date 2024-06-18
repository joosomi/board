import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "../pages/css/main.css"; // 새로운 CSS 파일을 import합니다.

const Main = () => {
  return (
    <div className="main-container">
      <h1>Main</h1>
      <div className="button-group">
        <Link to="/signup">
          <button className="main-button">Signup</button>
        </Link>
        <Link to="/login">
          <button className="main-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
