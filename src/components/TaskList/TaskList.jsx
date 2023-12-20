import React from "react";
import Task from "./Task/Task";

const TaskList = ({ tasks, onDelete, onToggleCompleted }) => {
  // console.log("tasks", tasks);
  const elements = tasks.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <Task
        key={id}
        {...itemProps}
        onToggleCompleted={() => onToggleCompleted(id)}
        onDelete={() => onDelete(id)}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};
export default TaskList;
