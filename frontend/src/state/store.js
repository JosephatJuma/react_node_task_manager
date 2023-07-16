import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
import registerSlice from "./reducers/registerSlice";
import viewTaskSlice from "./reducers/viewTaskSlice";
import tasksSlice from "./reducers/tasksSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    view: viewTaskSlice,
    tasks: tasksSlice,
  },
});

export default store;
