import React, { Component } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";

export default class App extends Component {
  maxId = 100;
  state = {
    taskData: [
      this.createTaskItem("Completed task"),
      this.createTaskItem("Active task"),
      this.createTaskItem("Drink Coffee"),
    ],
  };

  createTaskItem(label) {
    return {
      label,
      completed: false,
      id: this.maxId++,
    };
  }

  addItem = (text) => {
    const newItem = this.createTaskItem(text);

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem];
      return {
        taskData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ taskData }) => {
      const indx = taskData.findIndex((el) => el.id === id);

      const newArray = [
        ...taskData.slice(0, indx),
        ...taskData.slice(indx + 1),
      ];

      return {
        taskData: newArray,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const indx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[indx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, indx), newItem, ...arr.slice(indx + 1)];
  }

  onToggleCompleted = (id) => {
    this.setState(({ taskData }) => {
      const updatedData = taskData.map((el) => {
        if (el.id === id) {
          return { ...el, completed: !el.completed };
        }
        return el;
      });
      return {
        taskData: updatedData,
      };
    });
  };

  render() {
    const { taskData } = this.state;
    const completedCount = taskData.filter((el) => el.completed).length;
    return (
      <div className="todoapp">
        <NewTaskForm onItemAdd={this.addItem} />

        <section className="main">
          <TaskList
            tasks={taskData}
            onDelete={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
          />
          <Footer taskCount={completedCount} />
        </section>
      </div>
    );
  }
}
