import TaskCard from "../TaskCard/TaskCard";
import "./Column.module.css";

export default function Column({ title, tasks }) {
  return (
    <div>
      <h2>{title}</h2>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
}
