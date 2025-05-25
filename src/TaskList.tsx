import React from "react";
import { TaskItem } from "./types";
import Task from "./Task";

interface TaskListProps {
  tasks: TaskItem[];
  deleteTask: (task: TaskItem) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks = [], deleteTask }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="border p-4 rounded shadow-sm">
          <Task item={task} removeTask={deleteTask} />
          <button
            className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            onClick={() => deleteTask(task)}
            aria-label={`Delete task ${task.todoTitle}`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
