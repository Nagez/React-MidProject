import { useState } from "react"

export default function AddTodo({cancleAddTodoCallback, addTodoCallback}) {

    const [todoTitle, setTodoTitle] = useState('');

    const handleCancle = () => {
        cancleAddTodoCallback(false)
    }

    const handleAdd = () => {
        addTodoCallback(todoTitle)
    }

    return (
        <div style={{ padding: "10px", margin: "15px 10px", overflow: 'hidden' }}>
            Title: <input type="text" onChange={(e)=>setTodoTitle(e.target.value)}></input>
            <br />
            <div style={{ float: 'right' }}>
                <button style={{ marginRight: '6px' }} onClick={handleCancle}>Cancle</button>
                <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    )
}