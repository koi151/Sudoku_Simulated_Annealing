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


      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.classList.remove('highlighted', 'active');
      })
      
      const userInputsAfter = document.querySelectorAll(".cell__input-value:not([disabled])");      
      userInputsAfter.forEach(input => {
        if (!input.classList.contains('v-hidden')) {
          input.classList.add('v-hidden');
        }
      })

      dispatch(setAutoSolved(true));   
      dispatch(setCurrentBoard(solvedBoard));

    } catch (error) {
      console.log('can nit')
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