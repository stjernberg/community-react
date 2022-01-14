import { createSlice } from "@reduxjs/toolkit";
import {
  getPostsAPI,
  addPostAPI,
  getCategoriesAPI,
  addCategoryAPI,
  deletePostAPI,
  deleteCategoryAPI,
} from "../api/postAPI";

const initialState = {
  posts: [],
  categories: [],
  message: "",
  error: null,
  loading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    requestStarted: (state) => {
      state.loading = true;
    },
    requestFailedPost: (state, action) => {
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

    postsAdded: (state, action) => {
      state.posts.push(action.payload);
      state.loading = false;
      state.error = null;
      state.message = "Post successfully added!";
    },
    categoriesFetched: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    requestFailedCategory: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.categories = [];
      state.category = {};
    },

    categoriesAdded: (state, action) => {
      state.categories.push(action.payload);
      state.loading = false;
      state.error = null;
      state.message = "Category successfully added!";
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

//-----------Api-requests for posts----------------

export const getPosts = () => (dispatch) => {
  dispatch({ type: requestStarted.type });
  getPostsAPI()
    .then((res) => {
      dispatch({ type: postsFetched.type, payload: res.data });
    })
    .catch((err) => {
      // dispatch error
    });
};

export const addPost = (post) => (dispatch) => {
  dispatch(requestStarted());

  addPostAPI(post)
    .then((res) => {
      dispatch(postsAdded(res.data));
      // dispatch(setMessage("Post successfully added!"));
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

export const deletePost = (id) => (dispatch) => {
  dispatch({ type: requestStarted.type });

  deletePostAPI(id)
    .then((deleteRes) => {
      getPostsAPI()
        .then((fetchRes) => {
          dispatch({ type: postsFetched.type, payload: fetchRes.data });
        })
        .catch((err) => {
          console.log("ERR:", err);
          // dispatch error
        });
    })
    .catch((err) => {
      console.log("ERR:", err);
      // dispatch error
    });
};
//-----------Api-requests for categories----------------
export const getCategories = () => (dispatch) => {
  dispatch({ type: requestStarted.type });
  getCategoriesAPI()
    .then((res) => {
      dispatch({ type: categoriesFetched.type, payload: res.data });
    })
    .catch((err) => {
      console.log("ERR:", err);
      // dispatch error
    });
};

export const addCategory = (category) => (dispatch) => {
  dispatch(requestStarted());

  addCategoryAPI(category)
    .then((res) => {
      dispatch(categoriesAdded(res.data));
      // dispatch(setMessage("Category successfully added!"));
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

export const deleteCategory = (id) => (dispatch) => {
  dispatch({ type: requestStarted.type });
  deleteCategoryAPI(id)
    .then((deleteRes) => {
      switch (deleteRes.status) {
        case 200:
          dispatch(setMessage("Category successfully deleted!"));
          break;
        case 400:
          dispatch(setMessage("Bad request, category couldn't be deleted!"));
          break;
        case 409:
          dispatch(
            setMessage(
              "Category couldn't be deleted, due to it's being linked to a post!"
            )
          );
          break;
        default:
          break;
      }
      getCategoriesAPI()
        .then((fetchResponse) => {
          dispatch({
            type: categoriesFetched.type,
            payload: fetchResponse.data,
          });
        })
        .catch((err) => {
          console.log("ERR:", err);
        });
    })
    .catch((err) => {
      console.log("ERR:", err);
    });
};

export const {
  requestStarted,
  requestFailedPost,
  postsFetched,
  categoriesFetched,
  postsAdded,
  setMessage,
  requestFailedCategory,
  categoriesAdded,
  post,
} = postSlice.actions;

export default postSlice.reducer;
