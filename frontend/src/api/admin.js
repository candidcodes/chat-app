import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getAllUsersAPI = (token) =>
  API.get("/admin/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteUserAPI = (id, token) =>
  API.delete(`/admin/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getStatsAPI = (token) =>
  API.get("/admin/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });
