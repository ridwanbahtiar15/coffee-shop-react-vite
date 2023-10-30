import axios from "axios";

const urlLogin = import.meta.env.VITE_BACKEND_HOST + "/auth/login";
// const urlLogout = import.meta.env.VITE_BACKEND_HOST + "/auth/logout";

export const login = (body) => {
  return axios.post(urlLogin, body);
};

export const Logout = (token) => {
  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Barer ${token}`,
    },
  });
  return authAxios.delete("/auth/logout");
};
