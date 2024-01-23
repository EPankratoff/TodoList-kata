// TaskList.js
import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task/Task'

const TaskList = ({ tasks, onDelete, onToggleCompleted, editItem, timers, activeTab, onTimerUpdate }) => {
  const elements = tasks.map((item) => {
    const { id, ...itemProps } = item
    const timerKey = item.timerKey
    const timer = timers[timerKey] || {}

    return (
      <Task
        key={id}
        id={id}
        {...itemProps}
        onToggleCompleted={() => onToggleCompleted(id)}
        onDelete={() => onDelete(id)}
        timerValue={timer.value || 0}
        timerRunning={timer.running || false}
        activeTab={activeTab}
        onTimerUpdate={(newTimer) => onTimerUpdate(timerKey, newTimer)}
        editItem={(value) => editItem(id, value)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}
TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onToggleCompleted: () => {},
  editItem: () => {},
  timers: {},
  activeTab: 'All',
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      timerKey: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  timers: PropTypes.object,
  activeTab: PropTypes.oneOf(['All', 'Active', 'Completed']),
}

export default TaskList
