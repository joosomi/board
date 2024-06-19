import { ConfigreStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const userIdFromSessionStorage = sessionStorage.getItem("user_id");

//createSlice -> redux state, reducer를 한번에 정의할 수 있음
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!cookies.get("x_auth"), //값을 boolean으로 가져옴
    // id: null,
    id: userIdFromSessionStorage || null,
  },
  reducers: {
    user_login: (state, action) => {
      state.isAuthenticated = true;
      // state.id = action.payload; // 데이터를 상태에 저장
    },
    user_logout: (state) => {
      state.isAuthenticated = false;
      state.id = null; // 로그아웃 시 데이터 초기화
      cookies.remove("x_auth");
    },
  },
});

/*
intialState: 초기 상태 정의 
reducers: 상태를 변경하는 함수 - login, logout 2개의 Reducer
*/
export const { user_login, user_logout } = authSlice.actions;

export default authSlice.reducer;
