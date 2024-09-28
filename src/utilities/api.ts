import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`
const ACCESS_KEY = `${import.meta.env.VITE_ACCESS_KEY}`

const DEFAULT_CONFIG = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": BASE_URL || "",
    "Access-Control-Allow-Credentials": true,
  },
} 

const api = (() => {
  const a = axios.create(DEFAULT_CONFIG);
  a.interceptors.request.use((config) => {
    config.headers.Authorization = `Client-ID ${ACCESS_KEY}`;
    return config
  })
  return a
})()

export default api