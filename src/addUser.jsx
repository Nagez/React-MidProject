import { useState } from "react";

export default function addUser({ cancleAddUserCallback, addUserCallback }) {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handleCancle = () => {
        cancleAddUserCallback(false)
    }

    const handleAdd = () => {
        addUserCallback({ name: userName, email: userEmail })
    }

    return (
        <div>
            Add new user<br />
            <div style={{ border: '1px solid black', padding: "10px", margin: "15px 10px", overflow:'hidden' }}>
                Name: <input type="text" onChange={(e) => setUserName(e.target.value)}></input><br />
                Email: <input type="text" onChange={(e) => setUserEmail(e.target.value)}></input>
                <br />
                <div style={{ float: 'right' }}>
                    <button style={{ marginRight: '6px' }} onClick={handleCancle}>Cancle</button>
                    <button onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    )
}