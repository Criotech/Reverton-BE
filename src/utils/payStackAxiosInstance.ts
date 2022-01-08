import axios from 'axios';

const baseUrl = process.env.PAYSTACK_BASE_URL;

axios.defaults.baseURL = baseUrl;

const paystackAxiosInstance = axios.create();

const token = process.env.PAYSTACK_SECRET_KEY;

paystackAxiosInstance.interceptors.request.use(
  async config => {
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default paystackAxiosInstance;
