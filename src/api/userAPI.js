import axios from "axios";

const API_URL = "https://localhost:44383/api/auth";
const token = sessionStorage.getItem("token");

export const loginAPI = async (data) => {
  return await axios.post(API_URL + "/login", data);
};

export const regAPI = async (data) => {
  return await axios.post(API_URL + "/register", data);
};
export const getUserAPI = async () => {
  return await axios.get(API_URL + "/getUser", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getUserWithRoleAPI = async () => {
  return await axios.get(API_URL + "/CheckRole", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
// export const getRolesOfUsersAPI = async () => {
//   return await axios.get(API_URL + "/CheckAdmin", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };
