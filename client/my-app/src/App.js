import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/signup">SignUp</Link>| <Link to="/board">Board</Link> |
        <Link to="/board/write">Write</Link>
      </nav>
      <AppRouter></AppRouter>
    </div>
  );
};

export default App;
