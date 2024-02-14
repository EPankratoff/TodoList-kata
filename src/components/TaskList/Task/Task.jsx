import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

const Task = ({
  label,
  onDelete,
  onToggleCompleted,
  completed,
  min,
  sec,
  id,
  startTimer,
  stopTimer,
  editItem,
  createdData,
}) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(label)

  useEffect(() => {
    if (completed) {
      stopTimer(id)
    }
  }, [completed, id])

  const handleToggleEditing = () => {
    setEditing(!editing)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (value.trim() === '') {
      return
    }
    editItem(value)
    setEditing(false)
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handlePlayTimer = () => {
    startTimer(id)
  }

  const handleStopTimer = () => {
    stopTimer(id)
  }

  const timeDifference = formatDistanceToNow(createdData, {
    addSuffix: true,
    includeSeconds: true,
  })

  let classNames = ''
  if (completed) {
    classNames += 'completed'
  }
  if (editing) {
    classNames += ' editing'
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleCompleted} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={handlePlayTimer}></button>
            <button className="icon icon-pause" onClick={handleStopTimer}></button>
            <span className="timer">
              {min}:{sec}
            </span>
          </span>
          <span className="created description">{timeDifference}</span>
        </label>
        <button className="icon icon-edit" onClick={handleToggleEditing}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <input type="text" className="edit" value={value} onChange={handleChange} onBlur={handleSubmit} />
        </form>
      )}
    </li>
  )
}

Task.defaultProps = {
  label: '',
  onDelete: () => {},
  onToggleCompleted: () => {},
  completed: false,
  createdData: () => new Date(),
  id: 0,
}

Task.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  editItem: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
}

export default Task
