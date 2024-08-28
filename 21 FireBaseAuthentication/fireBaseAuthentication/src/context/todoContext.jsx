import React from "react";
import { addTodoDB, auth, removeTodoDB, updateTodoDB } from "../firebase";
import useFetchTodo from "../hooks/useFetchTodo";
import reducer from "./reducer";
import { ADD_TODO, REMOVE_TODO, SET_TODO, UPDATE_TODO } from "./type";

export const TodoContext = React.createContext(undefined);

export const TodoProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const { fetchTodo, loadingTodo, todoDb } = useFetchTodo();
  const [newTodo, setNewTodo] = React.useState([]);

  const intialState = {
    todoItem: newTodo,
  };
  const [state, dispatch] = React.useReducer(reducer, intialState);

  const handleAddTodo = async (text) => {
    try {
      dispatch({
        type: ADD_TODO,
        addTodoInput: {
          text,
          userId: user?.id,
          todoId: new Date(),
        },
      });
      //update db
      //when adding todo have to pass user id
      await addTodoDB({ text, userId: user?.uid });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTodo = async (todoId, text) => {
    try {
      dispatch({
        type: UPDATE_TODO,
        updateTodoInput: {
          text,
          todoId,
        },
      });
      //update db
      await updateTodoDB({ text, todoId });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      dispatch({
        type: REMOVE_TODO,
        removeTodoInput: {
          todoId,
        },
      });
      //update db
      await removeTodoDB(todoId);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userInfo) => {
      setUser(userInfo);
      if (userInfo) {
        fetchTodo(userInfo.uid);
      }
    });
    return () => unsubscribe();
  }, [fetchTodo]);

  React.useEffect(() => {
    if (todoDb) {
      setNewTodo(todoDb);
      dispatch({
        type: SET_TODO,
        payload: todoDb,
      });
    }
  }, [todoDb, fetchTodo]);

  const value = {
    user,
    loadingTodo,
    state,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
