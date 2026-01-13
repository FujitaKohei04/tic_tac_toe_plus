import Message from "./Message"

export default function Chat({
    chat,
}: {
    chat:any[],
}) {
    
    return (
        <div className="flec flex-col">
            {chat.map((c, i) => (
                <Message key={i} name={c.name} message={c.message} date={c.date}/>
            ))} 
        </div>
        
    )
}