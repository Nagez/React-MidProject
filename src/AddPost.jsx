import { useState } from "react"

export default function AddPost({cancleAddPostCallback, addPostCallback}) {

    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    const handleCancle = () => {
        cancleAddPostCallback(false)
    }

    const handleAdd = () => {
        addPostCallback({title: postTitle, body: postBody})
    }

    return (
        <div style={{ padding: "10px", margin: "15px 10px", overflow: 'hidden' }}>
            Title: <input type="text" onChange={(e)=>setPostTitle(e.target.value)}></input><br/>
            Body: <input type="text" onChange={(e)=>setPostBody(e.target.value)}></input>
            <br />
            <div style={{ float: 'right' }}>
                <button style={{ marginRight: '6px' }} onClick={handleCancle}>Cancle</button>
                <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    )
}