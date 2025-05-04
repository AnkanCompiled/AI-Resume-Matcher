import axios from "axios";
import { tokenStore } from "../store/tokenStore";
import { SERVER_URL } from "../config/envConfig";
import { accessTokenApi } from "./authApi";

export const API = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

API.interceptors.request.use((config) => {
  if (tokenStore.ACCESS_TOKEN) {
    config.headers["Authorization"] = `Bearer ${tokenStore.ACCESS_TOKEN}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(error.response?.data || error.message || error);
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      tokenStore.ACCESS_TOKEN
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await accessTokenApi();
        const newAccessToken = res.data.access_token;

        tokenStore.set_ACCESS_TOKEN(newAccessToken);
        tokenStore.ACCESS_TOKEN = newAccessToken;

        processQueue(null, newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await tokenStore.logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
