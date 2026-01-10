export default function Message({
    name,
    message,
}:{
    name: string,
    message: string,
}) {
    return (
        <div>
            <h1>{`${name} : ${message}`}</h1>
        </div>
    );
}