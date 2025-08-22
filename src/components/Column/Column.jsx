import TaskCard from "../TaskCard/TaskCard";
import styles from "./Column.module.css";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ title, tasks, columnId, sortable }) {
  // applying droppable functionality to column
  const setNodeRef = useDroppable({ id: columnId });
  return (
    <div ref={setNodeRef} className={styles.column}>
      <h2 className={styles.title}>{title}</h2>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} sortable={sortable} />
        ))
      )}
    </div>
  );
}
