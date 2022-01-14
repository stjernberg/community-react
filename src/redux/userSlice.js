import { createSlice } from "@reduxjs/toolkit";
import { loginAPI, regAPI } from "../api/userAPI";

const initialState = {
  login: false,
  logout: true,
  token: null,
  userName: null,
  role: null,
  statusMessage: null,
  errorMessage: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.login = true;
      state.token = action.payload;
    },

    setToken: (state, action) => {
      const { token } = action.payload;
      state.login.token = token;
    },

    requestStarted: (state) => {
      state.loading = true;
    },

    loggedOut: (state) => {
      state.login.accessToken = null;
    },
  },
});

export const userLogin = (loginUser) => (dispatch) => {
  dispatch({ type: requestStarted.type });
  loginAPI(loginUser)
    .then((res) => {
      // dispatch({ type: loggedIn.type, payload: res.data });
      dispatch(user.actions.setToken({ token: res.data }));
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

export const { requestStarted, user, loggedIn } = userSlice.actions;

export default userSlice.reducer;
