import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const registerAPI = (data) => API.post("/auth/register", data);
export const loginAPI = (data) => API.post("/auth/login", data);
