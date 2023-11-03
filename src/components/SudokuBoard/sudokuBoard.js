// React hooks - redux
import { useEffect, memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentBoard, setLiveLeft, setGameStarted, 
        setInitialBoard, resetSudoku, setHintLeft, addMoveToHistory } from "../../redux/reduxSlices/sudokuSlice";
// NPM        
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// Components - utils
import SudokuHint from "../SudokuHint/sudokuHint";
import SudokuAutoSolve from "../SudokuAutoSolve/sudokuAutoSolve";
import Timer from '../Time/timeCounter'
import SudokuReset from "../SudokuReset/sudokuReset";
import SudokuPreviousMove from "../SudokuPreviousMove/sudokuPreviousMove";
import SudokuResult from "../SudokuResult/sudokuResult";
import { generateSudoku } from '../../utils/generateSudoku.util';
// Icons
import { FaHeart } from "react-icons/fa6";
import { IoPlayCircle } from "react-icons/io5";
import { Segmented } from 'antd';

import './sudokuBoard.scss'
import SudokuUserInfo from "../SudokuUserInfo/sudokuUserInfo";

function SudokuBoard() {
  const dispatch = useDispatch();

  const currentBoard = useSelector((state) => state.sudoku.currentBoard);
  const solvedBoard = useSelector((state) => state.sudoku.solvedBoard);
  const hintMode = useSelector((state) => state.sudoku.hintMode);
  const isSolving = useSelector((state) => state.sudoku.solving);
  const autoSolved = useSelector((state) => state.sudoku.autoSolved);
  const gameStarted = useSelector((state) => state.sudoku.gameStarted);
  const liveLeft = useSelector((state) => state.sudoku.liveLeft);
  const initialBoard = useSelector((state) => state.sudoku.initialBoard);
  const hintLeft = useSelector((state) => state.sudoku.hintLeft);
  const moveHistory = useSelector((state) => state.sudoku.moveHistory);
  
  useEffect(() => {  
    const board = generateSudoku('easy');
    dispatch(setInitialBoard(board));
    dispatch(setCurrentBoard(board));
  }, [])
  
  const totalCellInputed = (board) => {
    if (!gameStarted) return;

    let total = 0;
    for (let i = 0; i < board.length; i++)
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) total++;
      } 
    return total;
  } 

  const totalInputed = totalCellInputed(currentBoard);

  const handleCellClick = (e, rowIndex, colIndex) => {
    if (!gameStarted) return;
    
    // Remove previous class
    const cells = document.querySelectorAll('.cell'); // mixin
    cells.forEach(cell => {
        cell.classList.remove('highlighted', 'active');
    });
  
    const currentCell = e.target.parentNode;
    currentCell.classList.add('active');
    
    if (!hintMode) {
      // Get the input element and focus it
      const inputElement = e.target
      if (inputElement) {
        inputElement.focus();
      }
    
      // Highlight all cells in the same row, column and 3x3 block
      for (let i = 0; i < 9; i++) {  // split into mixin -> funcName(r, c)
        for (let j = 0; j < 9; j++) {
            if (i === rowIndex && j === colIndex) continue; // skip checking active cell
            if (i === rowIndex || j === colIndex || 
                (Math.floor(i / 3) === Math.floor(rowIndex / 3) && Math.floor(j / 3) === Math.floor(colIndex / 3))) 
            { 
              const cells = document.querySelector(`.sudoku-table__row:nth-child(${i + 1}) .cell:nth-child(${j + 1})`);
              if (!cells.classList.contains('user-inputed')) {
                cells.classList.add('highlighted');
              }
            }
        }
      }

    } else { // hintMode
      if (hintLeft === 0) return;
      const hintValue = solvedBoard[rowIndex][colIndex];

      const newBoard = currentBoard.map((row) => [...row]);
      newBoard[rowIndex][colIndex] = hintValue;
      dispatch(setCurrentBoard(newBoard));

      const currentCell = document.querySelector(".active");
      currentCell.classList.add('user-inputed');

      const currentInput = currentCell.querySelector('.cell__input-value'); 
      currentInput.classList.remove('v-hidden'); 
      currentInput.setAttribute('disabled', true);
      dispatch(setHintLeft(hintLeft-1));
    }
  }


  const handleInputChange = (e, rowIndex, colIndex) => {
    const value = e.target.value;
    if (value === '' || (value >= 1 && value <= 9)) {
        const newBoard = currentBoard.map((row) => [...row]);

        newBoard[rowIndex][colIndex] = value ? Number(value) : 0;

        // Add to history
        const lastPos = moveHistory.length;
        if ( !lastPos || moveHistory[lastPos-1][0] !== rowIndex || moveHistory[lastPos-1][1] !== colIndex) { // first time add or satisfied condition for other time
          dispatch(addMoveToHistory([rowIndex, colIndex]));
        }

        if (value === '') {
          e.target.parentNode.classList.remove('wrong-pos')

          for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (i === rowIndex || j === colIndex 
                  || (Math.floor(i / 3) === Math.floor(rowIndex / 3) && Math.floor(j / 3) === Math.floor(colIndex / 3))) 
                {
                    const cells = document.querySelector(`.sudoku-table__row:nth-child(${i + 1}) .cell:nth-child(${j + 1})`);
                    if (cells.querySelector('.cell__input-value').value) {
                      cells.classList.remove('wrong-pos');
                  }
                }
            }
          }

        } else {
          let mistake = false;
          for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (i === rowIndex && j === colIndex) continue; 
                if (i === rowIndex || j === colIndex 
                  || (Math.floor(i / 3) === Math.floor(rowIndex / 3) && Math.floor(j / 3) === Math.floor(colIndex / 3))) 
                {
                    const cells = document.querySelector(`.sudoku-table__row:nth-child(${i + 1}) .cell:nth-child(${j + 1})`);
                    if (e.target.value !== '' && cells.querySelector('.cell__input-value').value === e.target.value) {
                      cells.classList.add('wrong-pos');
                      mistake = true
                  }
                }
            }
          }
          if (mistake === true) {
            e.target.parentNode.classList.add('wrong-pos');
            dispatch(setLiveLeft(liveLeft - 1));
          }
        }

        const currrentCell = document.querySelector('.active');
        currrentCell.classList.add('user-inputed');
        dispatch(setCurrentBoard(newBoard));
    }
}

  useEffect(() => {
    const delay = 70;
    const userInputs = document.querySelectorAll('.cell__input-value:not([disabled])');
  
    const addAutoSolveEffect = (index) => {
      if (index < userInputs.length) {
        setTimeout(() => {
          userInputs[index].classList.remove('v-hidden');
          userInputs[index].classList.add('auto-solve-effect');

          const cell =  userInputs[index].parentNode;
          cell.classList.add('user-inputed');

          addAutoSolveEffect(index + 1);
        }, delay);
      }
    };
  
    if (autoSolved) {
      addAutoSolveEffect(0);
    }
  }, [autoSolved]);
  
  const toggleContinue = () => {
    dispatch(setGameStarted(!gameStarted));
  }

  const handleSegmentedChange = (option) => {
    const standardlize = option.toLowerCase();

    dispatch(resetSudoku());
    const newBoard = generateSudoku(standardlize);

    dispatch(setInitialBoard(newBoard));
    dispatch(setCurrentBoard(newBoard));

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.classList.remove('user-inputed');

      const input = cell.querySelector('.cell__input-value');
      input.removeAttribute("disabled");
      // input.classList.remove('v-hidden', 'auto-solve-effect');
    })

  }

  useEffect(() => {
    const cellInputs = document.querySelectorAll('.cell__input-value');

    if (!gameStarted) { // execute when pause or lose the game
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.classList.remove('highlighted', 'active', 'wrong-pos', 'user-inputed');
      })

      cellInputs.forEach(input => {
        input.setAttribute("disabled", true);
      })

    } else {
      cellInputs.forEach(input => {
        input.classList.remove('v-hidden');

        const rowIndex = parseInt(input.getAttribute('data-row-index'));
        const colIndex = parseInt(input.getAttribute('data-col-index'));
      
        if (initialBoard[rowIndex][colIndex] === 0) {
          input.removeAttribute('disabled');
        }
      });
    }
  }, [gameStarted])

  return (  
    <>
      <div className="sudoku-wrapper">
        <div className="sudoku-wrapper__top">
          <Segmented 
            options={['Easy', 'Medium', 'Hard']} 
            className='game-mode' 
            onChange={handleSegmentedChange}
          />
          <div className="sudoku-live-left">
            <span>Lives left:</span>
            {[...Array(liveLeft)].map((_, i) => (
              <FaHeart key={i} />
            ))}
          </div>
          {totalInputed !== 81 ? <Timer /> : <Timer reset={true} />}
        </div>
        <div className="sudoku-wrapper__bottom">
          <div className="table-wrapper">
            {!gameStarted && liveLeft > 0 &&
              <div className='pause-theme' onClick={() => toggleContinue()}>
                <IoPlayCircle />
              </div>
            }
            {totalInputed === 81 && <SudokuResult win={true}/> }
            {liveLeft === 0 && <SudokuResult win={false}/>}
            {currentBoard.length > 0 ? (
              <table className="sudoku-table">
                <tbody>
                    {currentBoard.map((row, rowIndex) => (
                      <tr className="sudoku-table__row" key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td key={colIndex}
                              className={"cell"} 
                          >
                            {!isSolving || initialBoard[rowIndex][colIndex] !== 0 ? 
                              <input 
                                className={`cell__input-value ${!gameStarted ? 'v-hidden' : ""}`}
                                value = {cell !== 0 ? cell : ''} 
                                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                                onClick={(e) => handleCellClick(e, rowIndex, colIndex)}
                                maxLength={1}
                                disabled={initialBoard[rowIndex][colIndex] !== 0}
                                data-row-index={rowIndex}
                                data-col-index={colIndex}
                                /> 
                            : ( 
                              <>
                                <input 
                                  className="cell__input-skeleton"
                                />
                                <SkeletonTheme baseColor="#fff" highlightColor="#eee">
                                  <Skeleton width={'100%'} height={'160%'}/>
                                </SkeletonTheme>
                              </> 
                              
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
              </table>
            ) : (
              <table className="sudoku-table">
                <tbody>
                    {currentBoard.map((row, rowIndex) => (
                      <tr className="sudoku-table__row" key={rowIndex}>
                          {row.map((cell, colIndex) => (
                            <td key={colIndex}
                                className={"cell"} 
                            >
                              <input className="cell__input-skeleton" style={{background: 'none'}}/>
                              <SkeletonTheme baseColor="#fff" highlightColor="#eee">
                                <Skeleton width={'100%'} height={'160%'}/>
                              </SkeletonTheme>
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
              </table>
            )}
          </div>
          <div className="sudoku-controls">
            <div className="sudoku-controls__btn-wrapper">
              <SudokuUserInfo />
              <SudokuReset />
              <SudokuHint />
              <SudokuAutoSolve />
              <SudokuPreviousMove />
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(SudokuBoard);


/*

disabled
*/