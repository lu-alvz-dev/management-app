import styles from "./TaskCard.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task, sortable = false, onDelete }) {
  // Making the card draggable and sortable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  //adding dragging animation
  const style = { transform: CSS.Transform.toString(transform), transition };
  if (!sortable) {
    return (
      <div className={styles.taskCard}>
        {task.title}{" "}
        {onDelete && (
          <button
            aria-label="Delet task"
            onClick={onDelete}
            style={{ marginLeft: 8 }}
          >
            X
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.taskCard}
      {...attributes}
      {...listeners}
    >
      {task.title}{" "}
      {onDelete && (
        <button
          aria-label="Delete task"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{ marginLeft: 8 }}
        >
          X
        </button>
      )}
    </div>
  );
}
