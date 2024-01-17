import React, { Component } from 'react'
import './newTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange = (e) => {
    if (e.target.value > 60 || e.target.value < 0) {
      return
    }
    this.setState({
      minutes: e.target.value,
    })
  }

  onSecChange = (e) => {
    if (e.target.value > 60 || e.target.value < 0) {
      return
    }
    this.setState({
      seconds: e.target.value,
    })
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.onSubmit()
      event.preventDefault()
    }
  }

  onSubmit = () => {
    const { label, minutes, seconds } = this.state

    if (label.trim() === '' || minutes.trim() === '' || seconds.trim() === '') {
      return
    } else if (isNaN(minutes) || isNaN(seconds)) {
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      })
    } else {
      this.props.onItemAdd(label, Number(minutes), Number(seconds))

      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      })
    }
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            onKeyDown={this.onKeyDown}
            value={this.state.label}
          />

          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onMinChange}
            onKeyDown={this.onKeyDown}
            value={this.state.minutes}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onSecChange}
            value={this.state.seconds}
            onKeyDown={this.onKeyDown}
          />
        </form>
      </header>
    )
  }
}
