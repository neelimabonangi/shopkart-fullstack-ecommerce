import axios from "axios";

// Base URL for backend (Render)
const BASE_URL = "https://shopkart-fullstack-ecommerce.onrender.com";

// Products API endpoint
const API_URL = `${BASE_URL}/api/products`;

// Get all products
export const getAllProducts = () => {
  return axios.get(API_URL);
};
