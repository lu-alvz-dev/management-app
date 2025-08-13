import Column from "./components/Column/Column";
import { tasks as initialTasks } from "./data";
import styles from "./App.module.css";
import AddTask from "./components/AddTask/AddTask";
import { useState } from "react";
export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const addTask = (column, task) => {
    setTasks((prev) => ({ ...prev, [column]: [...prev[column], task] }));
  };

  return (
    <>
      <div className={styles.app}>
        <div className={styles.board}>
          <Column title="To Do" tasks={tasks.todo}>
            <AddTask onAdd={(task) => addTask("todo", task)} />
          </Column>
          <Column title="In Progress" tasks={tasks.inprogress}>
            <AddTask onAdd={(task) => addTask("inprogress", task)} />
          </Column>
          <Column title="Done" tasks={tasks.done}>
            <AddTask onAdd={(task) => addTask("done", task)} />
          </Column>
        </div>
      </div>
    </>
  );
}
