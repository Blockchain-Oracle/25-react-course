import { useCallback, useEffect, useState } from "react";

export default function useFetchExchangeRate({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetching = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetching();
  }, [fetching]);
  return {
    data,
    loading,
    fetching,
  };
}
//
