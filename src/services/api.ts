import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

function getToken() {
  return localStorage.getItem("token");
}

instance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const apis = {
  index: (endpoint: string) => instance.get(endpoint),
  store: (endpoint: string, data: any) => instance.post(endpoint, data),
  show: (endpoint: string, id: string) => instance.get(`/${endpoint}/${id}`),
  update: (endpoint: string, id: string, data: object) =>
    instance.put(`/${endpoint}/${id}`, data),
  delete: (endpoint: string, id: string) =>
    instance.delete(`/${endpoint}/${id}`),
  login: (endpoint: string, data: any) => instance.post(endpoint, data),
};

export default apis;
