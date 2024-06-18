import { ConfigreStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

//createSlice -> redux state, reducer를 한번에 정의할 수 있음
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!cookies.get("x_auth"), //값을 boolean으로 가져옴
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      cookies.remove("x_auth");
    },
  },
});

/*
intialState: 초기 상태 정의 
reducers: 상태를 변경하는 함수 - login, logout 2개의 Reducer
*/
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
