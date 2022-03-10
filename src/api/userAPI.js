import axios from "axios";

const API_URL = "https://localhost:44383/api/auth";
const token = sessionStorage.getItem("token");

export const loginAPI = async (data) => {
  return await axios.post(API_URL + "/login", data);
};

export const logoutAPI = async () => {
  return await axios.post(API_URL + "/logout");
  //   headers: { Authorization: `Bearer ${token}` },
  // });
};

export const regAPI = async (data) => {
  return await axios.post(API_URL + "/register", data);
};

export const getEditUserAPI = async (id) => {
  return await axios.get(API_URL + "/editUser/" + id);
};

export const editUserAPI = async (id, data) => {
  return await axios.put(API_URL + "/editUser/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserAPI = async () => {
  return await axios.get(API_URL + "/getUser", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const checkRoleAPI = async () => {
  return await axios.get(API_URL + "/CheckRole", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

