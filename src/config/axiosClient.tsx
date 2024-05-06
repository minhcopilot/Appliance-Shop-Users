import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://localhost:9000/",
  timeout: 30000,
});
export default axiosClient;
