export default function Message({
    name,
    message,
    date,
}:{
    name: string,
    message: string,
    date: Date,
}) {
    return (
        <div className="my-1">
            <h1 className="leading-none">{`${name} : ${message}`}</h1>
            <p className="opacity-40 text-xs">{`${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`}</p>
        </div>
    );
}