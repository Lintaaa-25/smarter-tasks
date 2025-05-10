import React from "react";
import { TaskItem } from "./types";

interface TaskFormProps {
  addTask: (task: TaskItem) => void;
}

interface TaskFormState {
  title: string;
  description: string;
  dueDate: string;
}

class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
  constructor(props: TaskFormProps) {
    super(props);
    this.state = {
      title: "",
      description: "",
      dueDate: "",
    };
  }

  titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ title: event.target.value });
  };

  descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ description: event.target.value });
  };

  dueDateChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ dueDate: event.target.value });
  };

  addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const { title, description, dueDate } = this.state;

    // Only add task if title and due date are provided
    if (title.trim() === "" || dueDate.trim() === "") {
      return; // Do not add empty tasks
    }

    const newTask = {
      title,
      description,
      dueDate,
    };
    this.props.addTask(newTask);
    this.setState({ title: "", description: "", dueDate: "" });
  };

  render() {
    return (
      <form onSubmit={this.addTask}>
        <input
          type="text"
          value={this.state.title}
          onChange={this.titleChanged}
          id="todoTitle"
          className="border rounded px-2 py-1 w-full mb-2"
          placeholder="Enter a task title"
        />
        <input
          type="text"
          value={this.state.description}
          onChange={this.descriptionChanged}
          id="todoDescription"
          className="border rounded px-2 py-1 w-full mb-2"
          placeholder="Enter a task description"
        />
        <input
          type="date"
          value={this.state.dueDate}
          onChange={this.dueDateChanged}
          id="todoDueDate"
          className="border rounded px-2 py-1 w-full mb-2"
        />
        <button
          type="submit"
          id="addTaskButton"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add Task
        </button>
      </form>
    );
  }
}

export default TaskForm;
