import axios from "axios";
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_baseURL,
  timeout: 30000,
});
export default axiosClient;
