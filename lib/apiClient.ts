import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://lxocalhost:5000/api",
  baseURL: process.env.NEXT_PUBLIC_PAI_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
