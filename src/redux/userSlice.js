import { createSlice } from "@reduxjs/toolkit";

import {
  loginAPI,
  logoutAPI,
  regAPI,
  getUserAPI,
  checkRoleAPI,
  getEditUserAPI,
  editUserAPI,
} from "../api/userAPI";

const initialState = {
  loggedIn: false,
  role: null,
  statusMessage: null,
  rolesOfUser: [],
  error: null,
  loading: false,
  token: null,
  currentUser: {},
  user: {},
  isAuth: false,
  isSuper: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    requestStarted: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      // sessionStorage.setItem("token", action.payload);
      state.loggedIn = true;
    },

    registerSuccess: (state) => {
      state.loading = false;
      state.error = "";
      state.message = "Registration succeeded!";
    },

    setEditUser: (state, action) => {
      state.user = action.payload;
    },

    editSuccess: (state) => {
      state.loading = false;
      state.error = "";
      state.message = "Edit succeeded!";
    },
    loginFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.loggedIn = false;
      state.currentUser = null;
      state.rolesOfUser = null;
      state.isAuth = false;
      state.isSuper = false;
      sessionStorage.removeItem("token");
    },

    userFetched: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    setRolesOfUsers: (state, action) => {
      state.rolesOfUser = action.payload;
      state.isAuth =
        state.rolesOfUser.includes("Admin") ||
        state.rolesOfUser.includes("SuperAdmin");
      state.isSuper = state.rolesOfUser.includes("SuperAdmin");
    },
  },
});

//----User log in---------
export const userLogin = (loginUser) => (dispatch) => {
  dispatch(requestStarted());
  loginAPI(loginUser)
    .then((res) => {
      dispatch(loginSuccess(res.data));
      sessionStorage.setItem("token", res.data);
      console.log("user logged in");
      console.log(res.data);

      getUserAPI()
        .then((res) => {
          dispatch(userFetched(res.data));
          console.log(res.data);
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

//----Registers the user---------
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

//-----------Edit a user----------------
// ---  Get the user---
export const getEditUser = (id) => (dispatch) => {
  getEditUserAPI(id)
    .then((res) => {
      dispatch(setEditUser(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

// ---Edit the user---
export const editUser = (id, newUser) => (dispatch) => {
  editUserAPI(id, newUser)
    .then((res) => {
      dispatch(setEditUser(res.data));
      console.log("User edited");
      console.log(res.data);
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

//----Logout---------
export const userLogout = () => (dispatch) => {
  // dispatch(requestStarted());
  logoutAPI()
    .then((res) => {
      dispatch(logout(res.data));
      //sessionStorage.removeItem("token");
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

//----Gets the logged in user---------
export const getCurrentUser = () => (dispatch) => {
  // dispatch(requestStarted());
  getUserAPI()
    .then((res) => {
      dispatch(userFetched(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      console.log("ERR:", err);
      // dispatch error
    });
};

// ------Checks what role the user's in---------
export const checkUsersRole = () => (dispatch) => {
  // dispatch({ type: requestStarted.type });
  checkRoleAPI()
    .then((res) => {
      dispatch(setRolesOfUsers(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error:", err);
      // dispatch error
    });
};

export const {
  requestStarted,
  logout,
  currentUser,
  loginSuccess,
  loginFailed,
  setToken,
  setEditUser,
  userFetched,
  setRolesOfUsers,
} = userSlice.actions;

export default userSlice.reducer;
