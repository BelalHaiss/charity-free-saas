import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/v1/api/",
});

export type ApiPaths = "beneficiary" | "setup";
