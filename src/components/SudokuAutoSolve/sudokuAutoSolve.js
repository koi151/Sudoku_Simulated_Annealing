import { useDispatch, useSelector } from 'react-redux';
import gameService from '../../services/client/game.service'
import { setAutoSolved, setSolveError, setCurrentBoard } from '../../redux/reduxSlices/sudokuSlice.js';

import { AiOutlineRobot } from "react-icons/ai";
import { Tooltip } from 'antd';
import './sudokuAutosolve.scss'

function SudokuAutoSolve() {
  const dispatch = useDispatch();

  const currentBoard = useSelector((state) => state.sudoku.currentBoard);
  const gameStarted = useSelector((state) => state.sudoku.gameStarted);

  const handleAutoSolve = async () => {
    try {    
      if (!gameStarted) return

      const solvedBoard = await gameService.solve({
        board: currentBoard,
      });

      dispatch(setAutoSolved(true));  
      
      const userInputsAfter = document.querySelectorAll(".cell__input-value:not([disabled])");
      console.log('userInputsAfter:', userInputsAfter);
      userInputsAfter.forEach(input => { 
        console.log('input:', input);
        input.classList.add('v-hidden');
      })   
       
      dispatch(setCurrentBoard(solvedBoard));

    } catch (error) {
      dispatch(setSolveError(error));
    }
  }

  return (
    <Tooltip title='Auto solving' placement="right" color='#61bab779'>
      <div onClick={handleAutoSolve} className='auto-solve-btn btn-controllers'>
        <AiOutlineRobot />
      </div>
    </Tooltip> 
  )
}

export default SudokuAutoSolve;