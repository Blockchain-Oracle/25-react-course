import React from "react";

export default function useFetchProducts() {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState(null);
  const fetchProducts = React.useCallback(async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("network issues network not okay");
      }
      const data = await response?.json();
      console.log(data);
      setProducts(data?.products);
    } catch (errors) {
      setError(errors);
    } finally {
      setLoading(false);
    }
  }, []);
  return { loading, products, fetchProducts, error };
}
