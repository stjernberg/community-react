import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./postSlice";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import calendarReducer from "./calendarSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    admin: adminReducer,
    calendar: calendarReducer,
  },
});
