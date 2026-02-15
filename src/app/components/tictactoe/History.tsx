export default function History({
    x,
    y,
    count,
    clickHistory,
}: {
    x: number,
    y: number,
    count: number,
    clickHistory: () => void;
}) {
    return (
        <button
            className="border rounded p-1" 
            onClick={clickHistory}>{`${count}: ${x}-${y} ${count%2?"〇":"✕"}`}</button>
    );
}