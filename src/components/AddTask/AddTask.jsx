import { useState } from "react";
import nanoid from "nanoid";
import styles from "./AddTask.module.css";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ id: nanoid(), title: title.trim() });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addTask}>
      <input
        type="text"
        placeholder="New Task..."
        value={title}
        onchange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">+</button>
    </form>
  );
}
