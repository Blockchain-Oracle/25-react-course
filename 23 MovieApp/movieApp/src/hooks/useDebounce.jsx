import React from "react";
import { useCallback } from "react";

export default function useDebounce({ params, queryTime = 1000 }) {
  const [debouncedValue, setDebouncedValue] = React.useState(params);
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(params), queryTime);
    return () => clearTimeout(timer);
  }, [params, queryTime]);

  console.log(params);
  const url = React.useMemo(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    return debouncedValue !== null
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${debouncedValue}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
  }, [debouncedValue]);

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response?.json();
      setMovies(data?.results);
    } catch (error) {
      console.error("Error debouncing value: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { fetchMovies, isLoading, movies };
}
