import React, { Component } from 'react'
import './App.css'
import { formatDistanceToNow } from 'date-fns'

import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList/TaskList'

export default class App extends Component {
  maxId = 100
  state = {
    taskData: [
      this.createTaskItem('Completed task'),
      this.createTaskItem('Active task'),
      this.createTaskItem('Drink Coffee'),
    ],
    filter: 'All',
  }

  createTaskItem(label) {
    const createdData = new Date()
    return {
      label,
      createdData,
      editing: false,
      completed: false,
      id: this.maxId++,
      created: formatDistanceToNow(createdData, {
        addSuffix: true,
        includeSeconds: true,
      }),
    }
  }

  filter(items, filter) {
    if (filter === 'All') {
      return items
    } else if (filter === 'Active') {
      return items.filter((el) => !el.completed)
    } else if (filter === 'Completed') {
      return items.filter((el) => el.completed)
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  filteredItems = () => {
    const { taskData, filter } = this.state
    return taskData.filter(({ completed }) => {
      const all = filter === 'All'
      const compl = filter === 'Completed'
      return all ? true : compl ? completed === true : completed === false
    })
  }

  addItem = (text) => {
    const newItem = this.createTaskItem(text)

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem]
      return {
        taskData: newArr,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ taskData }) => {
      const indx = taskData.findIndex((el) => el.id === id)

      const newArray = [...taskData.slice(0, indx), ...taskData.slice(indx + 1)]

      return {
        taskData: newArray,
      }
    })
  }

  editItem(id, text) {
    this.setState((prevState) => ({
      taskData: prevState.taskData.map((element) => {
        if (element.id === id) element.label = text
        return element
      }),
    }))
  }

  clearCompleted = () => {
    this.setState(({ taskData }) => {
      const newArray = taskData.filter((el) => !el.completed)
      return {
        taskData: newArray,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ taskData }) => {
      const updatedData = taskData.map((el) => {
        if (el.id === id) {
          return { ...el, completed: !el.completed }
        }
        return el
      })
      return {
        taskData: updatedData,
        tasks: this.filter(updatedData, this.state.filter),
      }
    })
  }

  render() {
    const { taskData, filter } = this.state
    const completedCount = taskData.filter((el) => !el.completed).length

    return (
      <div className="todoapp">
        <NewTaskForm onItemAdd={this.addItem} />

        <section className="main">
          <TaskList
            editItem={(id, value) => this.editItem(id, value)}
            tasks={this.filteredItems()}
            onDelete={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
          />
          <Footer
            filter={filter}
            onFilterChange={this.onFilterChange}
            taskCount={completedCount}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </div>
    )
  }
}
