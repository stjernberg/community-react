import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import authReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
  },
});
