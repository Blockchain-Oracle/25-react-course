import "./dragAndDrop.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import useFetchTodo from "../hooks/useFetchTodo";

export default function DragAndDrop() {
  const { todos, isLoading, fetchTodos, setTodos } = useFetchTodo();
  const url = useMemo(() => "https://dummyjson.com/todos?limit=3&skip=0", []);
  const [draggedTodo, setDraggedTodo] = useState(null);

  useEffect(() => {
    fetchTodos(url);
  }, [fetchTodos, url]);

  const renderTodoDiv = useCallback((todoItem) => {
    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, todoItem)}
        key={todoItem.id}
        className="todo-card"
      >
        <h3>{todoItem.todo}</h3>
      </div>
    );
  }, []);
  const renderTodo = useMemo(() => {
    const todolistToRender = {
      pendingTodo: [],
      completedTodo: [],
    };

    todos.forEach((todoItem) => {
      todolistToRender[todoItem.status].push(renderTodoDiv(todoItem));
    });
    return todolistToRender;
  }, [renderTodoDiv, todos]);

  const handleDragStart = (e, todo) => {
    setDraggedTodo(todo);
    e.dataTransfer.setData("text/plain", todo.id);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (!draggedTodo || draggedTodo.status === status) return;

    const updatedTodos = todos.map((todo) =>
      todo.id === draggedTodo.id ? { ...todo, status } : todo
    );
    setTodos(updatedTodos);
    setDraggedTodo(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <div className="dragAndDrop-container">
      <h1>Todo List</h1>
      <div className="dragAndDropBoard">
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "pendingTodo")}
          className="work-in-progress"
        >
          <h2>Work in Progress</h2>
          {renderTodo.pendingTodo}
        </div>
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "completedTodo")}
          className="completed"
        >
          <h2>Completed</h2>
          {renderTodo.completedTodo}
        </div>
      </div>
    </div>
  );
}
