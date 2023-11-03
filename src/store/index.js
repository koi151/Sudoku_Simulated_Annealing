import { configureStore } from "@reduxjs/toolkit";
import sudokuSlice from "../redux/reduxSlices/sudokuSlice";

const store = configureStore({
    reducer: {
      sudoku: sudokuSlice
    }
})

export default store;