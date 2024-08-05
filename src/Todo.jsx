export default function Todo({ todo , callbackMarkComplete }) {

    const handleMarkComplete = () =>{
        callbackMarkComplete(todo.id)
    }

    return (
        <div style={{ border: "1px solid purple", padding: "10px", margin: "10px 10px 10px 10px", overflow: 'hidden' }}>
            <p><b>Title:</b> {todo.title}</p>
            <p>
                <b>Completed:</b> {todo.completed.toString()}
                {
                    todo.completed===false ? <button onClick={handleMarkComplete} style={{ float: 'right' }}>Mark Completed</button> : null
                }
                
            </p>
        </div>
    )
}