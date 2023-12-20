import React from "react";
import "./Footer.css";
import TaskFilter from "./TaskFilter/TaskFilter";

const Footer = ({ taskCount }) => {
  return (
    <footer className="footer">
      <span className="todo-count"> {taskCount} items left</span>
      <TaskFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;
