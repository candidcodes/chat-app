import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const updateProfileAPI = (data, token) =>
  API.put("/users/update", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteAccountAPI = (token) =>
  API.delete("/users/delete", {
    headers: { Authorization: `Bearer ${token}` },
  });
