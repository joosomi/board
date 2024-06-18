import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { useCookies } from "react-cookie";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";
import Nav from "./components/Nav";

const App = () => {
  // const [cookies, setCookie, removeCookie] = useCookies(["x_auth"]);

  // const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  return (
    <div className="App">
      <Nav></Nav>
      <AppRouter></AppRouter>
    </div>
  );
};

export default App;
