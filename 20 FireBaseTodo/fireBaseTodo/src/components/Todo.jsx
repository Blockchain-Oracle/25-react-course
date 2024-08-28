import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { db } from "../firebase"; // Ensure db is correctly imported
import "./todo.css"; // Import CSS file

export default function Todo() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  //note only fetch /getDocs uses query
  useEffect(() => {
    const fetchTodos = async () => {
      const q = query(collection(db, "todo"), orderBy("timestamp", "desc"));
      const snapShot = await getDocs(q);
      setTodos(snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchTodos();
  }, [todoInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!db) {
      console.error("Firestore database is not initialized.");
      return;
    }
    const todoCollection = collection(db, "todo");
    addDoc(todoCollection, {
      todoItem: todoInput,
      timestamp: serverTimestamp(),
    });
    setTodoInput("");
  };

  const handleDelete = async (id) => {
    if (!db) {
      console.error("Firestore database is not initialized.");
      return;
    }
    await deleteDoc(doc(db, "todo", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, currentTodo) => {
    setEditingId(id);
    setEditInput(currentTodo);
  };

  const handleUpdate = async (id) => {
    if (!db) {
      console.error("Firestore database is not initialized.");
      return;
    }
    await updateDoc(doc(db, "todo", id), { todoItem: editInput });
    setEditingId(null);
    setEditInput("");
    // Refresh the todos list
    const q = query(collection(db, "todo"), orderBy("timestamp", "desc"));
    const snapShot = await getDocs(q);
    setTodos(snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div className="todoContainer">
      <div className="todoHeading">
        <h1>Todo App</h1>
      </div>
      <div className="addTodoInput">
        <form onSubmit={handleSubmit}>
          <label htmlFor="todo">Enter Todo : </label>
          <input
            type="text"
            value={todoInput}
            onChange={(e) => {
              setTodoInput(e.target.value);
            }}
            name="todo"
            id="todo"
          />
          <button type="submit" className="addTodoBtn">
            Add Todo
          </button>
        </form>
      </div>
      <div className="listTodoContainer">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="todoItem">
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="updateBtn"
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  {todo.todoItem}
                  <div>
                    <button
                      onClick={() => handleEdit(todo.id, todo.todoItem)}
                      className="editBtn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="deleteBtn"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
