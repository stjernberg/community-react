import { createSlice } from "@reduxjs/toolkit";

import { loginAPI, regAPI, getUserAPI } from "../api/userAPI";

const initialState = {
  isAuth: false,
  logout: true,
  userName: null,
  role: null,
  statusMessage: null,
  error: null,
  loading: false,
  token: null,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    requestStarted: (state) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.isAuth = true;
      state.loading = false;
      state.error = "";
    },

    registerSuccessSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
    },
    loginFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    logout: (state) => {
      state.isAuth = null;
      sessionStorage.removeItem("token");
    },

    userFetched: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const userLogin = (loginUser) => (dispatch) => {
  dispatch({ type: requestStarted.type });
  loginAPI(loginUser)
    .then((res) => {
      dispatch(loginSuccess());

      sessionStorage.setItem("token", res.data);

      console.log("user logged in");
      console.log(res.data);
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

export const userReg = (newUser) => (dispatch) => {
  dispatch({ type: requestStarted.type });
  regAPI(newUser)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

export const getCurrentUser = () => (dispatch) => {
  dispatch({ type: requestStarted.type });
  getUserAPI()
    .then((res) => {
      dispatch({ type: userFetched.type, payload: res.data });
      console.log(res.data);
    })
    .catch((err) => {
      console.log("ERR:", err);
      // dispatch error
    });
};

export const {
  requestStarted,
  logout,
  user,
  loginSuccess,
  loginFailed,
  setAuth,
  userFetched,
} = userSlice.actions;

export default userSlice.reducer;
