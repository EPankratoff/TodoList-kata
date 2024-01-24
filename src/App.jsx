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
      this.createTaskItem('Completed task', 10, 0),
      this.createTaskItem('Active task', 12, 1),
      this.createTaskItem('Drink Coffee', 1, 4),
    ],
    filter: 'All',
  }

  createTaskItem(label, min, sec) {
    const createdData = new Date()
    const id = this.maxId++

    return {
      id,
      label,
      min,
      sec,
      createdData,
      editing: false,
      completed: false,
      created: formatDistanceToNow(createdData, {
        addSuffix: true,
        includeSeconds: true,
      }),
    }
  }

  startTimer = (id) => {
    this.setState((prevState) => {
      const updatedTaskData = prevState.taskData.map((task) => {
        if (task.id === id && !task.timerRunning) {
          const intervalId = setInterval(() => {
            this.setState((prevState) => {
              const updatedData = prevState.taskData.map((t) => {
                if (t.id === id) {
                  if (t.sec > 0) {
                    t.sec -= 1
                  } else if (t.min > 0) {
                    t.sec = 59
                    t.min -= 1
                  } else {
                    clearInterval(t.intervalId)
                    t.timerRunning = false
                  }
                }
                return t
              })
              return { taskData: updatedData }
            })
          }, 1000)

          return { ...task, timerRunning: true, intervalId }
        }
        return task
      })

      return { taskData: updatedTaskData }
    })
  }

  stopTimer = (id) => {
    this.setState(({ taskData }) => {
      const newArray = taskData.map((task) => {
        if (task.id === id && task.timerRunning) {
          clearInterval(task.intervalId)
          task.timerRunning = false
        }
        return task
      })
      return { taskData: newArray }
    })
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

  addItem = (text, min, sec) => {
    const newItem = this.createTaskItem(text, min, sec)

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
            taskData={taskData}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
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
