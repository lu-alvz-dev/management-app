import styles from "./TaskCard.module.css";
import { usesortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task, sortable = false }) {
  if (!sortable) {
    return <div className={styles.taskCard}>{task.title}</div>;
  }

  // Making the card draggable and sortable

  const { attributes, listeners, setNodeRef, transform, transition } =
    usesortable({ id: task.id });

  //adding dragging animation
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.taskCard}
      {...attributes}
      {...listeners}
    >
      {task.title}
    </div>
  );
}
