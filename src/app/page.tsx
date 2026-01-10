"use client";
import { useState, useEffect } from "react";
import { NUM_OF_ROW } from "./constants/constants";

import Board from "./components/tictactoe/Board";
import History from "./components/tictactoe/History";
import Chat from "./components/tictactoe/chat/Chat";

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
  const [history, setHistory] = useState([Array(9).fill(null).map(() => Array(9).fill(null))]);
  const [win, setWin] = useState<boolean>(false);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [hands, setHands] = useState<number[][]>([]);
  const [chat, setChat] = useState<{name:string, message:string}[]>([]);

  const currentSquare = history[moveCount];
  const currentHand = hands[moveCount];
  const [boxName, setBoxName] = useState<string>("");
  const [boxMessage, setBoxMessage] = useState<string>("");
  

  const handleClickSquare = (x:number, y:number) => {
    if (win || currentSquare[x][y] || currentSquare.every((row) => (row.every(cell => cell !== null)))) return;

    setHands([...hands, [x, y]]);
    
    const newSquares = currentSquare.map(row => [...row]);
    newSquares[x][y] = isNext?"●":"○";
    
    setWin(winJudger(x, y, newSquares));
    setHistory([...history, newSquares]);
    setMoveCount(moveCount+1);
    setIsNext(!isNext);
    
  } 

  const reset = () => {
    setHistory([Array(9).fill(null).map(() => Array(9).fill(null))]);
    setIsNext(false);
    setMoveCount(0);
    setHands([]);
  }

  const handlePlay = (index:number) => {
    setHistory([...history.slice(0, index+1)]);
    setHands([...hands.slice(0, index)]);
    setMoveCount(index);
    setIsNext(Boolean(index%2));
  }

  useEffect(() => {
    if(moveCount > 0) {
      setWin(winJudger(hands[moveCount-1][0], hands[moveCount-1][1], history[moveCount]));
    } else {
      setWin(false);
    }
    
  }, [moveCount, hands, history]); 

  const handleKey = (e:any) => {
    if (e.key === "Enter" && !e.shiftkey) {
      e.preventDefault();
      if(boxName && boxMessage) {
        setChat([...chat, {name: boxName, message: boxMessage}]);
        setBoxMessage("");
      }
    }
  }


  return (
    <main className="flex flex-row m-4">
      <div className="w-fit">
        <Board squares={currentSquare} squareClicked={handleClickSquare}/>
        <div className="flex justify-between">
          <p></p>
          <p>{win?`${!isNext?"●":"○"} WIN !`: `${isNext?"●":"○"} TURN`}</p>
          <button onClick={reset} className="font-bold">RESET</button>
          
          
        </div>
        <div className="flex flex-col gap-3 mt-8">
            <Chat chat={chat}/>
            <div className="flex items-center gap-2">
              <input type="text" maxLength={5} value={boxName} onChange={(e) => setBoxName(e.target.value)} placeholder="name" className="w-22 px-2 py-1 text-sm border rounded-md focus:outline-none"/>
              <input type="text" maxLength={30} value={boxMessage} onChange={(e) => setBoxMessage(e.target.value)} onKeyDown={(e) => handleKey(e)} className="flex-1 px-2 py-1 text-sm border rounded-md focus:outline-none"/>
            </div>
            
          </div>
      </div>
      <div className="flex flex-col gap-1 px-2">
        {hands && hands.map((h, i) => (
          h && <History key={i} x={h[0]+1} y={h[1]+1} count={i+1} clickHistory={() => handlePlay(i+1)}/>
        ))}
        
      </div>
      
      
    </main>
  );
}