
import { useDispatch, useSelector } from 'react-redux';
import { resetSudoku, setCurrentBoard, setGameStarted, setInitialBoard } from '../../redux/reduxSlices/sudokuSlice';
import { generateSudoku } from '../../utils/generateSudoku.util';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

import './sudokuResult.scss'
import gameService from '../../services/client/game.service';

function SudokuResult({ win }) { ////////
  const dispatch = useDispatch(); 

  const autoSolved = useSelector((state) => state.sudoku.autoSolved);
  const currentBoard = useSelector((state) => state.sudoku.currentBoard);
  const gameMode = useSelector((state) => state.sudoku.gameMode);
  const userName = useSelector((state) => state.sudoku.userName);

  const handleResetClick = () => {
    dispatch(setGameStarted(false));

    dispatch(resetSudoku());
    const newBoard = generateSudoku(gameMode);
    dispatch(setInitialBoard(newBoard))

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.classList.remove('user-inputed', 'wrong-pos');
      const input = cell.querySelector('.cell__input-value');
      input.removeAttribute("disabled");
      input.classList.remove('v-hidden', 'auto-solve-effect');
    })

    dispatch(setCurrentBoard(newBoard));
    const resultAlert = document.querySelector('.result-theme');
    console.log('resultAlert:', resultAlert);
    resultAlert.classList.add('d-none');
  }

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const timeSolved = useRef();

  useEffect(() => {
    if (!win) {
      setTitle('Game Over');
      setDescription('You have make 3 mistakes and lose the game');
    } else {
      setTitle('Congratulation !');
      setDescription('You have won the game');
    }

    if (!autoSolved) {
      document.querySelector('.result-theme').classList.remove('d-none');
      timeSolved.current = document.querySelector('.time__display').innerHTML;
      updateResultToDatabase(currentBoard, timeSolved);
      dispatch(setGameStarted(false));
    }
  }, [win])

  const updateResultToDatabase = async (currentBoard, timeSolved) => {
    const [hours, minutes, seconds] = timeSolved.current.split(":").map(Number);
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds; // convert to seconds
    
    await gameService.create({
      userName: userName,
      board: currentBoard,
      timeSolved: totalTimeInSeconds,
      gameMode: gameMode
    });
  }

  return (
    <div className="result-theme d-none">
      <div className='result-theme__box'>
        <h2 className='result-theme__box--title'>
          {title}
        </h2>
        <strong>             
          {description}
        </strong>
        <Button 
          className='result-theme__box--restart'
          onClick={handleResetClick}
        >
          Start new game
        </Button>
      </div>
    </div>
  )
}

export default SudokuResult;