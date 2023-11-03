import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineBulb } from "react-icons/ai";
import gameService from '../../services/client/game.service'
import {
  setHintMode,
  setSolvedBoard,
  setSolving,
  setSolveError,
} from '../../redux/reduxSlices/sudokuSlice.js';
import './sudokuHint.scss'
import { Tooltip } from 'antd';

function SudokuHint() {
  const dispatch = useDispatch();

  const hintMode = useSelector((state) => state.sudoku.hintMode);
  const currentBoard = useSelector((state) => state.sudoku.currentBoard);
  const boardId = useSelector((state) => state.sudoku.id);
  const hintLeft = useSelector((state) => state.sudoku.hintLeft);


  const updateSudoku = async () => {
    try {    
      dispatch(setSolving(true));

      const solvedBoard = await gameService.update({
        board: currentBoard,
        id: boardId
      });

      dispatch(setSolvedBoard(solvedBoard));
      dispatch(setSolving(false));

    } catch (error) {
      dispatch(setSolveError(error));
    }
  }

  const handleHintClick = async () => {
    const hintButton = document.querySelector('.hint-btn');

    if (!hintMode) {
      hintButton.classList.add('active');
      await updateSudoku();
      dispatch(setHintMode(true));
    } else {
      hintButton.classList.remove('active');
      dispatch(setHintMode(false));
    }
  };

  return (
    <Tooltip title='Hint' placement="right" color='#61bab779'>
      <div onClick={handleHintClick} className='hint-btn btn-controllers'>
        <AiOutlineBulb/>
        <div className='hint-btn__hint-left'>
          {hintLeft}
        </div>
      </div>
   </Tooltip> 
  )
}

export default SudokuHint;