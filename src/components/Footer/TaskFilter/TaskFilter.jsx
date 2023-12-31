import React, { Component } from 'react'
import './TaskFilter.css'
import PropTypes from 'prop-types'
export default class TaskFilter extends Component {
  render() {
    const { filter, onFilterChange } = this.props
    return (
      <ul className="filters">
        <li>
          <button type="button" onClick={() => onFilterChange('All')} className={filter === 'All' ? 'selected' : null}>
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => onFilterChange('Active')}
            className={filter === 'Active' ? 'selected' : null}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => onFilterChange('Completed')}
            className={filter === 'Completed' ? 'selected' : null}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TaskFilter.defaultProps = {
  filter: 'All',
  onFilterChange: () => {},
}

TaskFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
}
