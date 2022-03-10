import { createSlice } from "@reduxjs/toolkit";
import {
  getPostsAPI,
  getPostAPI,
  addPostAPI,
  getCategoriesAPI,
  addCategoryAPI,
  deletePostAPI,
  editPostAPI,
  deleteCategoryAPI,
} from "../api/postAPI";

const initialState = {
  posts: [],
  post: {},
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
      state.posts = [];
      state.posts = {};
    },

    postsFetched: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },

    setPost: (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    },

    editSuccess: (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
      state.message = "User successfully edited!";
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

//-----------Get all posts----------------

export const getPosts = () => (dispatch) => {
  dispatch({ type: requestStarted.type });
  getPostsAPI()
    .then((res) => {
      // dispatch({ type: postsFetched.type, payload: res.data });
      dispatch(postsFetched(res.data));
    })
    .catch((err) => {
      console.log("Error:", err);
      // dispatch error
    });
};

//-----------Get a single post----------------

export const getPost = (id) => (dispatch) => {
  // dispatch({ type: requestStarted.type });
  getPostAPI(id)
    .then((res) => {
      dispatch(editSuccess(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error:", err);
      // dispatch error
    });
};

//-----------Edit a post----------------

export const editPost = (id, newPost) => (dispatch) => {
  editPostAPI(id, newPost)
    .then((res) => {
      dispatch(editSuccess(res.data));
      console.log("User is edited:", res.data);
    })
    .catch((err) => {
      console.log("Error:", err);
      // dispatch error
    });
};
//-----------Create a post----------------
export const addPost = (post) => (dispatch) => {
  dispatch(requestStarted());

  addPostAPI(post)
    .then((res) => {
      dispatch(postsAdded(res.data));
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

//-----------Delete a post----------------
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
//--------Gets all categories ----------------
export const getCategories = () => (dispatch) => {
  // dispatch({ type: requestStarted.type });
  dispatch(requestStarted());
  getCategoriesAPI()
    .then((res) => {
      dispatch(categoriesFetched(res.data));
    })
    .catch((err) => {
      console.log("ERR:", err);
      // dispatch error
    });
};

//--------Create a new categories ----------------
export const addCategory = (category) => (dispatch) => {
  dispatch(requestStarted());

  addCategoryAPI(category)
    .then((res) => {
      dispatch(categoriesAdded(res.data));
      // dispatch(setMessage("Category successfully added!"));
      getCategories()
        .then((fetchRes) => {
          dispatch(categoriesFetched(fetchRes.data));
        })
        .catch((err) => {
          console.log("ERR:", err);
          // dispatch error
        });
    })

    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

//--------Delete a category ----------------
export const deleteCategory = (id) => (dispatch) => {
  dispatch(requestStarted());
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
        .then((fetchRes) => {
          dispatch(categoriesFetched(fetchRes.data));
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
  editSuccess,
  categoriesFetched,
  postsAdded,
  setMessage,
  requestFailedCategory,
  categoriesAdded,
  post,
  setPost,
} = postSlice.actions;

export default postSlice.reducer;
