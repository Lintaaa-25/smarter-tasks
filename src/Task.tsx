import React from "react";
import "./TaskCard.css";

interface TaskProps {
  title: string;
  description: string;
  dueDate: string;
}

class Task extends React.Component<TaskProps> {
  render() {
    const { title, description, dueDate } = this.props;
    return (
      <div className="TaskItem shadow-md border border-slate-100">
        <h3 className="text-base font-bold my-1">
          {title} ({dueDate})
        </h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    );
  }
}

export default Task;
