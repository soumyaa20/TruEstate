import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export const fetchSales = async (params) => {
  const res = await axios.get(`${API_BASE}/api/sales`, { params });
  return res.data;
};
