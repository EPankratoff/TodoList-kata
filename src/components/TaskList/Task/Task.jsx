import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: props.label,
      timer: 0,
      timerValue: 12,
    }

    this.handleToggleEditing = this.handleToggleEditing.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStartTimer = this.handleStartTimer.bind(this)
    this.startTimer = this.startTimer.bind(this)
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

  startTimer() {
    this.setState(({ timerValue }) => {
      if (timerValue !== 0) {
        let newTimerValue = timerValue - 1
        return {
          timerValue: newTimerValue,
        }
      }
      this.setState({
        timer: 0,
      })
      return clearTimeout(this.timer)
    })
    this.timer - setTimeout(this.startTimer, 1000)
  }

  handleStartTimer() {
    const { timer } = this.state

    if (timer) {
      return
    }
    this.setState({
      timer: 1,
    })
    setTimeout(this.startTimer, 1000)
  }

  formatTimer() {
    // const { timerValue } = this.state
    const { min, sec } = this.props
    const minutes = String(Math.floor(min)).padStart(2, '0')
    const seconds = String(Math.floor(sec)).padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  render() {
    const { label, createdData, onDelete, onToggleCompleted, completed } = this.props
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
              <button className="icon icon-play" onClick={this.handleStartTimer}></button>
              <button className="icon icon-pause"></button>
              <span className="timer">{this.formatTimer()}</span>
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
