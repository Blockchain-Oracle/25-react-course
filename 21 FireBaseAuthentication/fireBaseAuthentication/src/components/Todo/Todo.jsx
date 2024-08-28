import { useState, useEffect, useContext } from "react";

import { logout } from "../../firebase/index";
import "./todo.css";
import { TodoContext } from "../../context/todoContext";
export default function Todo() {
  const [todoInput, setTodoInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [userId, setUserId] = useState(null);
  const {
    handleAddTodo: handleAddTodoContext,
    handleUpdateTodo: handleUpdateTodoContext,
    handleDeleteTodo: handleDeleteTodoContext,
    state: { todoItem },
    user,
    loading,
  } = useContext(TodoContext);

  useEffect(() => {
    setUserId(user.uid);
  }, [user]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (todoInput.trim() === "" || !userId) return;

    try {
      await handleAddTodoContext(todoInput);
    } catch (error) {
      console.error("Error adding document: ", error);
      // You can add user-friendly error handling here
      alert("Failed to add todo. Please try again.");
    } finally {
      setTodoInput("");
    }
  };

  const handleDeleteTodo = async (id) => {
    await handleDeleteTodoContext(id);
  };

  const handleEditTodo = (id, text) => {
    setEditingId(id);
    setTodoInput(text);
    console.log(editingId, todoInput);
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (todoInput.trim() === "") return;

    await handleUpdateTodoContext(editingId, todoInput);
    setEditingId(null);
    setTodoInput("");
  };

  if (loading) return <div>Loading... todo</div>;

  return (
    <div className="todoContainer">
      <div className="todoHeading">
        <h1>Todo List</h1>
      </div>
      <div className="addTodoInput">
        <form onSubmit={editingId ? handleUpdateTodo : handleAddTodo}>
          <label htmlFor="todo">Add Todo</label>
          <input
            type="text"
            id="todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            className="inputField"
          />
          <button type="submit" className="addTodoBtn">
            {editingId ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      </div>
      <div className="listTodoContainer">
        <ul>
          {todoItem.map((todo) => (
            <li key={todo.todoId} className="todoItem">
              <span>{todo.text}</span>
              <div>
                <button
                  onClick={() => handleEditTodo(todo.todoId, todo.text)}
                  className="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.todoId)}
                  className="deleteBtn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="logout-btn">
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
