import React from "react";
import { TaskItem } from "./types";
import Task from "./Task";

interface Props {
  tasks: TaskItem[];
  deleteTask: (index: number) => void;
}

const TaskList = ({ tasks, deleteTask }: Props) => {
  return (
    <ul>
      {tasks.map((task, idx) => (
        <li key={idx} className="mb-2 list-none">
          <Task
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
          />
          <button
            className="deleteTaskButton bg-red-500 text-white px-2 py-1 rounded mt-1"
            onClick={() => deleteTask(idx)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
