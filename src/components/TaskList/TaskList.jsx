import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task/Task'

const TaskList = ({ tasks, onDelete, onToggleCompleted, editItem }) => {
  const elements = tasks.map((item) => {
    const { id, ...itemProps } = item

    return (
      <Task
        id={id}
        editItem={(value) => editItem(id, value)}
        key={id}
        {...itemProps}
        onToggleCompleted={() => onToggleCompleted(id)}
        onDelete={() => onDelete(id)}
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
export default TaskList
