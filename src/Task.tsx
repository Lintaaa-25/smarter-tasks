import { Link } from "react-router-dom";
import { TaskItem } from "./types";
import "./TaskCard.css";

interface TaskProps {
  item: TaskItem;
  removeTask: (task: TaskItem) => void;
}

const Task = ({ item, removeTask }: TaskProps) => {
  return (
    <div className="TaskItem shadow-md border border-slate-100">
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div>
          <Link to={`/tasks/${item.id}`}>
            <h2 className="text-base font-bold my-1">{item.todoTitle}</h2>
          </Link>
          <p className="text-sm text-slate-500">{item.todoDueDate}</p>
          <p className="text-sm text-slate-500">Description: {item.todoDescription}</p>
        </div>

        <button
          className="deleteTaskButton cursor-pointer flex items-center justify-center h-4 w-4 rounded-full my-5 mr-5"
          onClick={() => removeTask(item)}
          aria-label={`Delete task ${item.todoTitle}`}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Task;
