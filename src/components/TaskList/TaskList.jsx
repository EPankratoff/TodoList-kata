import React from "react";
import Task from "./Task/Task";

const TaskList = (props) => {
  return (
    <section className="main">
      <ul className="todo-list">
        <li className="completed">
          <Task taskData={props.taskData} />
        </li>
      </ul>
    </section>
  );
};

export default TaskList;
