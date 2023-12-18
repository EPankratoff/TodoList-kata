import React, { Component } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";

export default class App extends Component {
  state = {
    taskData: [
      {
        label: "Completed task",
        created: "created 17 seconds ago",
        id: 1,
        completed: false,
      },
      {
        label: "Active task",
        created: "created 5 seconds ago",
        id: 2,
        completed: false,
      },
    ],
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
  render() {
    return (
      <div className="todoapp">
        <NewTaskForm />

        <section className="main">
          <TaskList tasks={this.state.taskData} onDelete={this.deleteItem} />
          <Footer />
        </section>
      </div>
    );
  }
}
