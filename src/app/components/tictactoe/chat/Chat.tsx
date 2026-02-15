import Message from "./Message"

export default function Chat({
    chat,
}: {
    chat:any[],
}) {
    
    return (
        <div className="flex flex-col flex-col-reverse h-25 overflow-y-auto p-1 border rounded-md">
            {chat.toReversed().map((c, i) => (
                <Message key={i} name={c.name} message={c.message} date={c.date}/>
            ))} 
        </div>
        
    )
}