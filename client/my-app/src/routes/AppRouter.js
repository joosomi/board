import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Board from "../pages/Board";
import BoardWrite from "../pages/BoardWrite";
import BoardDetail from "../components/BoardDetail";
import MyPage from "../pages/Mypage";
import BoardEdit from "../pages/BoardEdit";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/signup" element={<Join></Join>} />
      <Route path="/board" element={<Board></Board>}></Route>
      <Route path="/board/write" element={<BoardWrite></BoardWrite>}></Route>
      <Route path="/board/post/:boardId" element={<BoardDetail />} />
      <Route path="/board/user" element={<MyPage></MyPage>}></Route>
      <Route path="/board/edit/:id" element={<BoardEdit></BoardEdit>}></Route>
    </Routes>
  );
};

export default AppRouter;
