import Column from "./components/Column";
import { tasks } from "./data";
import "./App.css";

export default function App() {
  return (
    <>
      <div className="app">
        <div className="board">
          <Column title="To Do" tasks={tasks.todo} />
          <Column title="In Progress" tasks={tasks.inprogress} />
          <Column title="Done" tasks={tasks.done} />
        </div>
      </div>
    </>
  );
}
