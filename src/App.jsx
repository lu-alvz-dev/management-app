import { useState } from "react";
import Column from "./components/Column/Column";
import AddTask from "./components/AddTask/AddTask";
import { tasks as initialTasks } from "./data";
import styles from "./App.module.css";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (column, task) => {
    setTasks((prev) => ({ ...prev, [column]: [...prev[column], task] }));
  };

  // Helpers to find where the dragged task came from / goes to
  const COLUMN_IDS = ["todo", "inprogress", "done"];

  const findColumnByTaskId = (id) => {
    for (const col of COLUMN_IDS) {
      if (tasks[col].some((t) => t.id === id)) return col;
    }
    return null;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const sourceColumn = findColumnByTaskId(activeId);
    if (!sourceColumn) return;

    // Determine target column:
    // If overId is a column id, we're dropping into an empty area of that column.
    // Otherwise, find the column that contains the "over" task.
    const targetColumn = COLUMN_IDS.includes(overId)
      ? overId
      : findColumnByTaskId(overId) || sourceColumn;

    const sourceList = tasks[sourceColumn];
    const targetList = tasks[targetColumn];

    const sourceIndex = sourceList.findIndex((t) => t.id === activeId);

    // Determine target index:
    // If we're over a task, drop before that task; if over a column, drop at end.
    const targetIndex = COLUMN_IDS.includes(overId)
      ? targetList.length
      : targetList.findIndex((t) => t.id === overId);

    const draggedTask = sourceList[sourceIndex];
    if (!draggedTask) return;

    // If same column, just reorder
    if (sourceColumn === targetColumn) {
      // If dropped onto itself, nothing to do
      if (sourceIndex === targetIndex || targetIndex === -1) return;

      const newList = [...sourceList];
      // remove dragged
      newList.splice(sourceIndex, 1);
      // insert at new index (account for removal shift)
      const insertAt =
        sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
      newList.splice(insertAt, 0, draggedTask);

      setTasks((prev) => ({ ...prev, [sourceColumn]: newList }));
      return;
    }

    // Moving across columns
    const newSource = [...sourceList];
    newSource.splice(sourceIndex, 1);

    const newTarget = [...targetList];
    const insertAt = targetIndex === -1 ? newTarget.length : targetIndex;
    newTarget.splice(insertAt, 0, draggedTask);

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: newSource,
      [targetColumn]: newTarget,
    }));
  };

  return (
    <div className={styles.app}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className={styles.board}>
          {/* To Do */}
          <div>
            <AddTask onAdd={(task) => addTask("todo", task)} />
            <SortableContext
              items={tasks.todo.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                columnId="todo"
                title="To Do"
                tasks={tasks.todo}
                sortable
              />
            </SortableContext>
          </div>

          {/* In Progress */}
          <div>
            <AddTask onAdd={(task) => addTask("inprogress", task)} />
            <SortableContext
              items={tasks.inprogress.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                columnId="inprogress"
                title="In Progress"
                tasks={tasks.inprogress}
                sortable
              />
            </SortableContext>
          </div>

          {/* Done */}
          <div>
            <AddTask onAdd={(task) => addTask("done", task)} />
            <SortableContext
              items={tasks.done.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                columnId="done"
                title="Done"
                tasks={tasks.done}
                sortable
              />
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
