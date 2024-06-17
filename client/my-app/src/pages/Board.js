import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

const Board = () => {
  return (
    <div>
      <h1>Board</h1>
      <Link to="/board/write">
        <button>write</button>
      </Link>
    </div>
  );
};

export default Board;
