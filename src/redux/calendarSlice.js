import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});



export const { calendar, setEvents } = calendarSlice.actions;
export default calendarSlice.reducer;
