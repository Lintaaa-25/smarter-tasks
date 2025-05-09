import React from "react";
import { TaskItem } from "./types";
import Task from "./Task";

interface TaskListProps {
  tasks: TaskItem[];
}

class TaskList extends React.Component<TaskListProps> {
  render() {
    return (
      <div>
        {this.props.tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
          />
        ))}
      </div>
    );
  }
}

export default TaskList;
