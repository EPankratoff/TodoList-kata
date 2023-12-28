import React, { Component } from 'react'

import './Footer.css'
import PropTypes from 'prop-types'

import TaskFilter from './TaskFilter/TaskFilter'

export default class Footer extends Component {
  render() {
    const { taskCount, clearCompleted, filter, onFilterChange } = this.props

    return (
      <footer className="footer">
        <span className="todo-count"> {taskCount} items left</span>
        <TaskFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.defaultProps = {
  taskCount: 0,
  filter: 'All',
  clearCompleted: () => {},
  onFilterChange: () => {},
}

Footer.propTypes = {
  taskCount: PropTypes.number.isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  clearCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}
