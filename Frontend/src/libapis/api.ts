import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

/* ================= REQUEST INTERCEPTOR ================= */

api.interceptors.request.use((config) => {
  // Do not attach token for auth endpoints
  if (
    config.url &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register") &&
    !config.url.includes("/auth/token/refresh")
  ) {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* ================= RESPONSE INTERCEPTOR ================= */

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${api.defaults.baseURL}/api/auth/token/refresh/`,
          { refresh }
        );

        localStorage.setItem("access", data.access);
        api.defaults.headers.Authorization = `Bearer ${data.access}`;

        processQueue(null, data.access);

        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/* ================= API CALLS ================= */

export const register = (payload: {
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
}) => api.post("/api/auth/register/", payload);

export const login = (payload: {
  email: string;
  password: string;
}) => api.post<{ access: string; refresh: string }>(
  "/api/auth/login/",
  payload
);

export const getProfile = () =>
  api.get("/api/auth/profile/");

export const updateProfile = (payload: any) =>
  api.put("/api/auth/profile/", payload);

export const updateUserDetails = (payload: any) =>
  api.put("/api/auth/details/", payload);

export const getUserDetails = () =>
  api.get("/api/auth/details/");

export const logout = (refreshToken: string) =>
  api.post("/api/auth/logout/", { refresh: refreshToken });

// Meal planner
export const generateWeeklyPlan = (regenerate = false) =>
  api.post("/api/meal-planner/generate/", { regenerate });

export const getWeeklyPlans = () =>
  api.get("/api/meal-planner/weekly-plans/");

export const regenerateDailyPlan = (day?: number) =>
  api.post("/api/meal-planner/regenerate-day/", { day });

export default api;
