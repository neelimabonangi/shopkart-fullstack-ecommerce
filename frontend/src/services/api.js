import axios from "axios";

/**
 * Axios instance for backend API calls
 * Backend runs on Spring Boot at port 8080
 */
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
