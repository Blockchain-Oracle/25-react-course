/**
 * DragAndDropPractice Component
 *
 * This component implements a simple drag and drop todo list using the @dnd-kit library.
 * It fetches todos from an API and allows users to add new todos through an input field.
 *
 * Hooks:
 * - useFetchTodo: Custom hook to fetch todos from an API.
 * - useMemo: Memoizes the URL to avoid unnecessary re-renders.
 * - useSensors: Initializes the sensors for drag and drop functionality.
 * - useEffect: Fetches todos when the component mounts.
 *
 * Note:
 * React hooks must be called unconditionally. To ensure this, all hooks are called
 * before any conditional returns. This avoids the "React Hook is called conditionally" error.
 * Check @line57 to ensure all hooks are used before that line.
 *
 * @returns {JSX.Element} The rendered component.
 */

import "./dragAndDropPractice.css";
import React, { useEffect, useMemo, useState } from "react";
import useFetchTodo from "../hooks/useFetchTodo";
import Tasklist from "./TodoTasklist";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function DragAndDropPractice() {
  const { fetchTodos, isLoading, todos, setTodos } = useFetchTodo();
  const url = useMemo(() => "https://dummyjson.com/todos?limit=3&skip=0", []);

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTodos(url);
  }, [fetchTodos, url]);

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  const getIndex = (id) => todos.findIndex((todo) => todo.id === id);

  /**
   * Handles the end of a drag operation.
   * @param {Object} event - The drag end event object.
   * @param {Object} event.active - The active (dragged) element.
   * @param {Object} event.over - The element being dragged over.
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active?.id === over?.id) return;

    // Update the todos state by reordering the items
    setTodos((prev) => {
      const currentDraggedIndex = getIndex(active?.id);
      const dropIndex = getIndex(over?.id);
      return arrayMove(prev, currentDraggedIndex, dropIndex);
    });
  };

  return (
    <div className="drag-and-drop-container">
      <h1>Drag and Drop Practice</h1>

      <div className="input-container">
        <Input setTodos={setTodos} />
      </div>

      <div className="board">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="droppable">
            <SortableContext
              items={todos}
              strategy={verticalListSortingStrategy}
            >
              <Tasklist todos={todos} />
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  );
}

/**
 * Input Component
 *
 * This component renders an input field and a button for adding new todos.
 *
 * @param {Object} props
 * @param {Function} props.onClick - Function to call when the add button is clicked
 * @returns {JSX.Element} The rendered input component.
 */
const Input = ({ setTodos }) => {
  const [state, setState] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setTodos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        todo: state,
      },
    ]);
    setState("");
  };

  return (
    <form onSubmit={handleClick} className="input-container">
      <input
        type="text"
        placeholder="Enter todo"
        className="add-todo-input"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <button type="submit" disabled={!state} className="add-todo">
        Add Todo
      </button>
    </form>
  );
};
