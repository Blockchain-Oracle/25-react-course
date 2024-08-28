import { useEffect, useState, useCallback } from "react";

const useFetch = ({ url }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw Error;
      const jsonData = await res.json();
      setResponse({ type: "success", message: jsonData });
    } catch (error) {
      console.error(error);
      setResponse({
        type: "error",
        message: "Something went wrong, please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  return { response, isLoading, fetchQuotes };
};

export default useFetch;
