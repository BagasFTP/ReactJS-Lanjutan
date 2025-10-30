// booksales-frontend/src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// Jangan kirim Authorization untuk login/register
api.interceptors.request.use((config) => {
  if (/\/(login|register)$/.test(config.url || "")) return config;
  const raw = localStorage.getItem("auth");
  const token = raw ? JSON.parse(raw).token : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
