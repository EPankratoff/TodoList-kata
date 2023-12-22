import React, { Component } from "react";

export default class Task extends Component {
  render() {
    const { label, created, onDelete, onToggleCompleted, completed } =
      this.props;
    let classNames = "";

    if (completed) {
      classNames += "completed";
    }
    return (
      <li className={classNames} onClick={onToggleCompleted}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">{label}</span>
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button onClick={onDelete} className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  label: "",
  onDelete: () => {},
  onToggleCompleted: () => {},
  created: "",
  completed: false,
};
