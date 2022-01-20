import { createSlice } from "@reduxjs/toolkit";
import {
  getRolesAPI,
  deleteRoleAPI,
  addRoleAPI,
  getUsersAPI,
  getRoleAPI,
  userRolesAPI,
  addUserRolesAPI,
} from "../api/adminAPI";

const initialState = {
  roles: [],
  role: {},
  users: [],
  usersNoRole: [],
  usersWithRole: [],
  statusMessage: null,

  error: null,
  loading: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
      state.loading = false;
      state.error = null;
    },

    setRole: (state, action) => {
      state.role = action.payload;
    },

    setUsersNoRoles: (state, action) => {
      state.usersNoRole = action.payload;
    },

    setUsersWithRoles: (state, action) => {
      state.usersWithRole = action.payload;
    },

    rolesAdded: (state, action) => {
      state.roles.push(action.payload);
      state.loading = false;
      state.error = null;
      state.message = "Role successfully added!";
    },

    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },

    usersAdded: (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
      state.error = null;
      state.message = "User successfully added!";
    },
    requestStarted: (state) => {
      state.loading = true;
    },
  },
});

export const getRoles = () => (dispatch) => {
  dispatch({ type: requestStarted.type });
  getRolesAPI()
    .then((res) => {
      dispatch(setRoles(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error:", err);
      // dispatch error
    });
};

export const getRole = (id) => (dispatch) => {
  dispatch({ type: requestStarted.type });
  getRoleAPI(id)
    .then((res) => {
      dispatch(setRole(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error:", err);
      // dispatch error
    });
};

export const getUserRoles = (id) => (dispatch) => {
  dispatch({ type: requestStarted.type });
  userRolesAPI(id)
    .then((res) => {
      dispatch(setUsersNoRoles(res.data.userNoRole));
      dispatch(setUsersWithRoles(res.data.userWithRole));
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error:", err);
      // dispatch error
    });
};

export const addUserRole = (userId, roleId) => (dispatch) => {
  addUserRolesAPI(userId, roleId)
    .then((res) => {
      // dispatch(setUsersWithRoles(res.data));
      // dispatch(setUsersNoRoles(res.data));
      // dispatch({ type: rolesAdded.type, payload: res.data });
      console.log(res.data, "Role successfully added!");
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};
export const getUsers = () => (dispatch) => {
  // dispatch({ type: requestStarted.type });
  getUsersAPI()
    .then((res) => {
      dispatch(setUsers(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error:", err);
      // dispatch error
    });
};

export const addRole = (role) => (dispatch) => {
  addRoleAPI(role)
    .then((res) => {
      dispatch(rolesAdded(res.data));
      // dispatch({ type: rolesAdded.type, payload: res.data });
      console.log("Role successfully added!");
    })
    .catch((err) => {
      // dispatch error
      console.log("ERR:", err);
    });
};

export const deleteRole = (id) => (dispatch) => {
  deleteRoleAPI(id)
    .then((deleteRes) => {
      deleteRoleAPI()
        .then((fetchRes) => {
          dispatch(setRoles(fetchRes.data));
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
export const {
  setRoles,
  setRole,
  requestStarted,
  setUsersNoRoles,
  setUsersWithRoles,
  rolesAdded,
  setUsers,
  usersAdded,
  setUserRoles,
} = adminSlice.actions;

export default adminSlice.reducer;
