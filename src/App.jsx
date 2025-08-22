import { useState } from "react";
import Column from "./components/Column/Column";
import AddTask from "./components/AddTask/AddTask";
import { tasks as initialTasks } from "./data";
import styles from "./App.module.css";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "./components/TaskCard/SortableTask";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  // Add task to a column
  const addTask = (column, task) => {
    setTasks((prev) => ({ ...prev, [column]: [...prev[column], task] }));
  };

  // Handle drag end for moving tasks between columns
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    let sourceColumn = "";
    let targetColumn = "";
    let draggedTask;

    // Find source column and task
    for (let col in tasks) {
      const found = tasks[col].find((t) => t.id === active.id);
      if (found) {
        sourceColumn = col;
        draggedTask = found;
        break;
      }
    }

    // Find target column
    for (let col in tasks) {
      const found = tasks[col].find((t) => t.id === over.id);
      if (found) {
        targetColumn = col;
        break;
      }
    }

    // If dropped in empty column, use active.id column
    if (!targetColumn) {
      targetColumn = sourceColumn;
    }

    if (!draggedTask) return;

    // Remove task from source column
    const newSourceTasks = tasks[sourceColumn].filter(
      (t) => t.id !== draggedTask.id
    );

    // Insert task into target column
    const newTargetTasks =
      sourceColumn === targetColumn
        ? arrayMove(
            newSourceTasks,
            tasks[sourceColumn].indexOf(draggedTask),
            tasks[targetColumn].indexOf(
              tasks[targetColumn].find((t) => t.id === over.id)
            )
          )
        : [...tasks[targetColumn], draggedTask];

    setTasks({
      ...tasks,
      [sourceColumn]: newSourceTasks,
      [targetColumn]: newTargetTasks,
    });
  };

  return (
    <div className={styles.app}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* To Do Column */}
        <SortableContext
          items={tasks.todo.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <Column title="To Do" tasks={tasks.todo} sortable={true}>
            <AddTask onAdd={(task) => addTask("todo", task)} />
          </Column>
        </SortableContext>

        {/* In Progress Column */}
        <SortableContext
          items={tasks.inprogress.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <Column title="In Progress" tasks={tasks.inprogress} sortable={true}>
            <AddTask onAdd={(task) => addTask("inprogress", task)} />
          </Column>
        </SortableContext>

        {/* Done Column */}
        <SortableContext
          items={tasks.done.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <Column title="Done" tasks={tasks.done} sortable={true}>
            <AddTask onAdd={(task) => addTask("done", task)} />
          </Column>
        </SortableContext>
      </DndContext>
    </div>
  );
}
