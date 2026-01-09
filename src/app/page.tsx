"use client";
import { useState } from "react";
import { NUM_OF_ROW } from "./constants/constants";

import Board from "./components/tictactoe/Board";

export default function Game() {
  const [content, setContent] = useState<string>("O");
  const [squares, setSquares] = useState<any[]>(Array(25).fill(null));

  const handleClickSquare = (i:number) => {
        const newSquares = [...squares];
        newSquares[i] = content;
        setSquares(newSquares);
  } 

  const reset = () => {
    setSquares(Array(25).fill(null));
  }

  return (
    <main>
      <Board squares={squares} squareClicked={handleClickSquare}/>
      <button onClick={reset} className="font-bold">RESET</button>
    </main>
  );
}