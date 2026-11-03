import { useState, useCallback } from 'react';

export const useFetchBackend = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        method,
        headers: body ? { 'Content-Type': 'application/json', ...headers } : headers,
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, config);
      if (!response.ok) throw new Error('Error en la comunicación con el servidor');
      
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  return { request, loading, error };
};