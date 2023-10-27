import React, { useState, useEffect } from 'react';
import './timeCounter.scss'

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  if (!isActive) {
    const cellInputs = document.querySelectorAll('.cell__input-value');
    cellInputs.forEach(cell => {
      cell.setAttribute("disabled", true);
    })
  } else {
    const cellInputs = document.querySelectorAll('.cell__input-value');
    cellInputs.forEach(cell => {
      cell.removeAttribute("disabled");
    })
  }

  function toggle() {
    setIsActive(!isActive);
  }

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className="time">
        {seconds}s
      </div>
      <div className="time__controller">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

