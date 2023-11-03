import { useDispatch, useSelector } from 'react-redux';

import './sudokuPreviousMove.scss';
import { RiArrowGoBackLine } from "react-icons/ri";
import { removeMoveFromHistory, setCurrentBoard } from '../../redux/reduxSlices/sudokuSlice';
import { Tooltip } from 'antd';


function SudokuPreviousMove() {
  const dispatch = useDispatch();

  const currentBoard = useSelector((state) => state.sudoku.currentBoard);
  const moveHistory = useSelector((state) => state.sudoku.moveHistory);


  const handleMoveBackClick = () => {
    try {
      const recentPos = moveHistory[moveHistory.length-1];
      dispatch(removeMoveFromHistory())
      
      const recentRow = recentPos[0];
      const recentCol = recentPos[1]; 

      const newBoard = currentBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === recentRow && colIndex === recentCol) {
            return 0;
          }
          return cell;
        })
      );

      const cells = document.querySelectorAll('.cell'); // split to mixin
      cells.forEach(cell => {
        cell.classList.remove('highlighted', 'active', 'user-inputed');
      });

      const previousPos = moveHistory[moveHistory.length-2];
      console.log('previousPos:', previousPos);
      const previousRow = previousPos[0];
      const previousCol = previousPos[1]; 

      const cellInputs = document.querySelectorAll('.cell__input-value');
      cellInputs.forEach(input => {

        const rowIndex = parseInt(input.getAttribute('data-row-index'));
        const colIndex = parseInt(input.getAttribute('data-col-index'));
      
        if (rowIndex === previousRow && colIndex === previousCol) {
          input.parentNode.classList.add('active') // get the right .cell and add .active
        }

         // Highlight all cells in the same row, column and 3x3 block
        for (let i = 0; i < 9; i++) {  // split into mixin -> funcName(r, c)
          for (let j = 0; j < 9; j++) {
              if (i === previousRow && j === previousCol) continue; // skip checking active cell
              if (i === previousRow || j === previousCol || 
                  (Math.floor(i / 3) === Math.floor(previousRow / 3) && Math.floor(j / 3) === Math.floor(previousCol / 3))) 
              { 
                const cells = document.querySelector(`.sudoku-table__row:nth-child(${i + 1}) .cell:nth-child(${j + 1})`);
                if (!cells.classList.contains('user-inputed')) {
                  cells.classList.add('highlighted');
                }
              }
          }
        }
      });
      dispatch(setCurrentBoard(newBoard));

      console.log("moveHistory:", moveHistory);
    } catch (error) {
      console.log('ERROR OCCURED:', error);
    }
  }

  return (
   <Tooltip title='Undo move' placement="right" color='#61bab779'>
    <div 
      className='previous-move btn-controllers'
      onClick={handleMoveBackClick}
    >
      <RiArrowGoBackLine/>
    </div>
   </Tooltip> 
  )
}

export default SudokuPreviousMove;