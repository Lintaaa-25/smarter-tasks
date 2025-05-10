import React from "react";
import { TaskItem } from "./types";
import Task from "./Task";

interface TaskListProps {
  tasks: TaskItem[];
  deleteTask: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div key={task.id ?? index} className="border p-4 rounded shadow-sm">
          <Task {...task} />
          <button
            className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            onClick={() => deleteTask(index)}
            aria-label={`Delete task ${task.title}`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
