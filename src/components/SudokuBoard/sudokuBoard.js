import { useState } from "react";

import './sudokuBoard.scss'

function SudokuBoard() {
  const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selectedCell, setSelectedCell] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [highlightedColumn, setHighlightedColumn] = useState(null);

  const handleCellClick = (e, rowIndex, colIndex) => {
    if (selectedCell) {

      // remove previous selected cell
      const prevCell = document.querySelector(`.sudoku-table__row--cell.active`);
      if (prevCell) {
        prevCell.classList.remove('active');
      }
    }

    const currentCell = e.target;
    currentCell.classList.add('active');

    setSelectedCell({ rowIndex, colIndex });
    setHighlightedRow(rowIndex);
    setHighlightedColumn(colIndex);
  }

  console.log('selected:', selectedCell);
  console.log('highlight col:', highlightedColumn)

  return (
    <>
      <div className="sudoku-wrapper">
        <table className="sudoku-table">
          <tbody>
            {board.map((row, rowIndex) => (
              <tr className="sudoku-table__row" key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td 
                    className={`sudoku-table__row--cell ${
                      selectedCell && (
                        selectedCell.rowIndex === rowIndex &&
                        selectedCell.colIndex === colIndex
                      ) ? 'active' : ''
                    }
                    ${
                      (rowIndex === highlightedRow || colIndex === highlightedColumn) &&
                      (
                        selectedCell.rowIndex !== rowIndex ||
                        selectedCell.colIndex !== colIndex
                      )
                       ? 'highlighted' : ''
                    }`} 
                    key={colIndex}
                    onClick={(e) => handleCellClick(e, rowIndex, colIndex)}
                  >
                    {cell !== 0 ? cell : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SudokuBoard;