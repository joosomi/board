import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../pages/css/main.css"; // 새로운 CSS 파일을 import합니다.

const Main = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="main-container">
      <h1>Main</h1>
      <div className="button-group">
        {!isAuthenticated ? (
          <>
            <Link to="/signup">
              <button className="main-button">Signup</button>
            </Link>
            <Link to="/login">
              <button className="main-button">Login</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/board">
              <button className="main-button">Board</button>
            </Link>
            <Link to="/board/write">
              <button className="main-button">Write</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
