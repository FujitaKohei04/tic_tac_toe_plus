"use client";
import { useState, useEffect } from "react";
import { NUM_OF_ROW } from "./constants/constants";

import Board from "./components/tictactoe/Board";
import History from "./components/tictactoe/History";
import Chat from "./components/tictactoe/chat/Chat";

//I think this function is to fix to return true
//because false pattern is often happend 
const winJudger = (XPutNow: number, YPutNow: number, boardAfterPutting: (string | null)[][]) => {
  let win = false;

  //who put stone now
  const putter = boardAfterPutting[XPutNow][YPutNow];

  //vecters to judge
  const judgerVec = [
    [1,  1], //lower right
    [1,  0], //right
    [0,  1], //down
    [1, -1], //upper right
  ];

  for(let v = 0; v < 4; v++) {
    let someStoneCounter = 1;

    //setting place judged
    let [judgingIndexX, judgingIndexY] = [XPutNow, YPutNow];


    while(!win) {
      //move place judged
      judgingIndexX -= judgerVec[v][0]; judgingIndexY -= judgerVec[v][1];
      
      //out of bounds?
      if (judgingIndexX < 0 || judgingIndexY < 0) break;
      
      let judgingSquare = boardAfterPutting[judgingIndexX][judgingIndexY];
      //the place isn't null? && the place = putter? 
      if (!judgingSquare || judgingSquare !== putter) break;
      
      someStoneCounter++; 
      
      //five?
      if (someStoneCounter >= 5) {win = true; return true;}
    }

    //return place put
    [judgingIndexX, judgingIndexY] = [XPutNow, YPutNow];

    while(!win) {
      judgingIndexX += judgerVec[v][0]; judgingIndexY += judgerVec[v][1];
      //out of bounds?
      if (judgingIndexX >= boardAfterPutting[0].length || judgingIndexY >= boardAfterPutting.length) break;
      let judgeeSquare = boardAfterPutting[judgingIndexX][judgingIndexY];
      if (!judgeeSquare || judgeeSquare !== putter) break;
      someStoneCounter++; 
      if (someStoneCounter >= 5) {win = true; return true;}
    }
  }
  
  return false;
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null).map(() => Array(9).fill(null))]);
  const [win, setWin] = useState<boolean>(false);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [moveCount, setMoveCount] = useState<number>(0);
  //be carefulli "hands 0 = history 1" (moveCount 1)
  const [hands, setHands] = useState<number[][]>([]);
  const [chat, setChat] = useState<{name:string, message:string, date:Date}[]>([]);

  const currentSquare = history[moveCount];
  const currentHand = hands[moveCount];
  const [boxName, setBoxName] = useState<string>("");
  const [boxMessage, setBoxMessage] = useState<string>("");
  
  //when a square is clicked
  const handleClickSquare = (x:number, y:number) => {
    //win? or all squares is filled? 
    if (win || currentSquare[x][y] || currentSquare.every((row) => (row.every(cell => cell !== null)))) return false;

    setHands([...hands, [x, y]]);
    
    const newSquares = currentSquare.map(row => [...row]);
    newSquares[x][y] = isNext?"✕":"〇";
    
    setWin(winJudger(x, y, newSquares));
    setHistory([...history, newSquares]);
    setMoveCount(moveCount+1);
    setIsNext(!isNext);

    return true;
  } 

  //when pushed reset button
  const reset = () => {
    setHistory([Array(9).fill(null).map(() => Array(9).fill(null))]);
    setIsNext(false);
    setMoveCount(0);
    setHands([]);
  }

  //when jump to board of index's history
  const handlePlay = (index:number) => {
    setHistory([...history.slice(0, index+1)]);
    setHands([...hands.slice(0, index)]);
    setMoveCount(index);
    setIsNext(Boolean(index%2));
  }

  //when move, judge
  useEffect(() => {
    if(moveCount > 0) {
      setWin(winJudger(hands[moveCount-1][0], hands[moveCount-1][1], history[moveCount]));
    } else {
      setWin(false);
    }
  }, [moveCount, hands, history]); 

  //when Enter Key pushed in textarea
  const handleKey = (e:any) => {
    if (e.key === "Enter" && !e.shiftkey) {
      e.preventDefault();
      if(boxName && boxMessage) {
        setChat([...chat, {name: boxName, message: boxMessage, date: new Date()}]);
        setBoxMessage("");
      }
    }
  }


  return (
    <main className="flex flex-row m-2">
      <div className="w-fit">
        <Board squares={currentSquare} squareClicked={handleClickSquare}/>
        <div className="flex justify-between">
          <p></p>
          <p>{win?`${!isNext?"●":"○"} WIN !`: `${isNext?"✕":"〇"} TURN`}</p>
          <button onClick={reset} className="font-bold">RESET</button>
          
          
        </div>
        <div className="flex flex-col gap-3 mt-8 fixed bottom-0 right-0 left-0 p-2">
            <Chat chat={chat}/>
            <div className="flex gap-2">
              <input type="text" maxLength={5} value={boxName} onChange={(e) => setBoxName(e.target.value)} placeholder="name" className="w-22 px-2 py-1 text-sm border rounded-md focus:outline-none"/>
              <input type="text" maxLength={30} value={boxMessage} onChange={(e) => setBoxMessage(e.target.value)} onKeyDown={(e) => handleKey(e)} className="flex-1 px-2 py-1 text-sm border rounded-md focus:outline-none"/>
            </div>
            
          </div>
      </div>
      {/* <div className="flex flex-col gap-1 px-2">
        {hands && hands.map((h, i) => (
          h && <History key={i} x={h[0]+1} y={h[1]+1} count={i+1} clickHistory={() => handlePlay(i+1)}/>
        ))}
        
      </div> */}
      
      
    </main>
  );
}