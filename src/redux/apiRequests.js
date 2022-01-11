import { post } from "./postSlice";
import {
  getPostsAPI,
  getCategoriesAPI,
  addCategoryAPI,
  deletePostAPI,
  deleteCategoryAPI,
} from "../api/postAPI";

//-----------Api-requests for posts----------------

export const getPosts = () => (dispatch) => {
  dispatch({ type: post.requestStarted.type });
  getPostsAPI()
    .then((res) => {
      dispatch({ type: post.postsFetched.type, payload: res.data });
    })
    .catch((err) => {
      // dispatch error
    });
};

export const deletePost = (id) => (dispatch) => {
  dispatch({ type: post.requestStarted.type });

  deletePostAPI(id)
    .then((deleteRes) => {
      getPostsAPI()
        .then((fetchRes) => {
          dispatch({ type: post.postsFetched.type, payload: fetchRes.data });
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
  dispatch({ type: post.requestStarted.type });
  getCategoriesAPI()
    .then((res) => {
      dispatch({ type: post.categoriesFetched.type, payload: res.data });
      dispatch(post.setMessage("Category successfully added!"));
    })
    .catch((err) => {
      console.log("ERR:", err);
      // dispatch error
    });
};

export const addCategory = (category) => (dispatch) => {
  dispatch(post.requestStarted());

  addCategoryAPI(category)
    .then((res) => {
      dispatch(post.categoriesAdded(res.data));
      dispatch(post.setMessage("Category successfully added!"));
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

export const deleteCategory = (id) => (dispatch) => {
  dispatch({ type: post.requestStarted.type });
  deleteCategoryAPI(id)
    .then((deleteRes) => {
      switch (deleteRes.status) {
        case 200:
          dispatch(post.setMessage("Category successfully deleted!"));
          break;
        case 400:
          dispatch(
            post.setMessage("Bad request, category couldn't be deleted!")
          );
          break;
        case 409:
          dispatch(
            post.setMessage(
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
            type: post.categoriesFetched.type,
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
