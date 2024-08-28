import { useCallback } from "react";
import { useState } from "react";

export default function useFetchProducts() {
  const [loading, setloading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchingProducts = useCallback(async (url) => {
    try {
      setloading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }, []);

  return { loading, products, fetchingProducts };
}
