import axios from "axios";

const API_URL = "https://localhost:44383/api/auth";

export const loginAPI = async (data) => {
  return await axios.post(API_URL + "/login", data);
};

export const regAPI = async (data) => {
  return await axios.post(API_URL + "/register", data);
};
