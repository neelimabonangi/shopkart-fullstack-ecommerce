import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Get all products
export const getAllProducts = () => {
  return axios.get(API_URL);
};
