import styles from "./TaskCard.module.css";
export default function TaskCard({ task }) {
  return <div className={styles.taskCard}>{task.title}</div>;
}
