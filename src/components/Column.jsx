import TaskCard from "./TaskCard";

export default function Column({ title, tasks, children }) {
  return (
    <div>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {children}
    </div>
  );
}
