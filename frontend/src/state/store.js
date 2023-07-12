import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
const store = configureStore({
  reducer: {
    login: loginSlice,
    // tasks: tasksReducers,
    // tasksToday: tasksToadyReducer,
    // loggedIn:loggedInReducer,
  },
});

export default store;
