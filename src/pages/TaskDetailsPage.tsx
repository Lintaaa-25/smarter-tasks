import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { TaskItem } from "../types";

type ContextType = {
  tasks: TaskItem[];
};

const TaskDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks } = useOutletContext<ContextType>();
  const task = tasks.find((t) => t.id === id);

  if (!task) return <div className="p-6 text-red-600">Task not found.</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-2">{task.todoTitle}</h1>
      <p className="mb-2 text-gray-700">{task.todoDescription}</p>
      <p className="text-sm text-gray-500">Due Date: {task.todoDueDate}</p>
    </div>
  );
};

export default TaskDetailsPage;
