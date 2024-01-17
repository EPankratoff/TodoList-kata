import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: props.label,
    }

    this.handleToggleEditing = this.handleToggleEditing.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleToggleEditing() {
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }))
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.value.trim() === '') {
      return
    }
    const { editItem } = this.props
    editItem(this.state.value)
    this.setState({ editing: false })
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  render() {
    const { label, createdData, onDelete, onToggleCompleted, completed, min, sec } = this.props
    const { editing, value } = this.state

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
              <button className="icon icon-play"></button>
              <button className="icon icon-pause"></button>
              <span className="timer">
                {min}:{sec}
              </span>
            </span>
            <span className="created description">{timeDifference}</span>
          </label>
          <button className="icon icon-edit" onClick={this.handleToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        {editing && (
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="edit" value={value} onChange={this.handleChange} onBlur={this.handleSubmit} />
          </form>
        )}
      </li>
    )
  }
}

Task.defaultProps = {
  label: '',
  onDelete: () => {},
  onToggleCompleted: () => {},
  created: '',
  completed: false,
  createdData: () => new Date(),
}

Task.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  editItem: PropTypes.func.isRequired,
  createdData: PropTypes.func.isRequired,
}
