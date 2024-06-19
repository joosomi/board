import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { user_logout } from "../store/authSlice";
import "../components/css/nav.css"; // CSS 파일 import

const Nav = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(user_logout());
  };

  return (
    <nav>
      <Link to="/">Home</Link> {" | "}
      {!isAuthenticated ? (
        <>
          <Link to="/login">Login</Link> {" | "}
          <Link to="/signup">SignUp</Link> {" | "}
          <Link to="/board">Board</Link>
        </>
      ) : (
        <>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>{" "}
          {" | "}
          <Link to="/board">Board</Link> {" | "}
          <Link to="/board/write">Write</Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
