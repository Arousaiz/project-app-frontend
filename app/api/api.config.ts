import axios from "axios";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";

export const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json;charset=utf-8" },
  withCredentials: true,
});

instance.interceptors.response.use(
  async (response) => {
    // await new Promise(
    //   (resolve) => setTimeout(resolve, Math.random() * 3000) // Random delay 0-3s
    // );
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    }
    return Promise.resolve({ data: null });
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Не обновлять данные при фокусе окна
      staleTime: 5 * 60 * 1000, // Данные считаются "свежими" 5 минут
    },
  },
});

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//   return config;
// });

// instance.interceptors.response.use(
//   (config) => {
//     return config;
//   },

//   async (error) => {
//     const originalRequest = { ...error.config };
//     originalRequest._isRetry = true;
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       try {
//         const resp = await instance.get("/api/refresh");
//         localStorage.setItem("token", resp.data.accessToken);
//         return instance.request(originalRequest);
//       } catch (error) {
//         console.log("AUTH ERROR");
//       }
//     }
//     throw error;
//   }
// );
