import { createSlice } from "@reduxjs/toolkit";
import { fetchPostsAPI } from "../api/postAPI";

const initialState = {
  posts: [],
  message: null,
  error: null,
  loading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    requestStarted: (state) => {
      state.loading = true;
    },
    requestFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.persons = [];
      state.person = {};
    },
    postsFetched: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPosts: (state, action) => {
      state.persons.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const fetchPosts = () => (dispatch) => {
  dispatch({ type: requestStarted.type });
  fetchPostsAPI()
    .then((res) => {
      dispatch({ type: postsFetched.type, payload: res.data });
    })
    .catch((err) => {
      // dispatch error
    });
};

export const {
  requestStarted,
  requestFailed,
  postsFetched,
  addPosts,
  setMessage,
} = postSlice.actions;

export default postSlice.reducer;
