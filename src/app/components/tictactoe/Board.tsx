import Square from "./Square";
import { NUM_OF_ROW } from "@/app/constants/constants";

export default function Board({
    squares,
    squareClicked,
}:{
    squares: any[][],
    squareClicked: (i:number, j:number) => boolean,
}) {

    return (
        <div className={`grid grid-cols-9 aspext-square w-[70vmin] h-[70vmin]`}>
            {squares.map((col, i) => (
                col.map((row, j) => (
                    <Square key={`${i}-${j}`} content={row} squareClicked={() => squareClicked(i, j)}/>
                ))
                
            ))}
        </div>
        
        
    );
}