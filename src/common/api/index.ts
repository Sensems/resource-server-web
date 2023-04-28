import RequestCore from "./core";

export const http = new RequestCore({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 0,
})