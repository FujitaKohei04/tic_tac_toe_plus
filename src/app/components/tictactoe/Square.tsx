import { LEN_OF_SQ } from "@/app/constants/constants";

export default function Square({
    content, 
    squareClicked,
}: {
    content: string,
    squareClicked: () => void,
}) {
    return (
        <button onClick={squareClicked} className={`border w-16 h-16 text-5xl`}>
            {content}
        </button>
    );
}