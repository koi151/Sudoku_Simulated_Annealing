import { useState, useRef } from "react";
import { Button, Popconfirm, message } from "antd";
import './sudokuBoard.scss'

function SudokuBoard() {
 
  const initialBoard = [
    [0, 2, 4, 0, 0, 7, 0, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 8, 0, 4, 1, 5],
    [4, 3, 1, 0, 0, 5, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 3, 2],
    [7, 9, 0, 0, 0, 0, 0, 6, 0],
    [2, 0, 9, 7, 1, 0, 8, 0, 0],
    [0, 4, 0, 0, 9, 3, 0, 0, 0],
    [3, 1, 0, 0, 0, 4, 7, 5, 0]
  ];

  const [time, setTime] = useState(0);
  // const [timerOn, setTimerOn] = useState(false);
  const [board, setBoard] = useState(initialBoard);
  const [selectedCell, setSelectedCell] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [highlightedColumn, setHighlightedColumn] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const liveLeft = useRef(3);

  console.log('render')
  const handleResetClick = () => {
    liveLeft.current = 3;

    // setTime(0);
    // setTimerOn(false);

    setBoard(initialBoard);
    setGameOver(false);
  };
  
  const totalCellInputed = (board) => {
    if (gameOver) return;

    let total = 0;
    for (let i = 0; i < board.length; i++)
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) total++;
      } 
    return total;
  } 

  const totalInputed = totalCellInputed(board);

  const handleCellClick = (e, rowIndex, colIndex) => {
    if (gameOver) return;

    // Remove previous class
    const cells = document.querySelectorAll('.cell');
     cells.forEach(cell => {
        cell.classList.remove('highlighted');
        cell.classList.remove('active');
    });
  
    const currentCell = e.target.closest(".cell");
    currentCell.classList.add('active');

    // Get the input element and focus it
    const inputElement = currentCell.querySelector('.cell__input-value');
    if (inputElement) {
      inputElement.focus();
    }

    setSelectedCell({ rowIndex, colIndex });
   
    // Highlight all cells in the same row, column and 3x3 block
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          if (i === rowIndex && j === colIndex) continue; // skip active cell
          if (i === rowIndex || j === colIndex || 
              (Math.floor(i / 3) === Math.floor(rowIndex / 3) && Math.floor(j / 3) === Math.floor(colIndex / 3))) 
          {
              const cells = document.querySelector(`.sudoku-table__row:nth-child(${i + 1}) .cell:nth-child(${j + 1})`);
              cells.classList.add('highlighted');
          }
      }
    }

    setHighlightedRow(rowIndex);
    setHighlightedColumn(colIndex);
  }


  const handleInputChange = (e, rowIndex, colIndex) => {
    const value = e.target.value;
    if (value === '' || (value >= 1 && value <= 9)) {
        const newBoard = [...board];
        newBoard[rowIndex][colIndex] = value ? Number(value) : 0;

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
            liveLeft.current -= 1;
          } if (liveLeft.current === 0) {
            setGameOver(true);
          }
        }
        setBoard(newBoard);
    }
}

  const confirmReset = (e) => {
    message.success('New game started !');
    handleResetClick();
  };

  return (
    <>
      <div className="sudoku-wrapper">
        <table className="sudoku-table">
          <tbody>
            {board.map((row, rowIndex) => (
              <tr className="sudoku-table__row" key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}
                      className={"cell"} 
                      onClick={(e) => handleCellClick(e, rowIndex, colIndex)}
                  >
                    <input 
                      className="cell__input-value"
                      value = {cell !== 0 ? cell : ''} 
                      onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                      maxLength={1}
                      disabled={initialBoard[rowIndex][colIndex] !== 0}
                    />
                    <div className="notes">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="notes-items"></div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalInputed === 81 && <h2>Win</h2>}
      {liveLeft.current === 0 && <h2>Losed</h2>}
      {/* <button onClick={() => handleResetClick()}>reset</button> */}
      <Popconfirm
        title="Game reset"
        description="Are you sure to reset the game ?"
        onConfirm={confirmReset}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Reset</Button>
      </Popconfirm>
    </>
  )
}

export default SudokuBoard;