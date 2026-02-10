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
        <div className={`flex flex-wrap w-90`}>
            {squares.map((col, i) => (
                col.map((row, j) => (
                    <Square key={`${i}-${j}`} content={row} squareClicked={() => squareClicked(i, j)}/>
                ))
                
            ))}
        </div>
        
        
    );
}