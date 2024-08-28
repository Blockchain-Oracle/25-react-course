import React from "react";
import { ADD_TODO, REMOVE_TODO, SET_TODO, UPDATE_TODO } from "./type";

export default function reducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoItem: [action.addTodoInput, ...state.todoItem],
      };
    case UPDATE_TODO:
      return {
        ...state,
        todoItem: state.todoItem.map((item) =>
          item.todoId === action.updateTodoInput.todoId
            ? { ...item, text: action.updateTodoInput.text }
            : item
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todoItem: state.todoItem.filter(
          (item) => item.todoId !== action.removeTodoInput.todoId
        ),
      };
    case SET_TODO:
      return {
        ...state,
        todoItem: action.payload,
      };
    default:
      return state;
  }
}
