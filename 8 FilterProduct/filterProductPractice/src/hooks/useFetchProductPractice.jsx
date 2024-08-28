import { useCallback, useState } from "react";

export default function useFetchProductPractice() {
  const [product, setProduct] = useState([]);
  const [loading, setloading] = useState(false);

  const fetching = useCallback(async (url) => {
    try {
      setloading(true);
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) throw new Error("Network issues cant get response");
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data) && data.length > 0) {
        setProduct(data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }, []);
  return { loading, product, fetching };
}
