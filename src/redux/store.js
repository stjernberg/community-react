import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./postSlice";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    admin: adminReducer,
  },
});
