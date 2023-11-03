import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGameStarted, setTimeReset } from "../../redux/reduxSlices/sudokuSlice";
import { FaPlay, FaPause } from "react-icons/fa6";

import './timeCounter.scss'

const Timer = () => {
  const dispatch = useDispatch();

  const gameStarted = useSelector((state) => state.sudoku.gameStarted);
  const timeReset = useSelector((state) => state.sudoku.timeReset);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (timeReset) {
      setSeconds(0);
      dispatch(setTimeReset(false));
    }
  }, [timeReset])


  useEffect(() => {
    let interval = null;
    if (gameStarted) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!gameStarted && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, seconds]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  return (
    <div className='time'>
      <div className="time__display">
        {formatTime(seconds)}
      </div>
      <div className="time__controls" onClick={() => dispatch(setGameStarted(!gameStarted))}>
        {gameStarted ? <FaPause /> : <FaPlay/>}
      </div>
    </div>
  );
};

export default Timer;

