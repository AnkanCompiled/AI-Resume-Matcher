import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { SERVER_URL } from "../config/envConfig";

export const API = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const { logout } = useAuth();
      logout();
    }
    return Promise.reject(error);
  }
);
