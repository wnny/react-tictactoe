import Board from "./components/Board";
import "./App.css";
import { useState } from "react";

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = `Next Player : ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext((previous) => !previous);
    // setXIsNext(!xIsNext);

    setStepNumber(newHistory.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, idx) => {
    const desc = idx ? "Go to move #" + idx : "Go to game start";
    return (
      <li key={idx}>
        <button className="move-button" onClick={() => jumpTo(idx)}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <h1 className="game-info">Tic Tac Toe</h1>
      <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      <div className="game-info">
        <h2 className="status">{status}</h2>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
