import { useDispatch, useSelector } from 'react-redux';
import { resetSudoku, setCurrentBoard, setGameStarted, setInitialBoard } from '../../redux/reduxSlices/sudokuSlice';
import { generateSudoku } from '../../utils/generateSudoku.util';

import { Popconfirm, Tooltip, message } from 'antd';
import { AiOutlineUndo } from "react-icons/ai";
import './sudokuReset.scss';

function SudokuReset() {
  const dispatch = useDispatch();

  const gameMode = useSelector((state) => state.sudoku.gameMode);

  const handleResetClick = () => {
    dispatch(setGameStarted(false));

    dispatch(resetSudoku());
    const newBoard = generateSudoku(gameMode)
    dispatch(setInitialBoard(newBoard))

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.classList.remove('user-inputed', 'wrong-pos');
      const input = cell.querySelector('.cell__input-value');
      input.removeAttribute("disabled");
      input.classList.remove('v-hidden', 'auto-solve-effect');
    })

    dispatch(setCurrentBoard(newBoard));
  }

  const confirmReset = (e) => {
    message.success('New game started !');
    handleResetClick();
  };

  return (
    <Tooltip title='Start new game' placement="right" color='#61bab779'>
      <Popconfirm
        placement="top"
        title="Game reset"
        description="Are you sure to reset the game ?"
        onConfirm={confirmReset}
        okText="Yes"
        cancelText="No"
        >
        <div className='reset-btn-wrapper btn-controllers'>
          <AiOutlineUndo />
        </div>
      </Popconfirm>
    </Tooltip>
  )
}

export default SudokuReset;