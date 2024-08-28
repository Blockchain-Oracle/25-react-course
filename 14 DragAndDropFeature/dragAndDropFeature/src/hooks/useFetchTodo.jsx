import { useState, useCallback } from "react";

export default function useFetchTodo() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = useCallback(async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      const updatedTodos = data?.todos?.map((todo) => ({
        ...todo,
        status: "pendingTodo",
      }));
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchTodos, todos, isLoading, setTodos };
}
