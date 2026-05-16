import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getChatHistoryAPI = (token) =>
  API.get("/chat/history", {
    headers: { Authorization: `Bearer ${token}` },
  });
