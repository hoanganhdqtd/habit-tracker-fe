import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import habitReducer from "../features/habit/habitSlice";
import progressReducer from "../features/progress/progressSlice";
import tagReducer from "../features/tag/tagSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    habit: habitReducer,
    progress: progressReducer,
    tag: tagReducer,
  },
});
