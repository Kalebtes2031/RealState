// utils/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.100.51:8000";
const ACCESS_TOKEN_KEY = "realstate_access_token";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const api = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // cookie refresh token
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  if (token && config.headers) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error: AxiosError & { config?: InternalAxiosRequestConfig }) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;

      if (isRefreshing) {
        // Wait for the new token
        return new Promise(resolve => {
          addRefreshSubscriber(token => {
            if (originalRequest.headers) {
              (originalRequest.headers as any).Authorization = `Bearer ${token}`;
            }
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const res = await axios.post(`${API_URL}/api/auth/token/refresh/`, null, {
          withCredentials: true,
        });
        const newToken = res.data.access;

        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newToken);
        onTokenRefreshed(newToken);

        if (originalRequest.headers) {
          (originalRequest.headers as any).Authorization = `Bearer ${newToken}`;
        }

        return api(originalRequest);
      } catch (err) {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
