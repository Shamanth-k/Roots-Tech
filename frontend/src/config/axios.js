import axios from "axios";

export const axiosi = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});
