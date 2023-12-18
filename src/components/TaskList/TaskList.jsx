import React, { Component } from "react";
import Task from "./Task/Task";

export default class TaskList extends Component {
  render() {
    const { tasks, onDelete } = this.props;

    const elements = tasks.map((item) => {
      const { id, ...itemProps } = item;

      return <Task key={id} {...itemProps} onDelete={() => onDelete(id)} />;
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
