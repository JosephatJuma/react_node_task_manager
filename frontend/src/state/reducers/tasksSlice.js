import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userTasks: [
    {
      title: "Write a blog post",
      description: "This is a blog post about the importance of data science.",
      due_date: "2023-07-15",
      status: "In progress",
    },
    {
      title: "Meet with client",
      description:
        "This is a meeting with the client to discuss their data science needs.",
      due_date: "2023-07-18",
      status: "Pending",
    },
    {
      title: "Give a presentation",
      description:
        "This is a presentation about data science for a local business.",
      due_date: "2023-07-20",
      status: "Completed",
    },
  ],
};

const userTasksSlice = createSlice({
  name: "userTasks",
  initialState,
  reducers: {
    userTasks: (state, actions) => {
      state.userTasks = actions.payload;
    },
  },
});

export const { userTasks } = userTasksSlice.actions;
export default userTasksSlice.reducer;
