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
        <div key={task.id} className="TaskItem border p-4 rounded shadow-sm">
          <Task item={task} removeTask={() => deleteTask(index)} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
