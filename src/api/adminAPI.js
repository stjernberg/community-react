import axios from "axios";

const API_URL = "https://localhost:44383/api/admin";
const token = sessionStorage.getItem("token");

export const getRolesAPI = async () => {
  return await axios.get(API_URL + "/allRoles");
};
export const getRoleAPI = async (id) => {
  return await axios.get(API_URL + "/getRole/" + id);
};

export const userRolesAPI = async (id) => {
  return await axios.get(API_URL + "/usersWithRole/" + id);
};

export const addUserRolesAPI = async (userId, roleId) => {
  return await axios.get(API_URL + "/addToRole/" + userId + "/" + roleId);
};
export const deleteUserRolesAPI = async (userId, roleId) => {
  return await axios.get(API_URL + "/removeFromRole/" + userId + "/" + roleId);
};

export const getUsersAPI = async () => {
  return await axios.get(API_URL + "/allUsers");
};

export const addRoleAPI = async (data) => {
  return await axios.post(API_URL + "/createRole", data);
};

export const deleteRoleAPI = async (id) => {
  return await axios.delete(API_URL + "/deleteRole/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
