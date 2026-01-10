"use client";
import { useState, useEffect } from "react";
import { NUM_OF_ROW } from "./constants/constants";

import Board from "./components/tictactoe/Board";

const winJudger = (x: number, y: number, squares: (string | null)[][]) => {
  let win = false;
  const now = squares[x][y];

  const vec = [
    [1,  1],
    [1,  0],
    [0,  1],
    [1, -1],
  ];

  for(let v = 0; v < 4; v++) {
    let count = 1;
    let [nowIndexX, nowIndexY] = [x, y];
    while(!win) {
      nowIndexX -= vec[v][0]; nowIndexY -= vec[v][1];
      if (nowIndexX < 0 || nowIndexY < 0) break;
      let judgeeSquare = squares[nowIndexX][nowIndexY];
      if (!judgeeSquare || judgeeSquare !== now) break;
      count++; 
      console.log(nowIndexX, nowIndexY);
      if (count >= 5) {win = true; return true;}
    }

    [nowIndexX, nowIndexY] = [x, y];

    while(!win) {
      nowIndexX += vec[v][0]; nowIndexY += vec[v][1];
      if (nowIndexX >= squares[0].length || nowIndexY >= squares.length) break;
      let judgeeSquare = squares[nowIndexX][nowIndexY];
      if (!judgeeSquare || judgeeSquare !== now) break;
      count++; 
      if (count >= 5) {win = true; return true;}
    }
  }
  
  return false;
}


export default function Game() {
  const [content, setContent] = useState<string>("●");
  const [squares, setSquares] = useState<any[][]>(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [win, setWin] = useState<boolean>(false);
  const [isNext, setIsNext] = useState<boolean>(false);

  const handleClickSquare = (x:number, y:number) => {
    if (win) return;
    
    const newSquares = squares.map(row => [...row]);
    newSquares[x][y] = isNext?"●":"○";
    setSquares(newSquares);
    setWin(winJudger(x, y, newSquares));
    setIsNext(!isNext);
  } 

  const reset = () => {
    setSquares(Array(9).fill(null).map(() => Array(9).fill(null)));
    setWin(false);
  }


  return (
    <main>
      <div className="w-fit">
        <Board squares={squares} squareClicked={handleClickSquare}/>
        <div className="flex justify-between">
          <p></p>
          <p>{win?`${isNext?"●":"○"}-WIN !`: `${isNext?"●":"○"} TURN`}</p>
          <button onClick={reset} className="font-bold">RESET</button>
        
        </div>
        
      </div>
      
      
    </main>
  );
}