import { useState, useEffect, useCallback } from "react";

export default function useDebounceAPI({ params }) {
  const [dataParam, setdataParam] = useState(params);
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const paramsTimeout = setTimeout(() => {
      setdataParam(params);
    }, 1000);
    return () => clearTimeout(paramsTimeout);
  }, [params]);

  const fetchRecipe = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${dataParam}`
      );
      console.log(dataParam, "dataParam");
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [dataParam]);
  return { recipes, isLoading, fetchRecipe };
}
