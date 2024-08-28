import React from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
export default function useFetchTodo() {
  //fetch base on uid, get db from firbase index.js
  //get uid from context
  const [loadingTodo, setLoadingTodo] = React.useState(false);
  const [todoDb, setTodoDb] = React.useState([]);

  const fetchTodo = React.useCallback(async (uid) => {
    if (!uid) throw new Error("user id null");
    try {
      setLoadingTodo(true);
      //im not sure user.id or user.uid
      const q = query(collection(db, "todos"), where("userId", "==", uid));
      const response = await getDocs(q);
      setTodoDb(
        response?.docs?.map((doc) => ({
          ...doc.data(),
          todoId: doc.id,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTodo(false);
    }
  }, []);

  return { loadingTodo, todoDb, fetchTodo };
}
