import { useCallback, useEffect, useState } from "react";

const useFetch = ({ url }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetching = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw Error;
      const jsonData = await res.json();
      setResponse({ type: "success", message: jsonData });
    } catch (error) {
      console.log(error);
      setResponse({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetching();
  }, [fetching]);

  return { response, loading, fetching };
};
export default useFetch;
