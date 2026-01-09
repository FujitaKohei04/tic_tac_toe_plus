import Square from "./Square";
import { NUM_OF_ROW } from "@/app/constants/constants";

export default function Board({
    squares,
    squareClicked,
}:{
    squares: any[],
    squareClicked: (index:number) => void,
}) {

    return (
        <div className={`flex flex-wrap w-80`}>
            {squares.map((sq, i) => (
                <Square key={i} content={sq} squareClicked={() => squareClicked(i)}/>
            ))}
        </div>
        
        
    );
}