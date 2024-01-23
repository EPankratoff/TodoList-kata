// TimerContext.js
import { createContext, useContext, useState } from 'react'

const TimerContext = createContext()

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState({})

  const updateTimer = (timerKey, newTimer) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [timerKey]: newTimer,
    }))
  }

  return <TimerContext.Provider value={{ timers, updateTimer }}>{children}</TimerContext.Provider>
}

export const useTimerContext = () => useContext(TimerContext)
