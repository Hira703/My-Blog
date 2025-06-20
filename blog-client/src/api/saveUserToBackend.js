// src/utils/saveUserToBackend.js
import axiosSecure from "./axiosSecure";

export const saveUserToBackend = async (userData) => {
  const response = await axiosSecure.post("/api/users", userData);
  return response.data;
  console.log(response.data)
};
