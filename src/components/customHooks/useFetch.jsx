import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      axios.get(url).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, []);
  return { data, loading, error };
}
