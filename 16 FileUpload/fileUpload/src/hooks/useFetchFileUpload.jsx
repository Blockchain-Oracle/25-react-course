import { useState, useCallback } from "react";

export default function useFetchFileUpload() {
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchFile = useCallback(async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setFile(data?.todos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchFile, file, isLoading, setFile };
}
