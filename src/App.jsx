import Column from "./components/Column/Column";
import { tasks } from "./data";
import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <div className={styles.app}>
        <div className={styles.board}>
          <Column title="To Do" tasks={tasks.todo} />
          <Column title="In Progress" tasks={tasks.inprogress} />
          <Column title="Done" tasks={tasks.done} />
        </div>
      </div>
    </>
  );
}
