import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const bookBaseUrl = axios.create({
  baseURL: `${API_BASE_URL}/book`,
  withCredentials: true
});

export const userBaseUrl = axios.create({
  baseURL: `${API_BASE_URL}/user`,
  withCredentials: true
});

// REQUEST INTERCEPTOR
bookBaseUrl.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("userAuth");
    const token = JSON.parse(authToken)?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
bookBaseUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userAuth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
