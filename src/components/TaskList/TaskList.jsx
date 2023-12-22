import React from "react";
import Task from "./Task/Task";
import PropTypes from "prop-types";

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

TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onToggleCompleted: () => {},
};

TaskList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
export default TaskList;
