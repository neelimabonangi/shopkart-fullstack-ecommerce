import axios from "axios";

/**
 * Axios instance for backend API calls
 * Backend runs on Render
 */
const api = axios.create({
  baseURL: "https://shopkart-fullstack-ecommerce.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;


