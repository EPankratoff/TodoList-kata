import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: props.label,
      timerValue: props.timerValue,
      timerRunning: false,
    }

    this.handleToggleEditing = this.handleToggleEditing.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStartTimer = this.handleStartTimer.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
  }

  componentDidMount() {
    if (this.state.timerValue === 0 && this.props.min > 0) {
      this.setState({
        timerValue: this.props.min * 60 + this.props.sec,
      })
    }

    if (this.props.timerRunning && this.state.timerValue > 0) {
      this.startTimer()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.completed !== prevProps.completed) {
      if (this.props.completed) {
        this.pauseTimer()
      }
    }

    if (this.props.timerRunning && this.props.activeTab === 'Active') {
      this.setState({
        timerValue: this.props.timerValue,
        timerRunning: this.props.timerRunning,
      })
    }
  }
  componentWillUnmount() {
    this.pauseTimer()
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

  startTimer = () => {
    this.setState(
      ({ timerValue }) => ({
        timerValue: timerValue > 0 ? timerValue - 1 : 0,
      }),
      () => {
        if (this.state.timerRunning && this.state.timerValue > 0) {
          setTimeout(this.startTimer, 1000)
        }
      }
    )
  }

  handleStartTimer() {
    const { timerRunning, timerValue } = this.state

    if (!timerRunning && timerValue > 0) {
      this.setState({
        timerRunning: true,
      })
      setTimeout(this.startTimer, 1000)
    } else {
      this.pauseTimer()
    }
  }

  pauseTimer() {
    this.setState({
      timerRunning: false,
    })
  }

  formatTimer() {
    const { timerValue } = this.state
    const minutes = String(Math.floor(timerValue / 60)).padStart(2, '0')
    const seconds = String(timerValue % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  render() {
    const { label, createdData, onDelete, onToggleCompleted, completed } = this.props
    const { editing, value, timerRunning } = this.state

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
              <button className="icon icon-play" onClick={this.handleStartTimer} disabled={timerRunning}></button>
              <button className="icon icon-pause" onClick={this.pauseTimer} disabled={!timerRunning}></button>
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
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
  timerValue: PropTypes.number.isRequired,
  timerRunning: PropTypes.bool.isRequired,
}
