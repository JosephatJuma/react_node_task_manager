import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: null,
};

const viewTaskSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    view: (state, action) => {
      state.task = action.payload;
    },
  },
});

export const { view } = viewTaskSlice.actions;
export default viewTaskSlice.reducer;
