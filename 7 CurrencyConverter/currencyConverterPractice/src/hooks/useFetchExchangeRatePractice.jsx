import { useCallback } from "react";
import { useState } from "react";

export default function useFetchExchangeRatePractice() {
  const [loading, setloading] = useState(false);
  const [data, setData] = useState(null);
  //note this is best practice to pass the url as a parameter
  //and im no longer using useEffect to call the function because
  //it will be called in the component that uses this hook
  const fetching = useCallback(async (url) => {
    try {
      setloading(true);
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) throw new Error("response not okay");
      const dataRes = await response.json();
      setData(dataRes);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }, []);

  return { data, loading, fetching };
}
