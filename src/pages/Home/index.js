import SudokuBoard from "../../components/SudokuBoard/sudokuBoard";
import Timer from "../../components/Time/timeCounter";

function Home() {
  return (
    <div>
      <Timer />
      <SudokuBoard />
    </div>
  )
}

export default Home;