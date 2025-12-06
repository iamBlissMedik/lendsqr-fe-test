import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  withCredentials: true,
  timeout: 15000,
});

export default axiosInstance;
