import { useState } from "react";
import nanoid from "nanoid";
export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ id: nanoid(), title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
