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
        <button onClick={clickHistory}>{`${count}: ${x}-${y} ${count%2?"○":"●"}`}</button>
    );
}