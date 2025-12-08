// frontend/src/hooks/useSales.js
import { useEffect, useState } from 'react';
import { fetchSales } from '../services/api';

export const useSales = (queryParams) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
        console.log("📌 Backend URL:", import.meta.env.VITE_API_BASE);
        console.log("📌 Query Params:", queryParams);
        console.log("⚡ Sending request to:", `${import.meta.env.VITE_API_BASE}/api/sales`);

    fetchSales(queryParams)
      .then((res) => {
        if (cancelled) return;
        setData(res.data);
        setPagination(res.pagination);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Error fetching data');
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(queryParams)]); // simple dependency hack

  return { data, pagination, loading, error };
};
