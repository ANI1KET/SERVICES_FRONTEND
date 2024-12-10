import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/`,
  timeout: 5000,
  maxRedirects: 0,
});

export default axiosInstance;
