import React from "react";
import { useParams, Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

import { TaskItem } from "../types";

interface TaskAppState {
  tasks: TaskItem[];
}

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [taskAppState] = useLocalStorage<TaskAppState>("tasks", { tasks: [] });

  const task = taskAppState.tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-600">Task not found</h2>
        <Link to="/tasks" className="text-blue-600 underline mt-4 block">
          Back to Task List
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
      <p className="text-gray-700 mb-2">{task.description}</p>
      <p className="text-sm text-gray-500 mb-4">Due: {task.dueDate}</p>
      <Link to="/tasks" className="text-blue-600 underline">
        Back to Task List
      </Link>
    </div>
  );
};

export default TaskDetailsPage;

