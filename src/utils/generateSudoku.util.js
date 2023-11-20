// xáo trộn ngẫu nhiên các phần tử trong một mảng, sau đó trả về một mảng con chứa số lượng phần tử mong muốn
function getRandomSample(array, count) { //  Fisher-Yates 
  let shuffled = array.slice(0), 
      i = array.length, 
      min = i - count, // xác định giới hạn dưới
      temp, index;

  while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(min);
}


function countNonZeroInBlock(board, rowStart, colStart) {
  let count = 0;
  
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (board[i][j] !== 0) {
        count++;
      }
    }
  }
  
  return count ;
}

export function generateSudoku(gameMode) { 
  let totalGivenCell;
  switch (gameMode) {
    case 'easy':
      totalGivenCell = 36;
      break;
    case 'medium':
      totalGivenCell = 28;
      break;
    case 'hard':
      totalGivenCell = 21;
      break;
    default: break;
  }

  let base = 3;
  let side = base * base;
  let nums = Array.from({length: side}, (_, i) => i + 1); // number allowed (1 -> 9)
  let board = Array.from({length: side}, () => Array(side).fill(null)); // initial null board

  // Đảm bảo giá trị trong mỗi khối 3x3, dòng và cột không trùng lặp:
  function pattern(r, c) { 

    return (base * (r % base) + Math.floor(r / base) + c) % side; 
  }

  let rBase = Array.from({length: base}, (_, i) => i);  // [0, 1, 2]

  let rows = [];
  let cols = [];
  for (let g of getRandomSample(rBase, base)) {
      for (let r of getRandomSample(rBase, base)) {
          rows.push(g * base + r);
      }
      for (let c of getRandomSample(rBase, base)) {
          cols.push(g * base + c);
      }
  }

  // Xáo trộn ngãu nhiên
  nums = getRandomSample(nums, nums.length);

  // produce board using randomized baseline pattern
  for (let r of rows) {
      for (let c of cols) {
          board[r][c] = nums[pattern(r, c)];
      }
  }

  let squares = side * side;
  let empties = 81 - totalGivenCell
  for (let p of getRandomSample(Array.from({length: squares}, (_, i) => i), empties)) {
      board[Math.floor(p / side)][p % side] = 0;
  }

  for (let r = 0; r < 9; r += 3) {
    for (let c = 0; c < 9; c += 3) {
      if (countNonZeroInBlock(board, r, c) > 7) 
        return generateSudoku(gameMode);
    }
  }

  return board;
}