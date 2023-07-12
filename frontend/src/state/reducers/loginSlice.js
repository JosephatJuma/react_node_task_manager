import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
