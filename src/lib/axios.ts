import Axios from "axios";

// Use NEXT_PUBLIC_API_BASE_URL if set, otherwise default to root for local mock JSON
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const axiosInstance = Axios.create({
  baseURL, // will be "" in development if no env var, so "/mock/users.json" works
  timeout: 15000,
  withCredentials: false, // not needed for local JSON
});

export default axiosInstance;
