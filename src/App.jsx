// eslint-disable-next-line import/order
import React, { useState } from 'react'

import './App.css'
import { formatDistanceToNow } from 'date-fns'

import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList/TaskList'

const createTaskItem = (label, min, sec) => {
  const createdData = new Date()
  const id = new Date().getTime()

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

const App = () => {
  const [taskData, setTaskData] = useState([])

  const [filter, setFilter] = useState('All')

  const startTimer = (id) => {
    setTaskData((prevTaskData) => {
      const updatedTaskData = prevTaskData.map((task) => {
        if (task.id === id && !task.timerRunning) {
          const intervalId = setInterval(() => {
            setTaskData((prevTaskData) => {
              const updatedData = prevTaskData.map((t) => {
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
              return updatedData
            })
          }, 1000)

          return { ...task, timerRunning: true, intervalId }
        }
        return task
      })

      return updatedTaskData
    })
  }

  const stopTimer = (id) => {
    setTaskData((prevTaskData) => {
      const newArray = prevTaskData.map((task) => {
        if (task.id === id && task.timerRunning) {
          clearInterval(task.intervalId)
          task.timerRunning = false
        }
        return task
      })
      return newArray
    })
  }

  const filterItems = (items, filter) => {
    if (filter === 'All') {
      return items
    } else if (filter === 'Active') {
      return items.filter((el) => !el.completed)
    } else if (filter === 'Completed') {
      return items.filter((el) => el.completed)
    }
  }

  const onFilterChange = (selectedFilter) => {
    setFilter(selectedFilter)
  }

  const filteredItems = () => {
    return filterItems(taskData, filter)
  }

  const addItem = (text, min, sec) => {
    const newItem = createTaskItem(text, min, sec)

    setTaskData((prevTaskData) => [...prevTaskData, newItem])
  }

  const deleteItem = (id) => {
    setTaskData((prevTaskData) => prevTaskData.filter((el) => el.id !== id))
  }

  const editItem = (id, text) => {
    setTaskData((prevTaskData) =>
      prevTaskData.map((element) => {
        if (element.id === id) element.label = text
        return element
      })
    )
  }

  const clearCompleted = () => {
    setTaskData((prevTaskData) => prevTaskData.filter((el) => !el.completed))
  }

  const onToggleCompleted = (id) => {
    setTaskData((prevTaskData) =>
      prevTaskData.map((el) => {
        if (el.id === id) {
          return { ...el, completed: !el.completed }
        }
        return el
      })
    )
  }

  const completedCount = taskData.filter((el) => !el.completed).length

  return (
    <div className="todoapp">
      <NewTaskForm onItemAdd={addItem} />

      <section className="main">
        <TaskList
          editItem={editItem}
          tasks={filteredItems()}
          onDelete={deleteItem}
          onToggleCompleted={onToggleCompleted}
          taskData={taskData}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          filter={filter}
          onFilterChange={onFilterChange}
          taskCount={completedCount}
          clearCompleted={clearCompleted}
        />
      </section>
    </div>
  )
}

export default App
