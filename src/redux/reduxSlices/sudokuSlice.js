import { createSlice } from "@reduxjs/toolkit";

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState: {
    userName: null,
    initialBoard: [],
    currentBoard: [], 
    solvedBoard: [],
    gameMode: 'easy',
    liveLeft: 3,
    hintLeft: 3,
    moveHistory: [],
    gameStarted: false,
    solving: false, 
    autoSolved: false,
    hintMode: false,
    timeReset: true,
    error: null,
  },

  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload
    },

    setInitialBoard: (state, action) => {
      state.initialBoard = action.payload
    },

    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },

    setSolvedBoard: (state, action) => {
      state.solvedBoard = action.payload;
      state.solving = false;
    },

    setGameMode: (state, action = 'easy') => {
      state.gameMode = action.payload;
    },

    setLiveLeft: (state, action = 3) => {
      state.liveLeft = action.payload;
    },

    setHintLeft: (state, action = 3) => {
      state.hintLeft = action.payload;
    },

    addMoveToHistory: (state, action) => {
      state.moveHistory.push(action.payload);
    },

    removeMoveFromHistory: (state, action) => {
      state.moveHistory.pop();
    },

    setGameStarted: (state, action) => {
      state.gameStarted = action.payload
    },

    setSolving: (state, action) => {
      state.solving = action.payload;
      state.error = null;
    },

    setAutoSolved: (state, action) => {
      state.autoSolved = action.payload
    },

    setHintMode: (state, action) => {
      state.hintMode = action.payload
    },

    setTimeReset: (state, action) => {
      state.timeReset = action.payload
    },

    setSolveError: (state, action) => {
      state.solving = false;
      state.error = action.payload;
    },

    resetSudoku: state => {
      return {
        ...state,
        userName: null,
        initialBoard: [],
        currentBoard: [], 
        solvedBoard: [],
        gameMode: 'easy',
        liveLeft: 3,
        hintLeft: 3,
        moveHistory: [],
        gameStarted: false,
        solving: false, 
        autoSolved: false,
        hintMode: false,
        timeReset: true,
        error: null,
      }
    }
  
  }
})

export const { 
  setUserName,
  setBoardId,
  setInitialBoard,
  setCurrentBoard,
  setGameMode,
  setLiveLeft,
  setHintLeft,
  setSolvedBoard,
  setGameStarted,
  setSolving,
  setHintMode,
  setMoveHistory,
  setAutoSolved,
  setTimeReset,
  setSolveError,
  resetSudoku,
  addMoveToHistory,
  removeMoveFromHistory
} = sudokuSlice.actions;

export const getInitialBoard = (state) => state.sudoku.initialBoard;

export default sudokuSlice.reducer