import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registered: false,
  user: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    register: (state, action) => {
      state.registered = true;
      state.user = action.payload;
    },
  },
});

export const { register } = registerSlice.actions;
export default registerSlice.reducer;
