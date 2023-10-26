import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_HOST + "/auth/login";

export const login = (body) => {
  return axios.post(baseURL, body);
};
