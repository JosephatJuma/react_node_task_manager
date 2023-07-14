import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
import registerSlice from "./reducers/registerSlice";
import viewTaskSlice from "./reducers/viewTaskSlice";
const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    view: viewTaskSlice,
  },
});

export default store;
