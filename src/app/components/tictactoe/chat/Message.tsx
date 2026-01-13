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
        <div className="my-3">
            <h1 className="leading-none">{`${name} : ${message}`}</h1>
            <p className="opacity-40 text-xs">{`${date}`}</p>
        </div>
    );
}