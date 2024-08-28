import "./todoTasklist.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export default function Tasklist({ todos }) {
  const TodoItem = ({ id, title }) => {
    const { attributes, setNodeRef, listeners, transform, transition } =
      useSortable({ id: id });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <label>
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style} //this makes sure its movable
          className="todo-item"
          tabIndex={0} // Ensure the element is focusable
        >
          <input type="checkbox" name={title} id={id} />
          <h4>{title}</h4>
        </div>
      </label>
    );
  };

  return (
    <>
      {todos.map((todoItem) => (
        //draggable
        <TodoItem key={todoItem.id} id={todoItem.id} title={todoItem.todo} />
      ))}
    </>
  );
}
