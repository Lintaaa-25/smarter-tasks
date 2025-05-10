import React, { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { TaskItem } from "../types";
import { v4 as uuidv4 } from "uuid";

type ContextType = {
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
};

const TaskListPage = () => {
  const { tasks, setTasks } = useOutletContext<ContextType>();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const handleAddTask = () => {
    if (!title || !desc || !date) return;
    const newTask: TaskItem = {
      id: uuidv4(),
      todoTitle: title,
      todoDescription: desc,
      todoDueDate: date,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDesc("");
    setDate("");
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Pending</h2>

      <input
        type="text"
        placeholder="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-2 border p-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="block w-full mb-2 border p-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="block w-full mb-2 border p-2"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>

      <div className="mt-6 space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white shadow p-4 rounded">
            <Link to={`/tasks/${task.id}`}>
              <h3 className="font-bold text-lg">{task.todoTitle}</h3>
              <p>{task.todoDescription}</p>
              <p className="text-sm text-gray-500">{task.todoDueDate}</p>
            </Link>
            <button
              onClick={() => handleDelete(task.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;
