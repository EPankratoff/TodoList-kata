import React, { useState } from 'react'
import './newTaskForm.css'

const NewTaskForm = ({ onItemAdd }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange = (e) => {
    if (e.target.value > 60 || e.target.value < 0) {
      return
    }
    setMinutes(e.target.value)
  }

  const onSecChange = (e) => {
    if (e.target.value > 60 || e.target.value < 0) {
      return
    }
    setSeconds(e.target.value)
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit()
      event.preventDefault()
    }
  }

  const onSubmit = () => {
    if (label.trim() === '' || minutes.trim() === '' || seconds.trim() === '') {
      return
    } else if (isNaN(minutes) || isNaN(seconds)) {
      setLabel('')
      setMinutes('')
      setSeconds('')
    } else {
      onItemAdd(label, Number(minutes), Number(seconds))

      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          onKeyDown={onKeyDown}
          value={label}
        />

        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onMinChange}
          onKeyDown={onKeyDown}
          value={minutes}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onSecChange}
          value={seconds}
          onKeyDown={onKeyDown}
        />
      </form>
    </header>
  )
}
export default NewTaskForm
