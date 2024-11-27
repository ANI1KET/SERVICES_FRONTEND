import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/`,
});

export default axiosInstance;
