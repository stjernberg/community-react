import { createSlice } from "@reduxjs/toolkit";

import { loginAPI, regAPI, getUserAPI } from "../api/userAPI";

const initialState = {
  loggedIn: false,
  // userName: null,
  role: null,
  statusMessage: null,
  rolesOfUser: "",
  error: null,
  loading: false,
  token: null,
  currentUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    requestStarted: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = "";
      state.loggedIn = true;
    },

    registerSuccess: (state) => {
      state.loading = false;
      state.error = "";
    },
    loginFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.loggedIn = false;
      state.currentUser = null;
      state.rolesOfUser = null;
    },

    userFetched: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    setRolesOfUsers: (state, action) => {
      state.rolesOfUser = action.payload;
    },
  },
});

export const userLogin = (loginUser) => (dispatch) => {
  dispatch(requestStarted());
  loginAPI(loginUser)
    .then((res) => {
      dispatch(loginSuccess(res.data));
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
  dispatch(requestStarted());
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
  dispatch(requestStarted());
  getUserAPI()
    .then((res) => {
      // dispatch({ type: userFetched.type, payload: res.data });
      dispatch(userFetched(res.data));
      console.log(res.data);
      // dispatch(setRolesOfUsers(res.data.role));
    })
    .catch((err) => {
      console.log("ERR:", err);
      // dispatch error
    });
};

// export const checkUsersRole = () => (dispatch) => {
//   dispatch({ type: requestStarted.type });
//   getRolesOfUsersAPI()
//     .then((res) => {
//       dispatch(setRolesOfUsers(res.data));
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log("Error:", err);
//       // dispatch error
//     });
// };

export const {
  requestStarted,
  logout,
  currentUser,
  loginSuccess,
  loginFailed,
  setToken,
  userFetched,
  setRolesOfUsers,
} = userSlice.actions;

export default userSlice.reducer;
