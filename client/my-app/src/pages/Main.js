import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h1>Main</h1>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
      <br />
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Main;
