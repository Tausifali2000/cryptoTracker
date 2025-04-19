import axios from "axios";
import { BASE_URL } from "./apiPaths.util.js";


export const axiosInstance = axios.create({
  baseURL: BASE_URL || "http://localhost:5000/api/coins",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept:"application/json",
  }
});
