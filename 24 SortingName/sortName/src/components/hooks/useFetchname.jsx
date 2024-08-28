import React, { useState, useEffect } from "react";

export default function useFetchname() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNames = React.useCallback(async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch names");
      }
      const data = await response?.json();
      setNames(data);
    } catch (error) {
      console.error("Error fetching names:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { names, loading, fetchNames };
}
