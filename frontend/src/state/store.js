import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
import registerSlice from "./reducers/registerSlice";
const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    // tasksToday: tasksToadyReducer,
    // loggedIn:loggedInReducer,
  },
});

export default store;
