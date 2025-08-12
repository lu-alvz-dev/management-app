import TaskCard from "../TaskCard/TaskCard";
import styles from "./Column.module.css";

export default function Column({ title, tasks }) {
  return (
    <div className={styles.column}>
      <h2 className={styles.title}>{title}</h2>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
}
