// TaskList.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from './Task/Task'

export default class TaskList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { tasks, onDelete, onToggleCompleted, editItem, startTimer, stopTimer } = this.props
    const elements = tasks.map((item) => {
      const { id, ...itemProps } = item

      return (
        <Task
          key={id}
          {...itemProps}
          onToggleCompleted={() => onToggleCompleted(id)}
          onDelete={() => onDelete(id)}
          editItem={(value) => editItem(id, value)}
          startTimer={() => startTimer(id)}
          stopTimer={() => stopTimer(id)}
        />
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}
TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onToggleCompleted: () => {},
  editItem: () => {},
  startTimer: () => {},
  stopTimer: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
}
